$(document).ready(function(){
  submitForm();
});

function GithubInteractor(token) {
  this.token = token;
  this.apiBaseUrl = "https://api.github.com/repos/";
}

var interactor = new GithubInteractor("8cf9a6ac268f15e307281975dcf42a833d4276a5")

function submitForm() {
  $('form').on('submit', function(event) {
    var repo = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  })
}

function Issue(issueURL, title, body) {
  this.issueURL = issueURL;
  this.title = title;
  this.body = body;
}

Issue.prototype.renderIssue = function(selector) {
  var link = $('<a>').attr('href', this.issueURL).text(this.title);
  selector.append(link);
}

function handleResponse(response) {
  var issue = new Issue(response.html_url, response.title, response.body)
  issue.renderIssue($('#issue'));
}

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}


function createIssue(repoName, repoOwner, title, body) {
  var url = interactor.apiBaseUrl + repoOwner + "/" + repoName + "/issues";
  var data = {
    title: title,
    body: body
  }
  $.ajax({
    type: "POST",
    url: url,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data)
  })
  .done(handleResponse)
  .fail(handleError);
}