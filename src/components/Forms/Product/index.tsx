import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
} from "../../ui/form";
import { CreateProductFormValues, createProductSchema } from "../../../schemas/productSchemas";
import { SubmitButton } from "../SubmitButton";
import { Input } from "../../ui/input";
import ApiService from "../../../utils/apiService.tsx";

const apiUrl = import.meta.env.VITE_API_URL;

export const ProductForm = () => {
    const apiService = new ApiService({
        baseURL: `${apiUrl}/api/products/`,
        multipartFormData: true,
    });
    const [requested, setRequested] = useState(false);

    const form = useForm<CreateProductFormValues>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            availability: "",
            image: undefined, // Corrected to align with FileList type
        },
    });

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            form.setValue("image", files, { shouldValidate: true });
        }
    };

    const onSubmit = async (formData: CreateProductFormValues) => {
        const formD = new FormData();
        formD.append("name", formData.name);
        formD.append("description", formData.description);
        formD.append("price", formData.price.toString());
        formD.append("availability", formData.availability.toString());

        if (formData.image && formData.image.length > 0) {
            formD.append("image", formData.image[0]); // Use the first file
        }

        try {
            setRequested(true);
            const { data } = await apiService.post<{ product: CreateProductFormValues }>("", formD);

            if (data.product) {
                console.log("product", data.product);
            }
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setRequested(false);
        }
    };

    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 min-w-[100px]">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel>Product Name:</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter product name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel>Description:</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter product description" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel>Price ($):</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} placeholder="0.00" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel>Availability:</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} placeholder="Quantity available" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={() => (
                            <FormItem className="relative">
                                <FormLabel>Product Image:</FormLabel>
                                <FormControl>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SubmitButton requested={requested} text="Create Product" />
                </form>
            </Form>
        </div>
    );
};
