import AuthRoute from "@/componet/authRoute";

export const metadata = { title: "Sign in | lemlem." };

export default function LoginPage() {
  return <AuthRoute mode="login" />;
}
