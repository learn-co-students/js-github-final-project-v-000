function GithubInteractor(token) {
  this.token = token;
}

var interactor = new GithubInteractor("Enter a key here!");

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}

function handleResponse(response) {
  ($('<a>', {
    href: response.html_url,
    text: response.title
  })).appendTo($('#issue'));
}

function createIssue(repo, owner, title, body) {
  var contents = {
    title: title,
    body: body
  };
  var url = 'https://api.github.com/repos/' + owner + '/' + repo + '/issues';
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: 'token ' + interactor.token
    },
    data: JSON.stringify(contents)
  }).done(handleResponse).fail(handleError);
}

function submitForm() {
  $('form').on('submit', function(event) {
    var repo = $('#repoName').val();
    var owner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repo, owner, title, body);
    event.preventDefault();
  });
}

$(document).ready(function() {
  submitForm();
});
