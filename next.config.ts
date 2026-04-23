import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Imagery is rendered entirely by the <IslamicArt /> SVG component — no
// remote photo hosts are needed. Left empty intentionally.
const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
