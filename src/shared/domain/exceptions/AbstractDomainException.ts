export abstract class AbstractDomainException extends Error {
  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
