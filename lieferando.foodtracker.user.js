// ==UserScript==
// @name         Lieferando show foodtracker time left in tab title
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a sprinkle of excitement to your food tracking experience on Lieferando by displaying the remaining time in the tab title. Never lose track of your eagerly awaited meal again!
// @author       CodeBrauer
// @match        https://www.lieferando.de/foodtracker/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lieferando.de
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function loadData(){
        var title = "";

        var n = document.querySelectorAll('#scoober-tracker svg tspan');
        if(n.length) title += n[0].innerHTML + "min";

        var t = document.querySelectorAll('#scoober-tracker h1');
        if(t.length){
            if(title!="") title += " - ";
            title += t[1].innerText;
        }

        if(title!="") document.title = "🛵 " + title;
    }
    setInterval(loadData,10*1000);
    loadData();
})();