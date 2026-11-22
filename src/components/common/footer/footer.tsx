import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <Link className="inline-block mb-6" href="/">
              <div className="bg-white rounded-lg px-4 py-2 inline-block">
                <Image
                  src="/freshcart-logo.svg"
                  width={160}
                  height={32}
                  alt="FreshCart Logo"
                  className="h-8 w-auto"
                />
              </div>
            </Link>
            <p className="text-gray-400 mb-6 text-sm font-medium leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>
            <div className="space-y-3 mb-6">
              <a
                href="tel:+20 123 456 7890"
                className="flex items-center gap-3 font-medium text-gray-400 hover:text-primary transition-colors text-sm">
                <Phone className="text-primary size-4" />
                <span>+20 123 456 7890</span>
              </a>
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-3 font-medium text-gray-400 hover:text-primary transition-colors text-sm">
                <Mail className="text-primary size-4" />
                <span>support@freshcart.com</span>
              </a>
              <div className="flex items-start gap-3 font-medium text-gray-400 text-sm">
                <MapPin className="text-primary mt-1 size-4" />
                <span>Cairo, Egypt</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors">
                    <Icon className="size-4" />
                  </a>
                ),
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Shop</h3>
            <ul className="space-y-3">
              {[
                'All Products',
                'Categories',
                'Brands',
                'Electronics',
                "Men's Fashion",
                "Women's Fashion",
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    className="text-gray-400 font-medium hover:text-primary transition-colors text-sm"
                    href="/products">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Account</h3>
            <ul className="space-y-3">
              {[
                'My Account',
                'Order History',
                'Wishlist',
                'Shopping Cart',
                'Sign In',
                'Create Account',
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    className="text-gray-400 font-medium hover:text-primary transition-colors text-sm"
                    href="/login">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Support</h3>
            <ul className="space-y-3">
              {[
                'Contact Us',
                'Help Center',
                'Shipping Info',
                'Returns & Refunds',
                'Track Order',
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    className="text-gray-400 font-medium hover:text-primary transition-colors text-sm"
                    href="/">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Legal</h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
                (item, i) => (
                  <li key={i}>
                    <Link
                      className="text-gray-400 font-medium hover:text-primary transition-colors text-sm"
                      href="/">
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm font-medium text-center md:text-left">
              © 2026 FreshCart. All rights reserved.
            </p>

            <div className="flex items-center gap-3">
              <div className="bg-white px-3 py-1.5 rounded-md flex items-center justify-center">
                <span className="text-blue-800 font-bold italic text-sm">
                  VISA
                </span>
              </div>
              <div className="bg-white px-3 py-1.5 rounded-md flex items-center justify-center">
                <div className="flex relative">
                  <div className="w-4 h-4 bg-red-500 rounded-full opacity-80" />
                  <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-80 -ml-2" />
                </div>
              </div>
              <div className="bg-white px-3 py-1.5 rounded-md flex items-center justify-center">
                <span className="text-blue-600 font-bold italic text-sm">
                  PayPal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
