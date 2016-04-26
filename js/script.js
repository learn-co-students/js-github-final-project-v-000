function GithubInteractor (token) {
  this.token = token;

}

function handleResponse (response) {
  $("#issue").html(response.title);
}

function handleError (xhr, statusText, errorThrown) {
  console.log("Post error: " + errorThrown);
}

function createIssue(repoName, repoOwner, issueTitle, issueBody){
  data = JSON.stringify({
      "title": issueTitle,
      "body": issueBody
    });

  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: "POST",
    datatype: "jsonp",
    data: data,
    success: function(response) {
      handleResponse(response);
    },
    error: function(xhr, textStatus, errorThrown) {
      handleError(xhr, textStatus, errorThrown);
    }
  });  

};