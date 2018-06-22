/*====================================
=            Pulse Effect            =
====================================*/
var pulseAllowed = true;

function pulse() {
    if (pulseAllowed) {
        $('#celebrate').animate({
            width: 20,
            height: 20,
            opacity: 0.5
        }, 700, function() {
            $('#celebrate').animate({
                width: 25,
                height: 25,
                opacity: 1
            }, 700, function() {
                pulse();
            });
        });
    } else {
        $('#celebrate').css({
            "width": "20",
            "height": "20"
        });
    }
};
/*=====  End of Pulse Effect  ======*/
/*==========================================
=            Celebration Effect            =
==========================================*/
function toggle_celebration() {
    pulseAllowed = false;
    $('#main').fireworks();
    pulse();
    setTimeout(function() {
        $('#main').fireworks('destroy');
        pulseAllowed = true;
    }, 4500);
}
/*=====  End of Celebration Effect  ======*/
/*===============================================
=            Typing & Erasing Effect            =
===============================================*/
var typed = new Typed('.main_text', {
    strings: ["IT4Kids ist ein dynamisches Team von Studenten aus unterschiedlichsten Fachrichtungen, welche sich zum Ziel gesetzt haben Informatik an deutsche Schulen zu bringen.", "Wir setzen darauf, bereits in Grundschulen Kurse einzurichten, um den Kindern ein grundlegendes Verständnis von Informatik zu ermöglichen."],
    typeSpeed: 30,
    backSpeed: 0,
    fadeOut: true,
    loop: true
});
document.querySelector('.reset').addEventListener('click', function() {
    typed.reset();
});
/*=====  End of Typing & Erasing Effect  ======*/
/*=============================================
=            Setting Everything up            =
=============================================*/
$(document).ready(function() {
    pulse();
    var lastAction = "100";
    $(window).on('scroll', function() {
        var y_scroll_pos = window.pageYOffset;
        var scroll_pos_test = 20; // set to whatever you want it to be
        if (y_scroll_pos > scroll_pos_test) {
            if (lastAction == "100") {
                $('#logo').stop();
                lastAction == "50";
            }
            $('#logo').animate({
                height: "50"
            });
        } else {
            if (lastAction == "50") {
                $('#logo').stop();
                lastAction == "100";
            }
            $('#logo').animate({
                height: "100"
            });
        }
    });
});
/*=====  End of Setting Everything up  ======*/