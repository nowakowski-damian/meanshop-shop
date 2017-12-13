// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  BASE_URL: 'SERVER_API_URL',
  PRODUCTS: 'SERVER_API_URLproducts',
  CATEGORIES: 'SERVER_API_URL/categories',
  ORDER: 'SERVER_API_URL/orders',
  ORDER_EVENT_KEY: "new_order",
  PROMOTION_EVENT_KEY: "promotion",
};
