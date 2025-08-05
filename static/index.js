document.addEventListener("DOMContentLoaded", () => {
    console.log("Website loaded successfully!");
  
    // Add hover effect for project cards
    const projectCards = document.querySelectorAll(".project-card");
    const skillCards = document.querySelectorAll(".skill");
  
    projectCards.forEach(card => {
      card.addEventListener("mouseover", () => {
        card.style.transition = "transform .2s";
        card.style.transform = "scale(1.03)";
        card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      });
  
      card.addEventListener("mouseout", () => {
        card.style.transform = "scale(1)";
        card.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
      });
    });

    skillCards.forEach(card => {
      card.addEventListener("mouseover", () => {
        card.style.transition = "transform .2s";
        card.style.transform = "scale(1.03)";
        card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      });
  
      card.addEventListener("mouseout", () => {
        card.style.transform = "scale(1)";
        card.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
      });
    });
  });
  