function GithubInteractor(token){
  this.token = token;
}

function createIssue(repoName, repoOwner, title, body){
  var data = {
    title: title,
    body: body
  }

  $.ajax({
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
    type: "POST",
    dataType: "JSON",
    data: JSON.stringify(data),

    success: function(success){
      handleResponse(success);
    }, 

    error: function(error){
      handleError(error);
    }
  })
}

var handleResponse = function(response){
   event.stopPropagation();
   return $("#issue").append(response.title);

}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log('Post error: ' + errorThrown);
}

var gitHubToken = "59f2011f7ab89391a8f8dc669061c85e862f9226"
var interactor = new GithubInteractor(gitHubToken)