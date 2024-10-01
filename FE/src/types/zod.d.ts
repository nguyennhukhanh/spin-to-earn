export type MakeZodI18nMap = (option?: ZodI18nMapOption) => ZodErrorMap;

export type ZodI18nMapOption = {
  t?: (s: Keys, p?: any) => string;
  ns?: string | readonly string[]; // See: `Namespace`
  handlePath?: {
    // See: `Handling object schema keys`
    keyPrefix?: string;
  };
};
