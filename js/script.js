'use strict';

var defaultUrl = 'https://api.github.com/repos/'
var token = mySecret

function GithubInteractor(token, repoOwner, repoName, title, body){
  this.token = token
}

function buildData(issueTitle, issueBody) {
  var data = {}
  // debugger;
    data.title = issueTitle, 
    data.body = issueBody

  return JSON.stringify(data)
}

function createIssue(repoName, repoOwner, issueTitle, issueBody){
  var postData = buildData(issueTitle, issueBody)

  $.ajax({
    url: defaultUrl + repoOwner + "/" + repoName + "/issues",
    type: "POST", 
    contentType: "application/json",
    data: postData,
    headers: {
      Authorization: "token " + token
    },
    success: function(response) {
      handleResponse(response)
    },
    error: function(xhr, errorThrown, textStatus) {
      handleError(xhr, errorThrown, textStatus)
    }
  })
  
}


function handleResponse(response) {
  $("#issue").append("<p id='issue'><a href=" + response.html_url + ">" + response.title + "</a></p>")
}

function handleError(xhr, errorThrown, textStatus) {
  console.log("Post error: " + textStatus)
}


// var bindCreateIssueButton = function(event) {
//   var repoName = $('#repoName').val()
//   var repoOwner = $('#repoOwner').val()
//   var title = $('#title').val()
//   var body = $('#body').val()

//   $('form submit').click(new GithubInteractor(repoName, repoOwner, title, body))
//   event.preventDefault()
// }


// $(document).ready(function(){

//   bindCreateIssueButton();
// })