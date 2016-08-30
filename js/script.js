$(document).ready(function(){
  submitForm();
});


class GithubInteractor{
  constructor(token){
    this.token = token
  }
}

function submitForm(){
  $('#submit').click(function(event){
    var repoName = $("#repoName").val();
    var repoOwner = $("#repoOwner").val();
    var title = $("#title").val();
    var body = $("#body").val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  })
}

var createIssue = function(repoName, repoOwner, title, body){
  var repoName = repoName
  var repoOwner = repoOwner
  var interactor = new GithubInteractor("683e0c041456f5bb334c013339b369bd28c7ef97")
  var data = {}
  data.title = title
  data.body = body



  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'JSON',
    headers: {
      Authorization: "token " + interactor.token
    },
    data: JSON.stringify(data),
    success: function(success){
      handleResponse(success);
    },
    error: function(jqXHR={}, textStatus="error", errorThrown="Unauthorized"){
      handleError(ejqXHR={}, textStatus="error", errorThrown="Unauthorized");
    }
  });  
};

var handleResponse = function(response){
  event.stopPropagation();
  var link = '<a href="' + response.html_url +'">' + response.title + '</a>';
  return $("#issue").html(link);
}

var handleError = function(jqXHR={}, textStatus="error", errorThrown="Unauthorized"){
    var errorThrown = errorThrown;
    var textStatus = textStatus
    var jqXHR = jqXHR
  console.log("Post error: " + errorThrown);
}






