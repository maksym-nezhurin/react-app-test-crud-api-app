import {z} from "zod";

export const slotSchema = z.object({
    author: z.string().min(2, "Full name must be at least 2 characters long"),
    date: z.string().nonempty("Please select a date"),
    timeSlot: z.string().nonempty("Please select a time"),
});

export type SlotFormValues = z.infer<typeof slotSchema>;
