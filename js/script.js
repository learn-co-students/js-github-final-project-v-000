
class GithubInteractor{
  constructor(token){
    this.token = token
  }
}

var createIssue = function(repoName,repoOwner , title, body){
  var repoName = repoName
  var repoOwner = repoOwner
  var data = {}
  data.title = title
  data.body = body

  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'JSON',
    data: JSON.stringify(data),
    success: function(success){
      handleResponse(success)
    },
    error: function(error){
      handleError(error)
    }
  })  
}

var handleResponse = function(response){
  event.stopPropagation();
  return $("#issue").append(response.title);
}

var handleError = function(jqXHR={}, textStatus="error", errorThrown="Unauthorized"){
    var errorThrown = errorThrown;
    var textStatus = textStatus
    var jqXHR = jqXHR
  console.log("Post error: " + errorThrown);
}







