$(document).ready(function(){
  bindSubmitButton();
});

function bindSubmitButton(){
  $('#submitButton').on('click', function(){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var issueTitle = $('#title').val();
    var issueBody = $('#body').val();
    createIssue(repoName, repoOwner, issueTitle, issueBody)
  });
};

function handleResponse(response) {
  debugger;
};

var createIssue = function(repoName, repoOwner, title, body){
  //debugger;
  var data = {
    'title': title,
    'body': body
  };

  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + "/" + repoName + '/issues',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + "051ca80434ac2d628682d2b9f3dc8d2e6f95c67e")
    },
    data: JSON.stringify(data)
  }).done(function(response){
    handleResponse(reponse);
  });
};



class GithubInteractor {
  constructor(token) {
    this.token = token;
  };
};
