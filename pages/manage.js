import React from "react"; //importing React library

const ManagePage = () => {
  const onClick = async () => {
    const response = await fetch("/api/translate");
    const data = await response.json();
    //console.log(data);
  };

  return (
    <div
      class="flex justify-center items-center flex-col m-16 "
      onClick={() => onClick()}
    >
      <p class="text-lg mb-8 ph-16">
        <a
          href="https://www.notion.so/0c5b7e72df264d7ca3678c0b5f165ea8?v=30f0272a15b44cc980bbd6ef94bd0dbf"
          class="text-blue-500"
        >
          이 데이터베이스
        </a>
        항목 중 Translate 이 체크된 항목들에 대해 타이틀,요약,페이지 본문을
        한국어로 번역해서 아래의{" "}
        <a
          href="https://www.notion.so/a06f9eb3d9bd454d93ee036c03c34a32?v=934d2286456b49a99526371028aa4f60"
          class="text-blue-500"
        >
          한국어 테이블
        </a>
        에 새 항목을 생성합니다. 이미 번역된 항목이 있는 경우 새로 생성됩니다.
      </p>
      <button class="bg-pink-400 rounded-lg py-4 px-8 text-white text-xl block focus:outline-none focus:ring-pink-500 focus:ring-offset-2 transform hover:scale-105 active:scale-95 transition-all duration-100 ease-in-out">
        Translate
      </button>
    </div>
  );
};

export default ManagePage;
