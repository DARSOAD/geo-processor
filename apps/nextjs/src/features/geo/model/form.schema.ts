import { z } from "zod";

export const PointSchema = z.object({
  lat: z
    .number({ message: "Lat required" })
    .min(-90, "Lat min -90")
    .max(90, "Lat max 90"),
  lng: z
    .number({ message: "Long required" })
    .min(-180, "Lng min -180")
    .max(180, "Lng max 180"),
});

export const FormSchema = z.object({
  points: z
    .array(PointSchema)
    .nonempty("Should be at least one coordinates pair"),
});

export type FormValues = z.infer<typeof FormSchema>;