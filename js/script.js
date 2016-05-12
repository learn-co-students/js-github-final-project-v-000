var newInteraction = new GithubInteractor(github_key)

$(document).ready(function() {
  submitForm();
});

function GithubInteractor(token) {
  this.token = token;
  this.api = "https://api.github.com/repos/";
}


function Issue(url, title, body) {
  this.url = url;
  this.title = title;
  this.body = body;
}

Issue.prototype.renderIssue = function(selector){
  var link = $('<a>')
    .attr('href', this.issueURL)
    .text(this.title);
    selector.append(link);
}

function createIssue(repoName, repoOwner, title, body) {
  var url = newInteraction.api + repoOwner + "/" + repoName + "/issues";
  var data = {
    "title": title,
    "body": body
  }
  $.ajax({
    type: "POST",
    url: url,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + newInteraction.token);
    },
    data: JSON.stringify(data)
  })
  .done(handleResponse)
  .fail(handleError);
}

function handleResponse(response) {
  var issue = new Issue(response.url, response.title, response.body)
  issue.renderIssue($('#issue'));
}

function handleError(XHR, status, error) {
  console.log("Post error: " + error);
}

function submitForm() {
  $('form').on("submit", function(event) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}
