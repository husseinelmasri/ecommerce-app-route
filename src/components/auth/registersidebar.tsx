import { Star, Truck, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import feedImage from '@/assets/feed.png';

export default function RegisterSidebar() {
  return (
    <div className="hidden lg:flex flex-col h-full bg-gray-50/50 p-10 rounded-2xl border border-gray-100">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Welcome to <span className="text-gray-900">FreshCart</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Join thousands of happy customers who enjoy fresh groceries delivered
          right to their doorstep.
        </p>
      </div>

      <div className="space-y-6 mb-12">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <Star className="size-5 text-emerald-600 fill-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Premium Quality</h3>
            <p className="text-sm text-gray-500">
              Premium quality products sourced from trusted suppliers.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <Truck className="size-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
            <p className="text-sm text-gray-500">
              Same-day delivery available in most areas.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <ShieldCheck className="size-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Secure Shopping</h3>
            <p className="text-sm text-gray-500">
              Your data and payments are completely secure.
            </p>
          </div>
        </div>
      </div>

      <div className=" bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
            <Image
              src={feedImage}
              alt="Sarah"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Sarah Johnson</h4>
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="size-3 fill-current" />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 italic">
          &quot;FreshCart has transformed my shopping experience. The quality of
          the products is outstanding!&quot;
        </p>
      </div>
    </div>
  );
}
