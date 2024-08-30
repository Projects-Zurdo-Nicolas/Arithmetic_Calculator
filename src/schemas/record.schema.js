import { z } from "zod";

export const saveRecordSchema = z.object({
      type: z.string({
        required_error: "Type is required",
      }),
    })
