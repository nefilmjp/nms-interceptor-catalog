/** @type {import('next').NextConfig} */

const prefix = process.env.NEXT_PUBLIC_PATH_PREFIX
  ? process.env.NEXT_PUBLIC_PATH_PREFIX
  : undefined;

console.log(prefix ? `Path prefix: ${prefix}` : 'Path prefix not set');

const nextConfig = {
  output: 'export',
  assetPrefix: prefix,
  basePath: prefix,
  trailingSlash: true,
};

module.exports = nextConfig;
