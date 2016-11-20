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
	}).fail(function(jqXHR) {
		console.log("Anon function error:")
		console.log(jqXHR);
		console.log(jqXHR.status);
		console.log(jqXHR.statusText);
		var status = jqXHR.status;
		var statusText = jqXHR.statusText;
		handleError(jqXHR, status, statusText);
	});
}

function handleResponse(response) {
	var html = "<a href'" + response.html_url + "'>" + response.title + "</a>";
	$("#issue").html(html);
}

function handleError(jqXHR, textStatus, errorThrown) {
	console.log("Entering handleError");
	console.log(jqXHR);
	console.log(textStatus);
	console.log(errorThrown);
	console.log("Post error: " + errorThrown);
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