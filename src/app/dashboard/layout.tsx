"use client";
import useStoreUserEffect from "@/lib/hooks/useStoreUserEffect";

export default function Layout({ children }: { children: React.ReactNode }) {
  const userId = useStoreUserEffect();
  if (userId === null) {
    return <div>Storing user...</div>;
  }
  return <>{children}</>;
}
