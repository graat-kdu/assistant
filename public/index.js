import van from "./van-1.2.8.min.js";

const { h1, div, input, button, label } = van.tags;

const userId = input();
const passWd = input({ type: "password" });

const App = () =>
  div(
    { style: "display: flex; flex-direction: column;" },
    h1("LOGIN FORM"),
    label("USERID", userId),
    label("PWSSWD", passWd),
    button(
      {
        onclick: () => {
          if (userId.value && passWd.value) {
            window.location.href = `https://github.com/login/oauth/authorize?client_id=857606a0ee5b1bb8ed9c&scope=${userId.value}:${passWd.value}&redirect_uri=https://graat-kdu.github.io/assistant/assistant.html`;
          } else {
            alert("ユーザーIDまたはPASSWORDが未入力。");
          }
        },
      },
      "LOGIN"
    )
  );

van.add(document.body, App());
