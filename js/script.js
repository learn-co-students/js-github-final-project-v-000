
var createIssue = function(repoName, repoOwner, title, body){

  $.ajax({
      url: '/repos/' + repoOwner + '/' + repoName +'/issues',
      type: 'POST',
      dataType: 'json',
      title: title,
      body: body
  }).done(function(response) {
      $('#list').append(
        '<li><a href="'+response.url+'">'+response.title+'</a></li>'
      );
  });
}

var submitForm = function() {
  // call functions here
  $('#submit').on('click', function () {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#tile').val();
    var body = $('#body').val();

    createIssue(repoName, repoOwner, title, body);
  });
};

$(document).ready(function(){
  submitForm();
});
