/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/Fiberglass-workshop',
  assetPrefix: '/Fiberglass-workshop/',
  // اجازه صفحات داینامیک که client-side رندر می‌شوند
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig
