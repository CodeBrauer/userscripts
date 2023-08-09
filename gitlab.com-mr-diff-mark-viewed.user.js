// ==UserScript==
// @name         GitLab Code Review Keyboard Shortcut mark as "Viewed" with a keyboard shortcut
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Conquer code review challenges with "v" key! - In diff view, use "v" to mark/toggle as "Viewed".
// @author       CodeBrauer
// @match        https://gitlab.com/*/-/merge_requests/*/diffs
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gitlab.com
// @source       https://gist.github.com/CodeBrauer/2d5814262e53fafb4228ebcda08154d9
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    Mousetrap.bind('v', function() {
        document.querySelector("[data-testid='fileReviewCheckbox']").click();
    });
})();