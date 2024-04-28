const withMDX = require("@next/mdx")()
const withBundleAnalyzer = require("@next/bundle-analyzer")()

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

module.exports = process.env.ANALYZE === "true" ? withBundleAnalyzer(withMDX(nextConfig)) : withMDX(nextConfig)

// module.exports = withMDX(nextConfig)
