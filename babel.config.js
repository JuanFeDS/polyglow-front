module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
          alias: {
            '@/screens': './src/screens',
            '@/navigation': './src/navigation',
            '@/components': './components',
            '@/hooks': './hooks',
            '@/constants': './constants',
            '@/assets': './assets',
            '@/state': './src/state',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
