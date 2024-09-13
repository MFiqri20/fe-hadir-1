/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env:{
      BACKEND_URL: process.env.BACKEND_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
  }
};

export default nextConfig;