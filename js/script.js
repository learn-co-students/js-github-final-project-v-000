$(document).ready( function(){

  $('#submit').on('click', function(e) {
      var repoName = $('#repoName').val();
      var repoOwner = $('#repoOwner').val();
      var title = $('#title').val();
      var body = $('#body').val();
      createIssue(repoName, repoOwner, title, body);
      e.preventDefault();
    });

});


var createIssue = function(repoName, repoOwner, title, body) {
  var interactor = new GithubInteractor("e47b3f9900993c717c3a57b47771b380f5ae43a9");

  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "token" + interactor.token);
    },
    data: JSON.stringify({title : title, body : body}),
    success: function(response) {
        handleResponse(response);
      },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      handleError(XMLHttpRequest, textStatus, errorThrown);
    }
  })
}

var handleResponse = function(response) {
  var link = $('<a>')
    .attr('href', response.html_url)
    .text(response.title);

  $('#issue').append(link);
}

var handleError = function(XMLHttpRequest, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}

function GithubInteractor(token) {
    this.token = token;
}
