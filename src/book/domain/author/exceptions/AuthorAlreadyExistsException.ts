import { AbstractDomainException } from '@shared/domain/exceptions/AbstractDomainException';

export class AuthorAlreadyExistsException extends AbstractDomainException {
  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
