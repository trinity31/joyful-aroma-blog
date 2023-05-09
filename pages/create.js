import Select from "react-select";
import { useState, useEffect } from "react";
import Container from "@/components/container";
import { TextField } from "@mui/material";
import Image from "next/image";
import {
  getNotCompletedProfileNotionPages,
  getProfileNotionPages,
} from "@/lib/notion-util";

export default function CreatePage(props) {
  const [selectedOil, setSelectedOil] = useState(null);
  const [oils, setOils] = useState([]);
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const oils = props.posts.map((post) => ({
      ...post,
      value: post.title,
      label: post.title,
    }));
    console.log(oils);
    setOils(oils);
  }, []);

  const getOilContents = async (e) => {
    e.preventDefault();

    console.log(selectedOil);

    const data = {
      name: selectedOil.title,
      symptoms: selectedOil.symptoms.join(", "),
      type: "contents",
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("/api/create", options);
    const resultData = await response.json();
    console.log(resultData.data);

    setContent(resultData.data);
  };

  const getOilSummary = async (e) => {
    e.preventDefault();

    const data = {
      content: content,
      type: "summary",
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("/api/create", options);
    const resultData = await response.json();
    console.log(resultData.data);

    setSummary(resultData.data);
  };

  return (
    <Container>
      <form>
        <div className="flex flex-col items-center justify-center p-8">
          <Select
            value={selectedOil}
            onChange={setSelectedOil}
            options={oils}
            className="w-full mb-4"
            placeholder="Select an Oil"
          />
          <button
            className="px-4 py-2 rounded bg-gray-700 text-white font-bold"
            type="submit"
            onClick={getOilContents}
          >
            Generate Contents
          </button>
        </div>
        <div className="flex flex-col items-center justify-center p-8">
          <textarea
            className="h-80 w-full resize-none p-4 mb-4 border border-gray-400 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className="px-4 py-2 rounded bg-gray-700 text-white font-bold"
            type="submit"
            onClick={getOilSummary}
          >
            Get Summary
          </button>
          <textarea
            className="h-80 w-full resize-none p-4 mb-4 border border-gray-400 rounded"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
      </form>
    </Container>
  );
}

export async function getStaticProps({ locale }) {
  const notionPages = await getNotCompletedProfileNotionPages(locale);
  console.log(notionPages);
  return {
    props: {
      posts: notionPages,
    },
    revalidate: 600,
  };
}
