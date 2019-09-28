$(function () {
    //--------------------------------------
    $('.news').mouseenter(function () {
        $(this).find('h2').stop().animate({ bottom: 0 }, { duration: 400, easing: 'easeOutElastic' });
    })

    $('.news').mouseleave(function () {
        $(this).find('h2').stop().animate({ bottom: -40 }, { duration: 50 });
    })
    //--------------------------------------
    $('.news').mouseenter(function () {
        $(this).find('img').stop().animate({ width: 300, top: -40, left: -40 }, { duration: 400, easing: 'easeOutElastic' });
    })
    $('.news').mouseleave(function () {
        $(this).find('img').stop().animate({ width: 220, top: 0, left: 0 }, { duration: 50 });
    })
    //--------------------------------------
});