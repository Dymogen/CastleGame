let stop = false;
elemText = document.getElementById("text");
let fillText;


function anim(str)
{
    for (let i = 0; i < str.length; i++)
    {
        setTimeout(() => { writingTextStyle(); elemText.textContent = str.substring(0, i + 1) }, i * 100);
    }
}
function writingTextStyle()
{
    const width = 2 * blockSize * drawScale;
    elemText.style.fontSize = (dialogFontSize * drawScale) + "px";
    elemText.style.width = width + "px";
    elemText.style.left = (window.innerWidth - width) / 2 + "px";
    elemText.style.top = window.innerHeight / 2 - width + "px";
    elemText.style.display = "block";
}
function dialogue(numb)
{
    if (numb == 1)
    {
        stop = true;
        fillText = "Привет игрок! Ты находишься в замке, надо найти выход & отыскать всё необходимое для этого. По дороге ты будешь получать подсказки, на разноцветных блоках. Удачи!";
        anim(fillText);
        setTimeout(() => { elemText.style.display = "none"; stop = false; elemText.innerHTML = "" }, fillText.length * 100 + 500);
    }
}