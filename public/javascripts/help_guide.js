
$(document).ready(function(){
  $('#fullcarousel-example').on('slide.bs.carousel', function (e) {
    if(e.relatedTarget.id == 'slide1'){
      $('#btn_close2,#prev_btn').css('display','none') //'btn_close2' button will be displayed at the last slide.
      $('#page2,#caption2').css('display','none')
      $('#page1,#caption1,#btn_close1,#next_btn').css('display','block')
    }
  if(e.relatedTarget.id == 'slide2'){
      $('#btn_close2').css('display','none')
      $('#page2, #caption2, #btn_close1, #prev_btn').css('display','block')
      $('#page1, #caption1').css('display','none')
      $('#page3, #caption3').css('display','none')
      // $('#page2, #caption2, #btn_close1, #prev_btn').css('display','block')
      $('#page4, #caption4').css('display','none')
      $('#page5, #caption5').css('display','none')
    }
    if(e.relatedTarget.id == 'slide3'){
      $('#btn_close2').css('display','none')
      $('#page')
      $('#page3, #caption3, #btn_close1, #prev_btn').css('display','block')
      $('#page2, #caption2').css('display','none')
      $('#page4, #caption4').css('display','none')
      // $('#page3, #caption3, #btn_close1, #prev_btn').css('display','block')
    }
    if(e.relatedTarget.id == 'slide4'){
      $('#btn_close2').css('display','none')
      $('#page3,#caption3').css('display','none')
      $('#page5,#caption5').css('display','none')
      $('#page4,#caption4,#btn_close1,#prev_btn').css('display','block')
    }
    if(e.relatedTarget.id == 'slide5'){
      $('#btn_close1,#next_btn').css('display','none')
      $('#page4,#caption4').css('display','none')
      $('#page5,#caption5,#btn_close2,#prev_btn').css('display','block')
    }
  })
});
