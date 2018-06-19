var interactor = new GithubInteractor("592c4c561da8855558a26da1bc135f4212b578fe");//"7b083e8538f35b410f84bfa372db541ce87a5c14");

$(document).ready(function() {
  submitForm();
});

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
    dataType: 'json',
    data: JSON.stringify(data),
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    }
    // headers: auth
  }).done(handleResponse).fail(handleError);
}

function handleResponse(response)
{
  $('#issue').html(`<a href="${response.html_url}">${response.title}</a>`)
}

function submitForm() {
  $('form').on("submit", function(event) {
    var repoName  = $("input#repoName").val(),
        repoOwner = $("input#repoOwner").val(),
        title     = $("input#title").val(),
        body      = $("input#body").val();

    createIssue(repoName, repoOwner, title, body);
  });

}

function handleError(XHR, textStatus, errorThrown) {
  // body...
  console.log("Post error: " + errorThrown)
}

function GithubInteractor(token) {
  this.token = token;
}

