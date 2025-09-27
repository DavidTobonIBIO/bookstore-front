import z from "zod";

export const prizeSchema = z.object({

    name: z.string().min(1, "Name is obligatory"),

    premiationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date").refine((dateStr) => {
        const date = new Date(dateStr);
        // getTime() retorna NaN para fechas invalidas
        return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateStr;
    }, {
        message: "Please enter a valid date.",
    }).refine((dateStr) => new Date(dateStr) <= new Date(), {
        message: "Date cannot be in the future."
    }),

    description: z.string().min(1, "There must be a description"),

    organization: z.string().min(1, "The prize must be associated with and organization")

});

export type PrizeFormData = z.infer<typeof prizeSchema>;