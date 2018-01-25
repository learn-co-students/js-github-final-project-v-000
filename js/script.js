function GithubInteractor(token){
  this.token = token;
}

function createIssue(repoName,repoOwner, issue, issueDescription){
  $.ajax({
    url: "https://api.github.com/repos/" + repoOwner +'/' + repoName + '/issues',
    type: "POST",
    data: JSON.stringify(
      {
        title : issue,
        body: issueDescription
      }
    ) ,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + GithubInteractor.token);
    },
  }).done(handleResponse).fail(handleError);
}

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}

function handleResponse(response) {
  $("#issue").append("<a href=" + response.html_url + ">" + response.title + "</a>")
}