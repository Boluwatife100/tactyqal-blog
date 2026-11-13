import { redirect } from "next/navigation";
import { getToken } from "@/lib/admin";
import { LoginForm } from "@/components/admin/login-form";

export default async function LoginPage() {
  if (await getToken()) redirect("/admin");
  return <LoginForm />;
}
