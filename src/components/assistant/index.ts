import { Octokit } from "octokit";
import van, { State } from "vanjs-core";
import { routeTo } from "vanjs-router";

const { div, h3 } = van.tags;

const initialize = (octokitState: State<Octokit | null>) => {
  const code = new URLSearchParams(location.search).get("code");
  if (code) {
    fetch(
      `https://script.google.com/macros/s/AKfycbxLRrEYZIYSegHNbwMVXpX9FaEFhoJv0MkXyj5DeAn_fr3oJVlimSRCyFULjd2QvhVK/exec?code=${code}&mode=${import.meta.env.MODE}`,
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
        window.history.pushState({}, "", document.location.href.split("?")[0]);
        routeTo("assistant");
      })
      .catch((error) => {
        console.error("Error exchanging code for access token:", error);
      });
  }
};

const fetchHeader = {
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
};

export const Assistant = () => {
  const octokitState = van.state<Octokit | null>(null);
  initialize(octokitState);
  const user: State<any> = van.derive(() =>octokitState.val
  ? octokitState.val
    .request("GET /user", fetchHeader)
    .then((_) => (user.val = _))
  : {});

  return div(h3("user name"), () => {
    console.log("user.val", user.val);
    return div(`ID: ${user.val?.data?.login ?? "..."}`);
  });
};

