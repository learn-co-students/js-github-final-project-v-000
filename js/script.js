function GithubInteractor(token) {
  this.token = token;
}

function createIssue(repoName, repoOwner, title, body) {
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues";
  var data = {
    "title": title,
    "body": body
  };
   $.ajax({
     url: url,
     dataType: 'json',
     type: 'POST',
     data: JSON.stringify(data),
     success: handleResponse,
     error: handleError
   });
}

function handleResponse(resp) {
  $('#issue').text(resp.title);
}

function handleError(data, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}