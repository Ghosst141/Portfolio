var typed = new Typed('#element', {
    strings: ['Web developer.'],
    typeSpeed: 50,
    loop: true,
    backSpeed: 50,
    backDelay: 1000
});

//header responsive

let menu = document.getElementById('menu-icon');
let navbar = document.querySelector('.navbar')

menu.addEventListener('click', () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});



//project slider
const crausel = document.querySelector('.projects-slider');
const btns = document.querySelectorAll('.crausal-btn');
const card = document.querySelector('.main-content');
const card1width = document.querySelector('.main-content').offsetWidth;
const cardchild = [...crausel.children];
let autoplay = true;

let cardperview = Math.round(crausel.offsetWidth / card1width);
console.log(cardperview);


btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        crausel.scrollLeft += btn.id === 'left' ? -card1width : card1width;
        autoplay = false;
        // console.log(crausel.scrollLeft);
        stopautoplay();
        clearTimeout(autotimeout);
        if (autoplay === false) {
            autotimeout = setTimeout(() => {
                startautoplay();
            }, 10000)
        }
    })
})

console.log(cardchild.slice(-cardperview));

cardchild.slice(-cardperview).reverse().forEach((card) => {
    crausel.insertAdjacentHTML("afterbegin", card.outerHTML);
})

cardchild.slice(0, cardperview).forEach((card) => {
    crausel.insertAdjacentHTML("beforeend", card.outerHTML);
})


const infinitescroll = () => {
    if (crausel.scrollLeft === 0) {
        crausel.classList.add('no-transition');
        crausel.scrollLeft = crausel.scrollWidth - (2 * crausel.offsetWidth);
        crausel.classList.remove('no-transition');

    }
    else if ((crausel.scrollLeft) === crausel.scrollWidth - crausel.offsetWidth) {
        crausel.classList.add('no-transition');
        crausel.scrollLeft = crausel.offsetWidth;
        crausel.classList.remove('no-transition');
    }
}
// crausel.addEventListener('mousemove',dragging);
crausel.addEventListener('scroll', infinitescroll);

let autoinetrval = null;
let autotimeout = null;

const startautoplay = () => {
    autoplay = true;
    autoinetrval = setInterval(() => {
        crausel.scrollLeft += card1width;
    }, 2500)
}

const stopautoplay = () => {
    clearInterval(autoinetrval);
    autoplay = false;
}

startautoplay();
crausel.addEventListener('mouseover', () => {
    console.log('mouse over card');
    stopautoplay();
    clearTimeout(autotimeout);
});

crausel.addEventListener('mouseout', () => {
    console.log('mouse out of card');
    if (autoplay === false) {
        startautoplay();
    }
});

//hearder active links
const links = document.querySelectorAll('.navbar a');
console.log(links);

if (links.length) {
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            links.forEach((link) => {
                link.classList.remove('active');
            });
            link.classList.add('active');
            menu.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        });

    });
}

let sections = document.querySelectorAll('.section-scroll');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        console.log(id);
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};