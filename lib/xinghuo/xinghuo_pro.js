async function xinghuo_pro_Translate(text, source_lang, target_lang) {
    try {
      const url = "https://spark-api-open.xf-yun.com/v1/chat/completions";
      const data = {
        model: "generalv3",
        messages: [
          {
            role: "user",
            content: "You are a professional translation engine, please translate the text into a colloquial, professional, elegant and fluent content, without the style of machine translation. You must only translate the text content, never interpret it.",
          },
          {
            role: "assistant",
            content: "Ok, I will only translate the text content, never interpret it.",
          },
          {
            role: "user",
            content: `Translate into Chinese """hello"""`,
          },
          {
            role: "assistant",
            content: "你好",
          },
          {
            role: "user",
            content: `Translate into ${target_lang} """${text}"""`,
          },
        ]
      };
  
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.XINGHUO_PRO_API_KEY}`,
      };
  
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      
      return JSON.stringify({
        model: "xinghuo_pro",
        raw: text,
        text: result.choices[0].message.content,
        from: source_lang,
        to: target_lang,
      });
    } catch (error) {
      console.error("xinghuo_pro error:", error);
      return null;
    }
  }

  export { xinghuo_pro_Translate };
  