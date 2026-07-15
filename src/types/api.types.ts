// Standard single-object response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Paginated list response wrapper
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error response shape
export interface ApiError {
  error: {
    code: string;    // e.g. "VALIDATION_ERROR", "NOT_FOUND"
    message: string;
    details?: Record<string, string[]>; // field-level validation errors
  };
}
