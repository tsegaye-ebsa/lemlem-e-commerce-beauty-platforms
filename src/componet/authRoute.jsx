"use client";
import { useRouter } from "next/navigation";
import AuthDialog from "@/componet/authDialog";

// Deep links (/login, /register) show the same dialog over the home page.
export default function AuthRoute({ mode }) {
  const router = useRouter();
  return (
    <AuthDialog
      mode={mode}
      onModeChange={(next) => router.replace(`/${next}`)}
      onClose={() => router.push("/")}
    />
  );
}
