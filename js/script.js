$(document).ready(function(){
  submitForm();
})

function GithubInteractor(token) {
  this.token = token
}

function createIssue(repoName, repoOwner, title, body) {
  var interact = new GithubInteractor("insertAUTHtokenHERE")
  var data = {title: title, body: body}
  $.ajax({
    url: "https://api.github.com/repos/" + repoOwner + '/' + repoName + "/issues",
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    success: function(data) {
      handleResponse(data)
    },
    error: function(error) {
      handleError(error)
    }
  })
}

function handleResponse(data) {
  $('#issue').html(data.title)
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown)
}

function submitForm() {
  var repoName = $('#repoName').val()
  var repoOwner = $('#repoOwner').val()
  var title = $('#title').val()
  var body = $('#body').val()
  $('#submit').on('click', function() {
    createIssue(repoName, repoOwner, title, body)
  })
}