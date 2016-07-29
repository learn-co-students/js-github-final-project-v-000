function GithubInteractor(token) {
  constructor(token){
    this.token = token;
  }
}

var myInteractor = new GithubInteractor("767748a0ee5a7471ca6735bce27b7f9eeb63f936");

function submitForm() {
  $('#create-issue').click(function (event) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  })
}

function createIssue(repoName, repoOwner, title, body) {
  var url = 'https://api.github.com/repos/' + repoOwner + "/" + repoName + "/issues"

  $.ajax({
    url: url,
    type: "POST",
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + myInteractor.token);
    },
    data: JSON.stringify({title: title, body: body}),
    success: function(response) {
      handleResponse(response);
    },
    error: function (result) {
      var errorThrown = result.status;
      var textStatus = result.statusText;
      var jqXHR = {}
      handleError(jqXHR, textStatus, errorThrown)
    },
  })
}

function handleResponse(result) {
  $("#issue").append(result.title);
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}

$(document).ready(function(){
  submitForm();
})
