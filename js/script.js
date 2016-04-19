function GithubInteractor(token) {
  this.token = token;
}

function createIssue(repoName,repoOwner, title, body){
  var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
  var data = {
    'title': title,
    'body': body
  };
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    error: handleError,
    success: handleResponse
  });
}

function handleResponse(response){
  $('#issue').append('<a href=' + response.html_url + '>' + response.title + '</a>');
}

function handleError(jqXHR, textStatus, errorThrown){
  console.log("Post error: " + errorThrown)
}