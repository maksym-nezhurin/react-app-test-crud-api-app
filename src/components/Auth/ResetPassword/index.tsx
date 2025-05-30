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
import { requestStore } from "../../../stores/requestStore.ts";
import { OneTimePassword } from "../../Forms/OneTimePassword.tsx";
import { IUser } from "../../../types";
import {
  resetUserPassword,
  verifyPassword,
} from "../../../services/user.service.ts";

type ResetFormInput = Pick<IUser, "email" | "password"> & {
  resetCode: string;
};

const codeFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const formSchema = z.object({
  resetCode: z
    .string()
    .min(5, { message: "Please enter a valid 6 symbols code." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 symbols" }),
});

const FormStep = ({ email }) => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resetCode: "",
      email: email,
      password: "",
    },
  });
  const { isRequested } = requestStore;

  const handleSubmit = async ({ password, resetCode }: ResetFormInput) => {
    try {
      const flag = await verifyPassword({ email, password, resetCode });

      if (flag) {
        navigate("/");
      }
    } catch (err) {
      console.log("Error:", err);
    } finally {
      console.log("finally");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6 min-w-[300px] min-h-[50vh] flex flex-col justify-between"
        >
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem className={"relative"}>
                <FormLabel className="flex text-sm font-medium text-gray-700">
                  One time code
                </FormLabel>
                <FormControl>
                  <OneTimePassword {...field} />
                </FormControl>
                <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0 w-full overflow-hidden text-nowrap text-ellipsis" />
              </FormItem>
            )}
          />
          <FormField
            className={"hidden"}
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
                    disabled={true}
                    value={email}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute text-red-500 text-sm mt-1 bottom-[-20px] left-0 w-full overflow-hidden text-nowrap text-ellipsis" />
              </FormItem>
            )}
          />
          <PasswordField form={form} name="password" label="Password" />
          <SubmitButton requested={isRequested} text={"Submit"} />
        </form>
      </Form>
    </>
  );
};

const ResetPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const { isRequested, setRequested } = requestStore;
  const [email, setEmail] = useState("");

  const form = useForm({
    resolver: zodResolver(codeFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const sendCode = async ({ email }) => {
    try {
      setRequested(true);
      const response = await resetUserPassword({ email });

      if (response.status) {
        setEmail(email);

        setStep(2);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setRequested(false);
    }
  };

  return (
    <div className="relative">
      {step === 1 ? (
        <div className="flex justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(sendCode)}
              className="w-full space-y-6 min-w-[300px] min-h-[50vh] flex flex-col justify-between"
            >
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

              <SubmitButton
                requested={isRequested}
                text={"Send one time code"}
              />
            </form>
          </Form>
        </div>
      ) : (
        <FormStep email={email} />
      )}
    </div>
  );
};

export default ResetPassword;
