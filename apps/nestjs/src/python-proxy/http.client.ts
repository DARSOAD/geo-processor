import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProcessRequestDto } from './dto/process.request.dto';
import { ProcessResponseDto } from './dto/process.response.dto';

export type PythonProcessResponse = {
  centroid: { lat: number; lng: number };
  bounds: { north: number; south: number; east: number; west: number };
};

@Injectable()
export class HttpClient {
  private client: AxiosInstance;
  private timeoutMs: number;
  private retry: number;

  constructor(private readonly config: ConfigService) {
    const baseURL = process.env.PYTHON_BASE_URL ?? 'http://localhost:8000';
    const timeoutMs = Number(process.env.PYTHON_TIMEOUT_MS ?? '5000');
    const retry = Number(process.env.PYTHON_RETRY ?? '0');

    this.timeoutMs = timeoutMs;
    this.retry = retry;

    this.client = axios.create({
      baseURL,
      timeout: this.timeoutMs,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async postProcess(
    payload: ProcessRequestDto,
  ): Promise<PythonProcessResponse> {
    let lastErr: unknown;
    const attempts = Math.max(0, this.retry) + 1;
    for (let i = 0; i < attempts; i++) {
      try {
        const resp = await this.client.post<ProcessResponseDto>(
          '/process',
          payload,
        );
        return resp.data;
      } catch (err) {
        lastErr = err;
        if (i === attempts - 1) throw err;
      }
    }
    throw lastErr;
  }
}
