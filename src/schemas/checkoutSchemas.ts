import { z } from "zod";

export const checkoutSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters long"),
    email: z.string().email("Invalid email format"),
    address: z.string().min(5, "Address must be at least 5 characters long"),
    city: z.string().min(2, "City must be at least 2 characters long"),
    postalCode: z.string().regex(/^\d{5}$/, "Postal code must be 5 digits"),
    country: z.string().min(2, "Country must be at least 2 characters long"),
    date: z.string().nonempty("Please select a date"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
