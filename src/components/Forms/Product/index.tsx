import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form} from "../../ui/form.tsx";
import {CreateProductFormValues, createProductSchema} from "../../../schemas/productSchemas";
import {SubmitButton} from "../SubmitButton";
import {Input} from "../../ui/input.tsx";
import ApiService from "../../../utils/fetchWrapper";

const apiUrl = import.meta.env.VITE_API_URL;

export const ProductForm = ({onSuccess}) => {
    const apiService = new ApiService({
        baseURL: `${apiUrl}/api/products/`,
        multipartFormData: true
    });
    const [requested, setRequested] = useState(false);
    const form = useForm<CreateProductFormValues>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            availability: "",
            image: ""
        },
    });

    // Register the file input manually
    const fileInputRef = form.register("image");

    useEffect(() => {
        form.register("image", {
            validate: (files: FileList | null) => files?.length > 0 || "Image file is required"
        });
    }, [form.register]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        form.setValue("image", files, {shouldValidate: true});
    };

    const onSubmit = async (formData: CreateProductFormValues) => {
        const formD = new FormData();
        formD.append('name', formData.name);
        formD.append('description', formData.description);
        formD.append('price', formData.price.toString());
        formD.append('availability', formData.availability.toString());

        if (formData.image?.length) {
            formD.append('image', formData.image[0]);
        }

        try {
            setRequested(true);
            const { data } = await apiService.post<{ product: CreateProductFormValues }>('', formD)

            if (data.product) {
                onSuccess(data.product);
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setRequested(false);
        }
    };

    return (
        <div className={'w-full'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 min-w-[100px]">
                    <FormField
                        control={form.control}
                        disabled={requested}
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

                    {/* Description field */}
                    <FormField
                        control={form.control}
                        disabled={requested}
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

                    {/* Price field */}
                    <FormField
                        control={form.control}
                        disabled={requested}
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

                    {/* Availability field */}
                    <FormField
                        control={form.control}
                        disabled={requested}
                        name="availability"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <Input type="number" {...field} placeholder="Quantity available" />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        disabled={requested}
                        name="image"
                        render={({field}) => (
                            <FormItem className="relative">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="..."
                                    accept="image/*"
                                />
                            </FormItem>
                        )}
                    />
                    <SubmitButton requested={requested} text="Create Product"/>
                </form>
            </Form>
        </div>
    );
};
