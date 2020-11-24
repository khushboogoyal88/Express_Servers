'use strict';

function updatePage(cars) {
    const resultarea=document.getElementById('resultarea');
    resultarea.innerHTML=`
        <p>Model: ${cars[0].model}</p>
        <p>Licence: ${cars[0].licence}</p>`;
}

function showError(message) {
    const resultarea = document.getElementById('resultarea');
    resultarea.innerHTML =`
    <h1 class="error">Error</h1>
    <p class="error">${message}</p>`;
}