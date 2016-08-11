// function that submits form, and on submit it should call createIssue

var interactor = new GithubInteractor("6fbe62e9d1f8c5b93eca40363899eac7533d891a");

$(document).ready(function() {
  submitForm();
});

// this function works but is not getting called on submit

function createIssue(repo, owner, title, body) {
  var data = { 
      title: title,
      body: body
  };

  var auth = {
    Authorization: "token "+interactor.token
  };

  $.ajax({
    url: 'https://api.github.com/repos/'+owner+'/'+repo+'/issues',
    type: 'POST',
    dataType: 'jsonp',
    data: JSON.stringify(data),
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization: ", "token " + interactor.token);
    }
    // headers: auth  
    // success: function(response){
    //   handleResponse(response);
    // },
    // error: function(xhr, textStatus, errorThrown){
    //  handleError(xhr, textStatus, errorThrown);
    // }
  }).done(handleResponse).fail(handleError);
}

function handleResponse(response)
{
  $.each(response.data, function(index, item) {
    $('#response-urls').append("<li><a href="+item.html_url+">"+item.html_url+"</a></li>");
    $('#response-titles').append("<li>"+item.title+"</li>");
    $('#response-bodys').append("<li>"+item.body+"</li>");    
  })
}

function submitForm() {
  $('form').on("submit", function(event) {
    var repoName  = $("input#repoName").val(),
        repoOwner = $("input#repoOwner").val(),
        title     = $("input#title").val(),
        body      = $("input#body").val();

    // those variables are html elements, fix them
    debugger
    createIssue(repoName, repoOwner, title, body);
  });

}

function handleError(XHR, textStatus, errorThrown) {
  // body...
  debugger
  console.log("Post error: " + errorThrown)
}

function GithubInteractor(token) {
  this.token = token;
}

