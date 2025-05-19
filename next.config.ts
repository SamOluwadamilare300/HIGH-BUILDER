// import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'uploadthing.com',
      'utfs.io',
      'subdomain',
      'files.stripe.com',
    ],
  },
  reactStrictMode: false,
}

module.exports = nextConfig