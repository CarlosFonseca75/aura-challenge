import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  sassOptions: {
    prependData: `@use "mixins" as *; @use "variables" as *;`,
    includePaths: [path.join(__dirname, "src/styles")],
  },
};

export default nextConfig;
