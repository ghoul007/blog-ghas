// Language JSON File Location
var language = localStorage.getItem('language');
// Default Language
var default_lang = 'ar';
if (language == null)
{
    language = default_lang;
     localStorage.setItem('language','ar');

}
getLanguage(language);
// Set Selected Language
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    language = localStorage.getItem('language');
    // Run Multi Language Plugin
    getLanguage()
}

// Run Multi Language Plugin
function getLanguage() {
    // Language on user preference
    (language == null) ? setLanguage(default_lang) : false;
    // Load data of selected language
    $.ajax({
        url: 'locales/' + language + '.json',
        dataType: 'json', async: true,
        headers: { "cache-control": "no-cache" }

    }).done(function (lang) {
         // add selected language class to the body tag
        console.log(lang);

        $('body').attr('class', language);
        $('.lottie').attr('class', "lottie "+language);
        $('.main-banner').removeClass("ar");
        $('.main-banner').removeClass("fr");

        $('.listsocial').removeClass("l_h_ar");
        $('.listsocial').removeClass("l_h_fr");
        $('.listsocial').addClass( "l_h_"+language);

        $('.listsocialb').removeClass("p_h_ar");
        $('.listsocialb').removeClass("p_h_fr");
        $('.listsocialb').addClass( "p_h_"+language);
        
                $('.main-banner').addClass( language);
               
        
        // Loop through message in data
        $.each(lang, function (index, val) {
         //   (index === 'head') ? $(document).attr("title", val['title']) : false;

            $(index).children().each(function () {
            if( $(this)[0].hasAttribute("hint")){
                $(this).attr("placeholder", val[$(this).attr('hint')]);
            }
            if( $(this)[0].hasAttribute("error")){
                console.log("finded")
                $(this).attr("data-error", val[$(this).attr('error')]);
            }
                $(this).html(val[$(this).attr('key')])
            })
        })
    })
}

// Auto Loader
$(document).ready(function () {
  
});
