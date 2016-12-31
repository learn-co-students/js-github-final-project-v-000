function submitForm(){
	$('form').submit(function(){
		var repoName = $("#repoName").val();
		var repoOwner = $("#repoOwner").val();
		var title = $("#title").val();
		var body = $("#body").val();
		createIssue(repoName, repoOwner, title, body);
	});
}

function createIssue(repoName, repoOwner, title, body){
	var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues"
 	$.ajax({
 		type: "POST",
 		url: url,
 		data: JSON.stringify({title: title, body: body}),
 		success: handleResponse,
 		error: handleError
 	});
}

function GithubInteractor(token){
	this.token = token;
}

function handleResponse(response){
	$("#issue").append(response.title)
}

function handleError(jqXHR, textStatus, errorThrown){
	console.log("Post error: " + errorThrown);
}

$(document).ready(function() {
	submitForm();	
})