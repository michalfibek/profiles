"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { profileSchema } from "../schemas/profileSchema";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import TextEditor from "./TextEditor";

type ProfileFormValues = z.infer<typeof profileSchema>;

type ProfileFormProps = {
  onSuccess?: () => void;
  profileData?: ProfileFormValues;
};

export default function ProfileForm({ profileData }: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    defaultValues: profileData
      ? {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          birthDate: profileData.birthDate ? new Date(profileData.birthDate) : undefined,
          description: profileData.description,
        }
      : {
          firstName: "",
          lastName: "",
          birthDate: new Date(),
          description: "",
        },
    resolver: zodResolver(profileSchema),
  });

  async function onSubmit(values: ProfileFormValues) {
    console.log(values);

    if (profileData) {
      // await fetch(`/api/profiles/${profileData.id}`, {
      //   method: "PATCH",
      //   body: JSON.stringify(data),
      // });
    } else {
      // await fetch("/api/profiles", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      // });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    />
                  </PopoverContent>
                </Popover>
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
              Create Profile
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
