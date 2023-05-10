import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import Container from "@/components/container";
import { getProfileNotionPages, getSymptomsList } from "@/lib/notion-util";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import OilsList from "@/components/oils-list";
import Image from "next/image";

export default function Recommendations({ symptoms, posts }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [recommendResult, setRecommendResult] = useState(null);
  const [recommendedOils, setRecommendedOils] = useState([]);
  const [recommendedBlends, setRecommendedBlends] = useState([]);
  const { t } = useTranslation("common");

  const physicalProblems = symptoms.filter(
    (symptom) => symptom.category === "Physical"
  );

  const mentalProblems = symptoms.filter(
    (symptom) => symptom.category === "Emotional"
  );

  const selectOils = (oils) => {
    const selectedOils = [];
    const noteCounts = { top: 0, middle: 0, base: 0 };

    for (const oil of oils) {
      if (selectedOils.length >= 3) {
        break;
      }
      if (noteCounts[oil.note] === 0) {
        selectedOils.push(oil);
        noteCounts[oil.note] = 1;
      }
    }

    //selectedOils의 길이가 3 미만인 경우, oils 배열에서 선택되지 않은 아이템들을 selectedOils에 추가해서 최대 3개가 되도록
    if (selectedOils.length < 3) {
      if (selectedOils.length < oils.length) {
        for (const oil of oils) {
          if (!selectedOils.includes(oil)) {
            selectedOils.push(oil);
            if (selectedOils.length === 3) {
              break;
            }
          }
        }
      }
    }

    return selectedOils;
  };

  const recommendEssentialOils = async (e) => {
    e.preventDefault();

    var chosenOils = [];

    setRecommendResult([]);
    setRecommendedBlends([]);

    selectedSymptoms.forEach((symptom) => {
      symptom.oils.forEach((oil) => {
        chosenOils.push(oil.id);
      });
    });

    console.log("chosenOils");
    console.log(chosenOils);

    const sortedOils = Object.entries(
      chosenOils.reduce((counts, oil) => {
        counts[oil] = (counts[oil] || 0) + 1;
        return counts;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .map(([oil]) => oil);

    console.log("sortedOils");
    console.log(sortedOils);

    const filteredPosts = posts
      .filter((post) => {
        return sortedOils.includes(post.id);
      })
      .sort((a, b) => sortedOils.indexOf(a.id) - sortedOils.indexOf(b.id))
      .map((filtereddOil) => {
        return {
          id: filtereddOil.id,
          title: filtereddOil.title,
          slug: filtereddOil.slug,
          note: filtereddOil.note,
          excerpt: filtereddOil.excerpt,
          symptoms: filtereddOil.symptoms.filter((symptom) => {
            return selectedSymptoms
              .map((selectedSymptom) => selectedSymptom.name)
              .includes(symptom);
          }),
        };
      });

    console.log(filteredPosts);

    setRecommendResult(filteredPosts);

    const selectedOils = selectOils(filteredPosts);
    setRecommendedBlends(selectedOils);
  };

  const handleSymptomClick = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms((prev) =>
        prev.filter((selected) => selected !== symptom)
      );
    } else {
      setSelectedSymptoms((prev) => [...prev, symptom]);
    }
  };

  const renderBlending = () => {
    let blending = "";
    const totalDrops = 6;
    let ratio = [3, 2, 1];
    if (recommendedBlends.length === 2) {
      ratio = [4, 2];
    } else if (recommendedBlends.length === 1) {
      ratio = [1];
    }
    // const ratio = recommendedBlends.length === 1 ? [totalDrops] : [3, 2, 1];
    let dropsLeft = totalDrops;
    // console.log("Render Blending");
    // console.log(recommendedBlends);
    for (let i = 0; i < recommendedBlends.length; i++) {
      const numDrops = Math.round(
        (ratio[i] / ratio.reduce((a, b) => a + b)) * totalDrops
      );
      if (i === recommendedBlends.length - 1) {
        blending += `${recommendedBlends[i].title} ${numDrops} ${t("drop")}`;
      } else {
        blending += `${recommendedBlends[i].title} ${numDrops} ${t("drop")}, `;
      }
      dropsLeft -= numDrops;
    }
    blending += `${t("blending_tail")}`;

    return (
      <>
        <br />
        <h2 className="flex justify-center">{t("blending_recommend")}</h2>
        <br />

        <p className="text-center">{blending}</p>
        <br />
        <div className="flex justify-center">
          <Image
            src={"/images/blending.jpg"}
            alt={"blending"}
            width={300}
            height={300}
            style={{ borderRadius: "10px" }}
          />
        </div>
        <br />
        <p className="text-center">{t("blending_tip_title")}</p>
        <br />
        <p className="text-center">{t("blending_tip")}</p>
        <br />
        <div class="text-3xl text-purple-500 text-center font-nanum-pen">
          {t("blending_outro")}
        </div>
      </>
    );
  };

  return (
    <Container>
      <h1 className="text-3xl font-semibold mb-6 text-center">
        {t("recommend_title")}
      </h1>
      <h3 className="text-md font-normal mb-6 text-center">
        {t("recommend_desc")}
      </h3>
      <div className="flex flex-col sm:flex-row">
        <div className="pr-4 py-2 sm:w-1/2">
          <h2 className="text-lg font-semibold mb-4 text-center">
            {t("physical_problems")}
          </h2>

          {physicalProblems.map((problem) => (
            <Disclosure key={problem.id}>
              <>
                <Disclosure.Button
                  className={`${
                    selectedSymptoms.includes(problem)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  } py-2 px-4 rounded-full mx-1 text-left mb-2 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
                  onClick={() => handleSymptomClick(problem)}
                >
                  {problem.name}
                </Disclosure.Button>
              </>
            </Disclosure>
          ))}
        </div>
        <div className="pr-4 py-2 sm:w-1/2">
          <h2 className="text-lg font-semibold mb-4 text-center">
            {t("mental_problems")}
          </h2>
          {mentalProblems.map((problem) => (
            <Disclosure key={problem.id}>
              <>
                <Disclosure.Button
                  className={`${
                    selectedSymptoms.includes(problem)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  } py-2 px-4 mx-1 rounded-full text-left mb-2 transition-colors duration-200 focus:outline-none focus:ring focus:ring-blue-500`}
                  onClick={() => handleSymptomClick(problem)}
                >
                  {problem.name}
                </Disclosure.Button>
              </>
            </Disclosure>
          ))}
        </div>
      </div>
      <div
        class="flex justify-center items-center flex-col m-16"
        onClick={recommendEssentialOils}
      >
        <button class="bg-pink-400 rounded-lg py-4 px-8 text-white text-xl block focus:outline-none focus:ring-pink-500 focus:ring-offset-2 transform hover:scale-105 active:scale-95 transition-all duration-100 ease-in-out">
          {t("recommend")}
        </button>
      </div>
      {recommendResult && <OilsList oils={recommendResult}></OilsList>}
      <br />

      {recommendedBlends.length > 0 && renderBlending()}
    </Container>
  );
}

export async function getStaticProps({ locale }) {
  const symptoms = await getSymptomsList(locale);
  // console.log(symptoms);
  const notionPages = await getProfileNotionPages(locale);
  return {
    props: {
      symptoms: symptoms,
      posts: notionPages,
      // preferred_oils: oils.join(","),
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 600,
  };
}
