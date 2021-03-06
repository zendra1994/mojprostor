$(document).ready(function(){

  getUserStatus = function(){
    $.ajax({
        type: "GET",
        url: 'includes/php/status.php',
        async: false,
        processData: false,
        contentType: false,
        success: function(data) {
          user = JSON.parse(data);
          console.log(user)
        },
        error: function() {
            alert('Greška u konekciji.');
        }
    });
    return user;
  }

  user = getUserStatus();

    $('#search').on('click',function(){
      $('#dropdown').toggle();
      $('#login').toggle();
    })
    $('#close_search').on('click', function(){
        $('#dropdown').hide();
        $('#login').toggle();
    })


    $('#registration_submit').on('click', function(){
      email = $('#registration_email').val();
      password = $('#registration_password').val();
      first_name = $('#registration_first_name').val();
      last_name = $('#registration_last_name').val();


      formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);

      $.ajax({
	        type: "POST",
	        url: 'includes/php/registration.php',
	        data: formData,
          processData: false,
          contentType: false,
	        success: function(data) {
	        	var status = JSON.parse(data);
            console.log(status)
	        },
	        error: function() {
	            alert('Greška u konekciji.');
	        }
	    });
    });


    $('#login_submit').on('click', function(){
      email = $('#login_email').val();
      password = $('#login_password').val();


      formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      $.ajax({
            type: "POST",
            url: 'includes/php/login.php',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
              var user = JSON.parse(data);

              if ('user' in user) {
                $('#user-name').html = "<a href=\"includes/php/logout.php\"<button class=\"btn btn-warning btn-lg\">Logout</button></a>";
              }
            },
            error: function() {
                alert('Greška u konekciji.');
            }
      });
    });
})
