
$(document).ready(function(){
  let repoName, title, body;
  submitForm();
});

Issue.prototype.renderIssue = function(elementSelector){
  let link = $('<a>')
    .attr('href', this.url)
    .text(this.title);
    elementSelector.append(link);
}

const interactor = new GithubInteractor("52b1410becae3cbf99c8f316b2840e68665925de");

function Issue(url, title, body){
  this.url = url;
  this.title = title;
  this.body = body;
}

function GithubInteractor(token){
  this.token = token;
  this.url = "https://api.github.com/repos/";
}

function submitForm(){
  $('form').on('submit', function(event){
    let repoName = $('#repoName').val();
    let repoOwner = $('#repoOwner').val();
    let title = $('#title').val();
    let body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}

function handleResponse(response) {
  let issue = new Issue(response.html_url, response.title, response.body)
  issue.renderIssue($('#issue'));
}

function handleError(error) {
  console.log(`Post error: ${error}`);
}

function createIssue(repoName, repoOwner, title, body){
  let url = interactor.url + repoOwner + "/" + repoName + "/issues";
  let data = {
    title: title,
    body: body
  }
  $.ajax({
    type: "POST",
    url: url,
    beforeSend: function(response) {
      response.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data),
  })
  .done(handleResponse)
  .fail(handleError);
}
