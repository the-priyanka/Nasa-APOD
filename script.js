// NASA API
const count = 10;
const apiKey = "Z21c4gN3ejSgRT79taPovIdqfQDwzC021g8NZUhb";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultArray = [];

async function getNasaPicture() {
  try {
    let response = await fetch(apiUrl);
    resultArray = await response.json();
    console.log(resultArray);
  } catch (error) {
    // catch error here
  }
}
getNasaPicture();
