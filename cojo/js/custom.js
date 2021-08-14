

$(document).ready(function () {
  "use strict";

    Cursor();

});


(function ($)
  { 
    "use strict"

  // Aos
  AOS.init({
    disable: 'mobile'
  });

  //Home Slider
  function mainSlider() {
    var BasicSlider = $('.slider-active');
    BasicSlider.on('init', function (e, slick) {
      var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
      var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
      doAnimations($animatingElements);
    });
    BasicSlider.slick({
      autoplay: false,
      autoplaySpeed: 4000,
      dots: false,
      fade: true,
      arrows: true, 
      prevArrow: '<button type="button" class="slick-prev cursor-item"><i class="ti-angle-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next cursor-item"><i class="ti-angle-right"></i></button>',
      responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true
          }
        }
      ]
    });


  function doAnimations(elements) {
      var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data('delay');
        var $animationType = 'animated ' + $this.data('animation');
        $this.css({
          'animation-delay': $animationDelay,
          '-webkit-animation-delay': $animationDelay
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }
  mainSlider();


  //Smooth Nice Scroll
  $("html").niceScroll({
    scrollspeed: 100, 
    mousescrollstep: 80, 
    cursorwidth: '0px',  
    cursorborder: "none", 
    cursorborderradius: "0px", 
    autohidemode: true, 
    zindex: 999 });


  //Menu
  $('.main-menu ul li').on('click', function (e) {
    e.preventDefault();

    if ($(this).siblings('li').find('ul.submenu:visible').length) {
      $('ul.submenu').slideUp('normal');
    }
    $(this).find('ul.submenu').slideToggle('normal');
  });

  var t1 = new TimelineMax({
    paused: true
  });

  t1.to('.main-menu', 0.8, {
    autoAlpha: 1
  });

  t1.staggerFrom('.main-menu li a:not(.submenu li a)', 1, {
    opacity: 0,
    y: 10,
    ease: Power3.easeInOut
  }, 0.1);

  t1.from('.submenu', 0.8, {
    autoAlpha: 0
  });



  t1.from('.call', 1, {
    delay: -2,
    opacity: 0,
    y: 10,
    ease: Power3.easeInOut
  });

  t1.from('.address', 1, {
    delay: -1.6,
    opacity: 0,
    y: 10,
    ease: Power3.easeInOut
  });


  t1.from('.link-t', 1, {
    delay: -1,
    opacity: 0,
    y: 10,
    ease: Power3.easeInOut
  });

  t1.reverse();

  $(document).on('click', '.menu-btn', function () {
    t1.reversed(!t1.reversed());
  });

  $(document).on('click', '.close-menu', function () {
    t1.reversed(!t1.reversed());
  });

  $('.main-menu ul li a').on('click', function (e) {
    e.preventDefault();

    var url = $(this).attr('href');

    if (url != '#') {
      t1.reversed(!t1.reversed());
      setTimeout(() => {
        $(location).attr('href', url);
      }, 2000);
    }

  });


 // Isotope Filter
  var $container = $('.work-gallery');
  $container.imagesLoaded().progress(function () {
    $container.isotope();
  });

  $('.portfolio-filter li').on('click', function () {
    $(".portfolio-filter li").removeClass("active");
    $(this).addClass("active");
    var selector = $(this).attr('data-filter');
    $container.imagesLoaded().progress(function () {
      $container.isotope({
        filter: selector,
      });
    });
    return false;
  });


//Testimonials
  $('.testmonial_active').owlCarousel({
    loop: true,
    margin: 0,
    items: 1,
    autoplay: true,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    nav: true,
    dots: false,
    autoplayHoverPause: true,
    autoplaySpeed: 800,
    responsive: {
      0: {
        items: 1,
        dots: false,
        nav: true
      },
      767: {
        items: 1,
        dots: false,
        nav: true
      },
      992: {
        items: 1,
        dots: false,
        nav: true
      },
      1200: {
        items: 1,
        dots: false,
        nav: true
      },
      1500: {
        items: 1,
        dots: false,
        nav: true
      }
    }
  });

  // Logo Clients Carusel
  $('.logo-slider').owlCarousel({
    center: false,
    loop: true,
    stagePadding: 0,
    margin: 0,
    smartSpeed: 1000,
    autoplay: true,
    autoplayHoverPause: true,
    dots: false,
    nav: false,
    responsive: {
      400: {
        items: 1
      },
      768: {
        items: 1
      },
      1000: {
        items: 5
      }
    }
  });


// go to top
$(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
        $('#back-to-top').fadeIn();
    } else {
        $('#back-to-top').fadeOut();
    }
});
// scroll body to 0px on click
$('#back-to-top').on('click', function () {
$('body,html').animate({
  scrollTop: 0
}, 800);
return false;
});


})(jQuery);



































// Cursor
function Cursor() {

  var cursor = $(".cursor"),
    follower = $(".cursor-follower");

  var posX = 0,
    posY = 0,
    mouseX = 0,
    mouseY = 0;

  TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
      posX += (mouseX - posX) / 9;
      posY += (mouseY - posY) / 9;

      TweenMax.set(follower, {
        css: {
          left: posX - 25,
          top: posY - 25
        }
      });

      TweenMax.set(cursor, {
        css: {
          left: mouseX - 5,
          top: mouseY - 5
        }
      });
    }
  });

  const link = document.querySelectorAll('.hover-this');

  const animateit = function (e) {
    const span = this.querySelector('span');
    const {
      offsetX: x,
      offsetY: y
    } = e, {
      offsetWidth: width,
      offsetHeight: height
    } = this,

    move = 25,
      xMove = x / width * (move * 2) - move,
      yMove = y / height * (move * 2) - move;

    span.style.transform = `translate(${xMove}px, ${yMove}px)`;

    if (e.type === 'mouseleave') span.style.transform = '';
  };


  $(document).on('mousemove', function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  $(".portfolio-item").on('mouseenter', function () {
    cursor.addClass("active");
    follower.addClass("active");
  });

  $(".portfolio-item").on('mouseleave', function () {
    cursor.removeClass("active");
    follower.removeClass("active");
  });


  $(".cursor-item").on('mouseenter', function () {
    cursor.addClass("active");
    follower.addClass("active");
  });

  $(".cursor-item").on('mouseleave', function () {
    cursor.removeClass("active");
    follower.removeClass("active");
  });


  link.forEach(b => b.addEventListener('mousemove', animateit));
  link.forEach(b => b.addEventListener('mouseleave', animateit));
  window.addEventListener('mousemove', editCursor);
}