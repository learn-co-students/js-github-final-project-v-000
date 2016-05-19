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
  this.token = token;
}

function handleResponse(error) {
  $("#issue").text(error.title);
}

function handleError(error) {
  console.log("Post error: Unauthorized");
}

function createIssue (repoName, repoOwner, title, body) {
  var interactor = new GithubInteractor("e091f8aa34f22220fde3b52a3e8b0598e72640f1");
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues";
  var data = {
    title: title,
    body: body
  }
  $.ajax({
    url: url,
    type: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data)
  }).done(handleResponse).fail(handleError);
}
