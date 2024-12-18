"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { userRegistrationSchema, userSchema } from "@/schemas/userSchema";
import { createUser } from "@/actions/userActions";

type UserRegValues = z.infer<typeof userRegistrationSchema>;
type UserValues = z.infer<typeof userSchema>;

type UserFormProps = {
  onSuccess?: () => void;
  userData?: UserValues;
};

export default function UserForm({ userData }: UserFormProps) {
  const router = useRouter();
  const form = useForm<UserRegValues>({
    defaultValues: userData
      ? {
          email: userData.email,
          password: "",
        }
      : {
          email: "",
          password: "",
        },
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(values: UserRegValues) {
    console.log(values);

    if (userData && userData.id) {
      try {
        // await updateProfile(userData.id, values);
        // console.log("User updated successfully!");
        // router.push("/");
      } catch (error) {
        console.error(error);
        // console.log("Failed to update profile.");
      }
    } else {
      // new user
      try {
        await createUser(values);
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button type="submit" variant="default">
              {userData ? "Update" : "Register"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
