function navbarScroll(){
    var scroll=$(window).scrollTop();
    var height=$('#header').height();
    scroll=(scroll/height).toFixed(1);
    $('#navbar').css('background-color',`rgba(0,0,0,${scroll})`);
    console.log(scroll);
}
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
  });