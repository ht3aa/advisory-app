"use client";

import { LogOut } from "lucide-react";

import { logoutAction } from "@/features/auth/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

export function UserMenu({ name, email }: { name: string; email: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-md p-1 pe-2.5 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/40">
        <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {initials(name)}
        </span>
        <span className="hidden text-start sm:block">
          <span className="block text-sm font-medium leading-tight text-foreground">
            {name}
          </span>
          <span className="block text-xs leading-tight text-muted-foreground">
            {email}
          </span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuLabel>
          <span className="block text-sm font-medium text-foreground">
            {name}
          </span>
          <span className="block text-xs text-muted-foreground">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form action={logoutAction}>
          <button type="submit" className="w-full">
            <DropdownMenuItem
              variant="destructive"
              onSelect={(e) => e.preventDefault()}
            >
              <LogOut className="size-4" />
              تسجيل الخروج
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
