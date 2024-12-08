// @ts-nocheck

import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PasswordField from "../../PasswordField";
import { SubmitButton } from "../../Forms/SubmitButton";
import { IUser } from "../../../types";
import { authStore } from "../../../stores/authStore";
import { loginUser } from "../../../services/user.service.ts";
import { requestStore } from "../../../stores/requestStore.ts";

type LoginFormInputs = Pick<IUser, "email" | "password">;

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 symbols",
  }),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema), // Apply zod resolver with schema
    defaultValues: {
      email: "max2@example.com",
      password: "123456",
    },
  });
  const { isRequested } = requestStore;
  const { token } = authStore;

  const handleSubmit = async ({ email, password }: LoginFormInputs) => {
    try {
      const { token: at } = await loginUser<{ token: string }>({ email, password });

      if (at) {
        navigate("/");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 min-w-[300px] min-h-[50vh] flex flex-col justify-between"
        >
          <div>
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

            <PasswordField form={form} />
          </div>

          <SubmitButton requested={isRequested} text={"Login"} />
        </form>
      </Form>
    </div>
  );
};

export default Login;
