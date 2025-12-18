import { auth } from "@/auth";
import { notFound } from "next/navigation";

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

  return <>{children}</>;
}
