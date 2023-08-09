// ==UserScript==
// @name         Sort by Price, add 30% discount
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Unleash laughter and savings with Lieferbär! Discover coupon savings and sort by price for a magical food delivery experience that will leave you delighted and your wallet happy.
// @author       CodeBrauer
// @match        https://lieferbaer.de/productListing/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lieferbaer.de
// @source       https://gist.github.com/CodeBrauer/0b5056cd28e27d9f614d5328234d3ebe
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Get all category containers
    let categoryContainers = Array.from(document.querySelectorAll('[name*="category_"]'));

    document.querySelector('[class*="productListingPage_content"]').appendChild(document.createElement("input"));
    document.querySelector('[class*="productListingPage_content"] input').value = parseInt(localStorage.getItem("UsLbRabatt"));
    document.querySelector('[class*="productListingPage_content"] input').style.marginTop = "16px";
    document.querySelector('[class*="productListingPage_content"] input').setAttribute("type", "number");
    document.querySelector('[class*="productListingPage_content"] input').setAttribute("min", "0");
    document.querySelector('[class*="productListingPage_content"] input').setAttribute("max", "100");
    document.querySelector('[class*="productListingPage_content"] input').addEventListener("change", function() {
        localStorage.setItem("UsLbRabatt", document.querySelector('[class*="productListingPage_content"] input').value);
    });
    let html = `<span> % Rabatt (Seite neuladen für Neuberechnung)</span>`;
    document.querySelector('[class*="productListingPage_content"]').insertAdjacentHTML( 'beforeend', html );

    // Iterate over category containers
    categoryContainers.forEach(function(categoryContainer) {
        let container = categoryContainer.querySelector('[class*="productListingPage_productContainer"]');
        let cards = Array.from(categoryContainer.querySelectorAll('[class*="productListingPage_card"]'));

        cards.sort(function(a, b) {
            let priceStrA = a.querySelector('[class*="productListingPage_price"] > span:not([class*="oldPrice"])').innerText.replace("€", "").trim().replace(",",".");
            let priceFloatA = parseFloat(priceStrA);

            let priceStrB = b.querySelector('[class*="productListingPage_price"] > span:not([class*="oldPrice"])').innerText.replace("€", "").trim().replace(",",".");
            let priceFloatB = parseFloat(priceStrB);

            return priceFloatA - priceFloatB;
        });

        cards.forEach(function(card) {
            container.appendChild(card);
        });

        cards.forEach(function(card) {
            let priceElement = card.querySelector('[class*="productListingPage_price"] > span:not([class*="oldPrice"])');
            let priceStr = priceElement.innerText.replace("€", "").trim().replace(",",".");
            let priceFloat = parseFloat(priceStr);

            // Calculate discounted price
            let discountedPriceFloat = priceFloat * (1-(parseInt(localStorage.getItem("UsLbRabatt"))/100)); // discount
            let discountedPriceStr = discountedPriceFloat.toFixed(2); // Format to 2 decimal places
            let discountedPriceFormatted = discountedPriceStr.replace(".", ",") + " €"; // Format with comma and "€" symbol

            // Create new span element for discounted price
            let discountedPriceElement = document.createElement('span');
            discountedPriceElement.classList.add('discounted-price');
            discountedPriceElement.style.color = 'crimson';
            discountedPriceElement.textContent = " -"+localStorage.getItem("UsLbRabatt")+"% = " + discountedPriceFormatted;

            // Append the discounted price span after the original price element
            priceElement.insertAdjacentElement('afterend', discountedPriceElement);
        });
    });
})();