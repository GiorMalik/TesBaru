import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  // @ts-ignore
  if (!session?.user || session.user?.role !== "admin") {
    notFound();
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
