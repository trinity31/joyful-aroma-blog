import { Client } from "@notionhq/client";

function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function getPostData(page, content, locale, symptoms) {
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

  // console.log(body);

  const postData = {
    id: page.id,
    slug: page.properties.Slug
      ? page.properties.Slug.rich_text[0].plain_text
      : createSlug(page.properties.Title.title[0].plain_text),
    title: page.properties.Title.title[0].plain_text,
    date: page.properties["Publish Time"].date.start, //page.created_time,
    image: page.properties["Main Image"].rich_text[0].plain_text.trim(),
    excerpt: page.properties.Summary?.rich_text[0]?.plain_text,
    isFeatured: true,
    content: body,
    locale: locale,
    note: page.properties.Note.select
      ? page.properties.Note.select.name
      : "middle",
    symptoms: symptoms,
  };

  return postData;
}

// export async function getNotionPage(pageId) {
//   const notion = new Client({ auth: process.env.NOTION_API_KEY });
//   const response = await notion.pages.retrieve({ page_id: pageId });

//   const content = await notion.blocks.children.list({
//     block_id: pageId,
//   });
//   const postData = await getPostData(response, content);
//   // console.log("postData:");
//   //console.log(postData);
//   return postData;
// }

export async function getNotionPage(slug, locale) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const databaseId =
    locale == "ko"
      ? process.env.NOTION_DATABASE_ID_KR
      : process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
      ],
    },
  });

  const content = await notion.blocks.children.list({
    block_id: response.results[0].id,
  });
  const postData = await getPostData(
    response.results[0],
    content,
    locale,
    null
  );

  return postData;
}

export async function getAllNotionPages(locale) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const databaseId =
    locale == "ko"
      ? process.env.NOTION_DATABASE_ID_KR
      : process.env.NOTION_DATABASE_ID;

  const pages = [];

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
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
    pages.push(await getPostData(result, null, locale, null));
  }

  //console.log(pages);

  return pages;
}

export async function getFeaturedNotionPages(locale) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const pages = [];

  const databaseId =
    locale == "ko"
      ? process.env.NOTION_DATABASE_ID_KR
      : process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Done",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Featured",
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
    pages.push(await getPostData(result, null, locale, null));
  }

  // console.log("pages:");
  // console.log(pages);

  return pages;
}

export async function getAboutNotionPages(locale) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const pages = [];

  const databaseId =
    locale == "ko"
      ? process.env.NOTION_DATABASE_ID_KR
      : process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Done",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Category",
          select: {
            equals: "about",
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
    // const content = await notion.blocks.children.list({
    //   block_id: result.id,
    // });
    pages.push(await getPostData(result, null, locale, null));
  }

  return pages;
}

export async function getProfileNotionPages(locale) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const pages = [];

  const databaseId =
    locale == "ko"
      ? process.env.NOTION_DATABASE_ID_KR
      : process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Done",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Category",
          select: {
            equals: "profile",
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
    pages.push(await getPostData(result, null, locale, null));
  }

  return pages;
}

export async function getNotCompletedProfileNotionPages(locale) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const pages = [];

  const databaseId =
    locale == "ko"
      ? process.env.NOTION_DATABASE_ID_KR
      : process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Done",
          checkbox: {
            equals: false,
          },
        },
        {
          property: "Category",
          select: {
            equals: "profile",
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
    const symptoms = [];
    for (const item of result.properties.Symptoms.relation) {
      const symptom = await getRelatedSymptom(item.id);
      symptoms.push(symptom);
    }

    pages.push(await getPostData(result, null, locale, symptoms));
  }

  return pages;
}

async function getRelatedSymptom(pageId) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const response = await notion.pages.retrieve({ page_id: pageId });
  // console.log(response.properties.Name.title[0].text.content);
  return response.properties.Name.title[0].text.content;
}

export async function getSymptomsList(locale) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const symptons = [];

  const databaseId =
    locale == "ko"
      ? process.env.NOTION_DATABASE_ID_SYMPTOMS_KR
      : process.env.NOTION_DATABASE_ID_SYMPTOMS;

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  for (const result of response.results) {
    // console.log(result);
    symptons.push({
      id: result.id,
      name: result.properties.Name.title[0].plain_text,
      category: result.properties.Category.select.name,
      oils: result.properties.oils.relation,
    });
  }

  return symptons;
}

export async function getOilsList(locale) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const oils = [];

  const databaseId =
    locale == "ko"
      ? process.env.NOTION_DATABASE_ID_KR
      : process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Done",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Category",
          select: {
            equals: "profile",
          },
        },
      ],
    },
  });

  for (const result of response.results) {
    oils.push(result.properties.Title.title[0].plain_text);
  }

  return oils;
}
