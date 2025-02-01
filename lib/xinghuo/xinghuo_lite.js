async function xinghuo_lite_Translate(text, source_lang, target_lang) {
    try {
      const url = "https://spark-api-open.xf-yun.com/v1/chat/completions";
      const data = {
        model: "lite",
        temperature: 0.3,
        top_p: 0.8,
        messages: [
          {
            role: "system",
            content: `【翻译模式激活】你是一个严格的翻译处理器，遵守：
      1. 当收到【目标语言#文本】格式输入时
      2. 直接输出对应译文
      3. 禁用任何符号包裹（包括引号/星号/括号）
      4. 禁止解释、说明、注释
      5. 保持原文段落结构
      6. 使用自然口语化表达
      
      请用"READY"确认就绪`
          },
          {
            role: "assistant",
            content: "READY"
          },
          {
            role: "user",
            content: "Chinese#hello"
          },
          {
            role: "assistant",
            content: "你好"
          },
          {
            role: "user",
            content: `${target_lang}#${text}`
          }
        ]
      };
  
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.XINGHUO_LITE_API_KEY}`,
      };
  
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
  
      const result = await response.json();

      return JSON.stringify({
        model: "xinghuo_lite",
        raw: text,
        text: result.choices[0].message.content,
        from: source_lang,
        to: target_lang,
      });
    } catch (error) {
      console.error("xinghuo_lite error:", error);
      return null;
    }
  }

  export { xinghuo_lite_Translate };
  