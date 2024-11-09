import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(2, { message: "Name must have at least 2 characters" }),
    description: z.string().min(10, { message: "Description must have at least 10 characters" }),
    price: z.string().min(0, { message: "Price must be non-negative" }),
    availability: z.string().min(0, { message: "Availability must be non-negative" }),
    image: z.instanceof(FileList).optional().refine((fileList) => fileList && fileList.length && fileList.length > 0, { message: "Image file is required" })
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
