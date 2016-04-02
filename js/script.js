var authToken = "fd26e75bf5e826e3d077d44115c0be0682c706d2";

$(document).ready(function(){
  $('form').on('submit', function(event){
    submitForm();
    event.preventDefault();
  });
})

function submitForm(){
  var repoName = $('#repoName').val().strip();
  var repoOwner = $('#repoOwner').val().strip();
  var title = $('#title').val().strip();
  var body = $('#body').val().strip();
  createIssue(repoName, repoOwner, title, body);
}

function createIssue(repoName, repoOwner, title, body){
  var url = interactor.githubURL + repoOwner + "/" + repoName + "/issues";
  var data = { "title": title, "body": body };

  $.ajax({
    type: "POST",
    url: url,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data)
  }).done(handleResponse).fail(handleError);
}

function GithubInteractor(token){
  this.token = token;
  this.githubURL = "https://api.github.com/repos/";
}

var interactor = new GithubInteractor(authToken);

function handleResponse(response){
  var html = "<a href='" + response.html_url+ "'>" + response.title + "</a>";
  $('#issue').append(html);
}

function handleError(jqXHR, textStatus, errorThrown){
  console.log("Post error: " + errorThrown);
}