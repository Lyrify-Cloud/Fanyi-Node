// niutrans.js
const API_URL = 'https://api.niutrans.com/NiuTransServer/translation';
const API_KEY = process.env.NIUTRANS_API_KEY

async function niutrans_Translate(text, source_lang, target_lang) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                from: source_lang,
                to: target_lang,
                src_text: text,
                apikey: API_KEY
            })
        });

        const result = await response.json();

        return JSON.stringify({
            "model": "niutrans",
            "raw": text,
            "text": result.tgt_text,
            "from": source_lang,
            "to": target_lang
        });
    } catch (error) {
        console.error('NiuTrans error:', error);
        return null;
    }
}

export { niutrans_Translate };
