function GithubInteractor(token) {
  this.token = token;
}

function createIssue(name, owner, title, body) {
  var url = 'https://api.github.com/repos/' + owner + '/' + name + '/issues';
  var data = { title: title, body: body};

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    success: function(response){
      handleResponse(response);
    },
    error: function(response) {
      handleError(response);
    }
  });
}

function handleResponse(response) {
  $('#issue').text(response.title);
}

function handleError(response) {
  console.log("Post error: Unauthorized");
}

function bindCreateIssue() {
  $("submit").on("click", function(e){
    var name = $('#repoName').val();
    var owner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();

    createIssue(name, owner, title, body);
    e.preventDefault();
  });
}

$(document).ready(function(){
  bindCreateIssue();
});
