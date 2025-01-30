// caiyun.js
const API_URL = 'http://api.interpreter.caiyunai.com/v1/translator';
const TOKEN = process.env.CAIYUN_API_KEY

async function caiyun_Translate(text, source_lang = "auto", target_lang = "zh") {
    try {
        const payload = {
            source: Array.isArray(text) ? text : [text],
            trans_type: `${source_lang}2${target_lang}`,
            request_id: "demo",
            detect: true
        };

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": `token ${TOKEN}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        return JSON.stringify({
            model: "caiyun",
            raw: text,
            text: data.target[0],
            from: source_lang,
            to: target_lang
        });
    } catch (error) {
        console.error("Caiyun API error:", error);
        return null;
    }
}

export { caiyun_Translate };
