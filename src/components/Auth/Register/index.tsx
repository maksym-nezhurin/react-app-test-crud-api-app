// @ts-nocheck

import React, { useState } from "react";
import { Input } from "../../ui/input.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordField from "../../PasswordField";
import { SubmitButton } from "../../Forms/SubmitButton";
import { IUser } from "../../../types";
import { registerUser } from "../../../services/user.service.ts";

type RegisterFormInputs = Pick<IUser, "name" | "email" | "password"> & {
  confirmPassword: string;
};

const formSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Please enter a valid name, mi 5 symbols." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 symbols" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Confirm password must match password" }),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [requested, setRequested] = useState(false);
  const handleSubmit = async ({
    name,
    email,
    password,
    confirmPassword,
  }: RegisterFormInputs) => {
    try {
      setRequested(true);
      const token = await registerUser({
        name,
        email,
        password,
        confirmPassword,
      });

      if (token) {
        navigate("/");
      }
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setRequested(false);
    }
  };

  return (
    <div className="relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 min-w-[300px] min-h-[50vh] flex flex-col justify-between"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className={"relative"}>
                <FormLabel className="flex text-sm font-medium text-gray-700">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0 w-full overflow-hidden text-nowrap text-ellipsis" />
              </FormItem>
            )}
          />
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={"relative"}>
                <FormLabel className="flex text-sm font-medium text-gray-700">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0 w-full overflow-hidden text-nowrap text-ellipsis" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <PasswordField form={form} name="password" label="Password" />

          {/* Confirm Password Field */}
          <PasswordField
            form={form}
            name="confirmPassword"
            label="Confirm Password"
          />

          <SubmitButton requested={requested} text={"Register"} />
        </form>
      </Form>
    </div>
  );
};

export default Register;
