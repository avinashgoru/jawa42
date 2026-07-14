// cSpell:ignore imgd aeplcdn
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgd.aeplcdn.com',
      },
    ],
  },
};

export default nextConfig;
