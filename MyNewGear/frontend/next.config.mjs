import path from "path";
import { fileURLToPath } from "url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** WebPack の設定を追加 */
  webpack: (config) => {
    // Vue と同じように 「@ = src/」,「~ = src/」に設定する。
    // => モジュールのパス解決とエイリアスを設定している。
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    config.resolve.alias["@"] = path.resolve(__dirname, "");
    config.resolve.alias["~"] = path.join(__dirname, "");
    return config;
  },
};

export default nextConfig;
