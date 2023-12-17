export const GENDERS = { MALE: "זכר", FEMALE: "נקבה", OTHER: "אחר" } as const;

export type Gender = (typeof GENDERS)[keyof typeof GENDERS];
