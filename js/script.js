// Document Ready!

$(function() {
   submitForm();
});

// FUNCTION CONSTRUCTORS

function GithubInteractor(token) {
  this.token = token;
};

var interactor = new GithubInteractor("faketoken");

function Issue(issueURL, title, body){
  this.issueURL = issueURL;
  this.title = title;
  this.body = body;
};

Issue.prototype.renderIssue = function(selector){
  var link = $('<a>')
    .attr('href', this.issueURL)
    .text(this.title);
    selector.append(link);
}

// LAB METHODS

function submitForm() {
  $('form').on('submit', function(event){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}

function createIssue(repoName, repoOwner, title, body) {
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues";
  var data = {
    title: title,
    body: body
  }
  $.ajax({
    url: url,
    type: "POST",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data),
  })
  .done(handleResponse)
  .fail(handleError);
};

function handleResponse(response) {
  var issue = new Issue(response.issueUrl, response.title, response.body)
  issue.renderIssue($('#issue'));
};

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
};