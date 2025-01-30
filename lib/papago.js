// papago.js
import crypto from 'crypto';
import { URLSearchParams } from 'url';

const apiUrl = 'https://papago.naver.com/apis/n2mt/translate';
const langDetectUrl = 'https://papago.naver.com/apis/langs/dect';
const deviceId = crypto.randomUUID();
const authKey = 'v1.8.8_3ab8f7c2df';

const getAuthorization = (url, timestamp) => {
    const message = `${deviceId}\n${url}\n${timestamp}`;
    const hmac = crypto.createHmac('md5', authKey).update(message).digest('base64');
    return `PPG ${deviceId}:${hmac}`;
};

const request = async (url, body) => {
    const timestamp = Date.now().toString();
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': getAuthorization(url, timestamp),
        'timestamp': timestamp,
        'device-type': 'pc'
    };
    const response = await fetch(url, { method: 'POST', headers, body: new URLSearchParams(body) });
    return response.json();
};

const Translate = async (text, source_lang = 'auto', target_lang = 'en') => {
    if (source_lang === 'auto') {
        source_lang = (await request(langDetectUrl, { query: text })).langCode;
    }
    const data = await request(apiUrl, { text, source: source_lang, target: target_lang, deviceId });
    return data.translatedText;
};

async function papagoTranslate(text, source_lang, target_lang){
    try {
        const result = await Translate(text, source_lang, target_lang);
        return JSON.stringify({
            "model": "papago",
            "raw": text,
            "text": result,
            "from": source_lang,
            "to": target_lang
        });
    } catch (error) {
        console.error('papago error:', error);
        return null;
    }
};

export { papagoTranslate };
