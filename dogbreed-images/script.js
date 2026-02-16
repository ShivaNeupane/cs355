const $ = document.querySelector.bind(document);

const API = "https://dog.ceo/api";

const breedInput = $("#breedInput");
const breedList = $("#breedList");
const showBtn = $("#showBtn");
const message = $("#message");
const dogImage = $("#dogImage");

let breeds = [];       
let intervalId = null; 

async function loadBreeds() {
  try {
    const res = await fetch(`${API}/breeds/list/all`);
    const data = await res.json();

    // get the main breed names only 
    breeds = Object.keys(data.message).sort();

    // Fill <datalist>
    breedList.innerHTML = "";
    for (const b of breeds) {
      const opt = document.createElement("option");
      opt.value = b;
      breedList.appendChild(opt);
    }

    message.textContent = "";
  } catch (err) {
    message.textContent = "Could not load breeds. Refresh the page.";
  }
}

async function showImage(breed) {
  const res = await fetch(`${API}/breed/${breed}/images/random`);
  const data = await res.json();
  dogImage.src = data.message;
  dogImage.alt = `${breed} dog`;
}

function stopSlideshow() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

showBtn.addEventListener("click", async () => {
  const breed = breedInput.value.trim().toLowerCase();

  stopSlideshow();
  dogImage.src = "";
  dogImage.alt = "";

  if (!breed) {
    message.textContent = "Enter the breed name or Try checking your internet connection!";
    return;
  }

  // checks for each typed breed in the datalist of breed.
  if (!breeds.includes(breed)) {
    message.textContent = "No such breed";
    return;
  }

  message.textContent = `Displaying Images of breed : ${breed} every 5 sec `;

  // Show one immediately, then repeat every 5 seconds
  await showImage(breed);
  intervalId = setInterval(() => showImage(breed), 5000);
});

loadBreeds();
