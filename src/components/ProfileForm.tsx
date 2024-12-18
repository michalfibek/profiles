"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { profileSchema, profileSchemaInput } from "@/schemas/profileSchema";
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
import { dateToString } from "@/lib/utils";
import TextEditor from "./TextEditor";
import { createProfile, updateProfile } from "@/actions/actions";
import { useRouter } from "next/navigation";

type ProfileFormValues = z.infer<typeof profileSchema>;
type ProfileFormInputValues = z.infer<typeof profileSchemaInput>;

type ProfileFormProps = {
  onSuccess?: () => void;
  profileData?: ProfileFormValues;
};

export default function ProfileForm({ profileData }: ProfileFormProps) {
  const router = useRouter();
  const form = useForm<ProfileFormInputValues>({
    defaultValues: profileData
      ? {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          birthDate: profileData.birthDate ? dateToString(profileData.birthDate) : "",
          description: profileData.description ?? "",
          photoUrl: profileData.photoUrl ?? null,
        }
      : {
          firstName: "",
          lastName: "",
          birthDate: "",
          description: "",
          photoUrl: null,
        },
    resolver: zodResolver(profileSchema),
  });

  async function onSubmit(values: ProfileFormValues) {
    console.log(values);

    if (profileData && profileData.id) {
      try {
        await updateProfile(profileData.id, values);
        // console.log("Profile updated successfully!");
        router.push("/profiles");
      } catch (error) {
        console.error(error);
        // console.log("Failed to update profile.");
      }
    } else {
      try {
        await createProfile(values);
        // console.log("Profile created successfully!");
        router.push("/profiles");
      } catch (error) {
        console.error(error);
        // console.log("Failed to create profile.");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <TextEditor description={field.value ?? ""} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button type="submit" variant="default">
              {profileData ? "Save Profile" : "Create Profile"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
