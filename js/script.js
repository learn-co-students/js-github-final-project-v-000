function submitForm() {
  $( "#issueForm" ).submit(function( event ) {
    var repoName = $( "#repoName" ).val();
    var repoOwner = $("#repoOwner").val();
    var issueTitle = $("#title").val();
    var issueDescription = $("#body").val();
    createIssue(repoName, repoOwner, issueTitle, issueDescription);
    event.preventDefault();
});


}
function GithubInteractor(token){
  this.token = token;
}

var gitInteractor = new GithubInteractor("YoudPutYourTokenHereInRealProduction");

function createIssue(repoName, repoOwner, issueTitle, issueDescription ) {

  var url = "https://api.github.com/repos/"+repoOwner+"/"+repoName+"/issues";
  var issueData = { title:issueTitle, body:issueDescription }
  $.ajax({
    beforeSend  : function (xhr) {
            xhr.setRequestHeader ("Authorization", "token"+ gitInteractor.token);
        },
    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
    url         : url, // the url where we want to POST
    dataType    : 'json', // what type of data do we expect back from the server

    data        : JSON.stringify(issueData), // our data object
})
    // using the done promise callback
    .done(handleResponse)
    .fail(handleError);
}


function handleResponse(response) {
  for(var key in response) {
    var value = key;
}
  $("#issue").append("<a href=''>"+response.title+"</a>")
}

function handleError( jqXHR, textStatus, errorThrown ) {
  console.log("Post error: "+ errorThrown);
}
