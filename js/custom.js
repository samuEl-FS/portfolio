(function ($) {
  //   $('#callSendMessage').on('submit', function (e) {
  //     e.preventDefault();
  //   });
  // $('#callSendMessage').on('submit', function (e) {
  //   e.preventDefault();
  //   callName = $('#callName').val();
  //   email = $('#email').val();
  //   message = $('#message').val();
  //   callSubject = $('#callSubject').val();
  //   $(this).trigger('reset');

  //   $.ajax({
  //     type: 'POST',
  //     url: './php/contact-form.php',
  //     data:
  //       'callName=' +
  //       callName +
  //       '&email=' +
  //       email +
  //       '&message=' +
  //       message +
  //       '&callSubject=' +
  //       callSubject,
  //     success: function (html) {
  //       const { response } = html;
  //       if (response === 'success') {
  //         $('#add_err2').html(
  //           '<div class="alert alert-success alert-dismissible rounded">\
  //            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
  //                                                <strong>Message Sent!</strong>  \
  //                                                </div>',
  //         );
  //       } else if (response === 'fEmail') {
  //         $('#add_err2').html(
  //           '<div class="alert alert-danger alert-dismissible rounded"> \
  //           <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
  //                                                <strong>Email</strong> format incorrect.  \
  //                                                </div>',
  //         );
  //       } else {
  //         $('#add_err2').html(
  //           '<div class="alert alert-danger alert-dismissible rounded"> \
  //           <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
  //                                                  <strong>Error</strong> processing request. Please try again.  \
  //                                                  </div>',
  //         );
  //       }
  //     },
  //     beforeSend: function () {
  //       $('#add_err2').html('loading...');
  //     },
  //   });
  //   return false;
  // });

  var form = $('#my-form');
  var button = $('#formSubmit');
  var status = $('#add_err2');

  // Success and Error functions for after the form is submitted

  function success() {
    form.reset();
    // button.style = "display: none ";
    status.innerHTML =
      '<div class="alert alert-success alert-dismissible rounded">\
               <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
                                                   <strong>Message Sent!</strong>  \
                                                   </div>';
  }

  function error() {
    status.innerHTML =
      '<div class="alert alert-danger alert-dismissible rounded"> \
              <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
                                                     <strong>Error</strong> processing request. Please try again.  \
                                                     </div>';
  }

  // handle the form submission event

  form.on('submit', function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });

  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }
}.apply(this, [jQuery]));
