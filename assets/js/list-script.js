(function($) {
    "use strict"; // Start of use strict

    var settings = {
        "url": "http://51.83.71.157:8887/workers/all_public_workers_by_10_web",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({"registration_date":""}),
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        $.each( response.workers_list, function( key, value ) {
            console.log(key);
            console.log(value);
            var picture = 'images/placeholder-profile.jpg';
            if(value.picture){
              picture = value.picture;
            }
            var card = '<div class="card col-md-4">';
            card += '<img class="card-img-top" src="'+ picture +'" alt="Card image cap">';
            card += '<div class="card-body">'
            card += '<h5 class="card-title">'+ value.name +' / '+ value.work+'</h5>'
            card += '<div class="card-info">'
            card += '<p class="address">'+ value.adress+' / '+value.city+'</p>'
            card += '</div>'
            card +='<a href="#" class="btn btn-primary">Plus details</a>'
            card += '</div>'
            $("#card-list").append(card);
        });
        $(".card-list>.lds-circle").hide();
      });
}(jQuery)); // End of use strict