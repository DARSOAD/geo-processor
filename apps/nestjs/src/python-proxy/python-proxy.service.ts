import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { createHash } from 'crypto';

import { ProcessRequestDto } from './dto/process.request.dto';
import { ProcessResponseDto } from './dto/process.response.dto';
import { HttpClient, PythonProcessResponse } from './http.client';
import { ConfigService } from '@nestjs/config';

function stableStringify(obj: unknown): string {
  if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
  if (Array.isArray(obj)) return `[${obj.map(stableStringify).join(',')}]`;
  const entries = Object.entries(obj as Record<string, unknown>).sort(
    ([a], [b]) => a.localeCompare(b),
  );
  return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${stableStringify(v)}`).join(',')}}`;
}

function cacheKeyFor(body: ProcessRequestDto): string {
  const normalized = stableStringify(body);
  const sha = createHash('sha256').update(normalized).digest('hex');
  return `geo:process:v1:${sha}`;
}

@Injectable()
export class PythonProxyService {
  private readonly ttlMs: number;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly http: HttpClient,
    private readonly config: ConfigService,
  ) {
    const ttlSec = Number(
      this.config.get<string>('PYTHON_PROXY_TTL_SECONDS') ?? '600',
    );
    this.ttlMs = Math.max(0, ttlSec) * 1000;
  }

  /**
   * Passthrough with cache (cache-aside).
   */
  async computeOrFetch(
    body: ProcessRequestDto,
    refresh = false,
  ): Promise<ProcessResponseDto> {
    if (!body.points || body.points.length < 2) {
      throw new BadRequestException('At least 2 points are required');
    }

    const key = cacheKeyFor(body);

    if (!refresh) {
      const cached = await this.cache.get<PythonProcessResponse>(key);
      if (cached) {
        return { fromCache: true, ...cached };
      }
    }

    try {
      const data: PythonProcessResponse = await this.http.postProcess(body);
      await this.cache.set<PythonProcessResponse>(key, data, this.ttlMs);
      return { fromCache: false, ...data };
    } catch {
      throw new ServiceUnavailableException('Python service unavailable');
    }
  }
}
