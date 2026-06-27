const donationData = [
  {
    country: "United States",
    flag: "🇺🇸",
    organizations: [
      {
        name: "American Red Cross",
        description: "Emergency response and humanitarian support.",
        url: "https://www.redcross.org/donate/donation.html/"
      },
      {
        name: "UNICEF USA",
        description: "Support for children and families affected by emergencies.",
        url: "https://www.unicefusa.org/"
      }
    ]
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    organizations: [
      {
        name: "British Red Cross",
        description: "Humanitarian emergency response and international aid.",
        url: "https://donate.redcross.org.uk/appeal"
      },
      {
        name: "UNICEF UK",
        description: "Emergency support for children and vulnerable families.",
        url: "https://www.unicef.org.uk/donate/"
      }
    ]
  },
  {
    country: "Ireland",
    flag: "🇮🇪",
    organizations: [
      {
        name: "Irish Red Cross",
        description: "Emergency and humanitarian relief support.",
        url: "https://www.redcross.ie/donate/"
      },
      {
        name: "UNICEF Ireland",
        description: "Supports children and families in crisis.",
        url: "https://www.unicef.ie/donate/"
      }
    ]
  },
  {
    country: "Spain",
    flag: "🇪🇸",
    organizations: [
      {
        name: "Cruz Roja Española",
        description: "Humanitarian aid and emergency response.",
        url: "https://www2.cruzroja.es/colabora"
      }
    ]
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    organizations: [
      {
        name: "Deutsches Rotes Kreuz",
        description: "German Red Cross humanitarian support.",
        url: "https://www.drk.de/spenden/"
      }
    ]
  }
];

const countrySelect = document.getElementById("countrySelect");
const donationResults = document.getElementById("donationResults");

donationData.forEach((item, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = `${item.flag} ${item.country}`;
  countrySelect.appendChild(option);
});

countrySelect.addEventListener("change", () => {
  const selectedIndex = countrySelect.value;

  if (selectedIndex === "") {
    donationResults.innerHTML = "";
    return;
  }

  const selectedCountry = donationData[selectedIndex];

  donationResults.innerHTML = `
    <h3>${selectedCountry.flag} ${selectedCountry.country}</h3>
    <div class="note">
      These links should point to official donation pages. Review and replace any placeholder links before publishing.
    </div>
    ${selectedCountry.organizations.map(org => `
      <div class="org-card">
        <h3>${org.name}</h3>
        <p>${org.description}</p>
        <a class="button" href="${org.url}" target="_blank" rel="noopener noreferrer">Donate</a>
      </div>
    `).join("")}
  `;
});
