import { z } from "zod";

export const fileSchema = z.object({
  file: z
    .custom<File>((file) => file instanceof File, { message: "Invalid File" })
    .refine((file) => file.size < 32 * 1024 * 1024, {
      message: "File size should be less than 20MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF format is supported",
    }),
});
