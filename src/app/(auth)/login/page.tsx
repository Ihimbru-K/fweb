"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Globe, Mail } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="flex min-h-screen">
      {/* ── Left Panel (hidden on mobile) ─────────────────────────── */}
      <div className="relative hidden w-1/2 overflow-hidden bg-base-dark lg:flex">
        {/* Decorations */}
        <Image
          src="/images/auth/tl_auth_deco.svg"
          alt=""
          width={280}
          height={280}
          className="pointer-events-none absolute left-0 top-0 z-0"
          priority
        />
        <Image
          src="/images/auth/br_auth_deco.svg"
          alt=""
          width={280}
          height={280}
          className="pointer-events-none absolute bottom-0 right-0 z-0"
          priority
        />

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
                className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-base-dark"
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
            <p className="text-body-sm font-semibold text-text-white">
              Join With 20k+ Users!
            </p>
            <p className="text-body-xs text-gray-400">
              Let&apos;s see our happy customer
            </p>
          </div>
        </div>

        {/* Illustration */}
        <div className="absolute bottom-36 left-1/2 z-10 w-full max-w-md -translate-x-1/2">
          <Image
            src="/images/auth/login.svg"
            alt="Illustration"
            width={420}
            height={340}
            className="mx-auto"
            priority
          />
        </div>

        {/* Bottom text + dots */}
        <div className="absolute bottom-10 left-0 right-0 z-10 px-10">
          <h2 className="mb-2 text-h5 font-bold text-text-white">
            Run Your Business Smarter
          </h2>
          <p className="mb-5 max-w-sm text-body-sm text-gray-400">
            Manage Sales, Orders, Bookings, Payments, Inventory, And Customers
            From One Simple Platform.
          </p>
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-600" />
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
            <Globe className="h-4 w-4" />
            EN
          </button>
        </div>

        {/* Form area */}
        <div className="flex flex-1 flex-col justify-center px-8 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <h1 className="mb-2 text-center text-h4 font-bold text-text-black lg:text-h3">
              Login To Your Account
            </h1>
            <p className="mb-10 text-center text-body-sm text-text-subtitle">
              No Worries, We&apos;ll Send You Reset Instructions
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
                  className="font-medium text-primary-600 underline underline-offset-2 hover:text-primary-700"
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
