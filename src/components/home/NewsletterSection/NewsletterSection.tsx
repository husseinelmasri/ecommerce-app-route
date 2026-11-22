import { Mail, Smartphone } from 'lucide-react';

export default function NewsletterSection() {
  return (
    <section className="py-16 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-linear-to-br from-emerald-50 via-white to-teal-50 rounded-3xl border border-emerald-100/50 shadow-lg overflow-hidden p-8 lg:p-14">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-600 uppercase">
                    Newsletter
                  </h3>
                  <p className="text-xs text-gray-500">50,000+ subscribers</p>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Get the Freshest Updates{' '}
                <span className="text-emerald-600">Delivered Free</span>
              </h2>
              <p className="text-gray-500 text-lg">
                Weekly recipes, seasonal offers & exclusive member perks.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 pt-4">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                />
                <button className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-500 transition">
                  Subscribe
                </button>
              </form>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-3xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
                <div className="relative space-y-4">
                  <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full">
                    📱 MOBILE APP
                  </div>
                  <h3 className="text-2xl font-bold">Shop Faster on Our App</h3>
                  <p className="text-gray-400 text-sm">
                    Get app-exclusive deals & 15% off your first order.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Smartphone className="size-4" />
                    <span className="text-gray-400">4.9 • 100K+ downloads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
