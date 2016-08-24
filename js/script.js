function GithubInteractor(token) {
  this.token = token;
}

function createIssue(repoName, repoOwner, issueTitle, issueBody) {
  var data = {
    title: issueTitle,
    body: issueBody
  };

  $.ajax({
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues",
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token 8fa3cc8440991e1c8b5a98e6a20f065de14791d9"
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    handleResponse(response);
  }).fail(function(jqXHR, text, error) {
      handleError(jqXHR, text, error)
  })
}

function handleResponse(response) {
  $('#issue').html(`<a href="${response.html_url}">${response.title}</a>`)
}

function handleError(jqXHR, text, error) {
  console.log(`Post error: ${error}`);
}


var bindCreateButton = function() {
  $('#create').click(function() {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var issueTitle = $('#title').val();
    var issueBody = $('#body').val();

   createIssue(repoName, repoOwner, issueTitle, issueBody);
  });
};

$(document).ready(function(){
  bindCreateButton();
});
