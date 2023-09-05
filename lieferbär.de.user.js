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

    // Helper function to get and set local storage item
    function getLocalStorageItem(key) {
        return localStorage.getItem(key);
    }

    function setLocalStorageItem(key, value) {
        localStorage.setItem(key, value);
    }

    // Add a discount input field
    const discountInput = document.createElement("input");
    discountInput.value = parseInt(getLocalStorageItem("UsLbRabatt")) || 0;
    discountInput.style.marginTop = "16px";
    discountInput.type = "number";
    discountInput.min = "0";
    discountInput.max = "100";
    discountInput.addEventListener("change", () => {
        setLocalStorageItem("UsLbRabatt", discountInput.value);
    });

    const discountLabel = document.createElement('span');
    discountLabel.textContent = " % Rabatt (Seite neuladen für Neuberechnung)";

    const contentContainer = document.querySelector('[class*="productListingPage_content"]');
    contentContainer.appendChild(discountInput);
    contentContainer.appendChild(discountLabel);

    // Sort products by price and apply discounts
    const productContainers = Array.from(document.querySelectorAll('[name*="category_"]'));

    productContainers.forEach((container) => {
        const productCards = Array.from(container.querySelectorAll('[class*="productListingPage_card"]'));

        productCards.sort((a, b) => {
            const getPrice = (element) => {
                const priceStr = element.querySelector('[class*="productListingPage_price"] > span:not([class*="oldPrice"])').innerText.replace("€", "").trim().replace(",", ".");
                return parseFloat(priceStr);
            };

            return getPrice(a) - getPrice(b);
        });

        productCards.forEach((card) => {
            const priceElement = card.querySelector('[class*="productListingPage_price"] > span:not([class*="oldPrice"])');
            const priceFloat = parseFloat(priceElement.innerText.replace("€", "").trim().replace(",", "."));

            const discountPercentage = parseInt(getLocalStorageItem("UsLbRabatt")) || 0;
            const discountedPriceFloat = priceFloat * (1 - (discountPercentage / 100));
            const discountedPriceStr = discountedPriceFloat.toFixed(2).replace(".", ",") + " €";

            const discountedPriceElement = document.createElement('span');
            discountedPriceElement.classList.add('discounted-price');
            discountedPriceElement.style.color = 'crimson';
            discountedPriceElement.textContent = ` -${discountPercentage}% = ${discountedPriceStr}`;

            priceElement.insertAdjacentElement('afterend', discountedPriceElement);
        });

        // Reorder the cards
        const parentContainer = container.querySelector('[class*="productListingPage_productContainer"]');
        productCards.forEach((card) => {
            parentContainer.appendChild(card);
        });
    });
})();