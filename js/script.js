$(document).ready(function() {
  bindSubmitButton;
});

function GithubInteractor(token){
  this.token = token;
}

var interactor = new GithubInteractor("Token")

function bindSubmitButton() {
  $('form').on('submit', function(event) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();

    createIssue(repoName, repoOwner, title, body);

    event.preventDefault();
  });
}

function handleResponse(response) {
  var html = '<a href="' + response.html_url + '">' + response.title + '</a>';
  $('#issue').append(html);
}

function handleError(error) {
  console.log("Post error: " + error);
}

function createIssue(repoName, repoOwner, title, body){
  var issue = {
    title: title,
    body: body
  }

  var baseUrl = 'https://api.github.com/repos/';
  var url = baseUrl + repoOwner + '/' + repoName + '/issues';

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    header: { Authorization: 'token ' + interactor.token},
    data: JSON.stringify(issue)
  })
  .done(handleResponse)
  .fail(handleError);
}
