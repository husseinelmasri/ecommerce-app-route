import React from 'react';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

export default function ResetPassword() {
  return (
    <div className="hidden lg:block">
      <div className="text-center space-y-6">
        <div className="w-full h-100 bg-linear-to-br from-primary/10 via-green-50 to-emerald-50 rounded-[16px] shadow-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-primary/10"></div>
          <div className="absolute bottom-12 right-10 w-32 h-32 rounded-full bg-green-100/50"></div>
          <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-emerald-100/50"></div>
          <div className="relative flex flex-col items-center gap-6 z-10">
            <div className="w-28 h-28 rounded-[24px] bg-white shadow-xl flex items-center justify-center rotate-3">
              <div className="w-20 h-20 rounded-[16px] bg-primary/10 flex items-center justify-center">
                <Lock className="size-11 text-primary" />
              </div>
            </div>
            <div className="absolute -left-16 top-4 w-14 h-14 rounded-[12px] bg-white shadow-lg flex items-center justify-center -rotate-12">
              <Mail className="size-6 text-primary" />
            </div>
            <div className="absolute -right-16 top-8 w-14 h-14 rounded-[12px] bg-white shadow-lg flex items-center justify-center rotate-12">
              <ShieldCheck className="size-6 text-primary" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Secure Password Reset
          </h2>
          <p className="text-gray-500">
            We take your account security seriously
          </p>
        </div>
      </div>
    </div>
  );
}
