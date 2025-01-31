// reverso.js

async function reverso_Translate(text, source_lang, target_lang) {
    try {
        const response = await fetch("https://api.reverso.net/translate/v1/translation", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "x-reverso-origin": "translation.web"
            },
            body: JSON.stringify({
                format: "text",
                from: source_lang,
                to: target_lang,
                input: text,
                options: {
                    sentenceSplitter: true,
                    origin: "translation.web",
                    contextResults: true,
                    languageDetection: true
                }
            })
        });

        const data = await response.json();
        
        return JSON.stringify({
            model: "reverso",
            raw: text,
            text: data.translation[0],
            from: source_lang,
            to: target_lang
        });

    } catch (error) {
        console.error('Reverso error:', error);
        return null;
    }
}

export { reverso_Translate };