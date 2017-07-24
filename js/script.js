function GithubToken(token) {
  this.token = token;
}

function newIssue(repoName, repoAuthor, title, body) {
  var url = 'https://api.github.com/repos/' + repoAuthor + '/' + repoName + '/issues';
  var token = 'some_token'
  var data = {
    title: title,
    body: body
  }

  function handleResponse(response) {
    $('#issue').append('<a href=' + response.html_url + '>' + response.title + '</a>');
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
