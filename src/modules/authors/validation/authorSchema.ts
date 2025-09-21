import z from "zod";

export const authorSchema = z.object({

    name: z.string().min(1, "Name is obligatory"),

    description: z.string().max(200, "Description must be less than 200 characters"),

    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Birth date must be in YYYY-MM-DD format").refine((dateStr) => {
      const date = new Date(dateStr);
      // getTime() retorna NaN for invalid dates
      return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateStr;
    }, {
      message: "Please enter a valid date.",
    }).refine((dateStr) => new Date(dateStr) <= new Date(), {
      message: "Birth date cannot be in the future."
    }),

    image: z.url("Use a valid URL").min(1, "Image URL is obligatory")

});

export type AuthorFormData = z.infer<typeof authorSchema>;