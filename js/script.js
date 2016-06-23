$(document).ready(function(){
  var repoName, title, body;
  submitForm();
});

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

function GithubInteractor(token){
  this.token = token;
  this.apiBaseUrl = "https://api.github.com/repos/";
}

var interactor = new GithubInteractor("8960db3b12dd4572b64d7b4b273a35067b5a2875")


function submitForm(){
  $('form').on('submit', function(event){
    // take data below and turn into object with properties
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}

function handleResponse(response) {
  var issue = new Issue(response.html_url, response.title, response.body)
  issue.renderIssue($('#issue'));
}

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}

function createIssue(repoName, repoOwner, title, body){
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