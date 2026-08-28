"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, CircleCheck, Languages, Mail } from "lucide-react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { cn } from "@/lib/utils/cn";

import loginImage from "../../../../public/images/auth/create_password.svg";

type PasswordStrength = "none" | "weak" | "strong";

function getPasswordStrength(password: string): PasswordStrength {
  if (password.length === 0) return "none";
  if (password.length < 8) return "weak";
  // Check for at least one uppercase, one lowercase, one number, and one special char
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const strength = [hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;
  return strength >= 3 ? "strong" : "weak";
}

export default function NewPasswordPage() {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const strength = getPasswordStrength(password);
  const strengthBars = strength === "strong" ? 4 : strength === "weak" ? 1 : 0;
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const hasError = submitted && (strength === "weak" || !passwordsMatch);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (strength === "strong" && passwordsMatch) {
      setShowSuccess(true);
    }
  };

  return (
    <div className="flex min-h-screen p-4">
      {/* ── Left Panel (hidden on mobile) ─────────────────────────── */}
      <div className="relative hidden w-1/2 overflow-hidden items-center justify-center lg:flex rounded-2xl">
        {/* Decorations */}
        <Image
          src="/images/auth/tl_auth_deco.svg"
          alt=""
          width={280}
          height={280}
          className="pointer-events-none absolute left-0 top-0 z-2"
          priority
        />
        <Image
          src="/images/auth/br_auth_deco.svg"
          alt=""
          width={280}
          height={280}
          className="pointer-events-none absolute bottom-0 right-0 z-2"
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
        <div className="w-full max-w-2xl">
          <Image src={loginImage} width={400} height={800} alt="New Password Illustration" className="w-full h-auto" />
        </div>

        {/* Bottom text + testimonial */}
        <div className="absolute bottom-10 left-10 right-0 z-10 px-10 py-5 backdrop-blur-md w-[760px] bg-gradient-to-r from-transparent to-black/5 rounded-2xl">
          <h2 className="mb-2 text-h5 font-bold text-body-lg text-text-dark">
            Run Your Business Smarter
          </h2>
          <p className="mb-5 max-w-lg text-body-md text-dark">
            &quot;I Landed Multiple Projectds Within A Couple Of Days - With This
            Tool. Definitely My Go To Freelance Platform Now!&quot;
          </p>
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
              Create New Password
            </h1>
            <p className="mb-10 text-center text-body-md text-text-placeholder">
              Set your password
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* New Password */}
              <div>
                <Input
                  label="New Password"
                  placeholder="••••••••••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (submitted) setSubmitted(false);
                  }}
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
                {/* Password strength indicator */}
                <div className="mt-3">
                  <div className="flex gap-2 mb-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-2 flex-1 rounded-full transition-colors",
                          i < strengthBars
                            ? strength === "strong"
                              ? "bg-success-600"
                              : "bg-error-600"
                            : "bg-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <p
                    className={cn(
                      "text-body-xs text-right",
                      strength === "strong"
                        ? "text-success-600"
                        : strength === "weak"
                        ? "text-error-600"
                        : "text-text-placeholder"
                    )}
                  >
                    {strength === "strong"
                      ? "Strong Password"
                      : strength === "weak"
                      ? "Weak Password"
                      : "Password Strength"}
                  </p>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <Input
                  label="Confirm New Password"
                  placeholder="Re-enter a new Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (submitted) setSubmitted(false);
                  }}
                  size="lg"
                  error={
                    submitted && confirmPassword.length > 0 && !passwordsMatch
                      ? "Passwords do not match"
                      : undefined
                  }
                  rightIcon={
                    passwordsMatch ? (
                      <CircleCheck className="h-4 w-4 text-success-600" />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    )
                  }
                />
                {passwordsMatch && (
                  <p className="mt-1.5 text-body-xs text-success-600">
                    Password Matches
                  </p>
                )}
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                color="primary"
                size="lg"
                className="mt-2 w-full"
                disabled={password.length === 0}
              >
                {hasError ? "Try Again" : "Submit"}
              </Button>
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

      {/* ── Success Modal ─────────────────────────────────────────── */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowSuccess(false)}
          />
          {/* Modal */}
          <div className="relative z-10 mx-4 w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
            <div className="flex flex-col gap-4 items-center text-center">
              {/* Success icon */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-100">
                <CircleCheck className="h-10 w-10 text-success-600" />
              </div>
              {/* Title */}
              <h2 className="mb-2 text-h4 font-bold text-text-black">
                Password Reset Successfully
              </h2>
              {/* Description */}
              <p className="mb-6 text-body-sm max-w-sm text-text-placeholder">
                Your password has been successfully updated. please log in first.
              </p>
              {/* Sign In button */}
              <Link href="/login" className="w-full">
                <Button color="primary" size="lg" className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
