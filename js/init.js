


var myGists = function(username, token){
  $.ajax({
      url: "https://api.github.com/users/" + username + "/gists",
      type: 'GET',
      dataType: 'jsonp',
    }).done(function(gists) {
      $('#myGists').html('');

      $.each(gists.data, function(index, gist){
        var link = $('<a>')
          .attr('href', gist.html_url)
          .text(gist.description);

        var listItem = $('<li>')
          .append(link);

        $('#myGists').append(listItem);
      })
    });
};

var bindCreateButton = function() {
  // call functions here

};
var files = {};
files[file_name] = {"content": content};

//Create a Gist with token from above
// resource gist.github.com/techslides/9569cb7c7caa5e95bb7b
$.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "token" + token);
    },
    data: JSON.stringify({ public : true, description : description, files : files}),
}).done(function(response) {
  myGists(response.owner.login, token);
});
