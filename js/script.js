class GithubInteractor {

  constructor(token) {
    this.token = token;
  }

}

function createIssue(repoName, repoOwner, title, body) {
  var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
  var data = {title: title, body: body};
  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(data),
    success: handleResponse,
    error: handleError
  })
}

function handleResponse(data) {
  var html = '<h2>' + data.title  + '</h2>';
  $('#issue').append(html);
}

function handleError(request, status, error) {
  console.log("Post error: " + error)
}