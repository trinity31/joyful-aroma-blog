const { Configuration, OpenAIApi } = require("openai");

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  let prompt = "";

  if (req.body.type == "symptoms") {
    prompt = `
    Please recommend one each of the essential oils of Top note, Middle note, and Base note that help relieve symptoms such as ${req.body.symptoms}. 
    Please select one of the following oils first.
    ${req.body.preferred_oils}}
    Brief description of benefits of each oils should be included.
    Next, recommend a way to blend the 3 oils for topical application. How many drops of each of the three oils should be added to 10 ml of base oil?
    Total amount of oils should be 6 to 8 drops. 
    Please answer in json format in following format.
    "name" and "benefits" should be written in ${req.body.locale} language. 
{
        "oils": [
          {
            "note": "top",
            "name": "Ginger",
            "benefits": "Ginger oil is known for its anti-inflammatory and analgesic properties, which can help to reduce inflammation and pain associated with menstrual cramps."
          },
          {
            "note": "middle",
            "name": "Clary Sage",
            "benefits": "Clary sage oil has antispasmodic and sedative properties that can help to relax the uterus and reduce menstrual cramps."
          },
          {
            "note": "base",
             "name": "Marjoram",
            "benefits": "Marjoram oil is known for its anti-inflammatory and analgesic properties, which can help to reduce inflammation and pain associated with menstrual cramps."
          }
          ],
        "blending": {
            "top": {
                "name": "Ginger",
                "drops": 2
            },
            "middle": {
                "name": "Clary Sage",
                "drops": 2
            },
            "base": {
                "name": "Marjoram",
                "drops": 2
            },
            "base oil": {
                "name": "Coconut oil",
                "ml": 10
            }
        }
    }
    `;
  }

  console.log(prompt);

  if (req.body.type == "image") {
    try {
      const response = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
      });
      //console.log(response);
      const image_url = response.data.data[0].url;
      if (response.status == "200") {
        console.log("Successfully generated image: ");
        console.log(image_url);
        res.status(200).json({ result: "Success", data: image_url });
      } else {
        console.log("Failed to generate image.");
        console.log(response.data.error);
        res
          .status(response.status)
          .json({ result: "Fail", data: response.data.error });
      }
    } catch (error) {
      console.log("Error catched during image generation.");
      console.log(error);
    }
  } else {
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
}
