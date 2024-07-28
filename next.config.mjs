/** @type {import('next').NextConfig} */
const nextConfig = {
    // output:"export"
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://eazzimeserver.onrender.com/api/v1/:path*',
          },
        ];
      },
};

export default nextConfig;
