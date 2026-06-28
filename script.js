let donationData = [];

const countryFiles = [
  "international",
  "spain",
  "ireland",
  "united-kingdom",
  "chile",
  "united-states",
  "canada",
  "australia",
  "venezuela",
  "germany"
];

const countrySelect = document.getElementById("countrySelect");
const donationResults = document.getElementById("donationResults");

async function loadDonationData() {
  try {
    const files = countryFiles.map(file =>
      fetch(`data/${file}.json`).then(response => {
        if (!response.ok) {
          throw new Error(`Could not load data/${file}.json`);
        }
        return response.json();
      })
    );

    donationData = await Promise.all(files);

    buildCountryOptions();
    renderOrganizations();

  } catch (error) {
    console.error("Donation data failed to load:", error);

    donationResults.innerHTML = `
      <div class="note">
        Donation data could not be loaded. Please refresh the page or try again later.
      </div>
    `;
  }
}

function buildCountryOptions() {
  countrySelect.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select a country...";
  countrySelect.appendChild(placeholder);

  donationData.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${item.flag} ${item.country}`;
    countrySelect.appendChild(option);
  });
}

function renderOrganizations() {
  const selectedIndex = countrySelect.value;

  if (selectedIndex === "") {
    donationResults.innerHTML = `<p>Select a country to see the list of organizations.</p>`;
    return;
  }

  const selectedCountry = donationData[selectedIndex];

  donationResults.innerHTML = `
    <h3>${selectedCountry.flag} ${selectedCountry.country}</h3>

    <div class="note">
      Donation links below point to official organization pages connected to the Venezuela earthquake response. Always review the page before donating.
    </div>

    ${selectedCountry.organizations.map(org => `
      <div class="org-card">
        <h3 class="org-title">${org.name}</h3>

        <div class="org-topline">
          <span class="badge">${org.trustBadge}</span>
          <span class="responding">
            ${org.responding ? "Currently responding ✅" : "Response not confirmed"}
          </span>
        </div>

        <p class="org-description">
          <strong>What they are providing:</strong> ${org.supportType}
        </p>

        <div class="button-row">
          <a class="button" href="${org.url}" target="_blank" rel="noopener noreferrer">
            ❤️ Donate
          </a>

          <a class="secondary-button" href="${org.website}" target="_blank" rel="noopener noreferrer">
            🌐 Website
          </a>
        </div>
      </div>
    `).join("")}
  `;
}

countrySelect.addEventListener("change", renderOrganizations);

loadDonationData();


// ===== SHARE BUTTONS =====

const websiteURL = window.location.href;

const shareMessage =
`Support verified humanitarian organizations responding to the Venezuela earthquake.

Find trusted donation links by country.

${websiteURL}`;

document.getElementById("shareX").href =
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;

document.getElementById("shareFacebook").href =
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteURL)}`;

document.getElementById("shareThreads").href =
  `https://www.threads.net/intent/post?text=${encodeURIComponent(shareMessage)}`;

document
  .getElementById("shareInstagram")
  .addEventListener("click", async () => {
    await navigator.clipboard.writeText(websiteURL);
    alert("✅ Link copied! Open Instagram and paste it into your Story, Reel or Bio.");
  });


// ===== LAST UPDATED =====

async function loadLastUpdated() {
  try {
    const response = await fetch("last-updated.txt");
    const timestamp = await response.text();
    const lastUpdated = new Date(timestamp.trim());

    document.getElementById("timeVenezuela").textContent =
      formatLastUpdated(lastUpdated, "America/Caracas");

    document.getElementById("timeUSA").textContent =
      formatLastUpdated(lastUpdated, "America/New_York");

    document.getElementById("timeIreland").textContent =
      formatLastUpdated(lastUpdated, "Europe/Dublin");

  } catch {
    document.getElementById("timeVenezuela").textContent = "Unavailable";
    document.getElementById("timeUSA").textContent = "Unavailable";
    document.getElementById("timeIreland").textContent = "Unavailable";
  }
}

function formatLastUpdated(date, timeZone) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

loadLastUpdated();
