$(document).ready(function(){
  submitForm();
})

function GithubInteractor (token){
  this.token = token;
}

function submitForm () {
  $('form').on('submit', function(event){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
};

function createIssue (repoName, repoOwner, title, body, token, data) {

  var data = {
    'title': title,
    'body':body
  }

  $.ajax({
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues",
    type: "POST",
    dataType: "json",
    headers: {
      Authorization: token
    },
    data: JSON.stringify(data)
  }).done(handleResponse).fail(handleError);
};

function handleResponse(response){
  $('#issue').append(response.title);
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}
