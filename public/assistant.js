import { Octokit } from "https://esm.sh/@octokit/rest@v20";
import van from "./van-1.2.8.min.js";

const { div, h3 } = van.tags;

const initialize = (octokitState) => {
  const code = new URLSearchParams(location.search).get("code");
  fetch(
    `https://script.google.com/macros/s/AKfycbxEXKhGm4fngLfaz5q5TB7PeQpbhyo20fMkquz0-5rIVBLkRDTRLTfurbLpkMqdbtX2/exec?code=${code}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
    .then((response) => response.text())
    .then(async (auth) => {
      octokitState.val = new Octokit({ auth });
    })
    .catch((error) => {
      console.error("Error exchanging code for access token:", error);
    });
};

const fetchHeader = {
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
};

const App = () => {
  const octokitState = van.state(null);
  initialize(octokitState);
  const user = van.derive(() =>
    octokitState.val
      ? octokitState.val
          .request("GET /user", fetchHeader)
          .then((_) => (user.val = _))
      : {}
  );

  return div(h3("user name"), () => {
    console.log("user.val", user.val);
    return div(`ID: ${user.val?.data?.login ?? "..."}`);
  });
};

van.add(document.body, App());
