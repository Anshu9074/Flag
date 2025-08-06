
// for Dark-mode and Light-mode

const btn = document.querySelector('.dark-button');
btn.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
});


const cardContainer = document.querySelector('.container-cards')
 
async function getAllCounty() {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,languages,region,subregion,population,area,borders/posts')
  const data = await res.json()
  data.forEach((country) => {
    const a = document.createElement('a')
     console.log(country);
    a.href = `light.html?id=${country.name.common}`
    a.classList.add('card_wrapper')
    a.innerHTML = `  <div class="card">
<img src="${country?.flags?.png}" />
<div class="cards-detail">
<h4>${country?.name?.common}</h4>
<p class="mb-0">Population : ${country?.population}</p>
<p class="mb-0"> Region: ${country?.region}</p>
<p class="mb-0"> Capital: ${country?.capital}</p>
</div>
</div>
`
    cardContainer.appendChild(a)
  });
 

}
 
getAllCounty()





const searchInput = document.querySelector(".search-icon");
const cdc = document.querySelector(".container-cards");

searchInput.addEventListener("keyup", function () {
  const query = this.value.trim();
  if (query.length >= 1) {
    performSearch(query);
  }
});

async function performSearch(query) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Country not found");
    const data = await response.json();

    // Clear old cards
    cdc.innerHTML = "";

    // Display new cards
    data.forEach((country) => {
      const flag = country.flags?.svg || "";
      const name = country.name?.common || "Unknown";
      const population = country.population?.toLocaleString() || "N/A";
      const region = country.region || "N/A";
      const capital = country.capital?.[0] || "N/A";

      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${flag}" class="flag-img" alt="${name}">
        <div class="card-body">
          <h3>${name}</h3>
          <p><strong>Population:</strong> ${population}</p>
          <p><strong>Region:</strong> ${region}</p>
          <p><strong>Capital:</strong> ${capital}</p>
        </div>
      `;
      cdc.appendChild(card);
    });

  } catch (error) {
    cdc.innerHTML = `<p class="error">No results found for "${query}"</p>`;
  }
}
