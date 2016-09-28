$(document).ready(function() {
  submitForm();
});

function GithubInteractor(token) {
  this.token = token;
}

var interactor = new GithubInteractor("d3fe0aeaa9fce7174f1626ccc38cc28a0e757485");

function Issue(issueURL, issueTitle, issueBody){
  this.url = issueURL;
  this.title = issueTitle;
  this.body = issueBody;
}

function submitForm() {
  $("js-create-issue").on('click', function (e) {
    e.preventDefualt();
    var repoOwner = $("#repoOwner").val();
    var repoName = $("#repoName").val();
    var title = ("#title").val();
    var body = $("#body").val();
    createIssue(repoName, repoowner, issueTitle, issueBody);
  })
}

function createIssue(repoName, repoOwner, issueTitle, issueBody) {
  var data = {
    "title": issueTitle,
    "body": issueBody
  };
  $.ajax({
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues",
    type: 'POST',
    dataType: 'json',
    authorization: "token " + interactor.token,
    data: JSON.stringify(data),
    success: function(response) {
      handleResponse(response);
    },
    error: function(response) {
      handleError(response);
    }
  });
}

function handleResponse(response) {
  var issue = new Issue(response.html_url, response.title, response.body);
  var link = $('<a>').attr('href', issue.url).text(issue.title);
  $("#issue").append(link);
}

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}
