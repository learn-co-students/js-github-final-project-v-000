function submitForm(){

}

function createIssue(repoName, repoOwner, repoTitle, repoBody){

  var issues = {
    "title": repoTitle, 
    "body": repoBody
  }

  $.ajax({
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues", 
    type: 'POST', 
    data: JSON.stringify(issues), 
    dataType: 'json', 
    headers: {
      Authorization: 'b3a803dcf9f9cfbf8e72b36069ff14ba92c824bf'
    }
  }).done(handleResponse).fail(handleError);

}

function GithubInteractor(token){
  this.token = token;
}

function handleResponse(issue){
  $('#issue').html(issue.title);
}

function handleError(data, textStatus, errorThrown){
  console.log("Post error: " + errorThrown);
}