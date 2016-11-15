var interactor = new GithubInteractor('YourTokenHere');

$(document).ready(function() {
  $('#submit').on('click', function(event) {
    event.preventDefault();
    var name = $('#repoName').val();
    var owner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(name, owner, title, body);
  })
});

function GithubInteractor(token) {
  this.token = token;
}

function createIssue(repoName, repoOwner, title, body) {
  var data = {
    title: title,
    body: body,
  }

  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
  }).done(function(response) {
    handleResponse(response)
  }).fail(function(error) {
    handleError(error.jqXHR, error.status, error);
  });
}

function handleResponse(response) {
  var html = '<a href="' + response.html_url + '">' + response.title + "</a>";
  $('#issue').html(html)
}

function handleError(jqXHR, textStatus, error) {
  console.log('Post error: ' + error.status);
}
