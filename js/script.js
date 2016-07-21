function GithubInteractor(token) {
  this.token = token;
}

var githubClient = new GithubInteractor("cea7f21fed2597d072ed6994609d40857a649653");

function submitForm() {
  $('submit').click(function (event) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var issueTitle = $('#title').val();
    var issueBody = $('#body').val();
    createIssue(repoName, repoOwner, issueTitle, issueBody);
    event.preventDefault();
  });
}

function handleResponse(result) {
  $('#issue').append(result.title);
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}

function createIssue(name, owner, title, body) {
  var url =  "https://api.github.com/repos/" + owner + "/" + name + "/issues";
  var data = {
    title: title,
    body: body
  };

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + githubClient.token);
    },
    data: JSON.stringify(data)
  })
  .done(handleResponse)
  .fail(handleError);

}

$(document).ready(function() {
  submitForm();
});
