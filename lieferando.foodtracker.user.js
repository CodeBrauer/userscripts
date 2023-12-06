// ==UserScript==
// @name         Lieferando show foodtracker time left in tab title
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Adds a sprinkle of excitement to your food tracking experience on Lieferando by displaying the remaining time in the tab title. Never lose track of your eagerly awaited meal again!
// @author       CodeBrauer
// @match        https://www.lieferando.de/foodtracker/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lieferando.de
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function updatePageTitle() {
    const waitingTimeElement = document.querySelector(
      "#scoober-tracker svg tspan"
    );
    const messageElement = document.querySelector(
      "#scoober-tracker h1:nth-child(1)"
    );

    if (waitingTimeElement) {
      const waitingTimeMinutes = parseInt(waitingTimeElement.innerHTML);
      if (!isNaN(waitingTimeMinutes)) {
        const eta = new Date(
          Date.now() + waitingTimeMinutes * 60000
        ).toLocaleTimeString("de", { timeStyle: "short" });
        let title = `${waitingTimeMinutes} min (${eta})`;

        if (messageElement) {
          title += ` - ${messageElement.innerText}`;
        }

        document.title = "🛵 " + title;
      }
    }
  }

  setInterval(updatePageTitle, 10 * 1000);
  updatePageTitle();
})();
