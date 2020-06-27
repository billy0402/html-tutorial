const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');
var selectIndex = 0;

const bannerImage = document.getElementById('banner-image');
const bannerLink = document.getElementById('banner-link');
const brands = ['apple', 'google', 'samsung'];

// 左邊箭頭點擊事件
arrowLeft.onclick = function (e) {
    selectIndex -= 1;
    if (selectIndex < 0) {
        selectIndex = brands.length - 1;
    }

    changeBanner(brands[selectIndex]);
};

// 右邊箭頭點擊事件
arrowRight.onclick = function (e) {
    selectIndex += 1;
    if (selectIndex > brands.length - 1) {
        selectIndex = 0;
    }

    changeBanner(brands[selectIndex]);
};

// 變更 banner
function changeBanner(index) {
    bannerImage.src = `images/${index}-logo.jpg`;
    bannerLink.href = `${index}.html`;
}