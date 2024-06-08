import { DEFAULT_PAGINATION } from './constants';
import { getDrizzlePagination, getFirstElement } from './utils';

import { DrizzleError } from 'drizzle-orm';

describe('Test Shared Utils', () => {
  it('should return default pagination', () => {
    const pagination = getDrizzlePagination();
    expect(pagination).toEqual({
      offset: (DEFAULT_PAGINATION.page - 1) * DEFAULT_PAGINATION.limit,
      limit: DEFAULT_PAGINATION.limit,
    });
  });

  it('should return custom pagination', () => {
    const pagination = getDrizzlePagination(2, 10);
    expect(pagination).toEqual({
      offset: 10,
      limit: 10,
    });
  });

  it('should return the first element of a non-empty array', () => {
    const object = {
      id: 1,
      name: 'John Doe',
    };
    const array = [object];
    const firstElement = getFirstElement(array);
    expect(firstElement).toBe(object);
  });

  it('should throw an error for an empty array', () => {
    const array: number[] = [];
    expect(() => getFirstElement(array)).toThrow(DrizzleError);
  });

  it('should throw an error for an array with undefined as the first element', () => {
    const array: Array<number | undefined> = [undefined];
    expect(() => getFirstElement(array)).toThrow(DrizzleError);
  });
});
