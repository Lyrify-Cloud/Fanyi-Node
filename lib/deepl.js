// deepl.js
// https://github.com/OwO-Network/DeepLX
import { query } from '@ifyour/deeplx';

async function deeplTranslate(text, source_lang, target_lang) {
    try {
        const result = await query({ text, source_lang, target_lang })

        return JSON.stringify({
            "model": "deepl",
            "raw": text,
            "text": result.data,
            "from": result.source_lang,
            "to": result.target_lang
        });
    } catch (error) {
        console.error('Deepl error:', error);
        return null;
    }
}

export { deeplTranslate };
