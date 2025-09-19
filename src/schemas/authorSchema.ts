import z from "zod";

export const authorSchema = z.object({

    name: z.string().min(1, "Name is obligatory"),

    description: z.string().max(200, "Description must be less than 200 characters"),

    birthDate: z.string().min(1, "Birth date is obligatory").regex(/^\d{2}-\d{2}-\d{4}$/, "Birth date must be in DD-MM-YYYY format"),

    image: z.url("Use a valid URL").min(1, "Image URL is obligatory")

});

export type AuthorFormData = z.infer<typeof authorSchema>;