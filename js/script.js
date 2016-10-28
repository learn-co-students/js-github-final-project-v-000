function submitForm() {
  $("form").on('submit', function(event){
    var repoName = $("#repoName").val();
    var repoOwner = $("#repoOwner").val();
    var title = $("#title").val();
    var body = $("#body").val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}

function createIssue(repoName, repoOwner, title, body) {
  $.ajax({
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues",
    type: "POST",
    dataType: "json",
    data: JSON.stringify({ "title": title, "body": body }),
    headers: {
      Authorization: "token" + token
    }
  }).done(function(response) {
    handleResponse(response);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    handleError(jqXHR, textStatus, errorThrown);
  });
}

function GithubInteractor(token) {
    this.token = token;
}

function handleResponse(response) {
  $("#issue").html("");
  var link = $("<a>")
    .attr("href", response.html_url)
    .text(response.title);
  var listItem = $("<li>").append(link);

  $("#issue").append(listItem);
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}

$(document).ready(function() {
  submitForm();
});


// /repos/:owner/:repo/issues
