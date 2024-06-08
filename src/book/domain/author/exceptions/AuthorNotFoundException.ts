import { AbstractDomainException } from '@shared/domain/exceptions/AbstractDomainException';

export class AuthorNotFoundException extends AbstractDomainException {
  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
