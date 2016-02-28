function submitForm(){

}

function createIssue(repo, owner, title, body){
  url = "https://api.github.com/repos/" + owner + "/" + repo + "/issues";
  var issue = {
    'title': title,
    'body': body
  };
  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(issue),
    // before send set token?
    success: handleResponse,
    error: handleError
  })
}

function handleResponse(response){
  $('#issue').html(response.title);
}

function handleError(jqXHR, textStatus, errorThrown){
  console.log("Post error: " + errorThrown); 
}

function GithubInteractor(token){
  this.token = token;
}