function GithubInteractor(token) {
  this.token = token;
}

function handleResponse(response) {
  $('#issue').html(response.title)
}

function handleError(response) {
  console.log('Post error: Unauthorized');
}

function createIssue(repositoryName, repositoryOwner, title, body) {
  var data = {
    "title": title,
    "body": body
  };

  $.ajax({
    url: 'https://api.github.com/repos/' + repositoryOwner + '/' + repositoryName + '/issues',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data)
  })
  .done(handleResponse)
  .fail(handleError);
}

function submitForm() {

}

$(document).ready(function() {
  submitForm();
});

// 8cfd99dd2b42b8c23259724aa384cf1d3904894d
