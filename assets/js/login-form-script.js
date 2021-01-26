/*==============================================================*/
// Klev Contact Form  JS
/*==============================================================*/
(function($) {
    "use strict"; // Start of use strict

    $(".login-btn > i").hide();
    $("body>.lds-circle").hide();
    $(".fade-div").hide();
    $("#authentication-error").hide();

    $("#loginForm").validator().on("submit", function(event) {
        $(".login-btn > i").show();
        $(".login-btn").attr("disabled",true);


        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            var language = localStorage.getItem('language');
            $(".login-btn > i").hide();
            $(".login-btn").attr("disabled",false);

            submitMSG(false, "s'il vous plaît vérifier l'email ou le mot de passe");


        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });


    function submitForm() {
        // Initiate Variables With Form Content
        var email = $("#mail").val();
        var password = $("#password-login").val();
        console.log(email);
        console.log(password);

        $.ajax({
            type: "POST",
            url: "http://51.83.71.157:8887/users/login_web",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            data: JSON.stringify({ email: $("#mail").val(), password: $("#password-login").val() }),
            success: function(text) {
                $(".login-btn > i").hide();
                $(".login-btn").attr("disabled",false);


                console.log(text);
                if (text.TOKEN) {
                    formSuccess(text);
                } else {
                    formError();
                    submitMSG(false, text);
                }
            },
            error: function(error) {
                $(".login-btn > i").hide();
                $(".login-btn").attr("disabled",false);
                if(error.responseJSON.STATUS){
                    $("#authentication-error").show();

                }
                }
        });
    }

    function formSuccess(result) {
        $("#loginForm").trigger("reset");
        localStorage.setItem("user", JSON.stringify(result));
        $("#loginModal").modal('toggle');
        $('#signup').fadeOut();
        $('#login').fadeOut();
        location.href="index.html"
    }

    function formError() {
        $("#loginForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h4 text-left tada animated text-success";
        } else {
            var msgClasses = "h4 text-left text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
}(jQuery)); // End of use strict