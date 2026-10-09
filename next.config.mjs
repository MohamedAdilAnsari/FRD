/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['sequelize', 'sqlite3', 'pg', 'pg-hstore', 'bcryptjs'],
  },
};

export default nextConfig;
