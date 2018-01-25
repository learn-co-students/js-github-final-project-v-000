function GithubInteractor(token){
  this.token = token
}

function createIssue(name, owner, issueTitle, issueBody){
  $.ajax({
    url: "https://api.github.com/repos/" + owner + "/" + name + "/issues",
    type: "POST",
    dataType: "json",
    header: { Authentication: GithubInteractor.token },
    data: JSON.stringify({ title: issueTitle, body: issueBody })
  }).done(handleResponse).fail(handleError)
}

function handleResponse(r){
  $('#issue').append("<a href="+ r.html_url +">"+ r.title +"</a>")
}

function handleError(arg1, arg2 , arg3){
  console.log("Post error: " + arg3 )
}

$(document).ready(function(){
  $("form").submit(event, createIssue)
}