// ==UserScript==
// @name        Jira highlight my kanban cards
// @namespace   Violentmonkey Scripts
// @match       https://*.atlassian.net/jira/software/c/projects/*/boards/*
// @grant       none
// @version     1.0
// @author      CodeBrauer
// @description In Jira Kanban boards own cards are highlighted yellow-ish to find your cards faster!
// @icon        https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// ==/UserScript==

(function() {
    'use strict';
    let userName = document.querySelector('meta[name="ajs-remote-user-fullname"]').getAttribute('content');
    setInterval(function() {
        document.querySelectorAll('.ghx-content-main .ghx-issue [alt="Assignee: ' + userName + '"]').forEach(function(avatar) {
            avatar.closest(".ghx-issue").style.backgroundColor = '#ffe1a2'
        });
    }, 1000);
})();