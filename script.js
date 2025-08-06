const cardContainer = document.querySelector(".cards1");
// console.log(cardContainer);

const params = new URLSearchParams(window.location.search);
const currnetPageCountry = params.get("id");
// console.log(currnetPageCountry);

async function getAllCountry() {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${currnetPageCountry}`
    );
    const data = await res.json();

    const country = data[0];
   const image = country?.flags?.png || "";
    const name = country?.name?.common || "N/A";
    const nativeName = country?.name?.nativeName
      ? Object.values(country.name.nativeName)[0]?.common
      : "N/A";
    const population = country?.population?.toLocaleString() || "N/A";
    const region = country?.region || "N/A";
    const capital = country?.capital?.[0] || "N/A";
    const tld = country?.tld?.[0] || "N/A";
    const currencies = country?.currencies
      ? Object.values(country.currencies)
          .map((cur) => cur.name)
          .join(", ")
      : "N/A";
    const languages = country?.languages
      ? Object.values(country.languages).join(", ")
      : "N/A";
    const borders = country?.borders || [];

    const a = document.createElement("a");
    a.classList.add("details");
    a.innerHTML = `
       <div class="cards-image">
    <img src="${image}" alt="${name} flag">
  </div>
      <div class="cards2">
        <h3 class="country-name">${name}</h3>
        <div class="cd-dtl2">
          <div>
            <p>Native Name: ${nativeName}</p>
            <p>Population: ${population}</p>
            <p>Region: ${region}</p>
            <p>Capital: ${capital}</p>
          </div>
          <div>
            <p>Top Level Domain: ${tld}</p>
            <p>Currencies: ${currencies}</p>
            <p>Languages: ${languages}</p>
          </div>
        </div>
        <div class="cd-dtl3">
          <p><strong>Border Countries:</strong></p>
          <ul class="borders-list">
            ${
              borders.length
                ? borders.map((b) => `<li>${b}</li>`).join("")
                : "<li>None</li>"
            }
          </ul>
        </div>
      </div>
    `;

    cardContainer.appendChild(a);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

getAllCountry();


const btn = document.querySelector('.dark-button');
btn.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
});

function goBack() {
  window.history.back();
}
