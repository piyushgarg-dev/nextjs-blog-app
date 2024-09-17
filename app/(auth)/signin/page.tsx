import { getServerSession } from "next-auth";
import SignInForm from "./_components/signin-form";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession();

  if (session?.user) return redirect("/admin");

  return (
    <main>
      <SignInForm />
    </main>
  );
}
