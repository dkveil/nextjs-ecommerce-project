/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/fonts/ProximaNovaBold.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=315360, immutable, s-maxage=315360, stale-while-revalidate=315360'
          }
        ]
      },
      {
        source: '/fonts/ProximaNovaRegular.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=315360, immutable, s-maxage=315360, stale-while-revalidate=315360'
          }
        ]
      },
      {
        source: '/fonts/ProximaNovaThin.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=315360, immutable, s-maxage=315360, stale-while-revalidate=315360'
          }
        ]
      },
    ]
  }
}

module.exports = nextConfig
