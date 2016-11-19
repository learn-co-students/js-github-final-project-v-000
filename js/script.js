function GithubInteractor(token) {
	this.token = token;
}

function createIssue(repoName, repoOwner, title, body, token) {
	var dataJSON = {
		title: title,
		body: body
	};
	var requestJSON = {
		url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
		type: 'POST',
		dataType: 'json',
		headers: {
	    	Authorization: "token " + token
		},
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

function handleError(error, error2) {
	console.log(error);
	console.log(error.constructor);
	console.log(error.constructor.name);
	console.log(error.message);
	console.log(error.errors);
	console.log("Post error: Unauthorized");
}

function handleSubmit() {
	$("#submit").on("click", function(event) {
		event.preventDefault();
		var token = $("#token").val();
		var repoName = $("#repoName").val();
		var repoOwner = $("#repoOwner").val();
		var title = $("#title").val();
		var body = $("#body").val();
		createIssue(repoName, repoOwner, title, body, token);
	});
}

$(document).ready(function(){
	handleSubmit();
});