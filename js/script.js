'use strict';

function GithubInteractor(token) {
  this.token = token;
}

function Issue(url, title, body) {
  this.url = url,
  this.title = title,
  this.body = body
}

function submitForm() {
  var repoName = $('#repoName').value;
  var repoOwner = $('#repoOwner').value;
  var issueTitle = $('#title').value;
  var issueBody = $('#body').value
}

function createIssue(repoName, repoOwner, issueTitle, issueBody) {
  var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
  var data = {
    title: issueTitle,
    body: issueBody
  }
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data)
  })
  .done(handleResponse)
  .fail(handleError)
  .always(function() {
    console.log("complete");
  });
}

function handleResponse(response) {
  var issue = new Issue(response.url, response.title, response.body);
  var link = $('<a>')
    .attr('href', issue.issueURL)
    .text(issue.title);
    $('#issue').append(link);
}

function handleError(jqXHR, statusText, error) {
  console.log('Post error: ' + error);
}
