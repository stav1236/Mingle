export const CURRENCY = { שקל: "ILS", דולר: "USD", אירו: "EUR" } as const;

export type Currency = (typeof CURRENCY)[keyof typeof CURRENCY];
