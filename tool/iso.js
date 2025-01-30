// iso.js

// zh-Hans zh-Hant en de fr it ja ko

const modelLanguageCodes = {
  'deepl': { 'zh-Hans': 'ZH', 'en': 'EN', 'de': 'DE', 'fr': 'FR', 'it': 'IT', 'ja': 'JA', 'ko': 'KO' },
  'google': { 'zh-Hans': 'zh-CN', 'zh-Hant': 'zh-TW', 'en': 'en', 'de': 'de', 'fr': 'fr', 'it': 'it', 'ja': 'ja', 'ko': 'ko' },
  'microsoft': { 'zh-Hans': 'zh-Hans', 'zh-Hant': 'zh-Hant', 'en': 'en', 'de': 'de', 'fr': 'fr', 'it': 'it', 'ja': 'ja', 'ko': 'ko' },
  'transmart': { 'zh-Hans': 'zh', 'en': 'en', 'de': 'de', 'fr': 'fr', 'it': 'it', 'ja': 'ja', 'ko': 'ko' },
  'gemini': { 'zh-Hans': 'Simplified Chinese', 'en': 'English', 'de': 'English', 'fr': 'French', 'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean' },
  'papago': { 'zh-Hans': 'zh-CN', 'zh-Hant': 'zh-TW', 'en': 'en', 'de': 'de', 'fr': 'fr', 'it': 'it', 'ja': 'ja', 'ko': 'ko' },
};

function getLanguageCode(modelName, languageCode) {
  const model = modelLanguageCodes[modelName];
  if (model && model[languageCode]) {
    return model[languageCode];
  } else {
    return null;
  }
}

export { getLanguageCode };