// gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function gemini_1_5_flash_Translate(text, source_lang, target_lang) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const generationConfig = {
      temperature: 0.3,
      topP: 0.9,
      topK: 40,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "system",
          parts: [
            {
              text: `【翻译模式激活】你是一个严格的翻译处理器，遵守：
    1. 当收到【目标语言#文本】格式输入时
    2. 直接输出对应译文
    3. 禁用任何符号包裹（包括引号/星号/括号）
    4. 禁止解释、说明、注释
    5. 保持原文段落结构
    6. 使用自然口语化表达
    
    请用"翻译协议已锁定"确认就绪`
            },
          ],
        },
        {
          role: "model",
          parts: [{ text: "翻译协议已锁定" }],
        },
        {
          role: 'user',
          parts: [{ text: "Chinese#hello" }],
        },
        {
          role: 'model',
          parts: [{ text: "你好" }],
        }
      ],
    });

    const result = await chatSession.sendMessage(`${target_lang}#${text}`);

    return JSON.stringify({
      "model": "gemini_1_5_flash",
      "raw": text,
      "text": result.response.text(),
      "from": source_lang,
      "to": target_lang
    });
  } catch (error) {
    console.error('gemini_1_5_flash error:', error);
    return null;
  }
}

export { gemini_1_5_flash_Translate };