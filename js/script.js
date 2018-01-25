function GithubInteractor(token) {
  this.token = token;
}

function createIssue(repoName, repoOwner, title, body) {
  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      'title': title,
      'body': body
    }),
    success: handleResponse
  }).fail(handleError);
}

function handleResponse(response) {
  $("div#issue").text(response.title);
}

function handleError(xhr, text, error) {
  console.log("Post error: " + error);
}