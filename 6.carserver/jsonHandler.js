'use strict';

(function(){
    let searchCriterion;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        searchCriterion = document.getElementById('searchCriterion');
        document.getElementById('sendJson').addEventListener('click', update);
    }

    async function update() {
        try{
            const result = await fetch('/jsonencoded', {
                method:'POST',
                body:JSON.stringify({licence: searchCriterion.value}),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            updatePage(await result.json());
        }
        catch(err) {
            showError(err.message);
        }
    }



})();