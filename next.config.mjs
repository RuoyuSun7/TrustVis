/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tests',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
