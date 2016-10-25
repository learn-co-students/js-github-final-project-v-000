$(document).ready(function(){

  var API_KEY = "1e034522e5ad16a7";
  var URL = "http://api.wunderground.com/api/" + API_KEY + "/hourly/q/NY/New_York.json";
  var gitInt = new GithubInteractor(URL);

  $('#submit').click(function() {
      var repoName = $('#repoName').val();
      var repoOwner = $('#repoOwner').val();
      var title = $('#title').val();
      var body = $('#body').val();
      GithubInteractor.createIssue(repoName, repoOwner, title, body);
    });

});
