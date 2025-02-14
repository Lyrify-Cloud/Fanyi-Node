// router.js
import { getLanguageCode } from "./tool/iso.js";

import { xinghuo_lite_Translate } from "./lib/xinghuo/xinghuo_lite.js";
import { xinghuo_pro_Translate } from "./lib/xinghuo/xinghuo_pro.js";
import { xinghuo_max_Translate } from "./lib/xinghuo/xinghuo_max.js";

import { qwen_turbo_Translate } from "./lib/qwen/qwen_turbo.js";
import { qwen_plus_Translate } from "./lib/qwen/qwen_plus.js";
import { qwen_max_Translate } from "./lib/qwen/qwen_max.js";

import { glm_4_air_Translate } from "./lib/glm/glm_4_air.js";
import { glm_4_flash_Translate } from "./lib/glm/glm_4_flash.js";
import { glm_4_plus_Translate } from "./lib/glm/glm_4_plus.js";

import { gemini_1_5_flash_Translate } from "./lib/gemini/gemini_1_5_flash.js";
import { gemini_1_5_pro_Translate } from "./lib/gemini/gemini_1_5_pro.js";

import { deepl_Translate } from './lib/other/deepl.js';
import { google_Translate } from "./lib/other/google.js";
import { microsoft_Translate } from "./lib/other/microsoft.js";
import { transmart_Translate } from "./lib/other/transmart.js";
import { papago_Translate } from "./lib/other/papago.js";
import { niutrans_Translate } from "./lib/other/niutrans.js";
import { reverso_Translate } from "./lib/other/reverso.js";
import { caiyun_Translate } from "./lib/other/caiyun.js";





const translationFunctions = {
    xinghuo_lite: xinghuo_lite_Translate,
    xinghuo_pro: xinghuo_pro_Translate,
    xinghuo_max: xinghuo_max_Translate,

    glm_4_flash: glm_4_flash_Translate,
    glm_4_air: glm_4_air_Translate,
    glm_4_plus: glm_4_plus_Translate,

    qwen_turbo: qwen_turbo_Translate,
    qwen_plus: qwen_plus_Translate,
    qwen_max: qwen_max_Translate,

    gemini_1_5_flash: gemini_1_5_flash_Translate,
    gemini_1_5_pro: gemini_1_5_pro_Translate,

    deepl: deepl_Translate,
    google: google_Translate,
    microsoft: microsoft_Translate,
    transmart: transmart_Translate,

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
