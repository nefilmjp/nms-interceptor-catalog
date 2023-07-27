/** @type {import('next').NextConfig} */

const prefix = "/nms-interceptor-catalog";

const nextConfig = {
  output: "export",
  assetPrefix: prefix,
  async rewrites() {
    return [
      {
        source: `${prefix}/api/:path*`,
        destination: "/api/:path*",
      },
      {
        source: `${prefix}/images/:query*`,
        destination: '/_next/image/:query*'
      },
      {
        source: `${prefix}/_next/:path*`,
        destination: "/_next/:path*",
      },
    ]
  }
}

module.exports = nextConfig
