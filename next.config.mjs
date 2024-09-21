/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.imgcdn.org", "crackswall.zeezsoft.com"],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

export default nextConfig;
