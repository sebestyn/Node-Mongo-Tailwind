
//HA MEGNYOMOD AZ ENTERT EGY INPUTON BELÜL
$.fn.enterPress = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = ev.keyCode ? ev.keyCode : ev.which;
            if (keycode == "13") {
                fnc.call(this, ev);
            }
        });
    });
};
//PL
/*
    $('input').enterPress(function(){
            $('.aztCsinaljaMinthaEztNyomtaVolna').trigger('click');
    });
*/

//RANDOM SZÁM KÉT MEGADOTT SZÁM KÖZÖTT
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//PL
/*
    var randomSzam = randomBetween(2,6);
*/

//RANDOM ID GENERATOR
function idGenerator(idLength) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < Number(idLength); i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
//PL
/*
    var randomId = idGenerator(10);
*/

// MONGO OBJECT ID GENERATOR
function mongoObjectIdGenerator() {
    var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
        timestamp +
        "xxxxxxxxxxxxxxxx"
            .replace(/[x]/g, function () {
                return ((Math.random() * 16) | 0).toString(16);
            })
            .toLowerCase()
    );
}

//ID GENERATOR WITH DATE
function idDateGenerator(id_length = 8) {
    let ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
    var d = new Date();
    var id = d.getTime();
    for (var i = 0; i < id_length; i++) {
        id += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return id;
}
//PL
/*
    var randomId = idDateGenerator(10);
*/

//NUMBER INPUT IGAZI MIN MAX BEÁLLÍTÁSA
function numberInputMinMax(inputClass) {
    $(document).on("keyup", "." + inputClass, function () {
        var _this = $(this);
        var min = parseInt(_this.attr("min")) || 1; // if min attribute is not defined, 1 is default
        var max = parseInt(_this.attr("max")) || 100; // if max attribute is not defined, 100 is default
        var val = parseInt(_this.val()) || min; // if input char is not a number the value will be (min - 1) so first condition will be true
        if (val < min) _this.val(min);
        if (val > max) _this.val(max);
    });
}

//REMOVE SPACES FROM STRING
function removeSpaces(str) {
    return str.replace(/\s/g, "");
}

//TIMER SWEET ALERT
function swal_timer(args) {
    let defaults = { 
        title = "Siker", 
        icon = "success", 
        text = "", 
        position:"top",
        timer = 1000, 
        showConfirmButton = false 
        timerProgressBar: true,
        reload = false, 
        callback = () => { }, 
    };
    let params = { ...defaults, ...args };

    return new Promise((resolve, reject) => {
        const a = Swal.mixin({
            position: params.position,
            icon: params.icon,
            title: params.title,
            text: params.text,
            showConfirmButton: params.showConfirmButton,
            timer: params.timer,
            timerProgressBar: params.timerProgressBar,
        });
        a.fire()
            .then(() => {
                callback();
                if (reload) {
                    window.location.reload(false);
                }
                resolve();
            })
            .catch(reject);
    });
}

//SET DATE INPUT DEFAULT TO NOW
function dateInputDefaultNow(selector) {
    let now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    let today = now.getFullYear() + "-" + month + "-" + day;
    $(selector).val(today);
}

//DARK-MODE
function toggleDarkMode(invertElements = []) {
    if (getCookie("dark-mode") == "true") {
        document.documentElement.classList.add("dark-mode");
        let invert = () => {
            invertElements.forEach(element=>{
                element.addClass("invert_dark-mode")
            })
        };
        invert();
        $(document).ready(function () {
            setTimeout(invert, 100);
            setTimeout(invert, 500);
            setTimeout(invert, 1000);
        });
    } else {
        document.documentElement.classList.remove("dark-mode");
    }
}

//USE IOS DEVICE?
function is_iOS() {
    return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}
