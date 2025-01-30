// router.js
import { getLanguageCode } from "./tool/iso.js";

import { deeplTranslate } from './lib/deepl.js';
import { googleTranslate } from "./lib/google.js";
import { microsoftTranslate } from "./lib/microsoft.js";
import { transmartTranslate } from "./lib/transmart.js";
import { geminiTranslate } from "./lib/gemini.js";
import { papagoTranslate } from "./lib/papago.js";

const translationFunctions = {
    deepl: deeplTranslate,
    google: googleTranslate,
    microsoft: microsoftTranslate,
    transmart: transmartTranslate,
    gemini: geminiTranslate,
    papago: papagoTranslate
};

async function Translate(model, text, form, to) {
    const translateFunction = translationFunctions[model.toLowerCase()];
    if (!translateFunction) {
        throw new Error(`未找到名为 "${model}" 的翻译服务`);
    }

    const sourceLang = await getLanguageCode(model, form);
    const targetLang = await getLanguageCode(model, to);

    if (!sourceLang) {
        return JSON.stringify({ "model": model, "error": `翻译失败，未找到源语言代码 ${form} 对应的标准代码` });
    }
    if (!targetLang) {
        return JSON.stringify({ "model": model, "error": `翻译失败，未找到目标语言代码 ${to} 对应的标准代码` });
    }

    return await translateFunction(text, sourceLang, targetLang);
}

export { Translate };
