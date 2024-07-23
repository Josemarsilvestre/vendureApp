module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      'babel-preset-expo'  // Preset padrão para projetos Expo
    ],
    plugins: [
      'react-native-reanimated/plugin',  // Plugin para animações no React Native
      [
        'module:react-native-dotenv',  // Plugin para variáveis de ambiente
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true
        }
      ]
    ]
  };
};
