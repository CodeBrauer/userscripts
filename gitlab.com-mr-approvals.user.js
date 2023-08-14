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

(function() {
    'use strict';
    window.addEventListener('load', function() {
        document.querySelectorAll('.issuable-meta [title*=approv]').forEach(function(row) {
            let approvals = row.getAttribute('title');
            let approvalsCount = approvals.match(/\d+/)[0];
            row.innerHTML = row.innerHTML.replace("Approved", row.getAttribute('title'));
            if (approvalsCount < 2) {
                row.classList.remove("text-success");
                row.classList.add("text-warning");
            } else if (approvalsCount >= 2) {
                row.closest('li.merge-request').style.backgroundColor = '#007f0040';
            }
        });
    }, false);
})();