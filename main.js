let dvd = document.getElementById('dvd');
let x_inc = 3;
let y_inc = 3;
let colour = 0;

function init() {

    dvd.style.position = 'absolute';
    dvd.style.zIndex = 2;
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
    let dvd_width = dvd.offsetWidth
    let dvd_top = dvd.offsetTop
    let dvd_left = dvd.offsetLeft
    let win_height = window.innerHeight;
    let win_width = window.innerWidth;

    if (dvd_left <= 0 || dvd_left + dvd_width >= win_width) {
        x_inc = ~x_inc + 1
    }

    if (dvd_top <= 0 || dvd_top + dvd_height >= win_height) {
        y_inc = ~y_inc + 1
    }


}

function frame() {
    handle_collision();
    update_colour();

    dvd.style.top = dvd.offsetTop + y_inc;
    dvd.style.left = dvd.offsetLeft + x_inc;
}

function pick_image(){
    let img_num = Math.floor(Math.random() * 4) + 1;
 
    let err_container = document.getElementById("err-container");
    let img = document.createElement("img");
    img.src = `./err${img_num}.png`;
    img.style.zIndex = 1;
    img.style.left = Math.floor(Math.random() * (window.innerWidth - 150)) + "px";
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

    /*
    let img_element = document.getElementById(`err${img_num}`);

    img_element.style.display = "block";
    */
}

dvd.addEventListener('click', pick_image);

init();