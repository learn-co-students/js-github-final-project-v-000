$(document).ready(function(){
  //console.log( "ready!" );
  submitForm();
});

class GithubInteractor {
  constructor(token){
    this.token = token
  }
}

var interactor = new GithubInteractor("b69c3a8be34495c880112dd3496151e61aa133ab")

function createIssue(repoName, repoOwner, issueTitle, issueBody) {
  const newIssue = {
    title: issueTitle, 
    body: issueBody
  }
  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: "POST",
    data: JSON.stringify(newIssue),
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + "b69c3a8be34495c880112dd3496151e61aa133ab");
    },
  }).done(function(result) {
    handleResponse(result)
  }).fail(function(jqXHR, textStatus, error) {
    handleError(jqXHR, textStatus, error)
  })
}

function handleResponse(issue) {
  $('#issue').append(`<p><a>${issue.title}</a></p>`)
}

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error)
}

function submitForm() {
  
  $('form').on('submit', function(event) {
    var repoName = $('#repoName').val()
    var repoOwner = $('#repoOwner').val()
    var issueTitle = $('#issueTitle').val()
    var issueBody = $("issueBody").val()
    createIssue(repoName, repoOwner, issueTitle, issueBody)
    event.preventDefault()
  })
}
