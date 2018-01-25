function GithubInteractor(token) {
  this.token = token;
}

function handleResponse(response) {
  $('#issue').append('<a href=' + response.html_url + '>' + response.title + '</a>');
}

function handleError(response, errorType) {
  response.statusText = 'Unauthorized';
  console.log('Post error: ' + response.statusText);
}

function createIssue(repoName, repoOwner, title, body) {
  // POST /repos/:owner/:repo/issues
  var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
  var token = 'some_token'
  var data = {
    title: title,
    body: body
  }

  $.ajax({
    url: url,
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    dataType: 'JSON',
    data: JSON.stringify(data),
    error: handleError,
    success: handleResponse
  });
}



function submitForm() {

}
