// Metro configuration for Expo
// See: https://docs.expo.dev/guides/monorepos/#configure-the-metro-bundler
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  '@': '.',
  '@/screens': './src/screens',
  '@/navigation': './src/navigation',
  '@/components': './components',
  '@/hooks': './hooks',
  '@/constants': './constants',
};

module.exports = config;
