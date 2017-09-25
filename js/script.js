
'use script';

function GithubInteractor(token){
  this.token = token;
  this.apiBaseUrl = "https://api.github.com/repos/";
}

var interactor = new GithubInteractor("c47261ed19be1b6b99a45a4e36948ef629bd718b")


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


var createIssue = function(repoName, repoOwner, title, body){
  var url = interactor.apiBaseUrl + repoOwner + "/" + repoName + "/issues"

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify({ title : title, body : body}),
    success: function (result) {
      handleResponse(result);
    },
    error: function (result) {
      var errorThrown = result.status;
      var textStatus = result.statusText;
      var jqXHR = {}
      handleError(jqXHR, textStatus, errorThrown)
    },
  })
};

function handleResponse(result) {
  $('#issue').append(result.title);
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}

$(document).ready(function(){
  submitForm();
});
