/** @type {import('next').NextConfig} */
const nextConfig = {
      serverComponentsExternalPackages: ['bcryptjs', '@neondatabase/serverless', 'drizzle-orm']
  };

export default nextConfig;