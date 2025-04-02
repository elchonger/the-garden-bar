(function($) {
    'use strict';
    $(document).ready(function() {


        $('.ct-menuSection .ct-topSection .ct-menuList li').on("click",function (e) {

            var panelOffset = $(".ct-menuSection .ct-bottomSection").offset().top;

            if($devicewidth>991) {
                $("body,html").animate({scrollTop: panelOffset - 155}, 800);
            }
            else if (($devicewidth<=991) && ($devicewidth>=768)) {
                $("body,html").animate({scrollTop: panelOffset - 118}, 800);
            }
            else if ($devicewidth<=767) {
                $("body,html").animate({scrollTop: panelOffset}, 800);
            }

            e.preventDefault();
        });


      /*Showing modal when icon is clicked*/
        var $iconRestaurant = $(".ct-menuSection .ct-bottomSection .ct-tabsContent .ct-rightSide .ct-rightSideContent .ct-menu ul.ct-dottedBox li.ct-dottedMenu .ct-photo");
        $("img",$iconRestaurant).on('click',function(){
            var $this = $(this);
            $this.toggleClass('ct-visible');
            if ($this.hasClass('ct-visible')) {
                createModal();
                disable_scroll();
                $("body").find(".ct-modal span").on("click", function(){
                    $(".ct-modal").fadeOut("slow", function(){
                        removeModal();
                        enable_scroll();
                        $iconRestaurant.find("img").removeClass('ct-visible');
                    });
                })
            }
            else {
                removeModal();
                enable_scroll();
            }
        });


        function preventDefault(e) {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        function wheel(e) {
            preventDefault(e);
        }

        function disable_scroll() {
            if (window.addEventListener) {
                window.addEventListener('DOMMouseScroll', wheel, false);
            }
            window.onmousewheel = document.onmousewheel = wheel;
        }
        function enable_scroll() {
            if (window.removeEventListener) {
                window.removeEventListener('DOMMouseScroll', wheel, false);
            }
            window.onmousewheel = document.onmousewheel = null;
        }

        function createModal() {
            $("<div class='ct-modal'><img src='../assets/images/demo-content/booze/gallery5.jpg' class='grayscale grayscale-fade' alt='Image'/><span></span></div></div>").fadeIn("slow").prependTo("body");

        }

        function removeModal() {
            $("body").find(".ct-modal").fadeOut("slow", function(){
                $(this).detach();
            })

        }

      /*Fixing the bugs*/

        if ($.browser.msie) {
            var $galler = $("body").find(".ct-gallery ._js-lightGallery a");
            $galler.each(function(){
                if ($(this).hasClass('grayscale grayscale-fade')) {
                    $(this).removeClass('grayscale grayscale-fade')
                }
            });
        }

        if(device.mobile() || device.tablet()){
            $("body").find(".ct-gallerySection .ct-topContent .ct-imageComponent .ct-gallery-filters").each(function(){
                $(this).find("li a span").remove();
            })

            $("body").find(".ct-menuSection .ct-topSection .ct-menuList li a").each(function(){
                $(this).find("img").last().remove();
            });
        }

      /*Clicking on the restaurant menu section*/

        var $menuList = $("body").find(".ct-menuList"), $contentList = $("body").find(".ct-menuSection .ct-bottomSection");

        if (($($menuList).is(":visible")) && (!(device.mobile))) {
            $menuList.each(function(){

                var $navbarHeight;
                if($devicewidth < 768){
                    $navbarHeight = 0;
                }
                else {
                    $navbarHeight = $("body").find(".navbar-fixed-top").innerHeight();
                }
                $(this).children().find("a").on("click",function(e){

                    $("body, html").animate({
                        scrollTop: $contentList.offset().top-($navbarHeight)
                    }, 1200);

                    e.preventDefault();
                })
            });
        }
      /*------------------------------------------------------*/

        if ($('.jumbotron').length > 0){
            $('.ct-newsletterBox input').on('focusout', function(){
                var t = $(this),
                    k = t.closest('.jumbotron');
                k.addClass('animated')
                if ($(this).val().length != 0){
                    k.removeClass('animated')
                } else {
                    k.addClass('animated')
                }
            }).focus(function(){
                var t = $(this);
                t.closest('.jumbotron').removeClass('animated')
            });
        }

      /*Menu setting as a small < 991px */

        var menu = $("body").find(".navbar.navbar-default");

        if ($(menu).hasClass("navbar-fixed-top") && (($devicewidth<=991))) {
            $(menu).find("ul.ct-leftSide, ul.ct-rightSide ").css({
                paddingTop: 50,
                paddingBottom: 48
            }).parent(menu).find(".navbar-brand img").css('width',70 + '%');
        }


      /*Contactt Form*/

        if (!(device.mobile())) {
            if ($(".input-typeFirst").length > 0) {
                $(".input-typeFirst").each(function () {
                    var $this = $(this);

                    $this.on('focus', function (e) {
                        $this.toggleClass('ct-added');

                        if ($(".input-typeFirst").hasClass('ct-added')) {
                            $(".input-typeFirst").closest("div").addClass('special');
                          /* Map section*/
                            var $map = $(".ct-mapSection");
                            $map.addClass("special");
                        }

                        e.preventDefault();
                    })
                })
            }
        }

        $(document).on("mouseup",function (e) {
            var $input = $(".input-typeFirst");

            if (!$('.input-typeFirst').is(e.target)) {
                if (!$input.is(e.target) && $input.has(e.target).length === 0)  // if the target of the click isn't the container...
                {
                    if ($(".input-typeFirst").closest("div").hasClass('special')) {
                        var $map = $(".ct-mapSection");
                        $map.removeClass("special");
                        $(".input-typeFirst").closest("div").removeClass('special');
                        //$(".input-typeFirst").css('border-color','red');
                    }
                }
            }
        });

      /*Add Icon Size*/
        $(".ct-js-iconSize").each(function () {
            $(this).css("font-size", $(this).attr("data-icon-size") +'px')
        })
      /*Add Icon Position*/
        $(".ct-js-position").each(function(){
            $(this).css("top", $(this).attr("data-top") +'px')
            $(this).css("right", $(this).attr("data-right") +'px')
            $(this).css("left", $(this).attr("data-left") +'px')
            $(this).css("bottom", $(this).attr("data-bottom") +'px')
        })
      /*Add Size to the button*/
        $(".ct-js-btnSize").each(function(){
            $(this).css("padding-left", $(this).attr("data-padding-left") +'px');
            $(this).css("padding-right", $(this).attr("data-padding-right") +'px');
        })
      /*Add Background Image*/
        $(".ct-js-background").each(function(){
            if ($(this).attr("data-bg")) {
                $(this).css("background-image", 'url(' + $(this).attr("data-bg") + ')')
            }
        });

      /*Add position to Special Offer span*/

        $(".ct-js-specialOffer").each(function(){
            if ($(this).attr('data-left-position')) {
                $(this).css({
                    'left': $(this).attr('data-left-position') + 'px'
                })
            }
        })

        var url;

      /* Browsers */
        if ($.browser.mozilla) {
            el_html.addClass('browser-mozilla');
        }
        if ($.browser.msie) {
            el_html.addClass('browser-msie');
        }
        if ($.browser.webkit) {
            el_html.addClass('browser-webkit');
        }
        if ($.browser.safari) {
            el_html.addClass('browser-safari');
        }

      /* Background Color */
        set_background();

      /* Height */
        set_height();

      /* Page Scroll */
        $('[data-scroll]').on('click', function(e) {
            var scroll;
            e.preventDefault();
            scroll = $(this).attr('data-scroll');
            if (scroll === 'up') {
                $('html, body').animate({
                    scrollTop: 0
                }, 900, 'swing');
            } else if (scroll.charAt(0) === '#') {
                if (device.mobile()) {
                    $('html, body').animate({
                        scrollTop: $(scroll).offset().top - 55
                    }, 900, 'swing');
                } else {
                    $('html, body').animate({
                        scrollTop: $(scroll).offset().top-155
                    }, 900, 'swing');
                }
            }
            return false;
        });

      /* Skrollr Parallax */

        $('[data-parallax]').each(function() {
            var $this, attr;
            $this = $(this);
            attr = $this.attr('data-parallax');
            $this.attr('data-top-bottom', 'background-position: 50% -' + attr + 'px');
            $this.attr('data-bottom-top', 'background-position: 50% ' + attr + 'px');
            $this.attr('data-center', 'background-position: 50% 0px');
        });

      /* Selectize */
        if ($().selectize) {
            $('select').each(function() {
                $(this).selectize({
                    create: true
                });
            });
        }

      /* Navbar Active Class */
        var url = window.location;
        $('.navbar').find('a').filter(function() {
            return this.href === url.href;
        }).closest('.navbar-nav > li').addClass('active');


      /* Link Scroll to Section */
        function goToByScroll(id) {
            if (($("body").find(".navbar-default").hasClass("navbar-fixed-top")) && ($devicewidth>768)) {
                $('html,body').animate({scrollTop: $(id).offset().top - 115}, 'slow');
            }
            else {
                $('html,body').animate({scrollTop: $(id).offset().top}, 'slow');
            }
        }

        $('body .ct-js-btnScroll').on("click",function () {
            goToByScroll($(this).attr('href'));
            return false;
        });

        // to Top Button //
        $('.ct-js-btnScrollUp').on("click",function (e) {
            e.preventDefault();
            $("body,html").animate({scrollTop: 0}, 1200);
            $(".navbar-fixed-top li").removeClass('is-active');
            $(".navbar-fixed-top .ct-leftSide li").filter(":first-child").addClass('is-active');
        });



      /*Events method when click on the button*/
        var aElements = $("a.btn");
        var section = $(".ct-events").find($(aElements));

        $(section).on("click",function(){
            $(this).addClass("animated activate pulse");

            var timeoutID = setTimeout(function(){
                $(section).removeClass("animated activate pulse"); // after 1s the classess are deleted
            }, 1000);
        });


      /*Booking sidebar*/

        var btn = $("body").find(".ct-js-bookBtn"),
            book = $("body").find(".ct-bookTable"),
            show = false; // if the element is show on the start

        function ctshow() {
            $(btn).css({
                opacity : 1,
                transition: 'opacity .55s ease-in-out'
            })
        }
        function cthide() {
            $(btn).css({
                opacity: 0,
                transition: 'opacity .55s ease-in-out'
            })
        }

        if ($(book).length >0) {
            if (show) {
                $(book).css('left',0); // show the element
                $(book).addClass('ct-opened');
            }
            else {
                $(book).css('left',-285); //hide element
            }

            $(btn).on("click", function (e) {
                $(book).toggleClass('ct-opened');

                if (show) {
                    $(book).animate({
                        left: '-' + $(book).width()
                    }, 500);
                    show = false;
                }
                else {
                    $(book).animate({
                        left: 0
                    }, 500);
                    show = true;
                }

                if ($(book).hasClass('ct-opened')) {
                    $(book).mouseleave(function(){
                        cthide();
                    }).mouseenter(function(){
                        ctshow();

                    })
                    $(btn).mouseenter(function(){
                        ctshow();
                    }).mouseleave(function() {
                        ctshow();
                    })
                }
                else {
                    $(book).mouseleave(function() {
                        $(btn).show();
                        $(btn).css('opacity',1);
                    });
                }

                e.preventDefault();
            });
        }


      /*Bookin btn***********************************************/

        $("body").find(".ct-anotherBook").on("click",function(e){

            //$(".ct-bookTable").toggleClass('ct-opened');

            $(book).toggleClass('ct-opened');

            if (show) {
                $(book).animate({
                    left: '-' + $(book).width()
                }, 500);
                show = false;
                //ctshow();
            }
            else {
                $(book).animate({
                    left: 0
                }, 500);
                show = true;
                //cthide();


                $(book).mouseenter(function() {
                    cthide();
                })
                $(book).mouseleave(function() {
                    ctshow();
                })
            }
            e.preventDefault();
        })

      /* Mobile menu*/

        var ctButton = $("body").find('.ct-button .navbar-toggle');
        ctButton.on('click',function(e) {
            $(this).toggleClass('open');

            if ($('.ct-menuMobile').hasClass('ct-open')) {
                $('.ct-menuMobile').animate({
                    'right' : -250
                },500)
                $('.ct-button').animate({
                    'right' : 26
                },500)
            }
            else {
                $('.ct-menuMobile').animate({
                    'right' : 0
                },500)
                $('.ct-button').animate({
                    'right' : 250
                },500)
            }
            $("body").find('.ct-menuMobile').toggleClass('ct-open');
            e.preventDefault();
        });

        $('.ct-menuMobile .ct-menuMobile-navbar .dropdown > a').on("click",function(e) {
            return false; // iOS SUCKS
        })
        $('.ct-menuMobile .ct-menuMobile-navbar .dropdown > a').on("click",function(e){
            var $this = $(this);
            if($this.parent().hasClass('open')){
                $(this).parent().removeClass('open');
            } else{
                $(this).parent().addClass('open');
            }
            return false; // iOS SUCKS
        })

      /*One Page Scroller*********/

        if ($().pageScroller) {
            if($devicewidth < 768){
                $('body').pageScroller({
                    navigation: '.ct-menuMobile ul li.onepage', sectionClass: 'onepager', scrollOffset: 0
                });
            } else{
                $('body').pageScroller({
                    navigation: '.navbar-fixed-top ul li.onepage', sectionClass: 'onepager', scrollOffset: -115
                });
            }
        }
        $(".navbar-fixed-top .ct-leftSide li:first-child").addClass('is-active');

      /*Article - grayscale********************/

        var article = $(".ct-article .ct-article-content");

        article.hover(function(){
            $(this).prev().find("img").removeClass("grayscale").addClass("grayscale-fade");
        },function(){
            $(this).prev().find("img").addClass("grayscale").addClass("grayscale-fade");
        });

//Load All button. Loading the posts with ajax

        var blog = $(".ct-blogSection"),
            loadAllBtn = $(".ct-js-loadAll");

        $(loadAllBtn).on('click',function(e) {
            var urlAddress = $(this).attr("data-url");
            if ( (blog.length>0) && (!($(this).hasClass('ct-clicked'))) ) {
                $(this).addClass('ct-clicked');
                $.ajax({
                    url : urlAddress,
                    timeout: 2500,
                    cache: false,
                    success: function(html) {
                        var $this = $(html)
                        var content = $(".ct-blogSection .container-fluid .row:nth-child(2)");
                        content.append($this);
                        $(".ct-hideComponent").fadeIn();
                        $(".ct-buttonComponents").hide();

                      /* Skrollr */

                        $("[data-parallax]").css('background-attachment','initial');

                    },
                    beforeSend: function() {
                        //content.html("Loading");
                    },
                    error: function(){
                        content.html("<strong>Occurred error! Please try again !!!</strong>");
                    }
                })
            }
            else {
                $(this).removeClass().detach();
            }
            e.preventDefault('ct-clicked');
        })

    });
    $(window).on('scroll', function() {

      /*Menu**************************************************/
        var menu = $("body").find(".navbar.navbar-default");
        var scroll = $(window).scrollTop();

      /*Changing the size of the menu*/

        if ($devicewidth>991) {
            if (!($.browser.mozilla) && !($.browser.msie)) {
                if (((scroll > 1) && (scroll < 150)) && ($(menu).hasClass("navbar-fixed-top") && $(menu).hasClass("ct-menu--color"))) {
                    // if ($(menu).hasClass("navbar-fixed-top") && $(menu).hasClass("ct-menu--color")) {

                    var maxWidth200 = {'max-width': '200px'};

                    $(menu).find("ul.ct-leftSide, ul.ct-rightSide ").animate({
                        paddingTop: 50,
                        paddingBottom: 48
                    }, 200).parent(menu).find(".navbar-brand img").animate(
                        maxWidth200
                        , 200)
                    //}
                }
                else if (scroll <= 1) {
                    var maxWidth100 = {'max-width': '100%'};

                    $(menu).find("ul.ct-leftSide, ul.ct-rightSide ").animate({
                        paddingTop: 65,
                        paddingBottom: 70
                    }, 100).parent(menu).find(".navbar-brand img").animate(
                        maxWidth100
                        , 100)
                }
            }
        }
    });
    $(window).on('load', function() { //ppp

      /* Skrollr */
        var skroll;
        if (!device.mobile() && !device.tablet() && !el_html.hasClass('ie8')) {
            skroll = skrollr.init({
                forceHeight: false
            });
        }

        // Loader //----------------------------------------------------------------
        var $preloader = $('.ct-preloader');
        var $content = $('.ct-preloader-content');


        var $timeout = setTimeout(function(){
            $($preloader).addClass('animated').addClass('fadeOut');
            $($content).addClass('animated').addClass('fadeOut');

        }, 0);
        var $timeout2 = setTimeout(function(){
            $($preloader).css('display', 'none').css('z-index', '-9999');
        }, 500);


    });
})(jQuery);
