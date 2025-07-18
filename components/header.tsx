"use client";

import Link from "next/link";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import api from "@/lib/axios";

export default function Header() {
  const { setTheme } = useTheme();
  const [Token, setToken] = useState<boolean>();
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(!!storedToken);

    const fetchUserData = async () => {
      try {
        if (!storedToken) {
          const response = await api.get("/api/v1/users/me/");
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center">
      <div className="container flex h-20 items-center justify-between lg:space-x-4 ;g:px-6 py-4 mx-auto">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">منو</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium">
                {siteConfig.mainNav.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex w-full items-center py-2 text-sm font-medium"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={"/hamgerd-logo.svg"}
              alt="logo"
              width={60}
              height={60}
              className=" ml-2 dark:invert"
            />
          </Link>
          <nav className="hidden md:flex gap-8 px-6">
            {siteConfig.mainNav.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 px-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">تغییر تم</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>روشن</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>تاریک</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>سیستم</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {Token ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <a href="/dashboard">
                  <Avatar>
                    <AvatarImage src={userData?.image || "https://github.com/shadcn.png"} />
                    <AvatarFallback>HAM</AvatarFallback>
                  </Avatar>
                </a>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/dashboard">
                  <DropdownMenuLabel className="cursor-pointer text-end">داشبورد</DropdownMenuLabel>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  dir="rtl"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                    window.location.reload();
                  }}
                >
                  خروج
                </DropdownMenuItem>
                <Link href="/dashboard/tickets">
                  <DropdownMenuItem dir="rtl">بلیط های من</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // </div>
            <>
              <Link href="/login">
                <Button variant="outline" size="default" className="">
                  ورود
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="default">ثبت نام</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
