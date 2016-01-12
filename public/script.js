/**
 * @author Aashna Makkar
 *
 */
$(document).ready(function() {
  //showSlideshow();
/*$('#nav1').delay(300).animate({opacity:.8},1400);
  $('#nav2').delay(900).animate({opacity:.8},1200);
  $('#nav3').delay(1700).animate({opacity:.8},1200);*/
 
  /*if(($(document).width()<736)&&($(document).height()<450)){
     
        $('#nav1').css("width","45px");
        $('#nav2').css("width","45px"); 
        $('#nav3').css("width","45px");  
        $('nav_css').css("font-size","38px");
        $('#nav1').css("height","400px");
        $('#nav2').css("height","400px"); 
        $('#nav3').css("height","400px"); 
        $('.nav_css').css("font-size","30px"); 
        $('.nav_css').css("font-weight","200"); 
      
   }*/
  $('#nav1').delay(300).animate({left:"100px"},1400);
  $('#nav2').delay(1100).animate({left:"157px"},1200);
  $('#nav3').delay(1700).animate({left:"214px"},1200);
  
  
  /** VERTICAL NAVS **/
  var spice_active=false;
  var story_active=false;
  var menu_active=false;
  var $story=$('#STORY');
  var $menu=$('#MENU');
  var $spice=$('#SPICE');

  $('#nav1').click(function(){
      
     // if($(window).width()>685){
      if(!spice_active){
          $('#bigBlackBox').hide();
          /*$('#MENU').detach();
          $('#STORY').detach();*/
         $('#bigBlackBox').empty();
           story_active=false;
           menu_active=false;
           spice_active=true;
      $('#bigBlackBox').animate({left:156},50,function(){
          
          $spice.appendTo('#bigBlackBox');
          $('#bigBlackBox').fadeIn(2000);
           $spice.fadeIn(2000);
          $('#nav3').animate({left:"812px"},1500);
          $('#nav2').animate({left:"756px"},1500);
      });
     };
    //}
    //else {
        
    //}
  });
    $('#nav2').click(function(){
        // if($(window).width()>685){
        if(!story_active) {
            $('#bigBlackBox').hide();
            /*$('#MENU').detach();
            $('#SPICE').detach();*/
            $('#bigBlackBox').empty();
            story_active=true;
            spice_active=false;
            menu_active=false;
      $('#bigBlackBox').animate({left:212},50,function(){
          //$('#bigBlackBox').addClass("STORY");//html('<p>STORY IS OPEN</p>');
          $story.appendTo("#bigBlackBox");
          $('#bigBlackBox').fadeIn(2000);
         $story.fadeIn(2000);
          $('#nav3').animate({left:"812px"},1500);
          $('#nav2').animate({left:"156px"},1500);
      });
     };
     //}
  });
   $('#nav3').click(function(){
        //if($(window).width()>685){
        if(!menu_active) {
            $('#bigBlackBox').hide();
            menu_active=true;
            /*$("#STORY").detach();
            $('#SPICE').detach();*/
            $('#bigBlackBox').empty();
            story_active=false;
            spice_active=false;
      $('#bigBlackBox').animate({left:268},50,function(){
          $menu.appendTo('#bigBlackBox');//html('<p>MENU IS OPEN</p>');
          $('#bigBlackBox').fadeIn(2000);
          $menu.fadeIn(2000);
          $('#nav3').animate({left:"212px"},1500);
          $('#nav2').animate({left:"156px"},1500);
      });
     };
    //}
  });
 
 
});


