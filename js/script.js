$(document).ready(function(){
  submitForm();
});

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

function GithubInteractor(token) {
  this.token = token
}

function handleResponse(error) {
  $('#issue').html(error.title);
}

function handleError(error){
  console.log('Post error: Unauthorized')
}


function createIssue(repoName, repoOwner, title, body) {
  var interactor = new GithubInteractor('0701bc4f1204b082e8645bd58bed2380134b4199');
  var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
  var issue = {
    title: title,
    body: body
  }

  $.ajax({
    url: url,
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(issue)
  }).done(handleResponse).fail(handleError);
}
