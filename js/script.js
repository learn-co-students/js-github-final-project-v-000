'use strict';

var defaultUrl = 'https://api.github.com/repos/'


function GithubInteractor(token, repoOwner, repoName, title, body){
  this.token = token
}

function createIssue(repoName, repoOwner, issueTitle, issueContent){
  $.ajax({
    url: defaultUrl + repoOwner + "/" + repoName + "/issues",
    type: "POST", 
    contentType: "application/json",
    dataType: 'json',
    data: JSON.stringify({title: issueTitle, body: issueContent}),
    beforesend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token" + mySecret);
    },
  })

  //.done(handleResponse(response))
}


function handleResponse(JSONdata) {
    debugger;
    console.log(data)

  // }.error(function(response){
  //   debugger;
}
// function submitForm() {
// debugger;
  
//   })

//   // this calls createIssue
// }


// function handleError() {
//   // takes 3 args: hash, errorThrown, textStatus
//   // console.log(error)
//   debugger;

// }


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