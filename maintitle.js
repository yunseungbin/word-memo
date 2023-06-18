// maintitle.js

function handleMemoFormSubmit(event) {
  event.preventDefault();

  const memoTitleInput = document.getElementById("memo-title");
  const memoContentInput = document.getElementById("memo-content");
  const memoTitle = memoTitleInput.value.trim();
  const memoContent = memoContentInput.value.trim();
  const memoCreated = Date.now(); // 현재 시간을 milliseconds로 저장

  if (memoTitle && memoContent) {
    let memoCount = localStorage.getItem("memoCount");

    if (!memoCount) {
      memoCount = 0;
    }

    const newMemoTitleKey = `memoTitle${Number(memoCount) + 1}`;
    const newMemoContentKey = `memoContent${Number(memoCount) + 1}`;
    const newMemoCreatedKey = `memoCreated${Number(memoCount) + 1}`; // memoCreated 저장을 위한 키 추가

    localStorage.setItem(newMemoTitleKey, memoTitle);
    localStorage.setItem(newMemoContentKey, memoContent);
    localStorage.setItem(newMemoCreatedKey, memoCreated); // memoCreated 저장

    localStorage.setItem("memoCount", Number(memoCount) + 1);

    window.location.href = "main.html";
  }
}

const memoForm = document.getElementById("memo-form");
memoForm.addEventListener("submit", handleMemoFormSubmit);
