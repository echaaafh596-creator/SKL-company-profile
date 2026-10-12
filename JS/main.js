
document.addEventListener("DOMContentLoaded", () => {

    /* ===== ANNOUNCEMENT ===== */

    const track = document.getElementById("announcementTrack");
    const slides = document.querySelectorAll(".announcement-item");

    let currentSlide = 0;
    let startX = 0;
    let isDragging = false;
    let autoSlide;

    function moveSlide(index, animate = true) {
        if (!track || slides.length === 0) return;

        currentSlide = index;

        track.style.transition = animate
            ? "transform 0.8s ease-in-out"
            : "none";

        track.style.transform =
            `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        if (!track || slides.length === 0 || isDragging) return;

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        moveSlide(currentSlide);
    }

    function previousSlide() {
        if (!track || slides.length === 0 || isDragging) return;

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        moveSlide(currentSlide);
    }

    function startAutoSlide() {
        if (!track || slides.length <= 1) return;

        clearInterval(autoSlide);

        autoSlide = setInterval(() => {
            nextSlide();
        }, 7000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    if (track && slides.length > 0) {

        moveSlide(0, false);
        startAutoSlide();

        track.addEventListener("pointerdown", (e) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;

            isDragging = true;
            startX = e.clientX;

            stopAutoSlide();

            track.style.transition = "none";
            track.setPointerCapture(e.pointerId);
        });

        track.addEventListener("pointermove", (e) => {
            if (!isDragging) return;

            const distance = e.clientX - startX;

            track.style.transform =
                `translateX(calc(-${currentSlide * 100}% + ${distance}px))`;
        });

        track.addEventListener("pointerup", (e) => {
            if (!isDragging) return;

            const distance = e.clientX - startX;
            isDragging = false;

            if (distance < -50) {
                nextSlide();
            } else if (distance > 50) {
                previousSlide();
            } else {
                moveSlide(currentSlide);
            }

            startAutoSlide();
        });

        track.addEventListener("pointercancel", () => {
            isDragging = false;

            moveSlide(currentSlide);
            startAutoSlide();
        });
    }

    const aboutTabs = document.querySelectorAll(".about-tab");
    const aboutPanels = document.querySelectorAll(".about-panel")

    aboutTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.target;
            const selectedPanel = document.getElementById(target);
            aboutPanels.forEach((panel) => {
                panel.classList.remove("active");
            });
            if (selectedPanel) {
                selectedPanel.classList.add("active");
            }
            aboutTabs.forEach((button) => {
                button.classList.remove("active");
            });
            tab.classList.add("active")
        });
    });

})


// HAMBURGER

const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.add("active");
    });
}

if (menuClose && mobileMenu) {
    menuClose.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    })

}