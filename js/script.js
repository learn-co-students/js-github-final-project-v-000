function GithubInteractor(token) {
  this.token = token;
}

function createIssue(repoName, repoOwner, title, body) {

  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    data: JSON.stringify({
      title: title,
      body: body
    }),
    success: handleResponse
  }).fail(function (error) {
    handleError(error, error.status, error.statusText)
  })

}

function handleResponse(data) {
  $('#issue').html(data.title);
}

function handleError(error, status, message) {
  console.log('Post error: ' + message)
}