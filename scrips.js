(function () {
  "use strict";
  let inputField = document.getElementById('input');
  let ulField = document.getElementById('suggestions');
  inputField.addEventListener('input', changeAutoComplete);
  ulField.addEventListener('click', selectItem);

  async function changeAutoComplete({ target }) {
    let inputSearch = target.value;
    ulField.innerHTML = ``;

    if (inputSearch.length) {
      fetch("country-data.json")
      .then(response => response.json())
      .then(data => {
        const mySearch = data.filter(
          value => value.name.toLowerCase().includes(inputSearch.toLowerCase())
        )
        mySearch.forEach(country => { addItem(country) });
      });
    }
  }

  function addItem(value) {
    ulField.innerHTML = ulField.innerHTML + `<li>${value.name} (${value.acronym3})</li>`;
  }

  function selectItem({ target }) {
    if (target.tagName === 'li') {
      inputField.value = target.textContent;
      ulField.innerHTML = ``;
    }
  }
})();