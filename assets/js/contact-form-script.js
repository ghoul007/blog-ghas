/*==============================================================*/
// Klev Contact Form  JS
/*==============================================================*/
(function ($) {
    "use strict"; // Start of use strict
    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
          var  language = localStorage.getItem('language');
if(language =='ar'){
    submitMSG(false, "هل ملأت الاستمارة بشكل صحيح؟");

}
else{
    submitMSG(false, "Avez-vous rempli correctement le formulaire?");

}
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });


    function submitForm(){
        // Initiate Variables With Form Content
        var name = $("#name").val();
        var email = $("#email").val();
        var msg_subject = $("#msg_subject").val();
        var phone_number = $("#phone_number").val();
        var message = $("#message").val();


        formSuccess();
        // $.ajax({
        //     type: "POST",
        //     url: "https://api.soskhedma.com/CreateContact",
        //     headers:{"Access-Control-Allow-Origin": "*"
        //     },
        //     data: "name=" + name + "&email=" + email + "&subject=" + msg_subject + "&phone=" + phone_number + "&message=" + message,
        //     success : function(text){
        //         if (text.error == "false"){
        //             formSuccess();
        //         } else {
        //             formError();
        //             submitMSG(false,text);
        //         }
        //     }
        // });
    }

    function formSuccess(){
        $("#contactForm")[0].reset();
        var  language = localStorage.getItem('language');
        if(language =='ar'){
            submitMSG(true, "تم إرسال الرسالة!")
        
        }
        else{
            submitMSG(true, "Message envoyé!")
        
        }	
    }

    function formError(){
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg){
        if(valid){
            var msgClasses = "h4 text-left tada animated text-success";
        } else {
            var msgClasses = "h4 text-left text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
}(jQuery)); // End of use strict