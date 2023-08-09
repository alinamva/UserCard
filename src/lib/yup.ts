import { z } from "zod";

export const mySchema = z.object({
  name: z
    .string()
    .min(2, "Name should has at least 2 letter")
    .max(50, "Name may has max 50 letters"),
  surname: z
    .string()
    .min(6, "Surname should has at least 6 letter")
    .max(50, "Surname may has max 50 letters"),
  age: z.number().min(18, "Age should be greater or equal than 18").max(60),
  photo: z.any().optional(),
  id: z.string().optional(),
});
