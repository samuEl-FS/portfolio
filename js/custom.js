(function ($) {

  var form = $('#my-form');
  var button = $('#formSubmit');
  var status = $('#add_err2');
  var numberOfMonths = $('.numberOfMonths');

  // Success and Error functions for after the form is submitted

  function getMonthDifference(startDate, endDate) {
    return (
      endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear())
    );
  }

  function assignMonths(){
    var differenceMonths = getMonthDifference( new Date('2020-12-01'), new Date());
    var years = Math.floor(differenceMonths / 12);
    var months = (differenceMonths - (years * 12));
    var text = '(' + (years > 0 ? years + ' YEAR ': '') + months + ' MONTHS)';
    numberOfMonths.text(text);
  }

  assignMonths();

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
