import Siema from 'siema';

const SLIDER = new Siema({
  selector: '.works__slider',
  onInit: () => {
    createNav();
  },
  onChange: setActiveButton,
  perPage: 1
});

function createNav(){
  let sliderWrap = document.querySelector('.works__wrap');
  let slides = document.querySelectorAll('.work');

  let nav = document.createElement('div');
  nav.className = 'slider-nav';
  slides.forEach((s, i) => {
    let button = document.createElement('button');
    button.innerText = i;
    button.addEventListener('click', () => {
      SLIDER.goTo(i);
    });
    nav.appendChild(button);
  });

  sliderWrap.appendChild(nav);
}

function setActiveButton(){
  let buttons = document.querySelectorAll('.slider-nav button');
  buttons.forEach((b, i) => {
    if (i == this.currentSlide) {
      b.className = "active-slider";
    } else {
      b.className = "";
    }
  });
};

const TEAMSLIDER = new Siema({
  selector: '.member__slider',
  onInit: () => {
    createNav2();
  },
  onChange: setActiveButton2,
  perPage: 3
});

function createNav2(){
  let sliderWrap2 = document.querySelector('.member-wrap');
  let slides2 = document.querySelectorAll('.member');

  let nav2 = document.createElement('div');
  nav2.className = 'slider2-nav';
  slides2.forEach((s, i) => {
    let button = document.createElement('button');
    button.innerText = i;
    button.addEventListener('click', () => {
      TEAMSLIDER.goTo(i);
    });
    nav2.appendChild(button);
  });

  sliderWrap2.appendChild(nav2);
}

function setActiveButton2(){
  let buttons2 = document.querySelectorAll('.slider2-nav button');
  buttons2.forEach((b, i) => {
    if (i == this.currentSlide) {
      b.className = "active-slider";
    } else {
      b.className = "";
    }
  });
};

function firstActiveButton(){
  document.querySelector('.slider-nav button').className = "active-slider";
  document.querySelector('.slider2-nav button').className = "active-slider2";
};

function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
//
// window.sr = ScrollReveal({ reset: true });
// sr.reveal('.address', {duration: 1000, origin: 'right', distance: '500px'});
// sr.reveal('.phone', {duration: 1000, distance: '50%', origin: 'left'});
