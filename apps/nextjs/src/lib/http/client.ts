import { HttpError, ParseError } from "./errors";

type HttpInit<TBody> = Omit<RequestInit, "body"> & {
  body?: TBody;
  timeoutMs?: number;
  retries?: number;           
};

async function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export async function http<TRes, TBody = unknown>(
  url: string,
  { body, timeoutMs = 8000, retries = 1, ...init }: HttpInit<TBody> = {}
): Promise<TRes> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    if (res.status >= 500 && retries > 0) {
      await sleep(300 * (2 - retries)); // backoff
      return http<TRes, TBody>(url, { body, timeoutMs, retries: retries - 1, ...init });
    }

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new HttpError(text || res.statusText, res.status);
    }

    if (res.status === 204) return undefined as TRes;

    const raw = await res.text();
    try {
      return JSON.parse(raw) as TRes;
    } catch {
      throw new ParseError(raw);
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new HttpError("Request timed out");
    }
    throw err;
  } finally {
    clearTimeout(id);
  }
}