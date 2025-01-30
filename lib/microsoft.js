import { decode } from "jsonwebtoken";

var token;

async function TestToken() {
    if (!token || decode(token).exp <= Date.now() / 1000) {
        const authResponse = await fetch("https://edge.microsoft.com/translate/auth");
        if (!authResponse.ok) {
            throw new Error('Failed to get authorization token');
        }
        token = await authResponse.text(); // Assuming the token is returned as plain text
    }
}

async function microsoftTranslate(text, source_lang, target_lang) {
    try {
        await TestToken();
        const apiUrl = `https://api.cognitive.microsofttranslator.com/translate?from=${source_lang}&to=${target_lang}&api-version=3.0&includeSentenceLength=true`;
        
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        const textObject = [{ text: text }];
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(textObject),
        });

        if (!response.ok) {
            throw new Error(`Translation failed: ${response.statusText}`);
        }

        const data = await response.json();
        return JSON.stringify({
            "model": "microsoft",
            "raw": text,
            "text": data[0].translations[0].text,
            "from": source_lang,
            "to": data[0].translations[0].to
        });
    } catch (error) {
        console.error('Microsoft error:', error);
        return null;
    }
}

export { microsoftTranslate };
