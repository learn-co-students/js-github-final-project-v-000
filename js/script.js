
function handleResponse(response){
  debugger;
}


function createIssue(repoName, repoOwner, title, body){
var url  = interactor.apiBaseUrl + repoOwner + "/" + repoName + "/issues";
var data = {
    title: title,
    body: body
  }
  $.ajax({
    type: "POST",
    url: url,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
      data: JSON.stringify(data)
    })
    .done(handleResponse)
    .fail(handleError);
  }






//cef4a23be5bceabd0db167f949fe15555c2d00ba
