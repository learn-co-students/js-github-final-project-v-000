// JS basics, jQuery, AJAX + API calls, and OO
// run in browser by typing `python -m SimpleHTTPServer`
// navigate to localhost:8000

function Issue(issueURL, title, body){
  this.URL = issueURL;
  this.title = title;
  this.body = body;
}

Issue.prototype.renderIssue = function(selector){
  var link = $('<a>')
    .attr('href', this.issueURL)
    .text(this.title);
    selector.append(link);
}

function GithubInteractor(token){
  this.token = token;
  this.baseUrl = "https://api.github.com/repos/";
}

var interactor = new GithubInteractor("6b869cc1249cc97528aad8f866bec2ca1bfc87f2")

var handleResponse = function(response) {
  var issue = new Issue(response.html_url, response.title, response.body)
  issue.renderIssue($('#issue'));
}

var handleError = function(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}

var createIssue = function(repoName, repoOwner, title, body) {
  var URL = interactor.baseUrl + repoOwner + "/" + repoName + "/issues";
  var data = {
    'title': title,
    'body': body
  };

  $.ajax({
    url: URL,
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data)
  })
  .done(handleResponse)
  .fail(handleError);
}

// create an issue: POST /repos/:owner/:repo/issues
// params: title:string, body:string

var submitForm = function() {
  $('form').on('submit', function(event) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
   
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}

$(document).ready(function() {
  submitForm();
});