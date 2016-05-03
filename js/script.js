
function handleResponse(response){
  $('#issue').html(response.title);
}

function handleError (xhr, status, error) {
  console.log("Post error: " + error);
}

function GithubInteractor(token){
    this.token = token;
    this.apiBaseUrl = "https://api.github.com/repos/";
}

var interactor = new GithubInteractor("b1e8bd7f900ee1ec665331947447de65cd244018");

function createIssue(repoName, repoOwner, title, body){
  var url  = interactor.apiBaseUrl + repoOwner + "/" + repoName + "/issues";

  var data = {
      "title": title,
      "body": body
    }
    $.ajax({
      type: "POST",
      url: url,
      datatype: "jsonp",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "token " + interactor.token);
      },
        data: JSON.stringify(data)
      })
      .done(function(resp){handleResponse(resp)})
      .fail(function(xhr, status, error){handleError(xhr, status, error)});
    }

  function submitForm(){
    $('form').on('submit', function(event){
      // take data below and turn into object with properties
      var repoName = $('#repoName').val();
      var repoOwner = $('#repoOwner').val();
      var title = $('#title').val();
      var body = $('#body').val();
      createIssue(repoName, repoOwner, title, body);
      event.preventDefault();
    });
  }



$(document).ready(function(){
  submitForm();

});




//cef4a23be5bceabd0db167f949fe15555c2d00ba
