/*==============================================================*/
// Klev Contact Form  JS
/*==============================================================*/
(function($) {
    "use strict"; // Start of use strict
    $("#already-exist").hide();
    $(".register-btn > i").hide();
    $("#signupForm").validator().on("submit", function(event) {
        $("#already-exist").hide();
        $(".register-btn > i").show();
        $(".register-btn").attr("disabled",true);



        if (event.isDefaultPrevented() || !$('#signupForm').valid()) {
            // handle the invalid form...
            formError();
            var language = localStorage.getItem('language');
            $(".register-btn > i").hide();
            $(".register-btn").attr("disabled",false);

            submitMSG(false, "s'il vous plaît vérifier l'email ou le mot de passe");

        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });


    function submitForm() {
        // Initiate Variables With Form Content
        var email = $("#email").val();
        var password = $("#password").val();
        var repassword = $("#repassword").val();
        var name = $("#name").val();
        var isWorker = $("#isWorker").val();

        console.log($('#job'));
        var data = {};
        if ($("#isWorker").is(':checked')) {
            // Checkbox is checked..
            data = {
                email: $("#email").val(),
                password: $("#password").val(),
                is_worker: 1,
                details: {
                    name: $("#name").val(),
                    adress: $('#governorate option:selected').text(),
                    adress_index: $('#governorate').val(),
                    work: $('#job option:selected').text(),
                    work_index: $('#job').val(),
                    city: $('#municipality option:selected').text(),
                    city_index: $('#municipality').val(),
                    phone: $('#phone').val(),
                    picture: ""
                },
            }
            console.log(data);
        } else {
            // Checkbox is not checked..
            data = {
                email: $("#email").val(),
                password: $("#password").val(),
                is_worker: 1,
                details: {
                    name: $("#name").val(),
                },
            }
        }


        // $.post("http://51.83.71.157:8887/users/register",
        // data,
        // function(response, status){
        //   console.log(response);
        //   console.log(status)
        // });

        $.ajax({
            type: "POST",
            url: "http://51.83.71.157:8887/users/register",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data),
            success: function(text) {
                console.log(text);
                $(".register-btn > i").hide();
                $(".register-btn").attr("disabled",false);

                window.location.href = "validation.html?email=" + $("#email").val();
                if (text.error == "false") {
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false, text);
                }
            },
            error: function(error) {
                console.log(error)
                $(".register-btn > i").hide();
                $(".register-btn").attr("disabled",false);

                if(error.responseJSON.STATUS){
                    $("#already-exist").show();

                }

            }
        });
    }

    function formSuccess() {
        $("#signupForm").trigger("reset");
        $("#signupForm").addClass('row');
        var language = localStorage.getItem('language');

    }

    function formError() {

    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h4 text-left tada animated text-success";
        } else {
            var msgClasses = "h4 text-left text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

    $('#isWorker').change(function() {
        if ($(this).is(':checked')) {
            // Checkbox is checked..
            $(this).prop("checked", true);
            $('#workerForm').toggle(true);
        } else {
            // Checkbox is not checked..
            $(this).prop("checked", false);
            $('#workerForm').toggle(false);


        }
    });

    $("form[name='signupForm']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            name: "required",
            email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            },
            password: {
                required: true,
                minlength: 4
            },
            password_again: {
                equalTo: "#password",
            },
            job: "required",
            municipality: "required",
            phone: "required",
            governorate: "required"

        },
        // Specify validation error messages
        messages: {
            name: "Veuillez saisir votre nom",
            password: {
                required: "Veuillez saisir votre password",
                minlength: "Your password must be at least 4 characters long"
            },
            password_again: "Le mot de passe confirmé est incorrect.",
            email: "Veuillez saisir une adresse e-mail valide",
            governorate: "Veuillez selectionner votre gouvernement",
            job: "Veuillez selectionner votre profession",
            municipality: "Veuillez selectionner votre municipalité",
            phone: "Veuillez saisir votre numéro"

        },


    });

}(jQuery)); // End of use strict