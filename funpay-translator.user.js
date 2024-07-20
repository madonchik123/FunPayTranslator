// ==UserScript==
// @name		FunPay Translator
// @namespace	funpay-translator
// @author		madonchik123
// @description Adds a translate button that translates russian text to english!
// @icon		https://www.google.com/s2/favicons?sz=64&domain=funpay.com
// @version		1.0.1
// @match		*://funpay.com/lots/offerEdit*
// @grant		none
// @downloadURL  https://github.com/madonchik123/FunPayTranslator/blob/main/funpay-translator.user.js
// @updateURL    https://github.com/madonchik123/FunPayTranslator/blob/main/funpay-translator.user.js
// @homepage     https://github.com/madonchik123/FunPayTranslator
// @run-at		document-end
// ==/UserScript==

(function() {
    'use strict';

    const submit = document.querySelector("#content > div > div > div.col-md-10.col-sm-9 > div > form > div.margin-top > button")
    const shortdescriptionru = document.querySelector("#content > div > div > div.col-md-10.col-sm-9 > div > form > div.lot-fields.live > div.lot-fields-multilingual > div.form-group.lot-field.bg-light-color.modal-custom-bg-block.modal-custom-bg-block-top > input")
    const longdescriptionru = document.querySelector("#content > div > div > div.col-md-10.col-sm-9 > div > form > div.lot-fields.live > div.lot-fields-multilingual > div:nth-child(4) > textarea")
    const paymentmsgru = document.querySelector("#content > div > div > div.col-md-10.col-sm-9 > div > form > div.lot-fields.live > div.lot-fields-multilingual > div:nth-child(6) > textarea")
    const shortdescriptionen = document.querySelector("#content > div > div > div.col-md-10.col-sm-9 > div > form > div.lot-fields.live > div.lot-fields-multilingual > div:nth-child(3) > input")
    const longdescriptionen = document.querySelector("#content > div > div > div.col-md-10.col-sm-9 > div > form > div.lot-fields.live > div.lot-fields-multilingual > div:nth-child(5) > textarea")
    const paymentmsgen = document.querySelector("#content > div > div > div.col-md-10.col-sm-9 > div > form > div.lot-fields.live > div.lot-fields-multilingual > div:nth-child(7) > textarea")

    function Translate(text) {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ text: text }),
        };

        return fetch('https://translatorapi-red.vercel.app/translate', options)
            .then(response => response.json())
            .then(data => data.translated_text);
    }

    const submitClone = submit.cloneNode(true);
    submitClone.type = 'translate';
    submitClone.innerText = 'Перевести';
    submitClone.onclick = () => {
        Translate(shortdescriptionru.value).then((res) => {
            shortdescriptionen.value = res !== undefined ? res : '';
            Translate(longdescriptionru.value).then((res) => {
                longdescriptionen.value = res !== undefined ? res : '';
                Translate(paymentmsgru.value).then((res) => {
                    paymentmsgen.value = res !== undefined ? res : '';
                    setTimeout(() => {}, 1000);
                    submit.click();
                });
            });
        });
    }
    submit.parentNode.appendChild(submitClone);
})();
