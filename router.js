// router.js
import { getLanguageCode } from "./tool/iso.js";

import { xinghuo_lite_Translate } from "./lib/xinghuo/xinghuo_lite.js";
import { xinghuo_pro_Translate } from "./lib/xinghuo/xinghuo_pro.js";
import { xinghuo_max_Translate } from "./lib/xinghuo/xinghuo_max.js";

import { deepl_Translate } from './lib/deepl.js';
import { google_Translate } from "./lib/google.js";
import { microsoft_Translate } from "./lib/microsoft.js";
import { transmart_Translate } from "./lib/transmart.js";
import { gemini_Translate } from "./lib/gemini.js";
import { papago_Translate } from "./lib/papago.js";
import { niutrans_Translate } from "./lib/niutrans.js";
import { reverso_Translate } from "./lib/reverso.js";
import { caiyun_Translate } from "./lib/caiyun.js";



const translationFunctions = {
    xinghuo_lite: xinghuo_lite_Translate,
    xinghuo_pro: xinghuo_pro_Translate,
    xinghuo_max: xinghuo_max_Translate,
    deepl: deepl_Translate,
    google: google_Translate,
    microsoft: microsoft_Translate,
    transmart: transmart_Translate,
    gemini: gemini_Translate,
    papago: papago_Translate,
    niutrans: niutrans_Translate,
    reverso: reverso_Translate,
    caiyun: caiyun_Translate,
};

async function Translate(model, text, form, to) {
    const translateFunction = translationFunctions[model.toLowerCase()];
    if (!translateFunction) {
        return JSON.stringify({ "model": model, "error": `翻译失败，未找到未找到名为 "${model}" 的翻译服务` });
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
