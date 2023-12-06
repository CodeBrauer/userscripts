// ==UserScript==
// @name         Datadog Show organization in page title
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Elevate your Datadog experience by displaying your organization in the page title. Join forces with your team and conquer the monitoring world!
// @author       CodeBrauer
// @match        https://app.datadoghq.eu/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=datadoghq.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  "use strict";
  function waitForElm(selector) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver((mutations) => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }

  waitForElm(".dd-toolbar__page-title").then((elm) => {
    let orga = document.querySelector(
      ".single-page-app_navbar_bottom-nav__user-settings-item .druids_typography_text--xs"
    ).innerText;
    let orgaEmoji = "";
    if (orga.includes("XXXXXX")) {
      orgaEmoji = "🇩🇪";
    } else if (orga.includes("XXXXXX")) {
      orgaEmoji = "🇪🇸";
    } else if (orga.includes("XXXXXX")) {
      orgaEmoji = "🇨🇭";
    }
    let appendOrga = " " + orgaEmoji + " [" + orga + "]";
    document.querySelector(".dd-toolbar__page-title").innerHTML += appendOrga;
    setTimeout(function () {
      document.title += appendOrga;
    }, 1000);
  });
})();
