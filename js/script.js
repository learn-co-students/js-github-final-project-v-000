function GithubInteractor(token){
  this.token = token;
}

var interactor = new GithubInteractor('TOKEN_HERE');

function createIssue(repoName,repoOwner,issueTitle,issueContent){
  var data = {
    title: issueTitle, 
    body: issueContent
  };
  $.ajax({
    url:'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: "POST",
    headers:{
      Authorization: "token " + interactor.token
    },
    data: JSON.stringify(data)
  }).done(handleResponse).fail(handleError);
}

function handleResponse(response){
  $('#issue').append('<div class = issue_details>');
  $('#issue').append('<a href= "' + response.html_url + '" target="_blank">' + response.title + '</a>');
  $('#issue').append('</div>');
}

function handleError(jqXHR, textStatus, errorThrown){
  debugger;
  console.log("Post error: " + errorThrown);
}

$('document').ready(function(){
  $('form').on("submit",function(event){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName,repoOwner, title, body);
    event.preventDefault();
  });
});



