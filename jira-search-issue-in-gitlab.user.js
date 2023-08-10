// ==UserScript==
// @name        Jira search issue key name gitlab branch
// @namespace   Violentmonkey Scripts
// @match       https://*.atlassian.net/browse/*
// @version     1.0
// @author      CodeBrauer
// @description Adds a button to the issue to search for issue key in gitlab merge requests. (For your given instance/project)
// ==/UserScript==
(function() {
    'use strict';
    setTimeout(function() {
        let gitlabUrl = 'https://[yourinstance.]gitlab.com/[group]/[project]/-/merge_requests';
        let issueContainer = document.querySelector("[data-component-selector^='jira.issue-view.issue-details']");
        let headerElement = issueContainer.querySelector("button[aria-label='Add app']").parentElement;
        let issueKey = document.querySelector("[data-testid*='issue.views.issue-base.foundation.breadcrumbs.current-issue.item'] span").innerText.trim();

        let buttonCss = `margin-left: 10px;
border: none;
display: flex;
align-items: center;
justify-content: center;
font-family: -apple-system, 'system-ui', 'Segoe UI', Roboto, Oxygen, Ubuntu, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
color: var(--ds-text, #42526E) !important;
font-weight: 500;
cursor: pointer;
    `;

        headerElement.innerHTML += `
<a href="${gitlabUrl}?scope=all&state=all&search=${issueKey}" target="_blank" style="display: flex;height: 100%;">
<button style="${buttonCss}">
    <img src="https://gitlab.com/assets/gitlab_logo-2957169c8ef64c58616a1ac3f4fc626e8a35ce4eb3ed31bb0d873712f2a041a0.png" style="height: 20px;padding-right: 5px;">
Search "${issueKey}" in GitLab
</button>
</a>`;

    }, 2000);

})();