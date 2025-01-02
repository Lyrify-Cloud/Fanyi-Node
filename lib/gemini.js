import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function geminiTranslate(text, source_lang, target_lang) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "You are a professional translation engine, please translate the text into a colloquial, professional, elegant and fluent content, without the style of machine translation. You must only translate the text content, never interpret it.",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: 'Ok, I will only translate the text content, never interpret it.',
            },
          ],
        },
        {
          role: 'user',
          parts: [
            {
              text: `Translate into Chinese\n"""\nhello\n"""`,
            },
          ],
        },
        {
          role: 'model',
          parts: [
            {
              text: '你好',
            },
          ],
        },
        {
          role: 'user',
          parts: [
            {
              text: `Translate into ${target_lang}\n"""\n${text}\n"""`,
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    return JSON.stringify({
      "model": "gemini",
      "raw": text,
      "text": result.response.text(),
      "from": source_lang,
      "to": target_lang
    });
  } catch (error) {
    console.error('gemini error:', error);
    return null;
  }
}

export { geminiTranslate };