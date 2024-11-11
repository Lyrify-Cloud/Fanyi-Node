// google.js
import translate from 'google-translate-api-x';


async function googleTranslate(text, source_lang, target_lang) {
    try {
        const result = await translate(text, { from: source_lang, to: target_lang })
        return JSON.stringify({
            "model": "google",
            "raw": text,
            "text": result.text,
            "from": result.raw[1][3],
            "to": result.raw[1][1]
        });
    } catch (error) {
        console.error('Google error:', error);
        return null;
    }
}

export { googleTranslate };