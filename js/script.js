function GithubInteractor(token) {
  this.token = token;
}

var interactor = new GithubInteractor("my key here");

var handleResponse = function (response) {
  $('#issue').append("<a href=\"" + response["html_url"] + "\">" + response["title"] + "</a>");
}

var handleError = function (jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}

var createIssue = function(repoName, repoOwner, title, body) {
  var issueHash = {};
  issueHash["title"] = title;
  issueHash["body"] = body;

  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(issueHash),
    headers: {
      Authorization: "token " + interactor.token
    },
    success: handleResponse,
    error: handleError
  });
};

var submitForm = function() {
  $("form").on("submit", function(event) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
};

$(document).ready(function() {
  submitForm();
});
