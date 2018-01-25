var token = "cbbdfe"

$(document).ready(function() {
  submitForm();
});

function submitForm() {
  $("form").on("submit", function(e) {
    var repoName = $("#repoName").val();
    var repoOwner = $("#repoOwner").val();
    var title = $("#title").val();
    var body = $("#body").val();
    createIssue(repoName, repoOwner, title, body);
    e.preventDefault();
  });
}

function GithubInteractor(token) {
  this.token = token;
}

function handleResponse(response) {
  $("#issue").text(response.title);
}

function handleError(error) {
  console.log("Post error: Unauthorized");
}

function createIssue(repoName, repoOwner, title, body) {
  var url = "https://api.github.com/repos/"+repoOwner+"/"+repoName+"/issues"
  var data = {
    title: title,
    body: body
  }
  $.ajax({
    url: url,
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data)
  }).done(handleResponse)
  .fail(handleError);
}

