function GithubInteractor(token) {
  this.token = token
  this.baseURL = 'https://api.github.com/repos/'
}

function handleResponse(issue) {
  $('#issue').append(issue.title)
}

function handleError(jqXHR, status, error) {
  console.log('Post error: ' + error);
}

var interactor = new GithubInteractor('e356a46f56e3cb8f5698cd54ba70a93687087247')

function createIssue(repoName, repoOwner, issueTitle, issueBody) {
  var data = {
    title: issueTitle,
    body: issueBody
  }
  $.ajax({
    url: interactor.baseURL + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    headers: {
      Authorization: 'token ' + interactor.token
    },
    success: function(issue) {
      handleResponse(issue)
    },
    error: function(jqXHR, status, error) {
      handleError(jqXHR, status, error)
    }
  })
}

$(document).ready(function() {
  $('form').on('submit', function(event) {
    var repoName = $('#repoName').val()
    var repoOwner = $('#repoOwner').val()
    var issueTitle = $('#title').val()
    var issueBody = $('#body').val()
    createIssue(repoName, repoOwner, issueTitle, issueBody)
    event.preventDefault()
  })
})
