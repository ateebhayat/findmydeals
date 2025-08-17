/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { webpack }) => {
    // Ignore unnecessary database drivers that TypeORM tries to load
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^mysql$/,
        contextRegExp: /typeorm/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^mysql2$/,
        contextRegExp: /typeorm/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^oracledb$/,
        contextRegExp: /typeorm/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$/,
        contextRegExp: /typeorm/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^sqlite3$/,
        contextRegExp: /typeorm/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^better-sqlite3$/,
        contextRegExp: /typeorm/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^ioredis$/,
        contextRegExp: /typeorm/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^redis$/,
        contextRegExp: /typeorm/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^typeorm-aurora-data-api-driver$/,
        contextRegExp: /typeorm/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^react-native-sqlite-storage$/,
        contextRegExp: /typeorm/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^sql.js$/,
        contextRegExp: /typeorm/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^mongodb$/,
        contextRegExp: /typeorm/,
      }),
    )

    // Handle the DirectoryExportedClassesLoader dynamic require warning
    config.module = {
      ...config.module,
      exprContextCritical: false,
    }

    return config
  },
}

export default nextConfig
