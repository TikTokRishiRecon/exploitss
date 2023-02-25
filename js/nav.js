// Get all the nav links
const navLinks = document.querySelectorAll(".nav-link");

// Add an event listener to each nav link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Remove the active class from all nav links
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    // Add the active class to the clicked nav link
    link.classList.add("active");
  });
});
