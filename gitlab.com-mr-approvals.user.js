// ==UserScript==
// @name         GitLab MR approval count
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  GitLab show merge request approvals count and own status in list view
// @author       CodeBrauer
// @match        https://gitlab.com/*/-/merge_requests*
// @run-at       document-idle
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gitlab.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  setTimeout(function () {
    document.querySelectorAll("li.merge-request").forEach(function (row) {
      let author = row.querySelector("span.author").innerText.trim();
      let ownUserName =
        document
          .querySelector(".header-user .header-user-avatar")
          ?.getAttribute("alt")
          .trim() ??
        document
          .querySelector(".header-user .header-user-avatar")
          ?.getAttribute("alt")
          .trim() ??
        "";

      console.log(author, ownUserName);

      if (author === ownUserName) {
        // own MR & no approvals = violetish
        row.style.backgroundColor = "#ff00ff18";
        row.dataset.ownMr = "true";
      }
    });

    document
      .querySelectorAll(".issuable-meta [title*=approv]")
      .forEach(function (row) {
        let approvals = row.getAttribute("title");
        let approvalsCount = approvals.match(/\d+/)[0];

        row.innerHTML = row.innerHTML.replace(
          "Approved",
          row.getAttribute("title")
        );
        if (approvalsCount < 2) {
          row.classList.remove("text-success");
          row.classList.add("text-warning");
        } else if (approvalsCount >= 2) {
          if (row.closest("li.merge-request").dataset.ownMr == "true") {
            // own merge request + approved = brigher green
            row.closest("li.merge-request").style.backgroundColor = "#007f0080";
          } else {
            // others MRs approved = greenish
            row.closest("li.merge-request").style.backgroundColor = "#007f0040";
          }
        }
      });
  }, 1000);
})();
