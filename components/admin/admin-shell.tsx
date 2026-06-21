"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppSidebar } from "./app-sidebar";
import { UserMenu } from "./user-menu";

export function AdminShell({
  user,
  children,
}: {
  user: {
    name: string;
    email: string;
    permissions: string[];
    isSuperAdmin: boolean;
  };
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-muted/30">
      <aside className="hidden w-64 shrink-0 bg-sidebar lg:block">
        <div className="sticky top-0 h-dvh">
          <AppSidebar
            permissions={user.permissions}
            isSuperAdmin={user.isSuperAdmin}
          />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/85 px-4 backdrop-blur lg:px-6">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="القائمة"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 bg-sidebar p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>القائمة</SheetTitle>
                </SheetHeader>
                <AppSidebar
                  permissions={user.permissions}
                  isSuperAdmin={user.isSuperAdmin}
                  onNavigate={() => setOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>

          <UserMenu name={user.name} email={user.email} />
        </header>

        <main className="flex-1 p-5 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
