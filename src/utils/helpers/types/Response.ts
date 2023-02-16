export interface ErrorType {
  message?: string;
  errors?: Record<string, any>;
}

export interface RequestResponse<T = any> {
  data: T | null;
  status?: number;
  message?: string;
  error?: boolean;
}
