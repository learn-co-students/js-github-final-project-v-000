$(document).ready(function(){
  submitForm();
});

function GithubInteractor(input){
  this.token = input;
}

var myToken = new GithubInteractor("117e021b00c5fa9d32e06b0008531cd1d93b9452");

function submitForm(){
  $('form').on('submit', function(event){
    var repo = $('#repoName').val();
    var owner = $('#repoOwner').val();
    var issueTitle = $('#title').val();
    var issueBody = $('#body').val();
    createIssue(repo, owner, issueTitle, issueBody);
    event.preventDefault();
  })
}

function Issue(url, title, body){
  this.url = url;
  this.title = title;
  this.body = body;
  $('#issue').append("<li><a href='" + this.url + "'>" + this.title + "</a></li>");
}

 function createIssue(repo, owner, issueTitle, issueBody){
   var data = {
     "title": issueTitle,
     "body": issueBody
    }

   $.ajax({
     url: "https://api.github.com/repos/" + owner + "/" + repo + "/issues",
     type: "POST",
     beforeSend: function(xhr) {
       xhr.setRequestHeader("Authorization", "token " + myToken.token);
     },
     dataType: "json",
     data: JSON.stringify(data),
   })
   .done(handleResponse)
   .fail(handleError)
 }

 function handleResponse(response){
   var newIssue = new Issue(response.html_url, response.title, response.body);
 }

 function handleError(jqXHR, textStatus, errorThrown){
   console.log("Post error: " + errorThrown);
 }
