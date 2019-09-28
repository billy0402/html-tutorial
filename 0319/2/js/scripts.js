$(function () {
    var isOpened = true;

    //------------------------------------------------------
    $('.news').mouseenter(function () {
        //怎麼動 & 動多久 & 加速度
        $(this).stop().animate({ top: -10 }, { duration: 500, easing: 'easeOutBounce' });
    });

    $('.news').mouseleave(function () {
        //怎麼動 & 動多久 & 加速度
        $(this).stop().animate({ top: 0 }, { duration: 50, easing: 'easeInOutElastic' });
    });
    //------------------------------------------------------

    //------------------------------------------------------
    $('.logo').mousedown(function () {
        if (isOpened) {
            //怎麼動 & 動多久 & 加速度
            $(this).parent().stop().animate({ top: -80 }, { duration: 500, easing: 'easeOutBounce' });
            //開始 & 結束 & 時間
            $(this).rotate({ angel: 0, animateTo: 180, duration: 1000 })
            //怎麼動 & 動多久 & 加速度
            $(this).animate({ top: 40 }, { duration: 500, easing: 'easeOutBounce' });
            isOpened = false;
        } else {
            //怎麼動 & 動多久 & 加速度
            $(this).parent().stop().animate({ top: 0 }, { duration: 500, easing: 'easeOutBounce' });
            //開始 & 結束 & 時間
            $(this).rotate({ angel: 180, animateTo: 360, duration: 1000 })
            //怎麼動 & 動多久 & 加速度
            $(this).animate({ top: 20 }, { duration: 500, easing: 'easeOutBounce' });
            isOpened = true;
        }
    })
    //------------------------------------------------------
});