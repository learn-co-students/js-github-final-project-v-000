
function GithubInteractor(token) {
  this.token = token;
}

function createIssue(repoName, repoOwner, issueTitle, issueDescription) {
	var dataToSend = {
		title: issueTitle,
		body: issueDescription
	}
	dataToSend = JSON.stringify(dataToSend)
	var query = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
	$.ajax( {
		url: query,
		type: "POST",
		dataType: 'json',
		data: dataToSend,
    	success: handleResponse,
    	error: handleError
	})
}


function handleResponse(response){
	var issue = $('#issue')
	var myIssue = "<a href='"
	myIssue += response["html_url"];
	myIssue += "'>"
	myIssue += response["title"]
	myIssue += "</a>"
	issue.append(myIssue)
}

function handleError(error) {
	console.log("Post error: Unauthorized")
}
