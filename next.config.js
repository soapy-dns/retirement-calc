const withMDX = require("@next/mdx")()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/docs/about",
        permanent: true
      }
    ]
  }
}

module.exports = withMDX(nextConfig)
