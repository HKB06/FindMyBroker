import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@radix-ui"],
  experimental: {
    turbo: true,
  }
}

export default withPayload(nextConfig, { 
  devBundleServerPackages: false,
})