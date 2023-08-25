
const countryListElement = document.querySelector(".countries");
// const countryDetailsElement = document.querySelector(".card");

async function getCountries() {
    try {
        const response = await fetch(
            "https://disease.sh/v3/covid-19/countries"
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function createCountryCard(country) {
    const card = document.createElement("div");
    card.classList.add("country-card");
    card.innerHTML = `
    <img src="${country.countryInfo.flag}" alt="${country.country}"> <br/>
   <span>${country.country}</span> <br/>
    <span>${country.continent}</span>
    `;
    const detaiks=cardDetails(country)
    card.addEventListener("click", () => {
        detaiks.style.display='block'
        cardDetails(country)
        card.append(detaiks)
    });
    return card;
}

function cardDetails(data) {
    const countryDetailsElement = document.createElement('div')
    countryDetailsElement.classList.add('card')
    countryDetailsElement.innerHTML = `
        <div class="top">
        <div class="country-card-top">
            <div>${data.country}</div>
            <div>Pop:${data.population.toLocaleString()}</div>
            <img src="${data.countryInfo.flag}" alt="country-flag">
        </div>
        <div class="details">
            <p>Today's Reported cases:${data.todayCases.toLocaleString()} people</p>
            <p>Today's Recovered cases:${data.todayRecovered.toLocaleString()} people</p>
            <p>Recovered cases:${data.recovered.toLocaleString()} people</p>
            <p>Today's Confirmed Deaths:${data.todayDeaths.toLocaleString()} people</p>
            <p>Confirmed Deaths:${data.deaths.toLocaleString()} people</p>
        </div>
    </div>
    `;
    return countryDetailsElement;
}

async function displayCountry() {
    const countries = await getCountries();
    countries.forEach((country) => {
        const countryCard = createCountryCard(country);
        countryListElement.appendChild(countryCard);
    });
}

displayCountry();
