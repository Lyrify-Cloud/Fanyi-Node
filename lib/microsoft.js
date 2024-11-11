// microsoft.js
import axios from "axios";
import { decode } from "jsonwebtoken";

var token;

async function TestToken() {
    if (!token || decode(token).exp <= Date.now() / 1000) {
        const auth = await axios.get("https://edge.microsoft.com/translate/auth");
        token = auth.data;
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
        const response = await axios.post(apiUrl, textObject, { headers });
        response.data.code = response.status
        return JSON.stringify({
            "model": "microsoft",
            "raw": text,
            "text": response.data[0].translations[0].text,
            "from": source_lang,
            "to": response.data[0].translations[0].to
        });
    } catch (error) {
        console.error('Microsoft error:', error);
        return null;
    }
}

export { microsoftTranslate };