$(document).ready(function() {
  submitForm();
});

function GithubInteractor(input) {
  this.token = input;
}

var myToken = new GithubInteractor("d94ba382ed459fa3176a90bbff1883fa6b73e44a");

function submitForm() {
  $('form').on('submit', function(event){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
  });
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
      xhr.setRequestHeader("Authorization", "token " + myToken.token);
    },
    data: JSON.stringify(data)
  }).done(handleResponse)
    .fail(handleError)
}

function handleResponse(response) {
  $('#issue').append('<a href="' + response.html_url + '">' + response.title + '</a>');
}

function handleError(jgXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}
