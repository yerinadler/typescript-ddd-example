// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ok(message: string, data: any) {
  return {
    status: '000',
    message,
    data,
  };
}

export function err(statusCode: string, message: string, error: any) {
  return {
    status: statusCode,
    message,
    error,
  }
}
