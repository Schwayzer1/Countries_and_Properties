//*=========================================================
//*                     FLAG-APP
//*=========================================================

const fectchCountryByName = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`something went wrong ${res.status}`);
        throw new Error();
      }
      return res.json();
    })
    .then((data) => renderCountries(data))
    .catch((err) => console.log(err));
};

const renderError = () => {
  const countryDiv = document.querySelector(".countries");
  countryDiv.innerHTML += `<h2>Countries can not be fetched </h2> <img src="./img/404.png" alt=""/>`;
};

const renderCountries = (data) => {
  console.log(data);
  const {
    capital,
    currencies,
    flags: { svg },
    languages,
    name: { common },
    region,
    maps: { googleMaps },
  } = data[0];
  const countryDiv = document.querySelector(".countries");
  countryDiv.innerHTML = `
  <div class="card mx-auto m-3 shadow-lg" style="width: 18rem;">
  <img src="${svg}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${common}</h5>
    <p class="card-text">${region}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><i class="fas fa-lg fa-landmark"></i> ${capital}</li>
    <li class="list-group-item"><i class="fa-solid fa-comments"></i> ${Object.values(
      languages
    )}</li>
    <li class="list-group-item"><i class="fas fa-lg fa-money-bill-wave"></i> ${
      Object.values(currencies)[0].name
    } , ${Object.values(currencies)[0].symbol}</li>
  </ul>
  <div class="card-body text-center">
        <a href="${googleMaps}" target="_blank" class="card-link btn btn-primary">Google Maps</a>
        
      </div>
</div>
  `;
};

const select = document.getElementById("country");

select.addEventListener("change", (e) => {
  fectchCountryByName(e.target.value);
});
