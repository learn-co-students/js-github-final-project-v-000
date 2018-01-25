$(document).ready(function(){
  submitForm();
});

function submitForm(){
  $('submit').click(function(){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
  })
};

function GithubInteractor(token){
  this.token = token;
};

function createIssue(repoName, repoOwner, title, body){
  var privGithub = new GithubInteractor("token");
  var data = {
    'title': title,
    'body': body
  };

  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    headers: {
      Authorization: 'token ' + privGithub.token
    }
  }).done(handleResponse).fail(handleError);
};

function handleResponse(response){
  $('#issue').html('<a href="' + response.html_url + '">' + response.title + '</a>');
}

function handleError(jqXHR, textStatus, errorName){
  console.log('Post error: ' + errorName);
}
