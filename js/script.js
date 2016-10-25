$(document).ready( function(){
  var gitInt = new GithubInteractor("1e034522e5ad16a7");

  $('#submit').click(function() {
      var repoName = $('#repoName').val();
      var repoOwner = $('#repoOwner').val();
      var title = $('#title').val();
      var body = $('#body').val();
      createIssue(repoName, repoOwner, title, body);
    });




});


var createIssue = function(repoName, repoOwner, title, body) {

}


function handleResponse() {

}

function handleError() {

}

class GithubInteractor {
  constructor(token) {
    this.token = token
  }

}
