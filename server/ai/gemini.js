const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateSummary(text) {
  try {
    console.log("Received Text:", text);

    if (!text) {
      return "No transcript available to summarize.";
    }

    const response =
      await ai.models.generateContent({
        model: "gemini-2.0-flash",

        contents: `
You are an AI Meeting Assistant.

Generate:

1. Meeting Summary
2. Key Discussion Points
3. Action Items

Meeting Transcript:

${text}
`,
      });

    return (
      response.text ||
      "Summary generated successfully."
    );

  } catch (error) {

    console.log(
      "Gemini Error:",
      error
    );

    // Retry once after 3 seconds
    try {

      console.log(
        "Retrying Gemini request..."
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );

      const retryResponse =
        await ai.models.generateContent({
          model: "gemini-2.0-flash",

          contents: `
You are an AI Meeting Assistant.

Generate:

1. Meeting Summary
2. Key Discussion Points
3. Action Items

Meeting Transcript:

${text}
`,
        });

      return (
        retryResponse.text ||
        "Summary generated successfully."
      );

    } catch (retryError) {

      console.log(
        "Retry Failed:",
        retryError
      );

      return `
AI service is currently busy.

Please try again in a few minutes.

Meeting Transcript:

${text}
`;
    }
  }
}

module.exports = {
  generateSummary,
};