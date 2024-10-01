export const ROUTE = {
  HOME: '/',
  ME: '/me',
} as const;

export type ROUTE_KEY = keyof typeof ROUTE;

export const MAPPING_ROUTE_TITLE = {} as unknown as Record<ROUTE_KEY, string>;
