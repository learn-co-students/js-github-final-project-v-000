var base_url = 'https://api.github.com/repos/';
var token 

function GithubInteractor(token){
  this.token = token;
}

function submitForm(){
  $("#submit").click(function(e){
    e.preventDefault();
    createIssue($("#repoName").val(), $("#repoOwner").val(), $("#title").val(), $("#body").val());
  });
}

function createIssue(repo, owner, title, body){
  var data = {title: title, body: body}
  $.ajax({
    url: base_url + owner + "/" + repo + "/issues",
    type: "POST",
    data: JSON.stringify(data),
    headers: {
      Authorization: "token " + token
    },
    success: function(response){
      handleResponse(response);
    },
    error: function(jqXHR, status, error) { 
      handleError(error);
    }   
  })
}

function handleResponse(response){
  $("#issue").append("<a href=" + response['html_url'] + ">" + response["title"] + "</a>");
}

function handleError(someOjectIDontUnderstandYet, status, error){
  console.log("Post error: " + error);
}