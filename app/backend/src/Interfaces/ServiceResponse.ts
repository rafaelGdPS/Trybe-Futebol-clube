type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';
type ServiceResponseSUCCESSType = 'SUCCESSFUL' | 'CREATED' | 'UPDATED' | 'DELETED';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: { message: string }
};

export type ServiceResponseSuccess<T> = {
  status: ServiceResponseSUCCESSType,
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
