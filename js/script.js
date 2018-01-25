$(document).ready(function(){
  submitForm();
})

function GithubInteractor(token){
  this.token = token;
  this.apiBaseUrl = "https://api.github.com/repos/";
}

var interactor = new GithubInteractor("");

function createIssue(repoName, repoOwner, title, body){
  var url = interactor.apiBaseUrl + repoOwner + "/" + repoName + "/issues";
  var data = {
      "title": title,
      "body": body
     };

  $.ajax({
    type: "POST",
    url: url,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify(data)
  })
  .done(handleResponse)
  .fail(handleError);
}

function handleResponse(response){
  var html = "<a href='" + response.html_url+ "'>" + response.title + "</a>";
  $('#issue').append(html);
}

function handleError(jqXHR, textStatus, errorThrown){
  console.log("Post error: " + errorThrown);
}

function submitForm(){
  $('form').on('submit', function(event){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}