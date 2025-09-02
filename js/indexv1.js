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
    weekIndex = day - 1 ;
    const week = [
        document.getElementById("week-monday"),
        document.getElementById("week-tuesday"),
        document.getElementById("week-wednesday"),
        document.getElementById("week-thursday"),
        document.getElementById("week-friday"),
        document.getElementById("week-saturday"),
        document.getElementById("week-sunday")
    ]
    console.log("cambiando semana a: ", day);
    
    week.forEach((dayElement, index) => {
        if (index+1 === day) {
            dayElement.classList.remove("day-inactive");
            dayElement.classList.add("day-active");
            changeWeekImage(imagesWeek[index]);
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
    }, 5000); // Cambia cada 3 segundos
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
        ['btn-modal-uyuni', 'salar-uyuni', 'close-modal'],
        ['btn-modal-maragua', 'maragua', 'close-modal-maragua'],
        ['btn-modal-climbing', 'climbing', 'close-modal-climbing'],
        ['btn-modal-horse', 'horse', 'close-modal-horse'],
        ['btn-modal-minas', 'minas', 'close-modal-minas'],
        ['btn-modal-walk', 'walk', 'close-modal-walk']
    ];

    modals.forEach(([btnId, modalId, closeId]) => setupModal(btnId, modalId, closeId));
}


const modals = ['salar-uyuni', 'campesino', 'climbing', 'horse', 'minas', 'walk'];
const currentHash = window.location.hash.slice(1); // elimina el "#"

if (modals.includes(currentHash)) {
    const modal = document.getElementById(currentHash);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function showModal(modalId) {
    const modal = document.getElementById('modalHostal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('modalHostal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

let imagesData = [
"images/activity1.webp",
"images/activity2.webp",
"images/activity4.webp",
"images/activity3.webp",
"images/banner-coffee3.webp"
];

let currentIndex = 0;
const mainImage = document.getElementById("main-image");
const thumbnails = document.querySelectorAll(".thumbnail");

function updateGallery(index) {
currentIndex = index;
mainImage.classList.add("opacity-0");

setTimeout(() => {
    mainImage.src = imagesData[currentIndex];
    mainImage.classList.remove("opacity-0");
}, 300);

thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("border-primary", i === currentIndex);
});
}

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      console.log(`Thumbnail ${index} clicked`);
      updateGallery(index);
    });
  });

function changeImageModal(index){
console.log(`Changing modal image to ${index}`);
}

// Autoplay cada 3 segundos


if (window.location.pathname.includes('hostal.html')) {
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % imagesData.length;
        updateGallery(nextIndex);
    }, 3000);

    updateGallery(0);
}
// modals hostal

    const FamilyImage = [
        "images/hostal/card1.webp",
        "images/hostal/Family1.webp",
        "images/hostal/Family2.webp",
        "images/hostal/Family3.webp",
        "images/hostal/Family4.webp"
    ]

    const familyRoomImages = [
        "images/hostal/card2.webp",
        "images/hostal/roomfamily1.webp",
        "images/hostal/roomfamily2.webp",
        "images/hostal/roomfamily3.webp",
        "images/hostal/roomfamily4.webp",
        "images/hostal/roomfamily5.webp",
        "images/hostal/roomfamily6.webp",
        "images/hostal/roomfamily7.webp"
    ]

    const queenRoomImages = [
        "images/hostal/card3.webp",
        "images/hostal/queen1.webp",
    ]

    const queenRoomTwoImages = [
        "images/hostal/card4.webp",
        "images/hostal/queenroom1.webp",
        "images/hostal/queenroom2.webp",
        "images/hostal/queenroom3.webp",
        "images/hostal/queenroom3-1.webp"
    ]

    const twinRoomImages = [
        "images/hostal/card5.webp",
        "images/hostal/twin1.webp",
        "images/hostal/twin2.webp",
    ]

    const suiteFamilyImages = [
        "images/hostal/card6.webp",
    ]


function showModalHostal(index) {

    let mainImage = document.getElementById("main-image");
    let thumbnailDescription = document.getElementById("thumbnail-description");

    switch(index){
        case 1:
            imagesData = FamilyImage
            break
        case 2:
            imagesData = familyRoomImages
            break
        case 3:
            imagesData = queenRoomImages
            break
        case 4:
            imagesData = queenRoomTwoImages
            break
        case 5:
            imagesData = twinRoomImages
            break
        case 6:
            imagesData = suiteFamilyImages
            break
    }

    mainImage.src = imagesData[0];

    thumbnailDescription.innerHTML = imagesData.map((src, index) => `
        <img src="${src}" alt="Thumbnail ${index }" class="w-1/4 cursor-pointer thumbnail" onclick="changeImageModal(${index})">
    `).join('');

    showModal('modalHostal')
}


const btnButtonFormSend = document.getElementById("button-form-send");

btnButtonFormSend.addEventListener("click", () => {
    const name = document.getElementById("name-form").value;
    const type = document.getElementById("type-form").value;
    const message = document.getElementById("message-form").value;

    const messageSente = `Hi, my name is ${name}. I'm interested in the ${type} and would like to say: ${message}`;

    // enviar mensaje de whatsapp
    const whatsappUrl = `https://wa.me/59175451699?text=${encodeURIComponent(messageSente)}`;
    console.log(whatsappUrl);
    
    window.open(whatsappUrl, '_blank');
});