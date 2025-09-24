import z from "zod";

export const bookSchema = z.object({

    name: z.string().min(1, "Name is obligatory"),

    isbn: z.string().min(1, "ISBN is obligaotry").regex(/^\d+$/, "String must contain only digits."),

    image: z.url("Use a valid URL").min(1, "Image URL is obligatory"),

    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date").refine((dateStr) => {
        const date = new Date(dateStr);
        // getTime() retorna NaN para fechas invalidas
        return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateStr;
    }, {
        message: "Please enter a valid date.",
    }).refine((dateStr) => new Date(dateStr) <= new Date(), {
        message: "Publishing date cannot be in the future."
    }),

    description: z.string().min(1, "There must be a description"),

    editorial: z.string().min(1, "The book must be associated with and editorial")

});

export type BookFormData = z.infer<typeof bookSchema>;