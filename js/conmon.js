// ■■■■■■■■ calcular la edad y tiempo de estadia
function calculateAge(birthday) {
    let birthday_arr = birthday.split("/"),
        birthday_date = new Date(birthday_arr[2], birthday_arr[1] - 1, birthday_arr[0]),
        ageDifMs = Date.now() - birthday_date.getTime(),
        ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
let age = calculateAge("23/10/1982"),
    daughter = calculateAge("16/04/2015"),
    stay = calculateAge("09/06/2001");
document.getElementById("age").innerHTML = age;
document.getElementById("daughter").innerHTML = daughter;
document.getElementById("stay").innerHTML = stay;


// ■■■■■■■■ JOBS hover animation 
$(function() {
    'use strict';
    let mediaSP = window.matchMedia("(max-width:990px)"),
        mediaPC = window.matchMedia("(min-width:991px)");
    $("#container ul >li").each(function() {
        var now = $(this),
            imagesDiv = now.find('.images'),
            summaryDiv = now.find('.summary'),
            left = now.find(".left"),
            center = now.find(".center"),
            right = now.find(".right"),
            forLeft = now.find(".summary .forLeft"),
            forCenter = now.find(".summary .forCenter"),
            forRight = now.find(".summary .forRight"),
            video = imagesDiv.find('>div'),
            videoHeight = video.height(),
            videoLeft = left.find("video"),
            videoCenter = center.find("video"),
            videoRight = right.find("video"),
            //videoHeight = $(".dock").find("video").height(),
            imgHeight = now.find("img").height();

        //now.height(videoHeight);

        if (mediaPC.matches) {
            ImageDivHeight();
            $(window).resize(function() {
                ImageDivHeight();
            });
        }

        function ImageDivHeight() {
            let now2 = now.not('.dental, .auone'),
                imagesDiv = now2.find('.images'),
                videoHeight = video.height();
            imagesDiv.height(videoHeight);
        }

        // hover left block
        left.hover(function() {
            forLeft.addClass("activeHover");
            if ($(this).find("video").length > 0) {
                videoLeft[0].play();
            }
        }, function() {
            forLeft.removeClass("activeHover");
            if ($(this).find("video").length > 0) {
                videoLeft[0].pause();
            }

        });

        //hover center block
        center.hover(function() {
            forCenter.addClass("activeHover");
            if ($(this).find("video").length > 0) {
                videoCenter[0].play();
            }

        }, function() {
            forCenter.removeClass("activeHover");
            if ($(this).find("video").length > 0) {
                videoCenter[0].pause();
            }

        });

        //hover right block
        right.hover(function() {
            forRight.addClass("activeHover");
            if ($(this).find("video").length > 0) {
                videoRight[0].play();
            }

        }, function() {
            forRight.removeClass("activeHover");
            if ($(this).find("video").length > 0) {
                videoRight[0].pause();
            }

        });


        forLeft.hover(function() {
            left.addClass("activeHover");
            if (left.find("video").length > 0) {
                videoLeft[0].play();
            }

        }, function() {
            left.removeClass("activeHover");
            if (left.find("video").length > 0) {
                videoLeft[0].pause();
            }

        });
        forCenter.hover(function() {
            center.addClass("activeHover");
            if (center.find("video").length > 0) {
                videoCenter[0].play();
            }

        }, function() {
            center.removeClass("activeHover");
            if (center.find("video").length > 0) {
                videoCenter[0].pause();
            }

        });
        forRight.hover(function() {
            right.addClass("activeHover");
            if (right.find("video").length > 0) {
                videoRight[0].play();
            }

        }, function() {
            right.removeClass("activeHover");
            if (right.find("video").length > 0) {
                videoRight[0].pause();
            }

        });

    });
});

// ■■■■■■■■ tomar el tamano de window para cada section

// tomar el tamano de window para cada section
function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.sect01').css('min-height', windowHeight);
    $('#particle-canvas').css('min-height', windowHeight);
    // $('.sect02').css('min-height', windowHeight);
    // $('.sect03').css('min-height', windowHeight);
    // $('.sect04').css('min-height', windowHeight);
    // $('.sect05').css('min-height', windowHeight + 1);
};
setHeight();
$(window).resize(function() {
    setHeight();
});


