import { Client } from "@notionhq/client";
// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;

// Creates a client
//const translate = new Translate();

const translate = new Translate({
  projectId: process.env.GOOGLE_CLIENT_ID,
  keyFilename: process.env.GOOGLE_KEY_FILE,
});

function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function getPostData(page, content) {
  let body = "";

  //console.log(content.results);

  content?.results.forEach((result) => {
    if (result.type == "heading_1") {
      body += "# ";
    } else if (result.type == "heading_2") {
      body += "## ";
    } else if (result.type == "heading_3") {
      body += "### ";
    } else if (result.type == "bulleted_list_item") {
      body += "- ";
    } else if (result.type == "numbered_list_item") {
      body += "- ";
    }
    if (result[result.type].rich_text?.length > 0) {
      body += result[result.type].rich_text[0]?.plain_text;
    }

    body += "\n";
    if (result.type == "paragraph") {
      body += "\n";
    }
  });

  //console.log(body);

  //console.log(page.properties);

  const postData = {
    id: page.id,
    slug: createSlug(page.properties.Title.title[0].plain_text),
    title: page.properties.Title.title[0].plain_text,
    date: page.properties["Publish Time"].date.start, //page.created_time,
    image: page.properties["Main Image"].rich_text[0].plain_text.trim(),
    excerpt: page.properties.Summary.rich_text[0].plain_text,
    category: page.properties.Category.select.name,
    isFeatured: true,
    content: body,
  };

  return postData;
}

async function getNotionPagesNotTranslated(notion) {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const pages = [];

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Translate",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Done",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: "Publish Time",
        direction: "descending",
      },
    ],
  });

  for (const result of response.results) {
    const page = await getPostData(result, null, "en");
    pages.push(page);
  }

  return pages;
}

export default async function handler(req, res) {
  //   page:
  // {
  //   id: '943fc03b-f12b-45c8-a469-66f946224d31',
  //   slug: 'what-is-essential-oil',
  //   title: 'What is essential oil?',
  //   date: '2023-03-01',
  //   image: 'https://source.unsplash.com/1600x900/?essential,oil',
  //   excerpt: 'essential oils are highly concentrated oils derived from plants, with various uses and benefits. They can be used safely and effectively when used correctly and in moderation. With this comprehensive guide, you are now well-equipped to use essential oils in your daily life.',
  //   isFeatured: true,
  //   content: "Essential oils have been a topic of discussion for quite some time now. Whether it is the therapeutic benefits or the pleasant aroma, essential oils are widely used in today's world. However, not everyone is familiar with these oils, their properties, or their uses. In this article, we'll go over everything you need to know about essential oils, including their definition, extraction methods, uses, benefits, and safety concerns.\n" +
  //   ...
  // }
  //Retrive pages which needs to be translated
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const pages = await getNotionPagesNotTranslated(notion);

  //For each page, translate and create a new page in notion database.
  for (const page of pages) {
    const content = await notion.blocks.children.list({
      block_id: page.id,
    });

    // console.log(content);

    //   console.log("page: ");
    //   console.log(page);
    const titleKr = await translate.translate(page.title, "ko");
    //   console.log(titleKr[0]);
    const excerptKr = await translate.translate(page.excerpt, "ko");
    //   console.log(excerptKr[0]);
    //   const contentKr = await translate.translate(page.content, "ko");
    //   console.log(contentKr[0]);

    const contentKr = await Promise.all(
      content.results.map(async ({ object, type, ...rest }) => {
        const lastField = rest[type] ? rest[type] : null;

        // console.log(type);
        //console.log(lastField);

        const plainTextKr = await translate.translate(
          lastField.rich_text != undefined && lastField.rich_text[0]
            ? lastField.rich_text[0].plain_text
            : "",
          "ko"
        );

        return {
          object,
          type,
          [type]: {
            rich_text: [
              {
                text: {
                  content: plainTextKr[0],
                },
              },
            ],
          },
        };
      })
    );

    //console.log(contentKr);

    (async () => {
      const response = await notion.pages.create({
        parent: {
          type: "database_id",
          database_id: process.env.NOTION_DATABASE_ID_KR,
        },
        properties: {
          Title: {
            title: [
              {
                text: {
                  content: titleKr[0],
                },
              },
            ],
          },
          Summary: {
            rich_text: [
              {
                text: {
                  content: excerptKr[0],
                },
              },
            ],
          },
          "Main Image": {
            rich_text: [
              {
                text: {
                  content: page.image,
                },
              },
            ],
          },
          Category: {
            select: {
              name: page.category,
            },
          },
          "Publish Time": {
            date: {
              start: page.date,
              end: null,
              time_zone: null,
            },
          },
          Featured: {
            checkbox: page.isFeatured,
          },
          Slug: {
            rich_text: [
              {
                text: {
                  content: page.slug,
                },
              },
            ],
          },
        },
        children: contentKr,
      });
      console.log(response);
    })();
  }

  res.status(200).json({ result: "Success" });
}
