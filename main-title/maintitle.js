// 메모 작성 폼 제출 시 실행되는 함수
function saveMemo(event) {
  event.preventDefault();

  // 메모 제목과 내용 가져오기
  const memoTitleInput = document.getElementById("memo-title");
  const memoContentInput = document.getElementById("memo-content");
  const memoTitle = memoTitleInput.value.trim();
  const memoContent = memoContentInput.value.trim();

  // 유효성 검사
  if (memoTitle === "" || memoContent === "") {
    return;
  }

  // 메모 저장 로직 구현
  // ...

  // 메인 페이지로 이동
  window.location.href = "./main/main.html";
}

// 메모 작성 폼 찾기
const memoForm = document.getElementById("memo-form");

// 메모 작성 폼
