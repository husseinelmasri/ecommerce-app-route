'use client';

import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, Headphones, X, User } from 'lucide-react';
import { signOut, type useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

type Session = ReturnType<typeof useSession>;

interface NavigationSheetProps {
  session: Session;
  children: React.ReactNode;
}

export const NavigationSheet = ({
  session,
  children,
}: NavigationSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex h-full w-full max-w-[320px] flex-col border-l-0 p-0 sm:max-w-85">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex shrink-0 items-center justify-between border-b px-5 py-4">
          <Image
            src="/freshcart-logo.svg"
            alt="FreshCart"
            width={166}
            height={32}
            className="h-7 w-auto"
          />

          <SheetClose asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80">
              <X className="h-4 w-4" />
            </button>
          </SheetClose>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="relative mb-6">
            <Input
              className="h-11 w-full rounded-lg border-border bg-background pl-4 pr-12 text-sm focus-visible:ring-primary"
              placeholder="Search products..."
            />
            <Button
              size="icon"
              className="absolute right-1.5 top-1.5 h-8 w-8 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="rounded-md px-3 py-3 font-medium text-foreground hover:bg-muted">
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className="rounded-md px-3 py-3 font-medium text-foreground hover:bg-muted">
              Products
            </Link>
            <Link
              href="/categories"
              onClick={() => setIsOpen(false)}
              className="rounded-md px-3 py-3 font-medium text-foreground hover:bg-muted">
              Categories
            </Link>
            <Link
              href="/brands"
              onClick={() => setIsOpen(false)}
              className="rounded-md px-3 py-3 font-medium text-foreground hover:bg-muted">
              Brands
            </Link>
          </div>

          <div className="my-4 border-t" />

          <div className="flex flex-col space-y-2">
            <Link
              href="/wishlist"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                <Heart className="h-4 w-4 text-red-500" />
              </div>
              <span className="font-medium text-foreground">Wishlist</span>
            </Link>

            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                <ShoppingCart className="h-4 w-4 text-green-600" />
              </div>
              <span className="font-medium text-foreground">Cart</span>
            </Link>
          </div>

          <div className="my-4 border-t" />

          {session.status === 'loading' ? (
            <div className="flex h-11 items-center justify-center">
              <Spinner />
            </div>
          ) : session.status === 'authenticated' ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex min-w-0 flex-col leading-tight">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {session.data?.user?.name ?? 'My Account'}
                  </span>
                  {session.data?.user?.email && (
                    <span className="truncate text-xs text-muted-foreground">
                      {session.data.user.email}
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="destructive"
                className="h-11 rounded-md"
                onClick={() => signOut({ callbackUrl: '/' })}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                asChild
                className="h-11 flex-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 flex-1 rounded-md border-primary text-primary hover:bg-primary/5">
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </Button>
            </div>
          )}

          <div className="mt-4">
            <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Headphones className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  Need Help?
                </span>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-primary hover:underline">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
