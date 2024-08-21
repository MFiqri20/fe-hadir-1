/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env:{
      BACKEND_URL: process.env.BACKEND_URL
  }
};

export default nextConfig;