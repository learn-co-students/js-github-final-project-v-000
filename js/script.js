function GithubInteractor(token) {
	this.token = token;
}

function createIssue(repoName, repoOwner, title, body) {
	var dataJSON = {
		title: title,
		body: body
	};
	var requestJSON = {
		url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(dataJSON)
	};
	$.ajax(requestJSON).done(function(response) {
		handleResponse(response);
	}).fail(function(error) {
		handleError(error);
	});
}

function handleResponse(response) {
	var html = "<a href'" + response.html_url + "'>" + response.title + "</a>";
	$("#issue").html(html);
}

function handleError(error) {
	console.log(error);
	console.log("Post error: Unauthorized");
}