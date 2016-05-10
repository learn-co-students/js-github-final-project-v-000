$(document).ready(function(){
  submitForm();
});

function submitForm(){
  $('form').on('submit', function(e){
    e.preventDefault();
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
  });
}

function GithubInteractor(token){
  this.token = token;
}
var int = new GithubInteractor('fa98afc21afeed40392b2a8c238c58e302fecc4a')

function createIssue(repoName, repoOwner, title, body){
  data = {
    title: title,
    body: body
  }
  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: 'token ' + int.token
    },
    data: JSON.stringify(data)
  })
  .done(handleResponse)
  .fail(handleError);
}

function handleResponse(response){
  $('#issue').html('<a href="' + response.html_url + '">' + response.title + '</a>')
}

function handleError(error){
  console.log('Post error: Unauthorized');
}
