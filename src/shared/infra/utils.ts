import { DEFAULT_PAGINATION } from './constants';

import { DrizzleError } from 'drizzle-orm';

type DrizzlePagination = {
  offset: number;
  limit: number;
};

export const getDrizzlePagination = (
  page?: number,
  limit?: number,
): DrizzlePagination => ({
  limit: limit ?? DEFAULT_PAGINATION.limit,
  offset:
    (page === undefined ? DEFAULT_PAGINATION.page - 1 : page - 1) *
    (limit ?? DEFAULT_PAGINATION.limit),
});

export const getFirstElement = <T>(array: T[]): T => {
  if (array.length === 0 || array[0] === undefined)
    throw new DrizzleError({
      message: 'Undefined first element',
      cause: array,
    });
  return array[0];
};
