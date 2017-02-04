'use strict';

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
  $('#issue').append('<a href=' + response.html_url + '>' + response.title + '</a>')
};

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}

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
      xhr.setRequestHeader("Authorization", "token " + "bf75154ddd99b460579614ab2f9fba83ed7341bc")
    },
    data: JSON.stringify(data)
  }).done(function(response){
    handleResponse(response);
  }).fail(function(jqXHR, textStatus, errorThrown){
    handleError(jqXHR, textStatus, errorThrown);
  });

};

function GithubInteractor(token) {
    this.token = token;
};