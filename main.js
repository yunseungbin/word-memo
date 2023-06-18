function handleNewMemoButtonClick() {
  window.location.href = "maintitle.html";
}

function handleMemoSectionClick(event) {
  const memoSection = event.currentTarget;
  const sectionId = memoSection.id.split("_")[1];
  const memoId = `memoSection_${sectionId}`;
  window.location.href = `wordlist.html?id=${memoId}`;
}

function handleDeleteButtonClick(event) {
  event.stopPropagation(); // Stop event propagation to prevent triggering handleMemoSectionClick

  if (confirm("정말로 삭제하시겠습니까?")) {
    const memoSection = event.currentTarget.parentElement;
    const memoTitle = memoSection.querySelector(".memo-title").innerText;
    const memoContent = memoSection.querySelector(".memo-content").innerText;

    const memoId = memoSection.id;
    const wordData = JSON.parse(localStorage.getItem("wordData"));
    const index = wordData.findIndex((item) => Object.keys(item)[0] === memoId);
    if (index !== -1) {
      wordData.splice(index, 1);
    }

    localStorage.setItem("wordData", JSON.stringify(wordData));

    const memoCount = localStorage.getItem("memoCount");
    for (let i = 1; i <= memoCount; i++) {
      const storedMemoTitle = localStorage.getItem(`memoTitle${i}`);
      const storedMemoContent = localStorage.getItem(`memoContent${i}`);
      if (memoTitle === storedMemoTitle && memoContent === storedMemoContent) {
        localStorage.removeItem(`memoTitle${i}`);
        localStorage.removeItem(`memoContent${i}`);
        localStorage.removeItem(`memoCreated${i}`);

        for (let j = i + 1; j <= memoCount; j++) {
          const nextMemoTitle = localStorage.getItem(`memoTitle${j}`);
          const nextMemoContent = localStorage.getItem(`memoContent${j}`);
          const nextMemoCreated = localStorage.getItem(`memoCreated${j}`);

          localStorage.setItem(`memoTitle${j - 1}`, nextMemoTitle);
          localStorage.setItem(`memoContent${j - 1}`, nextMemoContent);
          localStorage.setItem(`memoCreated${j - 1}`, nextMemoCreated);
        }
        break;
      }
    }
    if (memoCount) {
      const updatedMemoCount = Number(memoCount) - 1;
      localStorage.setItem("memoCount", updatedMemoCount);
    }

    memoSection.remove();
  }
}

const newMemoButton = document.getElementById("new-memo-button");
newMemoButton.addEventListener("click", handleNewMemoButtonClick);

function handleMainPageLoad() {
  const memoCount = localStorage.getItem("memoCount");
  const memoContainer = document.getElementById("memo-container");

  if (memoCount) {
    const sections = [];

    let wordData = JSON.parse(localStorage.getItem("wordData"));

    if (!wordData) {
      wordData = [];
    }

    for (let i = 1; i <= memoCount; i++) {
      const memoTitle = localStorage.getItem(`memoTitle${i}`);
      const memoContent = localStorage.getItem(`memoContent${i}`);
      const memoCreated = localStorage.getItem(`memoCreated${i}`);

      if (memoTitle && memoContent) {
        const memoSection = document.createElement("section");
        const sectionId = `memoSection_${i}`;

        memoSection.classList.add("memo-section");
        memoSection.id = sectionId;
        memoSection.innerHTML = `
          <h2 class="memo-title">${memoTitle}</h2>
          <p class="memo-content">${memoContent}</p>
          <div class="memo-created">${formatDate(memoCreated)}</div>
          <button class="delete-button">삭제</button>
        `;
        memoSection.addEventListener("click", handleMemoSectionClick);

        const deleteButton = memoSection.querySelector(".delete-button");
        deleteButton.addEventListener("click", handleDeleteButtonClick);

        memoSection.setAttribute("data-created", memoCreated);

        sections.push(memoSection);

        const sectionExists = wordData.some((item) =>
          item.hasOwnProperty(sectionId)
        );
        if (!sectionExists) {
          const wordDataItem = {};
          wordDataItem[sectionId] = [];
          wordData.push(wordDataItem);
        }
      }
    }

    sections.sort((a, b) => {
      const aCreated = parseInt(a.getAttribute("data-created"));
      const bCreated = parseInt(b.getAttribute("data-created"));
      return bCreated - aCreated;
    });

    sections.forEach((section) => {
      memoContainer.appendChild(section);
    });

    localStorage.setItem("wordData", JSON.stringify(wordData));
  }
}

function formatDate(timestamp) {
  const date = new Date(parseInt(timestamp));
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDate;
}

window.addEventListener("load", handleMainPageLoad);

function handleDeleteAllButtonClick() {
  if (confirm("주의!😈 로컬 저장소에 있던 모든 데이터가 사라집니다!")) {
    localStorage.clear();
    const memoContainer = document.getElementById("memo-container");
    memoContainer.innerHTML = "";
  }
}

const deleteAllButton = document.getElementById("delete-all-button");
deleteAllButton.addEventListener("click", handleDeleteAllButtonClick);
