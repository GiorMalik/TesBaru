"use client"

import Link from "next/link";
import type { Session } from "next-auth";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle, LogOut, LayoutDashboard } from "lucide-react";
import { logout } from "@/lib/actions";

export function UserButton({ session }: { session: Session | null }) {
  if (!session?.user) {
    return (
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative h-8 w-8 rounded-full">
            <UserCircle className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session.user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* @ts-ignore */}
        {session.user.role === 'admin' && (
            <DropdownMenuItem asChild>
                <Link href="/tanian/cars"><LayoutDashboard className="mr-2 h-4 w-4" />Admin Dashboard</Link>
            </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
           <form
              action={logout}
              className="w-full"
            >
              <button type="submit" className="flex items-center w-full">
                 <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </button>
            </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}