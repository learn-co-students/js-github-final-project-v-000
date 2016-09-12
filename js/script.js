$(document).ready(function() {
  submitForm();
});

class GithubInteractor {
  constructor(token) {
    this.token = token;
  }
}

var interactor = new GithubInteractor('');

function submitForm() {
  $("form input[value='submit']").on('click', function(e){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var issueTitle = $('#title').val();
    var issueBody = $('#body').val();

    e.preventDefault(); 
    createIssue(repoName, repoOwner, issueTitle, issueBody);
  });
}

function createIssue(repoName, repoOwner, issueTitle, issueBody) {
  $.ajax({
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
    type: 'POST',
    data: JSON.stringify({
      'title': issueTitle,
      'body': issueBody, 
    }),
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    error: function(jqXHR, textStatus, errorThrown){
      handleError(jqXHR, textStatus, errorThrown)
    },
  }).done(function(response) {
    handleResponse(response);
  });
}

function handleResponse(response) {
  $('#issue').html("<a href='" + response.html_url + "'>" + response.title + "</a>");
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log(`Post error: ${errorThrown}`);
}