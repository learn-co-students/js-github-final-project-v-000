
$( document ).ready(function() {
  submitForm();
    console.log( "ready!" );
});

function GithubInteractor (token) {
  this.token = token;
}

var interactor = new GithubInteractor("#"
)

function handleResponse(response) {
  var html = '<a href="'+response.html_url+'">'+response.title+'</a>';
  $('#issue').html(html);
};

function handleError (error) {
  var  message = error.statusText
  if (message == undefined){message = "Unauthorized"}
    console.log('Post error: '+ message);
}

function createIssue (repoName, repoOwner, title, body) {
  var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
  var data = {title: title, body: body};

  $.ajax({
    url: url,
    type: 'POST',
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "token" + interactor.token);
    },
    data: JSON.stringify(data)
  })
  .done(handleResponse)
  .fail(handleError);
}

function submitForm(){
  $('form').on('submit', function(event){

    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}
