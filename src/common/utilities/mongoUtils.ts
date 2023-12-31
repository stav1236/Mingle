import { ProjectionType } from "mongoose";

export const numericProjection = (projection: ProjectionType<any>) =>
  Object.fromEntries(
    Object.entries(projection).map(([key, value]) => [key, Number(value)])
  );
