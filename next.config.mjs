// const withMDX = require("@next/mdx")()
import rehypeSlug from "rehype-slug"
import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // experimental: { TODO: including this gave errors with Link component- commenting for now.
  //   typedRoutes: true
  // },
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

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    rehypePlugins: [
      rehypeSlug // add IDs to any h1-h6 tag that doesn't have one, using a slug made from its text
    ]
  }
})

export default withMDX(nextConfig)
