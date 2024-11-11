// transmart.js
import axios from "axios";

function initData(text, from, to) {
    return {
        header: {
            fn: "auto_translation",
            client_key:
                "browser-edge-chromium-123.0.0-Windows_10-793961b6-556c-46fd-8092-8f975f2335d3-1708529948457",
        },
        type: "plain",
        model_category: "normal",
        source: { lang: from, text_list: [text] },
        target: { lang: to },
    };
}

async function transmartTranslate(text, source_lang, target_lang) {
    try {
        const post_str = JSON.stringify(initData(text, source_lang, target_lang));
        const response = await axios.post("https://yi.qq.com/api/imt", post_str, {
            headers: {
                "Content-Type": "application/json",
                "user-agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
                referer: "https://yi.qq.com/zh-CN/index",
            },
        });
        response.data.code = response.status
        return JSON.stringify({
            "model": "transmart",
            "raw": text,
            "text": response.data.auto_translation[0],
            "from": response.data.src_lang,
            "to": response.data.tgt_lang
        });
    } catch (error) {
        console.error('Transmart error:', error);
        return null;
    }
}

export { transmartTranslate };