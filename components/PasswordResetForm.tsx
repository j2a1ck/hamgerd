"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const passwordResetSchema = z
  .object({
    password: z.string().min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد" }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

export function PasswordResetForm({ setSuccess }: { setSuccess: (v: boolean) => void }) {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof passwordResetSchema>) {
    if (!token) {
      toast({
        title: "توکن یافت نشد",
        description: "لینک بازیابی معتبر نیست.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      await api.post("/api/v1/users/password-reset/", {
        token,
        password: values.password,
      });
      setSuccess(true);
      toast({
        title: "رمز عبور با موفقیت تغییر کرد",
        description: "اکنون می‌توانید وارد شوید.",
      });
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      toast({
        title: "خطا در تغییر رمز عبور",
        description: "لینک یا رمز عبور معتبر نیست.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رمز عبور جدید</FormLabel>
              <FormControl>
                <Input type="password" placeholder="رمز عبور جدید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تکرار رمز عبور</FormLabel>
              <FormControl>
                <Input type="password" placeholder="تکرار رمز عبور" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "در حال ارسال..." : "تغییر رمز عبور"}
        </Button>
      </form>
    </Form>
  );
}
