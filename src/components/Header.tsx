"use client";

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { DarkModeToggle } from "./DarkModeToggle";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="border-b">
      <div className="container flex justify-between items-center h-16">
        <SignedIn>
          <Link
            href="/dashboard"
            className={buttonVariants({
              variant: "link",
            })}
          >
            Ayberk&apos;s List
          </Link>
        </SignedIn>
        <SignedOut>
          <Link
            href="/"
            className={buttonVariants({
              variant: "link",
            })}
          >
           Ayberk&apos;s List
          </Link>
        </SignedOut>
        <div>
          <SignedIn>
            <Link
              href="/create"
              className={buttonVariants({
                variant: "link",
              })}
            >
              Create Event
            </Link>
          </SignedIn>
        </div>
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton afterSignInUrl="/dashboard">
              <Button variant="secondary">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
}
