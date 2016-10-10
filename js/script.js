$( document ).ready(function() {
    console.log( "ready!" );
    submitForm();
});

function submitForm() {
  $( "#form" ).submit(function( event ) {
    alert( "Handler called." );
    event.preventDefault();
    createIssue();
  });
}

function GithubInteractor(token) {
  this.token = token
  this.base_url = "https://api.github.com/"
}

function Issue(issueURL, title, body){
  this.issueURL = issueURL;
  this.title = title;
  this.body = body;
}

Issue.prototype.renderIssue = function(selector){
  var link = $('<a>')
    .attr('href', this.issueURL)
    .text(this.title);
    selector.append(link);
}

var interactor = new GithubInteractor('thetoken');
var data = { "title": $("#title").val(),
  "body": $("#body").val()
  }
function createIssue(repoName, repoOwner, title, content) {
  data["title"]=title;
  data["body"]=content;
  $.ajax({
    url: interactor.base_url + "repos/"+repoOwner+"/"+repoName+"/issues",
    type: 'POST',
    dataType: "json",
    data: JSON.stringify(data),
    headers: {
      Authorization: "token "+interactor.token
    }
  }).done(handleResponse)
  .fail(handleError);
};

function handleResponse(response) {
  var issue = new Issue(response.html_url, response.title, response.body)
  issue.renderIssue($('#issue'));
}

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}
