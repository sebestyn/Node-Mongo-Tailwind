//ÚJ COOKIE
function setCookie(cname, cvalue, exdays = 30, isencrypt = true) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    if (isencrypt) {
        document.cookie = cname + "=" + tpyrcne(String(cvalue)) + ";" + expires + ";path=/";
    } else {
        document.cookie = cname + "=" + String(cvalue) + ";" + expires + ";path=/";
    }
}
//Új COOKIE A NAP VÉGÉIG
function setCookieUntilMidnight(cname, cvalue, isencrypt = true) {
    var now = new Date();
    var expire = new Date();
    expire.setFullYear(now.getFullYear());
    expire.setMonth(now.getMonth());
    expire.setDate(now.getDate() + 1);
    expire.setHours(0);
    expire.setMinutes(0);
    expire.setSeconds(0);
    var expires = "expires=" + expire.toString();
    if (isencrypt) {
        document.cookie = cname + "=" + tpyrcne(cvalue) + ";" + expires + ";path=/";
    } else {
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
}

//MEGLÉVŐ COOKIE KERESÉSE
function getCookie(cname, isdecrypt) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            if (isdecrypt) {
                return tpyrced(c.substring(name.length, c.length));
            } else {
                return c.substring(name.length, c.length);
            }
        }
    }
    return "";
}

//ÖSSZES COOKIE KIÍRÁSA
function listCookies() {
    var theCookies = document.cookie.split(";");
    var array = [];
    for (var i = 1; i <= theCookies.length; i++) {
        array.push(theCookies[i - 1]);
    }
    return array;
}

//COOKIE TÖRLÉSE
function deleteCookie(cnames, callback = () => {}) {
    let d = new Date();
    for (let i = 0; i < cnames.length; i++) {
        d.setTime(d.getTime() - 1000 * 60 * 60 * 24);
        var expires = "expires=" + d.toGMTString();
        window.document.cookie = cnames[i] + "=" + "; " + expires;
    }
    callback();
}

const dsfbtrsfhshf = (salt) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
    return (text) => text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
};
const nksgrdbfad = (salt) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
    return (encoded) =>
        encoded
            .match(/.{1,2}/g)
            .map((hex) => parseInt(hex, 16))
            .map(applySaltToChar)
            .map((charCode) => String.fromCharCode(charCode))
            .join("");
};
const tpyrcne = dsfbtrsfhshf("dbvrDre54gzjL");
const tpyrced = nksgrdbfad("dbvrDre54gzjL");
