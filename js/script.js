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
 		data: {title: title, body: body},
 		success: handleResponse(title),
 		error: handleError
 	});
}

function GithubInteractor(token){
	this.token = token;
}

function handleResponse(title){
	$("#issue").append(title)
}

function handleError(error){
	console.log("Post error: " + JSON.stringify(error));
}

$(document).ready(function() {
	submitForm();	
})