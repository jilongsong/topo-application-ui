export class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export interface MessageOption {
  type: 'error' | 'warning';
  message: string;
  cause?: any;
}

export class MessageError extends BaseError {
  constructor(option: MessageOption) {
    super(option.message);
    this.cause = option.cause;
    if (
      !['Request failed with status code 401', 'Request failed with status code 403'].includes(option.cause.message)
    ) {
      console.log('error');
    }
  }
}
