// youdao.js
// 参考 https://blog.bingyue.top/2024/08/24/youdao_fanyi
import { createHash, createDecipheriv } from "crypto";
import axios from "axios";

async function get_sign() {
    const headers = {
        "Referer": "https://fanyi.youdao.com/",
        "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
    };

    const mysticTime = Math.floor(Date.now());
    const sign = createHash('md5').update(`client=fanyideskweb&mysticTime=${mysticTime}&product=webfanyi&key=asdjnjfenknafdfsdfsd`).digest("hex");

    const url = "https://dict.youdao.com/webtranslate/key?" +
        `keyid=webfanyi-key-getter&sign=${sign}` +
        "&client=fanyideskweb" +
        "&product=webfanyi" +
        "&appVersion=1.0.0&vendor=web" +
        "&pointParam=client,mysticTime,product" +
        `&mysticTime=${mysticTime}&keyfrom=fanyi.web` +
        "&mid=1" +
        "&screen=1" +
        "&model=1" +
        "&network=wifi" +
        "&abtest=0" +
        "&yduuid=abcdefg";

    const response = await axios.get(url, { headers });
    return response.data["data"];
}

function T(o) {
    return createHash('md5').update(o).digest();
}

async function Translate(text, source_lang, target_lang) {
    const v = await get_sign();
    const aeskey = v["aesKey"];
    const aesiv = v["aesIv"];
    const url = "https://dict.youdao.com/webtranslate";
    const mysticTime = Math.floor(Date.now());
    const sign = createHash('md5').update(`client=fanyideskweb&mysticTime=${mysticTime}&product=webfanyi&key=fsdsogkndfokasodnaso`).digest("hex");

    const m = `i=${text}&from=${source_lang}&to=${target_lang}&useTerm=false&dictResult=true&keyid=webfanyi&sign=${sign}&client=fanyideskweb&product=webfanyi&appVersion=1.0.0&vendor=web&pointParam=client%2CmysticTime%2Cproduct&mysticTime=${mysticTime}&keyfrom=fanyi.web&mid=1&screen=1&model=1&network=wifi&abtest=0&yduuid=abcdefg`;

    const headers = {
        "Content-type": "application/x-www-form-urlencoded",
        "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        "Referer": "https://fanyi.youdao.com/",
        "Cookie": "OUTFOX_SEARCH_USER_ID=11560287@1.1.1.1; OUTFOX_SEARCH_USER_ID_NCOO=1;"
    };

    
    const resp = await axios.post(url, m, { headers });
    const resp_text = resp.data;

    const a = Buffer.from(T(aeskey).toJSON().data);
    const n = Buffer.from(T(aesiv).toJSON().data);
    const r = createDecipheriv('aes-128-cbc', a, n);
    let l = r.update(resp_text, 'base64', 'utf-8');
    l += r.final('utf-8');

    const t = JSON.parse(l);
    console.log(t);
    return t.translateResult.map(item => item.tgt).join('');
}

async function youdaoTranslate(text, source_lang, target_lang) {
    try {
        const result = await Translate(text, source_lang, target_lang)
        return JSON.stringify({
            "model": "youdao",
            "raw": text,
            "text": result,
            "from": source_lang,
            "to": target_lang
        });

    } catch (error) {
        console.error('Youdao error:', error);
        return null;
    }
}

export { youdaoTranslate };