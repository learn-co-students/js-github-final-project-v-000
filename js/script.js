$(document).ready(function(){
  submitForm();
 });

function submitForm(){
  $("#issueForm").on('submit',function(event){
    event.preventDefault();
     var repoName = $("#repoName").val();
     var repoOwner = $("#repoOwner").val();
     var issueTitle = $("#title").val();
     var issueBody = $("#body").val();
    createIssue(repoName,repoOwner,issueTitle,issueBody);
  });
}

function GithubInteractor(token){
  this.token = token;
}

var gitToken = new GithubInteractor("ef5923ef543790e1b2449bf2d6c4cecac2c41457");

function createIssue(repoName,repoOwner,issueTitle,issueBody){
  $.ajax({
    url: 'https://github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
   	  xhr.setRequestHeader("Authorization", "token " + gitToken.token);
   	},
    data: JSON.stringify({ title: issueTitle, body: issueBody })
  })
  .done(handleResponse)
  .fail(handleError);
}

function handleResponse(response){
   $("#issue").append("<a href=" + response.html_url + ">" + response.title + "</a>");
}

function handleError(jqXHR, textStatus, errorThrown){
  console.log("Post error: " + errorThrown);
}
