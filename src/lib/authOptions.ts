import { SigninUser } from '@/services/auth.services';
import { NextAuthOptions } from 'next-auth';

import credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const response = await SigninUser({
          email: credentials.email,
          password: credentials.password,
        });

        if (response.message === 'success') {
          return response;
        } else {
          throw new Error(response.message);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};
