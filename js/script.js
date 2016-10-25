
$(document).ready({


  var API_KEY = "1e034522e5ad16a7";
  var URL = "http://api.wunderground.com/api/" + API_KEY + "/hourly/q/NY/New_York.json";
  var gitInt = new GithubInteractor("SDF");

  $('#submit').click(function() {
      var repoName = $('#repoName').val();
      var repoOwner = $('#repoOwner').val();
      var title = $('#title').val();
      var body = $('#body').val();
      createIssue(repoName, repoOwner, title, body);
    });


    function createIssue(repoName, repoOwner, title, body){

    },

    class GithubInteractor {
      constructor(token) {
        this.token = token
      }

      handleResponse(){

      },
      handleError(){

      }
    }
});
