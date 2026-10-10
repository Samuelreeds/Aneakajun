/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['bcryptjs', '@neondatabase/serverless', 'drizzle-orm']
  }
};

export default nextConfig;