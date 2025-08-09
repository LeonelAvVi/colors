const container = document.getElementById("scrollContainer");

let bannerIndex = 0
let intervalId = null;
let weekIndex = 0;
let intervalIdWeek = null;

const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    if (menuToggle.classList.contains("active")) {
        menuToggle.classList.remove("active");
        menu.style.display = "none";
    } else {
        menuToggle.classList.add("active");
       menu.style.display = "flex";
    }
});

function scrollLeft() {
    container.scrollBy({ left: -container.offsetWidth * 0.5, behavior: "smooth" });
}

function scrollRight() {
    container.scrollBy({ left: container.offsetWidth * 0.5, behavior: "smooth" });
}

function scrollRight2() {
    container.scrollBy({ left: -container.offsetWidth * 0.5, behavior: "smooth" });
}

function changeService(service) {
    bannerIndex = service;
    const buttons = [
        document.getElementById("icon-button-school"),
        document.getElementById("icon-button-hostal"),
        document.getElementById("icon-button-agency"),
        document.getElementById("icon-button-coffee"),
    ];

    const description = [
        document.getElementById("description-school"),
        document.getElementById("description-hostal"),
        document.getElementById("description-agency"),
        document.getElementById("description-coffee"),
    ]

    buttons.forEach((btn, index) => {
        if (!btn) return; // Skip if the element doesn't exist
        if (index === service) {
                btn.classList.add("active");
                btn.classList.remove("inactive");
            
        } else {
            
            btn.classList.remove("active");
            btn.classList.add("inactive");
            btn.classList.remove("hidden");
        }
        
    });

    description.forEach((desc, index) => {
        if (!desc) return; // Skip if the element doesn't exist
        if (index === service) {
            desc.classList.remove("hidden");
            desc.removeAttribute("data-aos");
        } else {
            desc.classList.add("hidden");
        }
    });
    changeSchoolBanners(services[service].image);

    const banner = document.getElementById("banner-main");
    banner.style.backgroundImage = `url(${services[service].bg})`;
}


function changeSchoolBanners(newImages) {
    const images = document.querySelectorAll(".school-banner img");

    images.forEach((img, index) => {
        img.classList.remove("aos-animate");
        setTimeout(() => {
        img.src = newImages[index];
        AOS.refresh();
        setTimeout(() => {
            img.classList.add("aos-animate");
        }, 50); 
        }, 300);
    });
}


function stopAutoChangeService() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
}


const services = [
        {
            name: "Spanish School Colors",
            description: "Description for Service 1",
            bg: "images/bg-banner-school.webp",
            image: [
                "images/banner-school.webp",
                "images/banner-school2.webp",
                "images/banner-school3.webp"
            ]
        },
        {
            name: "Service Hostal Colors",
            description: "Description for Service 2",
            bg: "images/bg-banner-hostal.webp",
            image : [
                "images/banner-hostal1.webp",
                "images/banner-hostal2.webp",
                "images/banner-hostal3.webp"
            ]
        },
        {
            name: "Agency Colors",
            description: "Description for Service 3",
            bg: "images/bg-banner-agency.webp",
            image: [
                "images/banner-agency.webp",
                "images/banner-agency2.webp",
                "images/banner-agency3.webp"
            ]
        },
        {
            name: "Coffee Shop Colors",
            description: "Description for Service 4",
            bg: "images/bg-banner-coffee.webp",
            image: [
                "images/banner-coffee.webp",
                "images/banner-coffee2.webp",
                "images/banner-coffee3.webp"
            ]
        }
    ]

// funcion q llame a changeService con el valor  de let banner + 1 cada 3 segundos
function autoChangeService() {
    if(intervalId !== null) return;

    intervalId = setInterval(() => {
        bannerIndex = (bannerIndex + 1) % services.length;
        changeService(bannerIndex);
    }, 3000); // Cambia cada 3 segundos
}

const bannerMain = document.getElementById("banner-main");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                autoChangeService(); // Solo se activa si entra en pantalla
            } else {
                stopAutoChangeService(); // Detener cuando ya no se ve
            }
        });
    },
    {
        threshold: 0.5, // Al menos el 50% debe estar en pantalla
    }
);

// 👀 Observar el elemento
if (bannerMain) observer.observe(bannerMain);

// autoChangeService();

function changeWeek(day){
    const week = [
        document.getElementById("week-monday"),
        document.getElementById("week-tuesday"),
        document.getElementById("week-wednesday"),
        document.getElementById("week-thursday"),
        document.getElementById("week-friday"),
        document.getElementById("week-saturday"),
        document.getElementById("week-sunday")
    ]
    week.forEach((dayElement, index) => {
        if (index+1 === day) {
            dayElement.classList.remove("day-inactive");
            dayElement.classList.add("day-active");
            changeWeekImage(imagesWeek[index+1]);
        } else {
            dayElement.classList.remove("day-active");
            dayElement.classList.add("day-inactive");
        }
    });   
}

