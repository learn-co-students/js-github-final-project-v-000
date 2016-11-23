$(document).ready(function() {
  submitForm();
});

function GithubInteractor(token) {
  this.token = token;
}
var interactor = new GithubInteractor("INSERT API KEY HERE");

function submitForm() {
  $('form').on('submit', function(e) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('title').val();
    var body = $('body').val();
    createIssue(repoName, repoOwner, title, body);
    e.preventDefault();
  });
}

function createIssue(repoName, repoOwner, title, body) {
  data = {
    title: title,
    body: body
  }

  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    headers: {
      Authorization: 'token ' + interactor.token
    }
  })
  .done(handleResponse)
  .fail(handleError);
}

function handleResponse(response) {
  $('#issue').html('<a href="' + response.html_url + '">' + response.title + '</a>');
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log('Post error: ' + errorThrown);
}