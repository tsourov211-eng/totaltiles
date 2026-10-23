/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: '/tiles/wall-tiles.html',
        destination: '/tiles/wall-tiles',
      },
    ];
  },
};

module.exports = nextConfig;
