import van from "vanjs-core";

const { h1, div, input, button, label } = van.tags;

const userId = input();
const passWd = input({ type: "password" });

export const Login = () => {
  return div(
    { style: "display: flex; flex-direction: column;" },
    h1("LOGIN FORM"),
    label("USERID", userId),
    label("PWSSWD", passWd),
    button(
      {
        onclick: () => {
          if (userId.value && passWd.value) {
            const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
            const client_id = import.meta.env.VITE_CLIENT_ID;
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${userId.value}:${passWd.value}&redirect_uri=${redirect_uri}`;
          } else {
            alert("ユーザーIDまたはPASSWORDが未入力。");
          }
        },
      },
      "LOGIN"
    )
  );
}