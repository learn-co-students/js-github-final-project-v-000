var token = new GithubInteractor("94066f14a71ad7c67a76753fccd8d116fa0824ee");

function GithubInteractor(token){
  this.token = token;
}

function submitForm(){
  $('form').on('submit', function(){
    //event.preventDefault();
    var name = $('#repoName').val();
    var owner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(name, owner, title, body);
  });
};

function createIssue(name, owner, title, body){
  $.ajax({
    url: "https://api.github.com/repos/" + owner + "/" + name + "/issues",
    type: "POST",
    dataType: "json",
    header: { Authentication: token.token },
    data: JSON.stringify({ title: title, body: body })
  }).done(handleResponse).fail(handleError)
}

function handleResponse(response){
  $('#issue').append($('<a>').attr('href', response.html_url).text(response.title));
};

function handleError(errorData, textStatus, errorThrown){
  console.log('Post error: ' + errorThrown);
};

$(document).ready(function(){
  submitForm()
});
