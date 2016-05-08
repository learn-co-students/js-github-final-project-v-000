var interactor = new GithubInteractor("ca24e3ab6fb491bca2f58d689c55acfd6582d8f3")

////////////////////////////// made changes to match solution.
$(document).ready(function(){
  var repoName;
  var title;
  var body;
  submitForm();
});
function GithubInteractor(token){
  this.token = token;
  this.apiBaseUrl = "https://api.github.com/repos/";
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

function handleResponse(response) {
  var issue = new Issue(response.html_url, response.title, response.body)
  issue.renderIssue($('#issue'));
}

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}

function Issue(url, title, body){
  this.url = url;
  this.title = title;
  this.body = body;
}
//looked at solution here.... did not learn this in cariculum
Issue.prototype.renderIssue = function(selector){
  var link = $('<a>')
    .attr('href', this.issueURL)
    .text(this.title);
    selector.append(link);
}

function submitForm(){
  $('form').on('submit', function(event){
    var repo = $('#repoName').val();
    var owner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repo, owner, title, body);
    event.preventDefault();
  });
}
