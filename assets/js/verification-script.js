/*==============================================================*/
// Klev Contact Form  JS
/*==============================================================*/
(function($) {
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    var email = getUrlParameter("email");
    $('#email').text(email);
    console.log(getUrlParameter("email"));

    $("#verificationForm").validator().on("submit", function(event) {
        console.log("submit")

        if (event.isDefaultPrevented() || !$('#verificationForm').valid()) {
            // handle the invalid form...

        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm(){
        $.ajax({
            type: "POST",
            url: "http://51.83.71.157:8887/users/activate_account",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            data: JSON.stringify({email : email, verification_code: $('#verification').val()}),
            success: function(text) {
                console.log(text);
                if (text.error == undefined) {
                    formSuccess();
                } else {
                    formError();
                }
            },
            error: function(error) {
                console.log(error)
            }
        });
    }

    function formSuccess(){
        window.location.href = "index.html";
    }

    function  formError(){

    }

    $("form[name='verificationForm']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            verification: "required",

        },
        // Specify validation error messages
        messages: {
            verification: "Veuillez saisir votre code de vérification",
        },


    });
}(jQuery)); // End of use strict