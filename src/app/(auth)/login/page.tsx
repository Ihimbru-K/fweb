"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Languages, Mail } from "lucide-react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PhoneInput } from "@/components/PhoneInput";

import loginImage from "../../../../public/images/auth/login.svg";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="flex min-h-screen p-4">
      {/* ── Left Panel (hidden on mobile) ─────────────────────────── */}
      <div className="relative hidden w-1/2 overflow-hidden items-center justify-center lg:flex rounded-2xl">
        {/* Decorations */}
        <div className="pointer-events-none absolute left-0 top-0 z-2 lg:w-[230px] 2xl:w-[280px]">
          <Image
            src="/images/auth/tl_auth_deco.svg"
            alt=""
            width={280}
            height={280}
            className="w-full h-auto"
            priority
          />
        </div>
        
        <div className="pointer-events-none absolute right-0 bottom-0 z-2 lg:w-[230px] 2xl:w-[280px]" >
          <Image
            src="/images/auth/br_auth_deco.svg"
            alt=""
            width={280}
            height={280}
            className="w-full h-auto"
            priority
          />         
        </div>

        {/* Logo */}
        <div className="absolute left-10 top-8 z-10">
          <Image
            src="/logo/logo-white.svg"
            alt="Flexmot"
            width={140}
            height={32}
            priority
          />
        </div>

        {/* Join badge */}
        <div className="absolute right-10 top-8 z-10 flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-base"
              >
                <Image
                  src={`/images/person${i === 1 ? "" : i}.png`}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div>
            <p className="text-body-sm font-semibold text-text-dark">
              Join With 20k+ Users!
            </p>
            <p className="text-body-xs text-gray-400">
              Let&apos;s see our happy customer
            </p>
          </div>
        </div>

        {/* Illustration */}
        <div className="w-full max-w-4xl px-8">
          <Image src={loginImage} width={1000} height={500} alt="Login Illustration" className="w-full h-auto" />
        </div>

        {/* Bottom text + dots */}
        <div className="absolute bottom-10 left-10 right-10 z-10 px-10 py-5 xl:max-w-2xl 2xl:max-w-3xl backdrop-blur-md bg-gradient-to-r from-transparent to-black/5 rounded-2xl">
          <h2 className="mb-2 text-h5 font-bold text-body-lg text-text-dark">
            Run Your Business Smarter
          </h2>
          <p className="mb-5 max-w-lg  text-body-md text-dark">
            Manage Sales, Orders, Bookings, Payments, Inventory, And Customers
            From One Simple Platform.
          </p>
          <div className="flex justify-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary-400" />
            <span className="h-2.5 w-2.5 rounded-full border border-gray-600 bg-transparent" />
            <span className="h-2.5 w-2.5 rounded-full border border-gray-600 bg-transparent" />
          </div>
        </div>
      </div>

      {/* ── Right Panel ───────────────────────────────────────────── */}
      <div className="flex w-full flex-col bg-white lg:w-1/2">
        {/* Language selector */}
        <div className="flex justify-end p-6 lg:p-8">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-body-sm text-text-black transition-colors hover:bg-gray-50"
          >
            <Languages className="h-4 w-4" />
            EN
          </button>
        </div>

        {/* Form area */}
        <div className="flex flex-1 flex-col justify-center px-8 lg:px-16">
          <div className="mx-auto w-full max-w-xl">
            <h1 className="mb-2 text-center text-xl md:text-h4 font-bold text-text-black lg:text-h3">
              Login To Your Account
            </h1>
            <p className="mb-10 text-center text-body-md text-text-placeholder">
              Enter your phone number and password to login
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-5"
            >
              {/* Phone Number */}
              <Input
                label="Phone Number"
                placeholder="+237"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                leftIcon={
                  <span className="text-lg leading-none">🇨🇲</span>
                }
                size="lg"
              />

              {/* Password */}
              <Input
                label="Password"
                placeholder="••••••••••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />

              {/* Login button */}
              <Button
                type="submit"
                color="primary"
                size="lg"
                className="mt-2 w-full"
              >
                Login
              </Button>

              {/* Create account link */}
              <p className="text-center text-body-sm text-text-subtitle">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
                >
                  Create Account
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-6 text-body-xs text-text-subtitle lg:px-16">
          <span>©Flexmot</span>
          <a
            href="mailto:help@flexmot.com"
            className="flex items-center gap-1.5 hover:text-text-black"
          >
            <Mail className="h-3.5 w-3.5" />
            help@flexmot.com
          </a>
        </div>
      </div>
    </div>
  );
}
