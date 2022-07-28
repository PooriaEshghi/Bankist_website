'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab ');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const dotContainer = document.querySelector('.dots');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


btnScrollTo.addEventListener('click',()=> {
  section1.scrollIntoView({behavior:'smooth'})
})


document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if(!clicked) return ;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');

  // Active content area
  console.log(clicked.dataset.tab)
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

})
const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img')
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }}

nav.addEventListener('mouseover',handleHover.bind(0.5))
nav.addEventListener('mouseout',handleHover.bind(1))

// Sticky navigation

const initialCoords = section1.getBoundingClientRect();


const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;


const stickyNav = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting)nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav,
  {
    root:null,
    threshold:0,
    rootMargin: `-${navHeight}px`,
  })

headerObserver.observe(header)

const allSections = document.querySelectorAll('section');

const revealSection = function(entries,observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target);

}
// Lazy loading image
const sectionObserver = new IntersectionObserver(revealSection,
  {
    root:null,
    threshold:0,
    rootMargin:'10px'
  })

allSections.forEach(function(section) {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
});

const imgTargets = document.querySelectorAll('img[data-src')


const loadImages = function(entries,observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  
  entry.target.addEventListener('load',()=> {
    entry.target.classList.remove('lazy-img')
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver( loadImages,
  {
    root: null,
    threshold: 0,
    rootMargin: '200px'
  })

imgTargets.forEach(img => imageObserver.observe(img))
