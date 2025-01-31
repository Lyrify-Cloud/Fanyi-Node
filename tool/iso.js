// iso.js

// zh-Hans zh-Hant en de fr it ja ko

const modelLanguageCodes = {
  // xinghuo
  'xinghuo_lite': { 'zh-Hans': 'Simplified Chinese', 'en': 'English', 'de': 'German', 'fr': 'French', 'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean' },
  'xinghuo_pro': { 'zh-Hans': 'Simplified Chinese', 'en': 'English', 'de': 'German', 'fr': 'French', 'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean' },
  'xinghuo_max': { 'zh-Hans': 'Simplified Chinese', 'en': 'English', 'de': 'German', 'fr': 'French', 'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean' },
  // glm
  'glm_4_flash': { 'zh-Hans': 'Simplified Chinese', 'en': 'English', 'de': 'German', 'fr': 'French', 'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean' },
  'glm_4_air': { 'zh-Hans': 'Simplified Chinese', 'en': 'English', 'de': 'German', 'fr': 'French', 'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean' },
  'glm_4_plus': { 'zh-Hans': 'Simplified Chinese', 'en': 'English', 'de': 'German', 'fr': 'French', 'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean' },

  'deepl': { 'zh-Hans': 'ZH', 'en': 'EN', 'de': 'DE', 'fr': 'FR', 'it': 'IT', 'ja': 'JA', 'ko': 'KO' },
  'google': { 'zh-Hans': 'zh-CN', 'zh-Hant': 'zh-TW', 'en': 'en', 'de': 'de', 'fr': 'fr', 'it': 'it', 'ja': 'ja', 'ko': 'ko' },
  'microsoft': { 'zh-Hans': 'zh-Hans', 'zh-Hant': 'zh-Hant', 'en': 'en', 'de': 'de', 'fr': 'fr', 'it': 'it', 'ja': 'ja', 'ko': 'ko' },
  'transmart': { 'zh-Hans': 'zh', 'en': 'en', 'de': 'de', 'fr': 'fr', 'it': 'it', 'ja': 'ja', 'ko': 'ko' },
  'gemini': { 'zh-Hans': 'Simplified Chinese', 'en': 'English', 'de': 'German', 'fr': 'French', 'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean' },
  'papago': { 'zh-Hans': 'zh-CN', 'zh-Hant': 'zh-TW', 'en': 'en', 'de': 'de', 'fr': 'fr', 'it': 'it', 'ja': 'ja', 'ko': 'ko' },
  'niutrans': { 'zh-Hans': 'zh', 'zh-Hant': 'cht', 'en': 'en', 'de': 'de', 'fr': 'fr', 'it': 'it', 'ja': 'ja', 'ko': 'ko' },
  'reverso': { 'zh-Hans': 'chi', 'zh-Hant': 'cht', 'en': 'eng', 'de': 'ger', 'fr': 'fra', 'it': 'ita', 'ja': 'jpn', 'ko': 'kor' },

  'caiyun': { 'zh-Hans': 'zh', 'en': 'en', 'de': 'de', 'fr': 'fr', 'it': 'it', 'ja': 'ja', 'ko': 'ko' },
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