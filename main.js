let dvd = document.getElementById('dvd');
let dvd2 = document.getElementById('dvd2');
let dvd3 = document.getElementById('dvd3');


let x_inc = 3;
let y_inc = 3;

let x2_inc = 4;
let y2_inc = 4;

let x3_inc = 6;
let y3_inc = 6;

let colour = 0;
let click_counter = 0;

let dvd2_click = 10;
let dvd3_click = 20;

function init() {

    dvd.style.position = 'absolute';
    dvd.style.zIndex = 2;

    dvd2.style.position = 'absolute';
    dvd2.style.zIndex = 2;
    dvd2.style.left = (window.innerWidth - 300) + "px";

    dvd3.style.position = 'absolute';
    dvd3.style.zIndex = 2;
    dvd3.style.top = (window.innerHeight - 201) + "px";

    setInterval(frame, 5);

}

function update_colour(){
    if (colour >= 360){
        colour = 0;
    }
    dvd.style.filter = `hue-rotate(${colour}deg)`;
    colour++;
    colour++;
}

function handle_collision() {

    let dvd_height = dvd.offsetHeight;
    let dvd_width = dvd.offsetWidth;
    let dvd_top = dvd.offsetTop;
    let dvd_left = dvd.offsetLeft;
    let win_height = window.innerHeight;
    let win_width = window.innerWidth;

    if (dvd_left <= 0 || dvd_left + dvd_width >= win_width) {
        x_inc = ~x_inc + 1;
    }

    if (dvd_top <= 0 || dvd_top + dvd_height >= win_height) {
        y_inc = ~y_inc + 1;
    }

}

function handle_collision2() {

    let dvd_height = dvd2.offsetHeight;
    let dvd_width = dvd2.offsetWidth;
    let dvd_top = dvd2.offsetTop;
    let dvd_left = dvd2.offsetLeft;
    let win_height = window.innerHeight;
    let win_width = window.innerWidth;

    if (dvd_left <= 0 || dvd_left + dvd_width >= win_width) {
        x2_inc = ~x2_inc + 1;
    }

    if (dvd_top <= 0 || dvd_top + dvd_height >= win_height) {
        y2_inc = ~y2_inc + 1;
    }

}

function handle_collision3() {

    let dvd_height = dvd3.offsetHeight;
    let dvd_width = dvd3.offsetWidth;
    let dvd_top = dvd3.offsetTop;
    let dvd_left = dvd3.offsetLeft;
    let win_height = window.innerHeight;
    let win_width = window.innerWidth;

    if (dvd_left <= 0 || dvd_left + dvd_width >= win_width) {
        x3_inc = ~x3_inc + 1;
    }

    if (dvd_top <= 0 || dvd_top + dvd_height >= win_height) {
        y3_inc = ~y3_inc + 1;
    }

}

function frame() {

    handle_collision();

    update_colour();
    dvd.style.top = dvd.offsetTop + y_inc;
    dvd.style.left = dvd.offsetLeft + x_inc;

    if(click_counter >= dvd2_click){
        handle_collision2();
        dvd2.style.top = dvd2.offsetTop + y2_inc;
        dvd2.style.left = dvd2.offsetLeft + x2_inc;
    }
    if(click_counter >= dvd3_click){
        handle_collision3();
        dvd3.style.top = dvd3.offsetTop + y3_inc;
        dvd3.style.left = dvd3.offsetLeft + x3_inc;
    }

}

function pick_image(){
    let audioElement = new Audio("./err_sound.mp3");
    audioElement.volume = 0.5;
    audioElement.play();
    audioElement.remove();

    click_counter++;
    if(click_counter == dvd2_click){
        dvd2.style.display = "block";
    }
    if(click_counter == dvd3_click){
        dvd3.style.display = "block";
    }

    let img_num = Math.floor(Math.random() * 4) + 1;
 
    let err_container = document.getElementById("err-container");
    let img = document.createElement("img");
    img.src = `./err${img_num}.png`;
    img.style.zIndex = 1;
    img.style.left = Math.floor(Math.random() * (window.innerWidth - 200)) + "px";
    img.style.top = Math.floor(Math.random() * (window.innerHeight - 150)) + "px";
    err_container.insertBefore(img, null);

    let opacity = 1.0;

    function set_opacity() {
        if (opacity <= 0) { 
            img.remove();
            return; 
        }

        img.style.opacity = opacity;
        opacity = opacity - 0.01;
        setTimeout(set_opacity, 50);
    }

    setTimeout(set_opacity, 50);
}

dvd.addEventListener('click', pick_image);
dvd2.addEventListener('click', pick_image);
dvd3.addEventListener('click', pick_image);

init();