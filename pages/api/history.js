import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  const { blending, symptoms, oils, locale } = req.body;
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const databaseIdTo = process.env.NOTION_DATABASE_ID_RECOMM;

  (async () => {
    const response = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: databaseIdTo,
      },
      properties: {
        Blending: {
          title: [
            {
              text: {
                content: blending.map((oil) => oil.title).join(","),
              },
            },
          ],
        },
        Symptoms: {
          multi_select: symptoms.map((symptom) => {
            return {
              name: symptom.name,
            };
          }),
        },
        Oils: {
          multi_select: oils.map((oil) => {
            return {
              name: oil.title,
            };
          }),
        },
        Date: { date: { start: new Date().toISOString() } },
        Locale: {
          select: {
            name: locale,
          },
        },
      },
    });
    //console.log(response);
  })();

  res.status(200).json({ result: "Success" });
}
