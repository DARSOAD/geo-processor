import { ZodError } from "zod";

export class HttpError extends Error {
  constructor(
    message: string,
    public status?: number,
    public cause?: unknown
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export class ParseError extends Error {
  constructor(public raw: string) {
    super("Invalid JSON response");
    this.name = "ParseError";
  }
}
type Problem = { status: number; message: string };

function hasMessage(e: unknown): e is { message: string } {
  return (
    typeof e === "object" &&
    e !== null &&
    "message" in e &&
    typeof (e as Record<string, unknown>).message === "string"
  );
}

export function toErrorMessage(err: unknown, fallback = "Unexpected error"): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try { return JSON.stringify(err); } catch { return fallback; }
}

function isAbortError(e: unknown): boolean {
  return e instanceof Error && e.name === "AbortError";
}

export function toHttpProblem(err: unknown): Problem {
  if (err instanceof HttpError) {
    return {
      status: err.status ?? 502,
      message: err.message || "Upstream error",
    };
  }
  if (err instanceof ParseError) {
    return { status: 502, message: "Invalid JSON from upstream" };
  }
  if (err instanceof ZodError) {
    const msg = err.issues.map((i) => i.message).join(", ");
    return { status: 400, message: msg || "Invalid input" };
  }
  if (isAbortError(err)) {
    return { status: 504, message: "Request timed out" };
  }
  if (hasMessage(err)) {
    return { status: 500, message: err.message };
  }
  return { status: 500, message: "Unexpected error" };
}
