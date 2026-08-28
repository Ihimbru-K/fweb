"use client";

import * as React from "react";
import Image from "next/image";
import { Languages, Mail } from "lucide-react";

import { Button } from "@/components/Button";
import { OtpInput } from "@/components/OtpInput";

import loginImage from "../../../../public/images/auth/create_password.svg";

export default function VerifyOtpPage() {
  const [otp, setOtp] = React.useState("");
  const [error, setError] = React.useState(false);
  const [resendSeconds, setResendSeconds] = React.useState(60);

  // Countdown timer for resend
  React.useEffect(() => {
    if (resendSeconds <= 0) return;

    const timer = setInterval(() => {
      setResendSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendSeconds]);

  const handleSubmit = () => {
    // Simulate validation - in real app this would call an API
    if (otp.length < 6) {
      setError(true);
      return;
    }
    setError(false);
    // TODO: Add actual OTP verification logic
  };

  const handleResend = () => {
    setResendSeconds(60);
    setOtp("");
    setError(false);
    // TODO: Add actual resend logic
  };

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
        
        <div className="pointer-events-none absolute right-0 bottom-0 z-2 lg:w-[230px] 2xl:w-[280px]">
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
        <div className="w-full max-w-3xl px-8">
          <Image src={loginImage} width={400} height={800} alt="OTP Illustration" className="w-full h-auto" />
        </div>

        {/* Bottom text + testimonial */}
        <div className="absolute bottom-10 left-10 right-10 z-10 px-10 py-5 xl:max-w-2xl 2xl:max-w-3xl backdrop-blur-md bg-gradient-to-r from-transparent to-black/5 rounded-2xl">
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
              Verify Your Phone
            </h1>
            <p className="mb-10 text-center text-body-md text-text-placeholder">
              We sent a code to <span className="text-info-700 underline font-medium">*****490</span>. It expires in 60 seconds.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex flex-col items-center gap-5"
            >
              {/* OTP Input */}
              <OtpInput
                length={6}
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                  if (error) setError(false);
                }}
                error={error}
              />

              {/* Resend link */}
              <div className="text-center">
                {resendSeconds > 0 ? (
                  <p className="text-body-sm text-text-placeholder">
                    Didn&apos;t receive a code?{" "}
                    <span className="text-text-placeholder">
                      ({resendSeconds}s)
                    </span>{" "}
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled
                      className="font-medium text-primary-600 cursor-not-allowed opacity-60"
                    >
                      Resend
                    </button>
                  </p>
                ) : (
                  <p className="text-body-sm text-text-placeholder">
                    Didn&apos;t receive a code?{" "}
                    <button
                      type="button"
                      onClick={handleResend}
                      className="font-medium text-primary-600 underline underline-offset-2 hover:text-primary-700"
                    >
                      Resend
                    </button>
                  </p>
                )}
              </div>

              {/* Error message */}
              {error && (
                <p className="text-body-sm text-error-600 text-center">
                  Incorrect Code. Please try again!
                </p>
              )}

              {/* Continue/Try Again button */}
              <Button
                type="submit"
                color="primary"
                size="lg"
                className="mt-2 w-full"
              >
                {error ? "Try Again" : "Continue"}
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
    </div>
  );
}
