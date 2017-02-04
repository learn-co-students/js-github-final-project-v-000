$(document).ready(function() {
  // add click listener here
  // it should call on fetchJSON()
    $('input#submit').on('click', submitForm);
});

function submitForm(){
  createIssue();
}


function createIssue(){
//     $.post("/repos/:owner/:repo/issues",
//     {
//         name: "Donald Duck",
//         city: "Duckburg"
//     },
//     function(data, status){
//         alert("Data: " + data + "\nStatus: " + status);
//     });
}




function GithubInteractor(object){
  var token = object
  return token 
} 



function handleResponse(){

}

function handleError(){

}