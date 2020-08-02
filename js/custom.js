(function ($) {
  //   $('#callSendMessage').on('submit', function (e) {
  //     e.preventDefault();
  //   });
  $('#callSendMessage').on('submit', function (e) {
    e.preventDefault();
    callName = $('#callName').val();
    email = $('#email').val();
    message = $('#message').val();
    callSubject = $('#callSubject').val();
    $(this).trigger('reset');

    $.ajax({
      type: 'POST',
      url: './php/contact-form.php',
      data:
        'callName=' +
        callName +
        '&email=' +
        email +
        '&message=' +
        message +
        '&callSubject=' +
        callSubject,
      success: function (html) {
        const { response } = html;
        if (response === 'success') {
          $('#add_err2').html(
            '<div class="alert alert-success alert-dismissible rounded">\
             <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
                                                 <strong>Message Sent!</strong>  \
                                                 </div>',
          );
        } else if (response === 'fEmail') {
          $('#add_err2').html(
            '<div class="alert alert-danger alert-dismissible rounded"> \
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
                                                 <strong>Email</strong> format incorrect.  \
                                                 </div>',
          );
        } else {
          $('#add_err2').html(
            '<div class="alert alert-danger alert-dismissible rounded"> \
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
                                                   <strong>Error</strong> processing request. Please try again.  \
                                                   </div>',
          );
        }
      },
      beforeSend: function () {
        $('#add_err2').html('loading...');
      },
    });
    return false;
  });
}.apply(this, [jQuery]));
