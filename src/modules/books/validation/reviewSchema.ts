import z from "zod";

export const reviewSchema = z.object({

    name: z.string().min(1, "Name is obligatory"),

    source: z.string().min(1, "Source is obligatory"),

    description: z.string().min(1, "There must be a description"),

});

export type ReviewFormData = z.infer<typeof reviewSchema>;