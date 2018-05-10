// // Wait for the web page to be ready
// $(document).ready(function() {
//   // grab all thumbnails and add bootstrap popovers
//   // https://getbootstrap.com/javascript/#popovers
//   $('[data-toggle="popover"]').popover({
//     container: 'body',
//     html: true,
//     placement: 'auto',
//     trigger: 'hover',
//     content: function() {
//       // get the url for the full size img
//       var url = $(this).data('full');
//       return '<img src="' + url + '">'
//     }
//   });
// });

$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});

$('.popover-dismiss').popover({
  trigger: 'focus'
})