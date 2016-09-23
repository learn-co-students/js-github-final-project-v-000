function GithubInteractor(token){
	this.token = token;
}

function submitForm(){
	$('form').on('submit', function(e){
		e.preventDefault();
		var repoName = $('#repoName').val();
		var repoOwner = $('#repoOwner').val();
		var issueTitle = $('#title').val();
		var issueBody = $('#body').val();
		createIssue(repoName,repoOwner, issueTitle, issueBody);
	})
}

function createIssue(repoName, repoOwner, issueTitle, issueBody){
	console.log(repoName + repoOwner + issueTitle + issueBody);
	var postData = {
      'title':   issueTitle,
      'body': issueBody, 
    };
    var postURL = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
    console.log(postData);
    $.ajax({
	  type: "POST",
	  url: postURL,
	  data: JSON.stringify(postData),
	})
		.done(function(data) {
			console.log(data);
			handleResponse(data);
		})
		.fail(function(data) {
			console.log(data);
			handleError(data);
		})
}

function handleResponse(data){
	$('#issue').append(data.title);
}

function handleError(){
    console.log("Post error: Unauthorized");
}