// ==UserScript==
// @name         Activate All Payback Coupons
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Turbocharge your savings! Activate all Payback coupons instantly with just one click. 
// @author       nakami, CodeBrauer
// @copyright    2022 nakami
// @license      GNU General Public License v2.0
// @icon         https://www.google.com/s2/favicons?sz=64&domain=payback.de
// @match        https://www.payback.de/coupons*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let mainSR = undefined;
    let coupons = undefined;
    sleep(2000).then(() => {
        var span = document.createElement("span");
        span.innerHTML = '<input type="button" href="javascript:void(0);" style="margin-left: 6px; padding: 8px;" title="Alle Coupons aktivieren" value="Alle Coupons aktivieren">';
        span.addEventListener("click", function() {
            alert('Starting the Work');
            mainSR = document.querySelector("#coupon-center").shadowRoot;
            coupons = mainSR.querySelectorAll("pbc-coupon");
            coupons.forEach(coupon => {
                try {
                    coupon.shadowRoot.querySelector("pbc-coupon-call-to-action").shadowRoot.querySelector('button.not-activated').click();
                } catch (error) {
                    console.error(error);
                }
            });
        }, false);
        document.querySelector('#coupon-center').shadowRoot.querySelector("div.coupon-center__filter").append(span);
    });
})();