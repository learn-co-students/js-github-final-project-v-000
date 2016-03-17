'use strict';

function GithubInteractor(token) {
  this.token = token
}

var token = new GithubInteractor("REMOVED")

function createIssue(repoName, repoOwner, title, body){
  var data = {
    "title": title, 
    "body": body, 
  };

  $.ajax({
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues",
    type: "POST",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data)
  }).done(handleResponse)
    .fail(handleError);
}

function handleResponse(response) {
  // console.log(response)
  var issue = $('<a>').attr('href', response.html_url).text(response.title);
  $('#issue').append(issue);
}

function handleError(jqXHR, textStatus, errorThrown){
  console.log("Post error: " + errorThrown);
}

function submitForm () {
  $('#submit').click(function(event){ 
    var repoName = $("#repoName").val();
    var repoOwner = $("#repoOwner").val();
    var title = $("#title").val();
    var body = $("#body").val();
    // console.log("clicked")
    // console.log(repoName)
    event.preventDefault();
    createIssue(repoName, repoOwner, title, body);
  });
}

$(document).ready(function() {
  submitForm();
});
