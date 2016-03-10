function GithubInteractor(token){
  this.token = token;
}

var interactor = new GithubInteractor('7a8a3e764f4c30c4df65115e070b928073e0d35c');

function createIssue(repoName,repoOwner,issueTitle,issueContent){
  var data = {title: issueTitle, body: issueContent}
  $.ajax({
    url:'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: "POST",
    headers:{
      Authorization: "token " + interactor.token
    },
    data: JSON.stringify(data)
  }).done(handleResponse).fail(handleError);
}

function handleResponse(response){
  $('#issue').html('');
  $('#issue').append('<div class = issue_details>');
  $('#issue').append('<h3>' + response.title + '</h3>');
  $('#issue').append('</div>');
}

function handleError(jqXHR, textStatus, errorThrown){
  debugger;
  console.log("Post error: " + errorThrown);
}



