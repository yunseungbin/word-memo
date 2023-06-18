const $text = document.querySelector("#typing");
const letters = [
  "승비니 영어단어장 \n 에 오신걸 진심으로 환영합니다!~",
  "Welcome to \n Seung Bin's English vocabulary book!~",
];
const speed = 100;
let i = 0;
const changeLineBreak = (letter) => {
  return letter.map((text) => (text === "\n" ? "<br>" : text));
};
const typing = async () => {
  const letter = changeLineBreak(letters[i].split(""));
  while (letter.length) {
    await wait(speed);
    $text.innerHTML += letter.shift();
  }
  await wait(1000);
  remove();
};
const remove = async () => {
  const letter = changeLineBreak(letters[i].split(""));

  while (letter.length) {
    await wait(speed);

    letter.pop();
    $text.innerHTML = letter.join("");
  }
  i = !letters[i + 1] ? 0 : i + 1;
  typing();
};
function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
setTimeout(typing, 500);
