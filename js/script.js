class GithubInteractor {
  constructor(token) {
    this.token = token;
  }
}

var token = '<token removed prior to pushing>';

function createIssue(repo, owner, title, body) {
  var issueData = {
    'title': title,
    'body': body
  }

  $.ajax({
    type: 'POST',
    url: `https://api.github.com/repos/${owner}/${repo}/issues`,
    data: JSON.stringify(issueData),
    headers: {
      Authorization: `token ${token}`
    }
  }).done(response => {
    handleResponse(response);
  }).fail(error => {
    handleError(error);
  })
}

function handleResponse(response) {
  $('#issue').append($(`<a href="${response.url}">${response.title}</a>`))
}

function handleError(error) {
  console.log(`Post error: ${error.statusText}`);
}

function bindSubmitButton() {
  $('#submit').click(function(e) {
    createIssue(
      $('#repoName').val(),
      $('#repoOwner').val(),
      $('#title').val(),
      $('#body').val()
      );
    e.preventDefault();
  });
};

$(document).ready(function(){
  bindSubmitButton();
});