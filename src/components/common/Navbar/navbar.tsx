'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Headphones,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { NavMenu } from './nav-menu';
import { NavigationSheet } from './navigation-sheet';
import { useSession, signOut } from 'next-auth/react';
import { Spinner } from '@/components/ui/spinner';
import { CartContext } from '@/context/cartContext';
import { WishlistContext } from '@/context/wishlistContext';
import { useContext } from 'react';

const Navbar = () => {
  const session = useSession();
  const { noOfCartItems } = useContext(CartContext)!;
  const { noOfWishlistItems } = useContext(WishlistContext)!;

  function signOutUser() {
    signOut({ redirect: true, callbackUrl: '/login' });
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 h-20 w-full border-b bg-background px-4 lg:px-8">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6">
        <div className="flex flex-1 items-center gap-6">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/freshcart-logo.svg"
              alt="FreshCart"
              width={166}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <div className="relative hidden w-full max-w-[320px] md:block">
            <Input
              className="h-10 rounded-full border-border bg-background pl-5 pr-12"
              placeholder="Search for products, brands and more..."
            />
            <Button
              size="icon"
              aria-label="Search"
              className="absolute right-1 top-1 size-8 rounded-full">
              <Search />
            </Button>
          </div>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <NavMenu />

          <div className="flex items-center gap-2 border-l pl-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Headphones className="size-5" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-medium text-muted-foreground">
                Support
              </span>
              <span className="text-xs font-semibold">24/7 Help</span>
            </div>
          </div>

          <div className="flex items-center gap-1 border-l pl-4 text-muted-foreground">
            {/* DESKTOP WISHLIST BADGE */}
            <Button asChild variant="ghost" size="icon" aria-label="Wishlist">
              <Link href="/wishlist" className="relative">
                <Heart className="size-5" />
                {noOfWishlistItems > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -right-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px] bg-red-500 hover:bg-red-600">
                    {noOfWishlistItems}
                  </Badge>
                )}
              </Link>
            </Button>

            <Button asChild variant="ghost" size="icon" aria-label="Cart">
              <Link href="/cart">
                <div className="relative">
                  <ShoppingCart className="size-5" />
                  <Badge
                    variant="default"
                    className="absolute -right-3.75 -top-3.75 p-1 text-base">
                    {noOfCartItems}
                  </Badge>
                </div>
              </Link>
            </Button>

            <div className="ml-2 flex items-center gap-2">
              {session.status === 'loading' ? (
                <Spinner />
              ) : session.status === 'authenticated' ? (
                <>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    aria-label="Account">
                    <Link href="/account">
                      <User className="size-5" />
                    </Link>
                  </Button>
                  <span className="max-w-25truncate text-sm text-muted-foreground">
                    {session.data?.user?.name}
                  </span>
                  <Button variant="destructive" size="sm" onClick={signOutUser}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {/* MOBILE WISHLIST BADGE */}
          <Button asChild variant="ghost" size="icon" aria-label="Wishlist">
            <Link href="/wishlist" className="relative">
              <Heart className="size-5" />
              {noOfWishlistItems > 0 && (
                <Badge
                  variant="default"
                  className="absolute -right-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px] bg-red-500 hover:bg-red-600">
                  {noOfWishlistItems}
                </Badge>
              )}
            </Link>
          </Button>

          <Button asChild variant="ghost" size="icon" aria-label="Cart">
            <Link href="/cart">
              <div className="relative">
                <ShoppingCart className="size-5" />
                <Badge
                  variant="default"
                  className="absolute -right-2.5 -top-2.5 p-0.5 text-xs">
                  {noOfCartItems}
                </Badge>
              </div>
            </Link>
          </Button>

          <NavigationSheet session={session}>
            <Button size="icon" aria-label="Open menu" className="rounded-full">
              <Menu className="size-5" />
            </Button>
          </NavigationSheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
