/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Mac 2017 Optimization: Disable heavy features if needed
  swcMinify: true,
};

module.exports = nextConfig;
