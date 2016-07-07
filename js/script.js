'use strict';



var token = '616091a1f2d7b072b327685583bf8abc5fcb639c';

$(document).ready(function() {
  submitForm();
});

function GithubInteractor(token) {
  this.token = token;
}

function handleResponse(response) {
  debugger;
  $('#issue').text(response.title);
}

function handleError(jq, text, error) {
  console.log("Post error: " + error);
}

function submitForm() {
  $('form').submit(function(event) {
    var repoName = $('#repoName').val()
    var repoOwner= $('#repoOwner').val()
    var title= $('#title').val()
    var issue= $('#body').val()

    createIssue(repoName, repoOwner, title, issue);
    event.preventDefault();
  })
}

function createIssue(repoName, repoOwner, title, issue) {
  var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';

  var data = {
    "title": title,
    "body": issue,
  }

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data),
    error: function (request, error) {
      debugger;
      handleError({}, error, request.textStatus);
    },
  }).done(function (response) {
    handleResponse(response);
  });
}
