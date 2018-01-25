function GithubInteractor(token) {
  this.token = token;
}

var interactor = new GithubInteractor("SomethingMadeUp")

function handleResponse(response) {
  $('#issue').html(response.title)
}

function handleError(jqXHR, textStatus, errorThrown) {
  // See: http://stackoverflow.com/questions/9847244/what-are-the-parameters-sent-to-fail-in-jquery
  console.log('Post error: ' + errorThrown);
}

function createIssue(repositoryName, repositoryOwner, title, body) {
  var data = {
    "title": title,
    "body": body
  };

  $.ajax({
    url: 'https://api.github.com/repos/' + repositoryOwner + '/' + repositoryName + '/issues',
    type: 'POST',
    beforeSend: function(xhr) {
     xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data)
  })
  .done(handleResponse)
  .fail(handleError);
}

function submitForm() {
  $('form').on('submit', function(event){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}

$(document).ready(function() {
  submitForm();
});
