// Finn HTML-elementene
const lottery = document.getElementById("lottery");
const image = document.getElementById("lottery-image");
const pointsDisplay = document.getElementById("points");
const resetButton = document.getElementById("reset-button");
const startButton = document.querySelector('#start');

// Lag en variabel for poengene
let points = 0;

// Definer en array med mynt- og kronebilder
const sides = ["kron", "mynt"];

// Når siden lastes, hent dataene fra JSON-filen
fetch("kronEllerMynt.json")
  .then(response => response.json())
  .then(data => {
    // Velg en tilfeldig posisjon for mynten
    const randomIndex = Math.floor(Math.random() * 2);
    const side = sides[randomIndex];

    // Endre bilde-kilden til den valgte siden
    image.src = data[0].images[side];

    // Legg til klikkelytter på bilde
    image.addEventListener("click", () => {
      // Sjekk om man har vunnet eller tapt
      if (side === "kron") {
        points++;
        alert("Gratulerer, du har vunnet!");
      } else {
        points--;
        alert("Beklager, du har tapt.");
      }

      // Oppdater poengene på skjermen
      pointsDisplay.innerText = points;
    });
  });

// Legg til klikkelytter på reset-knappen
resetButton.addEventListener("click", () => {
  window.location.reload()
  points = 0;
  pointsDisplay.innerText = points;
});

// Legg til klikk-lytter på bildet
image.addEventListener("click", () => {
  // Hent dataene på nytt fra APIen
  fetch("kronEllerMynt.json")
    .then(response => response.json())
    .then(data => {
      // Endrer bilde-kilden til det tilfeldige bildet
      const randomIndex = Math.floor(Math.random() * 2);
      const side = sides[randomIndex];
      image.src = data[0].images[side];
    })
    .catch(error => {
      console.error(error);
    });
});