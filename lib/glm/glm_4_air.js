async function glm_4_air_Translate(text, source_lang, target_lang) {
    try {
      const url = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
      const data = {
        model: "glm-4-air",
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
        "Authorization": `Bearer ${process.env.GLM_API_KEY}`,
      };
  
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      
      return JSON.stringify({
        model: "glm_4_air",
        raw: text,
        text: result.choices[0].message.content,
        from: source_lang,
        to: target_lang,
      });
    } catch (error) {
      console.error("glm_4_air error:", error);
      return null;
    }
  }

  export { glm_4_air_Translate };
  