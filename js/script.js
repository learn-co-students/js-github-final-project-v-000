$(document).ready(function() {
  submitForm();
});

function GithubInteractor(token) {
  this.token = token;
}

var interactor = new GithubInteractor("PersonalAccessToken");

function submitForm() {
  $('form').on('submit', function(e) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('title').val();
    var body = $('body').val();
    createIssue(repoName, repoOwner, title, body);
    e.preventDefault();
  });
}

function createIssue(repoName, repoOwner, title, body) {
  var data = {
    "title": title,
    "body": body
  };

  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    headers: {
      Authorization: 'token ' + interactor.token
    }
  })
  .done(handleResponse)
  .fail(handleError);
}

function handleResponse(response) {
  $('#issue').html('<a href="' + response.html_url + '">' + response.title + '</a>');
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log('Post error: ' + errorThrown);
}

// $(document).ready(function(){
// 	var repoName, title, body;
// 	submitForm();
// });

// // we define the Issue object
// function Issue(issueURL, title, body){
//   this.issueURL = issueURL;
//   this.title = title;
//   this.body = body;
// }

// // the issue object's instance method
// Issue.prototype.renderIssue = function(selector){
//   var link = $('<a>')
//     .attr('href', this.issueURL)
//     .text(this.title);
//     selector.append(link);
// }


// // To create the base URL with our API token
// // this is an object
// function GithubInteractor(token){
//   this.token = token;
//   this.apiBaseUrl = "https://api.github.com/repos/";
// }

// var interactor = new GithubInteractor("YoudPutYourTokenHereInRealProduction")


// function submitForm(){
// 	$("input").on("submit", function(event){
// 		var repoName = $('#repoName').val();
// 		var repoOwner = $('#repoOwner').val();
// 		var issueName = $("#title").val();
// 		var issueContent = $("#body").val();

// 		event.preventDefault();
// 		createIssue(repoName, repoOwner , issueName, issueContent);
// 	})
// 	// should call createIssue();
// }

// function createIssue(repoName, repoOwner , issueName, issueContent){
// 	// we use our GithubInteractor
// 	var github_url = interactor.apiBaseUrl + repoOwner + '/' + repoName + '/issues';
// 	var github_data = {
// 		title: issueName,
// 		body: issueContent
// 	};

// 	$.ajax({
// 		url: github_url,
// 		type: 'POST',
// 		beforeSend: function(xhr) {
// 		  // we use our GithubInteractor
// 	      xhr.setRequestHeader("Authorization", "token " + interactor.token);
// 	    },
// 		data: JSON.stringify(github_data)
// 	})
// 	.done(function(response){
// 		var issue = new Issue(response.html_url, response.title, response.body)
// 		issue.renderIssue($('#issue'));
// 	})
// 	.fail(function(jqXHR, textStatus, error){
// 		console.log("Post error: " + response);
// 	});
// }