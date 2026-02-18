const $ = document.querySelector.bind(document);

function loadHits() {
  
  const page = window.PAGE_NAME;

  fetch(`/hits/${page}`)
    .then(r => r.json())
    .then(data => {
      // data = { page: "...", hits: number }
      $("#hitCount").innerText = data.hits;
    })
    .catch(() => {
      $("#hitCount").innerText = "Error";
    });
}

// Run when page loads
window.addEventListener("load", loadHits);
