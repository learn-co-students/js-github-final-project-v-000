function submitForm() {
  $('form').on('submit', function(event) {
    const repoName = $('#repoName').val();
    const repoOwner = $('#repoOwner').val();
    const title = $('#title').val();
    const body = $('#body').val();

    createIssue(repoName,repoOwner , title, body);
    event.preventDefault();

  })
}

function GithubInteractor(token){
  this.token = token;
}


function createIssue(repoName,repoOwner , title, body) {
 const url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues'
 const token = new GithubInteractor('94cb5fc6ac70443ea93a11c8806cdb076b6e8720');
 const data = {
            "title": title,
            "body": body }
  $.ajax({
    url : url,
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data),
    success: function(response) {
       return handleResponse(response);
     },
   error: function(error){
       return handleError(error);
     }
  });


}

function handleResponse(parseJSON) {
  const link = '<a href="'+ parseJSON.html_url +'">' + parseJSON.title +'<a>';
  $('#issue').append(link);

}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}
$(document).ready(function() {
  submitForm()
})
