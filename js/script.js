'use strict';

$(document).ready(function() {
  $('submit').on('click', function(){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
  });
});

function GithubInteractor(token){
  this.token = token;
  this.apiBaseURL = "https://api.github.com/repos/";
}

var interactor = new GithubInteractor("wasdfwasd");

function createIssue(repoName, repoOwner, title, body) {
  var url = interactor.apiBaseURL + repoOwner + "/" + repoName + "/issues";
  var data = {title: title, body: body};
  $.ajax({
    url: url,
    type: "POST",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data) })
    .done(handleResponse)
    .fail(handleError);
}
    
function handleResponse(response){
  console.log("in handleResponse");
  $('#issue').append("<p>" + response.title + "</p>");
}

function handleError(jqXHR, textStatus, error){
  console.log("Post error: " + error);
}