// ■■■■■■■■ smoth scroll -- Nav animation -- 
$(function() {
    var nav = $('#nav'),
        navLogo = nav.find('.logo'),
        navList = nav.find('.nav_list'),
        navItem = navList.find('a'),
        menuIcon = $('.hamburger_menu'),
        $window = $(window),
        scrollDistance = $window.scrollTop(),
        mediaSP = window.matchMedia("(max-width:990px)"),
        mediaPC = window.matchMedia("(min-width:991px)"),
        top_url = navList.find('li:nth-child(1) a').attr('href');
    $('.logo').find('a').attr('href', top_url);

    $('.logo a').click(function(e) {
        e.preventDefault();
        var href = $(this).attr("href");
        var offsetTop = href === "#" ? 0 : $(href).offset().top;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 800);
    });

    // SP hacer la animacion hamburger menu y show-hide del Nav
    menuIcon.on('click', function(e) {
        e.preventDefault();
        nav.toggleClass('animate_for_nav');
        nav.nextAll().toggleClass('bur');
        $(this).toggleClass('animate_for_menuIcon');
        $(this).find('#nav-icon1').toggleClass('open');
    });

    // Para PC animacion de Nav y add-removeclass
    function navOpen() {
        if (mediaSP.matches) {
            nav.addClass('spNav').removeClass('pcNav horizontal__nav');
        } else {
            nav.removeClass('spNav').addClass('pcNav');
            let newScrollDistance = $window.scrollTop()
            if (newScrollDistance >= 400) {
                nav.addClass('horizontal__nav');
                navLogo.css('display', 'block');
            } else {
                nav.removeClass('horizontal__nav');
                navLogo.css('display', 'none');
            }
        }
    }
    $(function() {
        navOpen();
    });
    window.addEventListener("resize", navOpen);

    // Smoth scroll
    navItem.on('click', function(e) {
        e.preventDefault();
        let $this = $(this),
            href = $this.attr("href"),
            topY = $(href).offset().top + 1;
        TweenMax.to($window, 1, {
            scrollTo: {
                y: topY,
                autoKill: true
            },
            ease: Power3.easeOut
        });
        return false;
    });

    navItem.on('click', function(e) {
        e.preventDefault();
        let href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top + 1;
        //var offsetTop2 = href === "#" ? 0 : $(href).offset().top + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 800);

        // if ($(window).innerWidth() > 991) {
        //     $('html, body').stop().animate({
        //         scrollTop: offsetTop
        //     }, 800);
        // } else {
        //     $('html, body').stop().animate({
        //         scrollTop: offsetTop2
        //     }, 800, function () {
        //         $('.nav').addClass('animate_for_nav2');
        //         $('.nav').removeClass('animate_for_nav');
        //         $('.nav').nextAll().removeClass('bur');
        //         $('.openMenu').addClass('animate_for_menuIcon2');
        //         $('.openMenu').removeClass('animate_for_menuIcon');
        //         $('.nav').removeClass('animate_for_nav2');
        //         $('#nav-icon1').removeClass('open');
        //         $('.openMenu').removeClass('animate_for_menuIcon2')
        //     });
        // }


    });








    // Detectar la pocicion de las sectiones y activar Nav Items list
    $window.on('scroll', function() {
        let scrollDistance = $window.scrollTop();
        $('main > section').each(function(i) {
            if ($(this).position().top <= scrollDistance) {
                navList.find('li.active').removeClass('active');
                navList.find('li').eq(i).addClass('active');
            }
        });
        navOpen();
    }).scroll();

    if (mediaPC.matches && !(scrollDistance >= 400)) {
        gsap.from(".nav_list li", {
            duration: 1,
            delay: 1.5,
            opacity: 0,
            x: () => Math.random() * 400 - 200,
            y: () => Math.random() * 400 - 200,
            stagger: 0.25,
            ease: "bounce"
        })
    }

});


// ■■■■■■■■function animateFrom(elem, direction) {
function animateFrom(elem, direction) {
    direction = direction | 1;

    var x = 0,
        y = direction * 100;
    if (elem.classList.contains("gs_reveal_fromLeft")) {
        x = -150;
        y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
        x = 150;
        y = 0;
    }
    gsap.fromTo(elem, {
        x: x,
        y: y,
        autoAlpha: 0
    }, {
        duration: 1.25,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "power4.out",
        overwrite: "auto"
    });
}

function hide(elem) {
    gsap.set(elem, {
        autoAlpha: 0
    });
}

function show(elem) {
    gsap.set(elem, {
        autoAlpha: 1
    });
}

// Gsap animation
document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
        hide(elem); // assure that the element is hidden when scrolled into view

        ScrollTrigger.create({
            trigger: elem,
            toggleActions: "play reset reset reset",
            onEnter: function() {
                animateFrom(elem)
            },
            onEnterBack: function() {
                    show(elem)
                }
                // onLeave: function() {
                //     hide(elem)
                // }
        });
    });
});

window.onload = function() {
    var element = document.getElementsByTagName('video');
    element.muted = "muted";
}