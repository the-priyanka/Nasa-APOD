const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imageContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// NASA API
const count = 10;
const apiKey = "Z21c4gN3ejSgRT79taPovIdqfQDwzC021g8NZUhb";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function createDOMNodes(page) {
  const currentArray =
    page === "results" ? resultsArray : Object.values(favorites);
  console.log("Current Array", page, currentArray);
  currentArray.forEach((result) => {
    // card container
    let card = document.createElement("div");
    card.classList.add("card");
    // link
    let link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";
    // img
    let image = document.createElement("img");
    image.src = result.url;
    image.alt = "Nasa Picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");
    //card body
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // card title
    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("cart-title");
    cardTitle.textContent = result.title;
    // save text
    let saveText = document.createElement("p");
    saveText.classList.add("clickable");
    if (page === "results") {
      saveText.textContent = "Add to Favorites";
      saveText.setAttribute(
        "onclick",
        `saveFavorite("${result.url}")`
      );
    } else {
      saveText.textContent = "Remove Favorite";
      saveText.setAttribute(
        "onclick",
        `removeFavorite("${result.url}" )`
      );
    }
    // card text
    let cardText = document.createElement("p");
    cardText.textContent = result.explanation;
    // footer container
    let footer = document.createElement("small");
    footer.classList.add("text-muted");
    // date
    let date = document.createElement("strong");
    date.textContent = result.date;
    // copyright
    let copyrightResult =
      result.copyright === undefined ? "" : result.copyright;
    let copyright = document.createElement("span");
    copyright.textContent = ` ${copyrightResult}`;

    // append
    footer.append(date, copyright);
    cardBody.append(cardTitle, cardText, saveText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imageContainer.appendChild(card);
  });
}

function updateDom(page) {
  // get favorites from localStorage
  if (localStorage.getItem("nasaFavorites")) {
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
    console.log("Favorites from localStorage", favorites);
  }
  imageContainer.textContent = "";
  createDOMNodes(page);
}

async function getNasaPicture() {
  try {
    let response = await fetch(apiUrl);
    resultsArray = await response.json();
    updateDom("favorites");
  } catch (error) {
    // catch error here
  }
}

function saveFavorite(itemUrl) {
  // loop through results array to select favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      // show save confirmation for 2 seconds
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      // set favorites in localStorage
      localStorage.setItem(
        "nasaFavorites",
        JSON.stringify(favorites)
      );
    }
  });
}

// Remove item from favorites
function removeFavorite(itemUrl) {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
    // set favorites in localStorage
    localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    updateDom("favorites");
  }
}

getNasaPicture();
