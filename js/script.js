$(document).ready(function() {
  submitForm();
});

function GithubInteractor(token) {
  this.token = token;
}

var interactor = new GithubInteractor("8f6522eb398eb87a3fac733eadb0879fefe1261b")

function submitForm() {
  $('form').on('submit', function(event){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
  });
}

function handleResponse(response) {
  $('#issue').append('<a href="' + response.html_url + '">' + response.title + '</a>');
}

function handleError(jgXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}

function createIssue(repoName, repoOwner, title, body) {
  var data = {
    title: title,
    body: body
  }
  $.ajax({
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues",
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data)
  }).done(handleResponse)
    .fail(handleError)
}