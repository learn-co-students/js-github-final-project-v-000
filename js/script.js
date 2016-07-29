$(document).ready(function(){
  submitForm();
  var token = new GithubInteractor("token")
});

function GithubInteractor(token){
  this.token = token;
}

function createIssue(repoName, repoOwner, title, body){
  //var token = new GithubInteractor("token")
  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: "json",
    //headers: {'Authorization': 'token ' + token},
    data: JSON.stringify({'title' : title, 'body' : body})
  }).done(function(response){
    handleResponse(response);
  }).fail(function(response){
    handleError(response);
  });
}

function submitForm(){
  $('#submit').click(function(e) {
    e.preventDefault()
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
  })
}

function handleResponse(response){
  console.log("STARTING SUCCESS...");
  console.log(response);
  console.log("Success: " + response.statusText);
  $('#issue').append('<div>'+ response.title +'</div>');
}

function handleError(response){
  console.log("STARTING ERROR...");
  console.log({response});
  console.log("Post error: " + {response}.statusText);
  $('#issue').append('<div>'+ "Post error: " + response.statusText +'</div>');
}

// a35587e45f41c5914cc13fc47d3fddba4ed2984f
