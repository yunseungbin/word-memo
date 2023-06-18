// 단어 삭제 기능
const wordListItems = document.getElementById("word-list-items");
wordListItems.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("delete-button")) {
    let del = confirm("정말 삭제 하시겠습니까?");
    if (!del) return;
    const listItem = target.closest("li");
    listItem.remove();
  }
});

// 단어 수정 기능
wordListItems.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("edit-button")) {
    const listItem = target.closest("li");
    const wordElement = listItem.querySelector(".word");
    const meaningElement = listItem.querySelector(".meaning");
    const wordInput = document.createElement("input");
    const meaningInput = document.createElement("input");
    const saveButton = document.createElement("button");

    wordInput.type = "text";
    meaningInput.type = "text";
    wordInput.value = wordElement.textContent;
    meaningInput.value = meaningElement.textContent;
    saveButton.textContent = "저장";
    saveButton.classList.add("save-button");

    // 영어와 특수문자만 입력되도록 제한하는 코드
    const onlyEnglishAndSpecialChars =
      /^[a-zA-Z\s\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\|\;\:\'\"\,\<\.\>\/\?\`\~]*$/;
    wordInput.addEventListener("input", function (event) {
      const inputText = event.target.value;
      if (!onlyEnglishAndSpecialChars.test(inputText)) {
        event.target.value = inputText.replace(
          /[^a-zA-Z\s\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\|\;\:\'\"\,\<\.\>\/\?\`\~]/g,
          ""
        );
      }
    });

    listItem.replaceChildren(wordInput, meaningInput, saveButton);

    saveButton.addEventListener("click", () => {
      const updatedWord = wordInput.value.trim();
      const updatedMeaning = meaningInput.value.trim();

      if (updatedWord === "" || updatedMeaning === "") {
        return;
      }

      const newWordElement = document.createElement("div");
      const newMeaningElement = document.createElement("div");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      newWordElement.classList.add("word");
      newMeaningElement.classList.add("meaning");
      editButton.classList.add("edit-button");
      deleteButton.classList.add("delete-button");

      newWordElement.textContent = updatedWord;
      newMeaningElement.textContent = updatedMeaning;
      editButton.textContent = "수정";
      deleteButton.textContent = "삭제";

      const actionsElement = document.createElement("div");
      actionsElement.classList.add("actions");
      actionsElement.appendChild(editButton);
      actionsElement.appendChild(deleteButton);

      listItem.replaceChildren(
        newWordElement,
        newMeaningElement,
        actionsElement
      );
    });
  }
});

// 단어 추가 기능
const wordForm = document.getElementById("word-form");
wordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const wordInput = document.getElementById("word-input");
  const meaningInput = document.getElementById("meaning-input");
  const wordValue = wordInput.value.trim();
  const meaningValue = meaningInput.value.trim();

  if (wordValue === "" || meaningValue === "") {
    return;
  }

  const listItem = document.createElement("li");
  const wordElement = document.createElement("div");
  const meaningElement = document.createElement("div");
  const actionsElement = document.createElement("div");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  listItem.classList.add("word-list-item");
  wordElement.classList.add("word");
  meaningElement.classList.add("meaning");
  actionsElement.classList.add("actions");
  editButton.classList.add("edit-button");
  deleteButton.classList.add("delete-button");

  wordElement.textContent = wordValue;
  meaningElement.textContent = meaningValue;
  editButton.textContent = "수정";
  deleteButton.textContent = "삭제";

  actionsElement.appendChild(editButton);
  actionsElement.appendChild(deleteButton);

  listItem.appendChild(wordElement);
  listItem.appendChild(meaningElement);
  listItem.appendChild(actionsElement);

  wordListItems.appendChild(listItem);

  wordInput.value = "";
  meaningInput.value = "";
});

// 영어와 특수문자만 입력되도록 제한하는 코드
const wordInput = document.getElementById("word-input");

wordInput.addEventListener("input", function (event) {
  const inputText = event.target.value;
  const onlyEnglishAndSpecialChars =
    /^[a-zA-Z\s\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\|\;\:\'\"\,\<\.\>\/\?\`\~]*$/;

  if (!onlyEnglishAndSpecialChars.test(inputText)) {
    event.target.value = inputText.replace(
      /[^a-zA-Z\s\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\|\;\:\'\"\,\<\.\>\/\?\`\~]/g,
      ""
    );
  }
});

const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", () => {
  const wordListItems = document.querySelectorAll("#word-list-items li");
  const wordData = JSON.parse(localStorage.getItem("wordData"));
  const urlParams = new URLSearchParams(window.location.search);
  const memoId = urlParams.get("id");
  const wordDataItem = wordData.find((item) => Object.keys(item)[0] === memoId);

  wordDataItem[memoId] = [];
  const wordList = wordDataItem[memoId];

  wordListItems.forEach((item) => {
    const wordElement = item.querySelector(".word");
    const meaningElement = item.querySelector(".meaning");

    const word = wordElement.textContent;
    const meaning = meaningElement.textContent;

    wordList.push({ word, meaning });
  });

  localStorage.setItem("wordData", JSON.stringify(wordData));
  alert("저장되었습니다!");
  window.location.href = "main.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const wordData = localStorage.getItem("wordData");
  if (wordData) {
    const parsedWordData = JSON.parse(wordData);
    const urlParams = new URLSearchParams(window.location.search);
    const memoId = urlParams.get("id");

    parsedWordData.forEach((item) => {
      if (Object.keys(item)[0] === memoId) {
        const memoData = item[memoId];
        memoData.forEach((wordItem) => {
          const listItem = createWordListItem(wordItem.word, wordItem.meaning);
          wordListItems.appendChild(listItem);
        });
      }
    });
  }
});

function createWordListItem(word, meaning) {
  const listItem = document.createElement("li");
  const wordElement = document.createElement("div");
  const meaningElement = document.createElement("div");
  const actionsElement = document.createElement("div");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  listItem.classList.add("word-list-item");
  wordElement.classList.add("word");
  meaningElement.classList.add("meaning");
  actionsElement.classList.add("actions");
  editButton.classList.add("edit-button");
  deleteButton.classList.add("delete-button");

  wordElement.textContent = word;
  meaningElement.textContent = meaning;
  editButton.textContent = "수정";
  deleteButton.textContent = "삭제";

  actionsElement.appendChild(editButton);
  actionsElement.appendChild(deleteButton);

  listItem.appendChild(wordElement);
  listItem.appendChild(meaningElement);
  listItem.appendChild(actionsElement);

  return listItem;
}
