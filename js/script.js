$(document).ready(function() {
  submitForm();
});

function submitForm() {
  $('form').submit(function(event) {
    var repoName = $('#repoName').val()
    var repoOwner = $('#repoOwner').val()
    var issueTitle = $('#title').val()
    var issueBody = $('#body').val()
    createIssue(repoName, repoOwner, issueTitle, issueBody)
    event.preventDefault();
  })
}

function GithubInteractor(token) {
  this.token = token;
}

var interactor = new GithubInteractor("3f79034c2729f0b3367cd0e58714a8b3dd151cd8")

function createIssue(repoName, repoOwner, issueTitle, issueBody) {
  const baseUrl = "https://api.github.com/repos/"
  var data = {
    title: issueTitle,
    body: issueBody
  }

  $.ajax({
    url: baseUrl + repoOwner + "/" + repoName + "/issues",
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data)
  }).done(handleResponse).fail(handleError)
}

function handleResponse(json) {

 $('#issue').text(json["title"])
}

function handleError(xhr, ajaxOptions, thrownError) {
   return console.log("Post error: " + thrownError)
}
