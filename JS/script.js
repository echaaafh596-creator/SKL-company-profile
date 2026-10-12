const track = document.getElementById("announcementTrack");

let current = 0;
let startX = 0;
let isDragging = false;
let autoSlide;

function moveSlide(index, animate = true) {
    current = index;

    track.style.transition = animate
        ? "transform 0.5s ease"
        : "none";

    track.style.transform = `translateX(-${current * 100}%)`;
}

function nextSlide() {
    current++;
    moveSlide(current);

    // Text 1 copy → kembali ke Text 1 asli
    if (current === 2) {
        setTimeout(() => {
            moveSlide(0, false);
        }, 500);
    }
}

function previousSlide() {
    if (current > 0) {
        current--;
        moveSlide(current);
    }
}

// =====================
// AUTO SLIDE
// =====================

function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(autoSlide);
}

startAutoSlide();


// =====================
// MANUAL DRAG / SWIPE
// =====================

track.addEventListener("pointerdown", (e) => {
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
        `translateX(calc(-${current * 100}% + ${distance}px))`;
});

track.addEventListener("pointerup", (e) => {
    if (!isDragging) return;

    isDragging = false;

    const distance = e.clientX - startX;

    if (distance < -50) {
        nextSlide();
    } 
    else if (distance > 50) {
        previousSlide();
    } 
    else {
        moveSlide(current);
    }

    startAutoSlide();
});

track.addEventListener("pointercancel", () => {
    isDragging = false;
    moveSlide(current);
    startAutoSlide();
});

const aboutCards = document.querySelector(".about-cards");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

nextBtn.addEventListener("click", () => {
    aboutCards.scrollBy({
        left: 500,
        behavior: "smooth"
    });
});

prevBtn.addEventListener("click", () => {
    aboutCards.scrollBy({
        left: -500,
        behavior: "smooth"
    });
});
// about btn end

// brand btn start
const brandCards = document.querySelector(".brand-cards");
const brandPrev = document.querySelector("#brandPrev");
const brandNext = document.querySelector("#brandNext");

if (brandCards && brandPrev && brandNext) {
    brandNext.addEventListener("click", () => {
        brandCards.scrollBy({
            left: 500,
            behavior: "smooth"
        });
    });

    brandPrev.addEventListener("click", () => {
        brandCards.scrollBy({
            left: -500,
            behavior: "smooth"
        });
    });
}
// end brand

// realmeow start
const mascot = document.querySelector(".realmeow-mascot");

let lastScrollY = window.scrollY;
let scale = 1;

window.addEventListener("scroll", () => {

    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // scroll ke bawah → mengecil
        scale -= 0.01;
    } else {
        // scroll ke atas → membesar
        scale += 0.01;
    }

    // batas ukuran
    scale = Math.max(1.0, Math.min(1.2, scale));

    mascot.style.transform =
        `translateX(-50%) scale(${scale})`;

    lastScrollY = currentScrollY;
});
// realmeow end

// number start
const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);
        const prefix = counter.dataset.prefix || "";
        const suffix = counter.dataset.suffix || "";

        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const current = Math.floor(progress * target);

            counter.textContent = prefix + current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
        observer.unobserve(counter);
    });
}, {
    threshold: 0.5
});

counters.forEach(counter => {
    observer.observe(counter);
});
// number end

// backtotop

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 655) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// reveal
const revealElements = document.querySelectorAll(".reveal");

function checkReveal() {
    revealElements.forEach(element => {
        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.8) {
            element.classList.add("show");
        }
    });
}

window.addEventListener("scroll", checkReveal);
checkReveal();

// collab

const collabSlides = document.querySelectorAll(".collab-slide");
const collabPrev = document.getElementById("collabPrev");
const collabNext = document.getElementById("collabNext");

let collabIndex = 0;

function updateCollab() {

    const total = collabSlides.length;

    collabSlides.forEach(slide => {
        slide.classList.remove(
            "active",
            "prev-1",
            "prev-2",
            "next-1",
            "next-2"
        );
    });

    collabSlides[collabIndex].classList.add("active");

    collabSlides[
        (collabIndex - 1 + total) % total
    ].classList.add("prev-1");

    collabSlides[
        (collabIndex - 2 + total) % total
    ].classList.add("prev-2");

    collabSlides[
        (collabIndex + 1) % total
    ].classList.add("next-1");

    collabSlides[
        (collabIndex + 2) % total
    ].classList.add("next-2");
}


/* NEXT */
collabNext.addEventListener("click", () => {

    collabIndex++;

    if (collabIndex >= collabSlides.length) {
        collabIndex = 0;
    }

    updateCollab();
});


/* PREVIOUS */
collabPrev.addEventListener("click", () => {

    collabIndex--;

    if (collabIndex < 0) {
        collabIndex = collabSlides.length - 1;
    }

    updateCollab();
});


/* KLIK PREVIEW */
collabSlides.forEach((slide, index) => {

    slide.addEventListener("click", () => {
        collabIndex = index;
        updateCollab();
    });

});


updateCollab();

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
    });
}


const navButtons = document.querySelectorAll(".nav-button");
const navGrids = document.querySelectorAll(".nav-grid");

navButtons.forEach((tab) => {
    tab.addEventListener("click", () => {

        const target = tab.dataset.target;
        const selectedPanel = document.getElementById(target);

        navGrids.forEach((panel) => {
            panel.classList.remove("active");
        });
        if (selectedPanel) {
            selectedPanel.classList.add("active");
        }
        navButtons.forEach((button) => {
            button.classList.remove("active");
        });
        tab.classList.add("active")
    })
})