const imagesWeek = [
    [
        "images/week/monday1.webp",
        "images/week/monday2.webp",
    ],
    [
        "images/week/tuesday1.webp",
        "images/week/tuesday2.webp",
    ],
    [
        "images/week/wednesday1.webp",
        "images/week/wednesday2.webp",
    ],
    [
        "images/week/thursday1.webp",
        "images/week/thursday2.webp",
    ],
    [
        "images/week/friday1.webp",
        "images/week/friday2.webp",
    ],
    [
        "images/week/saturday1.webp",
        "images/week/saturday2.webp",
    ],
    [
        "images/week/sunday1.webp",
        "images/week/sunday2.webp",
    ]
];

function stopAutoChangeWeek() {
    if (intervalIdWeek !== null) {
        clearInterval(intervalIdWeek);
        intervalIdWeek = null;
    }
}

function changeWeekImage(newImages) {
    const images = document.querySelectorAll(".image-week img");

    images.forEach((img, index) => {
        img.classList.remove("aos-animate");
        setTimeout(() => {
            img.src = newImages[index];
        AOS.refresh();
        setTimeout(() => {
            img.classList.add("aos-animate");
        }, 50); 
        }, 300);
    });
}

function autoChangeWeek() {
    if(intervalIdWeek !== null) return;

    intervalIdWeek = setInterval(() => {
        weekIndex = (weekIndex + 1) % imagesWeek.length;
        changeWeek(weekIndex + 1); // Cambia al siguiente día de la semana
        changeWeekImage(imagesWeek[weekIndex]); // Cambia a la imagen correspondiente
    }, 3000); // Cambia cada 3 segundos
}

const sectionWeek = document.getElementById("week");

const observerWeek = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                autoChangeWeek(); 
                changeWeek(1);
                changeWeekImage(imagesWeek[0]); // Cambia a la primera imagen al entrar en pantalla
            } else {
                // Aquí puedes detener la animación o el efecto si es necesario
                stopAutoChangeWeek(); // Detener cuando ya no se ve
                changeWeekImage(imagesWeek[0]); // Cambia a la primera imagen al salir de pantalla
            }
        });
    },
    {
        threshold: 0.5, // Al menos el 50% debe estar en pantalla
    }
);

// 👀 Observar el elemento
if (sectionWeek) {
    observerWeek.observe(sectionWeek);
}

const counters = document.querySelectorAll('.counter');
let started = false;

const startCounting = () => {
counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // 2 segundos
    const step = target / (duration / 30); // incremento cada 30ms
    let count = 0;

    const update = () => {
    count += step;
    if (count < target) {
        counter.textContent = Math.ceil(count);
        requestAnimationFrame(update);
    } else {
        counter.textContent = target + (counter.dataset.target.includes('%') ? '%' : '+');
    }
    };

    update();
});
};

const observerStatic = new IntersectionObserver(entries => {
entries.forEach(entry => {
    if (entry.isIntersecting && !started) {
    started = true;
    startCounting();
    }
});
}, { threshold: 0.5 });

const section = document.querySelector('.stadistics');
if (section) observerStatic.observe(section);

// show chat hint on hover
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const hint = document.getElementById('chat-hint');
        if (hint) {
            hint.classList.remove('opacity-0', 'translate-y-4');
            hint.classList.add('opacity-100', 'translate-y-0');
        }
    }, 3000); // 15 segundos
});


/// botones de modal
// solo buscar si estamos en la pagina adventure.html

if (window.location.pathname.includes('adventure.html')) {

    const setupModal = (btnId, modalId, closeId) => {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);
        const closeBtn = document.getElementById(closeId);

        if (!btn || !modal || !closeBtn) return;

        btn.addEventListener('click', () => {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    };

    const modals = [
        ['btn-modal-uyuni', 'modal-salar', 'close-modal'],
        ['btn-modal-campesino', 'modal-campesino', 'close-modal-campesino'],
        ['btn-modal-climbing', 'modal-climbing', 'close-modal-climbing'],
        ['btn-modal-horse', 'modal-horse', 'close-modal-horse'],
        ['btn-modal-minas', 'modal-minas', 'close-modal-minas'],
        ['btn-modal-walk', 'modal-walk', 'close-modal-walk']
    ];

    modals.forEach(([btnId, modalId, closeId]) => setupModal(btnId, modalId, closeId));
}


