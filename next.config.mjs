import createMDX from "@next/mdx"

//NOTE: not importing rehype-slug directly

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: ["rehype-slug"]
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"]
}

export default withMDX(nextConfig)
