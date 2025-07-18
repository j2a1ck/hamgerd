"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "@/validator/signup-schema";
import * as z from "zod";

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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios";

export default function SignupPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    setIsLoading(true);
    try {
      await api.post("/api/v1/users/register/", {
        email: values.email.toLowerCase(),
        password: values.password,
      });
      setEmailSent(true);
    } catch (err) {
      console.log("error message is:" + err);
      toast({
        title: "خطا در ثبت‌نام",
        description: "لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
          <Link href="/" className="flex items-center text-white">
            هم‌گرد
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              ثبت‌نام در این پلتفرم به ما امکان داد تا کارگاه‌های آموزشی خود را به آسانی مدیریت
              کنیم.
            </p>
          </blockquote>
        </div>
      </div>
      <div className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">ایجاد حساب کاربری</h1>
            <p className="text-sm text-muted-foreground">
              اطلاعات خود را وارد کنید تا حساب کاربری جدید ایجاد شود
            </p>
          </div>
          {emailSent ? (
            <div className="rounded-md bg-green-100 dark:bg-green-900 p-4 text-center text-green-700 dark:text-green-200 flex flex-col items-center">
              <svg
                className="h-8 w-8 mb-2 text-green-600 dark:text-green-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="text-lg font-semibold mb-1">ثبت‌نام موفقیت‌آمیز بود!</h2>
              <p className="text-zinc-500 text-sm mb-2">ایمیل تایید برای شما ارسال شد.</p>
              <p className="text-xs text-zinc-400 mb-2">
                لطفاً صندوق ورودی یا پوشه اسپم ایمیل خود را بررسی کنید و روی لینک تایید کلیک کنید.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 transition-colors text-sm font-medium mt-2"
              >
                ورود به حساب کاربری
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-primary hover:bg-primary/10 transition-colors text-sm font-medium mt-2"
              >
                بازگشت به خانه
              </Link>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ایمیل</FormLabel>
                      <FormControl>
                        <Input placeholder="example@domain.com" {...field} />
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
                      <FormLabel>رمز عبور</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
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
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          با{" "}
                          <Link href="/tos" className="text-primary hover:underline">
                            شرایط استفاده
                          </Link>{" "}
                          و{" "}
                          <Link href="/terms" className="text-primary hover:underline">
                            حریم خصوصی
                          </Link>{" "}
                          موافقم
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
                </Button>
              </form>
            </Form>
          )}
          {!emailSent && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">یا</span>
                </div>
              </div>
              <div className="text-center text-sm">
                <span>قبلا ثبت‌نام کرده‌اید؟ </span>
                <Link href="/login" className="text-primary hover:underline">
                  وارد شوید
                </Link>
              </div>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  بازگشت به صفحه اصلی
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
