$(document).ready(function(){
  formSubmit();
});

function GithubInteractor(token){
  this.token = token;
}

function createIssue(name, owner, title, body){

  var ghi = new GithubInteractor("392c72126936f46e358ff56ee71f14e1ece4e055");
  var baseUrl = "https://api.github.com";
  var url = baseUrl + "/repos/" + owner + "/" + name + "/issues";
  var data = {
    "title": title,
    "body": body
  }

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    headers: {
      "Authorization": "token " + ghi.token
    },
    data: JSON.stringify(data),
    success: function(response){
      handleResponse(response);
    },
    error: function(response){
      handleError(response);
    }
  })
}

function formSubmit(){
  $(':submit').click(function(event){
    var repoName = $('#repoName').val;
    var repoOwner = $('#repoOwner').val;
    var title = $('#title').val;
    var body = $('#body').val;
    event.preventDefault();

    createIssue(repoName, repoOwner, title, body);
  });
}

function handleResponse(response){
  $('#issue').html("<a href='" + response.html_url + "'>" + response.title + "</a>");
}

function handleError(a, b, c) {
  console.log("Post error: " + c);
}
