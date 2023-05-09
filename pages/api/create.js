const { Configuration, OpenAIApi } = require("openai");

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  let prompt = "";

  if (req.body.type == "contents") {
    prompt = `
    Write a blog article about ${req.body.name} Essential Oil".
Write a long blog article around 1500 words in markdown format, and include subtitles and detail description. and do not include main title and conclusion. 
Article should include introduction, history, Benefits, Usage and Precautions. 
Benefits should include:  ${req.body.symptoms}
    `;
  } else if (req.body.type == "summary") {
    prompt = `
    ${req.body.content}
    Summarize above blog article above within 500 words. and I want you to only reply in text and nothing else. 
    Do not write explanations. Summary should only include brief explain and benefits of oil.
    `;
  }

  console.log(prompt);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 2000,
  });

  if (response.status == "200") {
    console.log("Successfully fetched response.");
    console.log(response.data.choices);
    res
      .status(200)
      .json({ result: "Success", data: response.data.choices[0].text });
  } else {
    res.status(response.status).json({ result: "Fail" });
  }
}
