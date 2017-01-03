function GithubInteractor(token) {
    this.token = token;
}

var token = "7eedcb6ba3e8be7c08decad9de26138107458032";

function createIssue(repoName, repoOwner, title, body) {

  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues";

  var jsonString = {
    title: title,
    body: body
  };

  $.ajax({
    url: url,
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(jsonString)
  }).done(function(response) {
    handleResponse(response);
  }).fail(function(response) {
    handleError(response);
  });
}

function handleResponse(response) {
  console.log(response);
  $("#issue").html("<h3><a href='" + response["url"] + "'>" + response["title"] + "</a></h3>");
}

function handleError(response, status, errorText) {
  var error = "Post error: " + errorText;
  console.log(error);
  $("#issue").html("<h3>" + error + "</h3>");
}

function submitForm() {
  $('form').on("submit", function(e) {
    e.preventDefault();
    var repoName = $("#repoName").val();
    var repoOwner = $("#repoOwner").val();
    var title = $("#title").val();
    var body = $("#body").val();
    createIssue(repoName, repoOwner, title, body);
  });
}

$(document).ready(function() {
  submitForm();
});
