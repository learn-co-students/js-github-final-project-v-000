$(document).ready(function(){
  submitIssue();
})

function GithubInteractor(token){
  this.token = token;
}

function createIssue(repoName,repoOwner, title, body){
    var issueData = {
      'title':   title,
      'body': body, 
    };
    $.ajax({
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues",
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(issueData)
    }).done(handleResponse).fail(handleError);
}

function handleResponse(response){
  $("div#issue").text(response.title);
}

function handleError(jqXHR, textStatus, errorThrown){
  console.log("Post error: " + errorThrown);
}

function submitIssue(){
  $("input[type=submit]").on("click", function() {
    var repoOwner = $("#repoOwner").val();
    var repoName = $("#repoName").val();
    var title = $("#title").val();
    var body = $("#body").val();
    event.preventDefault();
    createIssue(repoName, repoOwner, title, body);
  });
}