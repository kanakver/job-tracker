import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    }
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('NextAuth authorize called with credentials:', { email: credentials?.email });
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          throw new Error('Please enter your email and password');
        }

        try {
          await connectDB();
          console.log('Database connected successfully');

          const user = await User.findOne({ email: credentials.email });
          console.log('User found:', user ? 'Yes' : 'No');

          if (!user) {
            console.log('User not found');
            throw new Error('No user found with this email');
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          console.log('Password validation:', isValid ? 'Valid' : 'Invalid');

          if (!isValid) {
            console.log('Invalid password');
            throw new Error('Invalid password');
          }

          console.log('Authentication successful, returning user:', {
            id: user._id,
            email: user.email,
            role: user.role
          });

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.fullName,
            role: user.role
          };
        } catch (error) {
          console.error('Authentication error:', error);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT Callback - Input:', { token, user });
      
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      
      console.log('JWT Callback - Output token:', token);
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback - Input:', { session, token });
      
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      
      console.log('Session Callback - Output session:', session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect Callback - Input:', { url, baseUrl });
      
      // Handle relative URLs
      if (url.startsWith('/')) {
        const finalUrl = `${baseUrl}${url}`;
        console.log('Redirect Callback - Final URL (relative):', finalUrl);
        return finalUrl;
      }
      
      // Handle absolute URLs on the same origin
      if (new URL(url).origin === baseUrl) {
        console.log('Redirect Callback - Final URL (same origin):', url);
        return url;
      }
      
      console.log('Redirect Callback - Final URL (default):', baseUrl);
      return baseUrl;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: "8KQzT9X#mP2$vL5nR7@jW4*hF3&cY6",
  debug: process.env.NODE_ENV === 'development',
  trustHost: true,
});

export { handler as GET, handler as POST }; 