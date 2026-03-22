const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.boxShadow = "0 20px 35px rgba(0,0,0,0.12)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.boxShadow = "0 15px 25px rgba(0,0,0,0.06)";
    });
});