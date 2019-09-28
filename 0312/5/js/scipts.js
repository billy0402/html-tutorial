// Easing函數使用: easings.net/zh-tw

$(function () {
    // 滑鼠移入	
    $('.news').mouseenter(function () {
        $(this).stop().animate(
            {
                marginTop: -10
            },
            {
                duration: 300,
                easing: 'easeOutBounce'
            });
    });

    // 滑鼠移出	
    $('.news').mouseleave(function () {
        $(this).stop().animate(
            {
                marginTop: 0
            },
            {
                duration: 300,
                easing: 'easeInOutBounce'
            });
    });
});