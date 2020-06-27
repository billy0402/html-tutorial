// 建立頁首
function createHeader() {
    document.getElementById('header').innerHTML = `
        <a class="logo-row" href="index.html">
            <img class="logo" src="images/logo.png">
            <label class="name">手機品牌介紹</label>
        </a>

        <div class="link-row">
            <a href="contacts.html">聯絡我們</a>
            <button type="submit" onclick="alert('尚未開放');">會員登入</button>
        </div>
    `;
}

// 建立頁尾
function createFooter() {
    document.getElementById('footer').innerHTML = `
        <p> Copyright &copy; 2020 D1064242003 黃冠庭 保留一切權利。 </p>
    `;
}

// 建立左右連結區塊
function createSlider() {
    const sliderText = `
        <ul>
            <li><a href="apple.html">Apple</a></li>
            <li><a href="google.html">Google</a></li>
            <li><a href="samsung.html">Samsung</a></li>
        </ul>
    `;
    document.getElementById('left-slider').innerHTML = sliderText;
    document.getElementById('right-slider').innerHTML = sliderText;
}

createHeader();
createFooter();
createSlider();