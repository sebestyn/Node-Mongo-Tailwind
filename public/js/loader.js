function loaderShow() {
    $("body").append('<div id="loaderDiv"><div class="loader-facebook"><div></div><div></div><div></div></div></div>');
    $(".loader-facebook").show();

    //TÚL SOKÁIG TŐLT --> ERROR ÜZENET
    setTimeout(() => {
        if (document.getElementById("loaderDiv")) {
            loaderStop();
            Swal.fire({
                title: "Opsss...",
                text: "There was an error. Try again later!",
                icon: "error",
            })
        }
    }, 20 * 1000); // 20 mp UTÁN HIBA ÜZENET
}

function loaderStop() {
    $("#loaderDiv").remove();
}
