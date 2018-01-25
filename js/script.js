function GithubInteractor(token) {
  this.token = token;
}

var interactor = new GithubInteractor("078d09aa0b3dbf4bf2e0b53da2c3d735f9d06d73");

var createIssue = function(repoName, repoOwner, title, body){
  var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName +'/issues';

  $.ajax({
    method: "POST",
    url: url,
    contentType: "application/json",
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + interactor.token);
    },
    data: JSON.stringify({title: title,body: body})
  }).done(function(response) {
      $('#issue').append('<li><a href="'+response.url+'">'+response.title+'</a></li>');
    }).error(function(error) {
      // debugger;
      console.log("Post error: " + error.title)
    });
}

var submitForm = function() {
  // call functions here
  $('form').on('submit', function (e) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();

    createIssue(repoName, repoOwner, title, body);
    e.preventDefault();
  });
};

$(document).ready(function(){
  submitForm();
});
