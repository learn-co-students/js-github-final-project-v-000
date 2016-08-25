$(document).ready(function() {
  submitForm();
});

function GithubInteractor(token) {
  this.token = token;
}

var interactor = new GithubInteractor("my token");

function submitForm() {
  $("form").on("submit", function(event) {
    var repoName = $("#repoName").val();
    var repoOwner = $("#repoOwner").val();
    var title = $("#title").val();
    var body = $("#body").val();
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
    type: "POST",
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    handleResponse(response);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    handleError(jqXHR, textStatus, errorThrown);
  })
}

function handleResponse(response) {
  $("#issue").append('<a href="' + response.html_url + '">' + response.title + '</a>');
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}
