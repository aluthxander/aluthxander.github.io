const slider = document.querySelector("#slider");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slides = document.querySelectorAll(".slide");
const slideIcons = document.querySelectorAll(".slide-icon");
const numberOfSlides = slides.length;
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');
const infoAbout = document.querySelector('#about .container div .infoAbout');
const infoABout2 = document.querySelector('#about .container .about2 .infoAbout2');
let slideNumber = 0;
const fronEndPort = document.querySelectorAll('.frondEnd .workBx');
const machineLearningPort = document.querySelectorAll('.machineLearning .workBx');
const robotIotPort = document.querySelectorAll('.robot_Iot .workBx');


// ========================= navbar ======================
// navbar when scroll
window.addEventListener('scroll', function () {
    let Header = document.querySelector('header');
    Header.classList.toggle('sticky', window.scrollY > 10);
})

// hamburger menu

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

window.addEventListener('click', function (e) {
    if (e.target != hamburger && e.target != navMenu) {
        hamburger.classList.remove('hamburger-active');
        navMenu.classList.add('hidden');
    }
});
// ========================= navbar end ==================


// ========================== carousel ====================
// slider to rigth button
nextBtn.addEventListener('click', () => {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });
    slideIcons.forEach((slideIcon) => {
        slideIcon.classList.remove("active");
    });

    slideNumber++;

    if (slideNumber > (numberOfSlides - 1)) {
        slideNumber = 0;
    }

    slides[slideNumber].classList.add('active');
    slideIcons[slideNumber].classList.add('active');
});

// slider to left button
prevBtn.addEventListener('click', () => {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });
    slideIcons.forEach((slideIcon) => {
        slideIcon.classList.remove("active");
    });

    slideNumber--;

    if (slideNumber < 0) {
        slideNumber = numberOfSlides - 1;
    }

    slides[slideNumber].classList.add('active');
    slideIcons[slideNumber].classList.add('active');
});

// autoplay slider
let playSLider;

let repeater = () => {
    playSLider = setInterval(function () {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
        slideIcons.forEach((slideIcon) => {
            slideIcon.classList.remove("active");
        });

        slideNumber++;

        if (slideNumber > (numberOfSlides - 1)) {
            slideNumber = 0;
        }

        slides[slideNumber].classList.add('active');
        slideIcons[slideNumber].classList.add('active');
    }, 4000);
}

repeater();

// ==================== end carousel ==============================


window.addEventListener('scroll', function () {
    // ==================== about =====================================
    if (this.window.scrollY > 400) {
        infoAbout.classList.add('active');
    }

    if (this.window.scrollY >= 1000) {
        infoABout2.classList.add('active');
    }
    // ==================== about end =================================
    // ==================== portfolio start ==============================
    if (this.window.innerWidth <= 765) {
        if (this.window.scrollY >= 2067) {
            fronEndPort.forEach((el, i) => {
                setTimeout(function () {
                    el.classList.add('active');
                }, 500 * i);
            });
        }

        if (this.window.scrollY >= 3180) {
            machineLearningPort.forEach((el, i) => {
                setTimeout(function () {
                    el.classList.add('active')
                }, 500 * i);
            });
        }

        if (this.window.scrollY >= 4200) {
            robotIotPort.forEach((el, i) => {
                setTimeout(function () {
                    el.classList.add('active')
                }, 500 * i);
            });
        }
    } else if (this.window.innerWidth <= 1024) {
        if (this.window.scrollY >= 1740) {
            fronEndPort.forEach((el, i) => {
                setTimeout(function () {
                    el.classList.add('active');
                }, 500 * i);
            });
        }

        if (this.window.scrollY >= 2513) {
            machineLearningPort.forEach((el, i) => {
                setTimeout(function () {
                    el.classList.add('active')
                }, 500 * i);
            });
        }

        if (this.window.scrollY >= 3225) {
            robotIotPort.forEach((el, i) => {
                setTimeout(function () {
                    el.classList.add('active')
                }, 500 * i);
            });
        }
    } else {
        if (this.window.scrollY >= 1600) {
            fronEndPort.forEach((el, i) => {
                setTimeout(function () {
                    el.classList.add('active');
                }, 500 * i);
            });
        }

        if (this.window.scrollY >= 2000) {
            machineLearningPort.forEach((el, i) => {
                setTimeout(function () {
                    el.classList.add('active')
                }, 500 * i);
            });
        }

        if (this.window.scrollY >= 2470) {
            robotIotPort.forEach((el, i) => {
                setTimeout(function () {
                    el.classList.add('active')
                }, 500 * i);
            });
        }
    }


    // console.log(this.window.innerWidth);
    // console.log(this.window.scrollY);
    // ==================== portfolio end =================================
})