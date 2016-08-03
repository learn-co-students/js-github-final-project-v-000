$(document).ready(function(){
  submitForm();
});

function submitForm(ev){
  $('form').on('submit', function(event){
    var repo = $('#repoName').val();
    var owner = $('#repoOwner').val();
    var issueTitle = $('#title').val();
    var issueBody = $('#body').val();
    createIssue(repo, owner, issueTitle, issueBody);
    event.preventDefault();
  })
}

function Issue(title, body){
  this.title = title;
  this.body = body;
}

 function createIssue(repo, owner, issueTitle, issueBody){
   var data = {
     "title": issueTitle,
     "body": issueBody
    }

   $.ajax({
     url: "https://api.github.com/repos/" + owner + "/" + repo + "/issues",
     type: "POST",
     dataType: "json",
     headers: {
       Authorization: "token b962a9e367f665279d758e76f42c293acf5fbd51"
     },
     data: JSON.stringify(data),
   }).done(function(response){
     console.log(response);
   })
 }


// function should make an Ajax POST request to the Github API create issue end point.
// /repos/:owner/:repo/issues
// This endpoint should create an issue based on the information the user entered
// in the form. Once the form has been submitted, you'll want to add a link to the
// page to enter a repo name (thus you'll want to make sure the page doesn't refresh on form submission).
// If the POST request fails, the function should print out Post error: error_name to the console.
