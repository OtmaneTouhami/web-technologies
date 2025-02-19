document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector("nav ul");

  const toggleMenu = () => {
    const isVisible = navList.style.display === "block";
    navList.style.display = isVisible ? "none" : "block";
  };

  navToggle.addEventListener("click", toggleMenu);

  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navList.style.display = "none";
      }
    });
  });

  function reveal() {
    const reveals = document.querySelectorAll(
      ".fade-in, .timeline-item, .skill-card, .experience-card, .projects-grid .project-card"
    );

    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  window.addEventListener("scroll", reveal);

  reveal();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top:
            targetElement.offsetTop -
            document.querySelector("nav").offsetHeight,
          behavior: "smooth",
        });
      }
    });
  });
});
