function GithubInteractor(token) {
  this.token = token;
};

function Issue(issueURL, title, body){
  this.issueURL = issueURL;
  this.title = title;
  this.body = body;
}

Issue.prototype.displayIssue = function(selector){
  var link = $('<a>')
    .attr('href', this.issueURL)
    .text(this.title);
    selector.append(link);
}

var gh = new GithubInteractor('8f77651fc163aa98cbdfc8840caefe9f9a351ca5');

function createIssue(repoName, repOwner, issueTitle, issueBody) {
  var data = { title : issueTitle, body : issueBody }
  debugger;
  $.ajax({
    type: "POST",
    url: "https://api.github.com/repos/" + repOwner + "/" + repoName + "/issues",
    beforeSend: function(jqXHR) {
    jqXHR.setRequestHeader("Authorization", "token " + gh.token);
    },
    data: JSON.stringify(data)
  }).done(handleResponse).fail(handleError);
}

function handleError(request, status, error) {
  console.log("Post error: " + error);
}

function handleResponse(response) {
  var issue = new Issue(response.html_url, response.title, response.body)
  issue.displayIssue($('#issue'));
}

var bindSubmitButton = function() {
$('form').submit(function(event) {
    var repoName = $('#repoName').val();
    var repOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repOwner, title, body);
    event.preventDefault();
  })
}

$(document).ready(function(){
  bindSubmitButton();
});




// 8f77651fc163aa98cbdfc8840caefe9f9a351ca5