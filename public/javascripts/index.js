
$(document).ready(function(){

  //handling count_img's change
    var counting = 0;
    $.count_display = function(card_num_check){
    	if($("#" +card_num_check).css("display")!="none"){
            counting = counting+1;
            $("#count_txt").text(counting);
      }
      else if ($("#"+card_num_check).css("display") == "none") {
            counting = counting-1;
            $("#count_txt").text(counting);
      }
   }//end. handling count_img's change

  // 'analyze button' only appear when count_img mouseovered
   $(".analyzerclass").mouseover(function(){
       $("#count_img").css('display','none');
      $("#analyze_img").css('display','block');
   });
   $(".analyzerclass").mouseout(function(){
         $("#analyze_img").css('display','none');
         if($("#count_img").css("display")=="none"){
             $("#count_img").css('display','block');
           }
    });

  //button of header
      $("#btn_down").click(function(){
          $(".headermiddle").slideToggle("slow");
          $("#btn_down").hide();
          $("#btn_up").css('display','block');
      });
      $("#btn_up").click(function(){
          $(".headermiddle").slideToggle("slow");
          $("#btn_up").hide();
          $("#btn_down").css('display','block');
      });//end button of header


  //card1
      $(".rank1").click(function(e){
        if($(e.target).is('#card_1_detail')){
             e.preventDefault();
             return;
         }
        $('#card_1_check').toggle();
        $('#card_1_des').fadeToggle( "600", "linear" );
        $.count_display('card_1_check');
      });

      $(".rank1").mouseover(function(){
        if($("#card_1_back").css("display")=="none"){
            $("#card_1_back").css('display','block');
          }
          if($("#card_1_detail").css("display")=="none"){
              $("#card_1_detail").css('display','block');
            }
      });
      $(".rank1").mouseout(function(){
        if($("#card_1_check").css("display")=="none"){
            $("#card_1_back").css('display','none');
          }
          if($("#card_1_detail").css("display")=="block"){
              $("#card_1_detail").css('display','none');
            }
      });
    //end card1

    //card2
        $(".rank2").click(function(e){
          if($(e.target).is('#card_2_detail')){
               e.preventDefault();
               return;
           }
          $('#card_2_check').toggle();
          $('#card_2_des').fadeToggle( "600", "linear" );
          $.count_display('card_2_check');
        });

        $(".rank2").mouseover(function(){
          if($("#card_2_back").css("display")=="none"){
              $("#card_2_back").css('display','block');
            }
            if($("#card_2_detail").css("display")=="none"){
                $("#card_2_detail").css('display','block');
              }
        });
        $(".rank2").mouseout(function(){
          if($("#card_2_check").css("display")=="none"){
              $("#card_2_back").css('display','none');
            }
            if($("#card_2_detail").css("display")=="block"){
                $("#card_2_detail").css('display','none');
              }
        });
      //end card2

      //card3
          $(".rank3").click(function(e){
            if($(e.target).is('#card_3_detail')){
                 e.preventDefault();
                 return;
             }
            $('#card_3_check').toggle();
            $('#card_3_des').fadeToggle( "600", "linear" );
            $.count_display('card_3_check');
          });

          $(".rank3").mouseover(function(){
            if($("#card_3_back").css("display")=="none"){
                $("#card_3_back").css('display','block');
              }
              if($("#card_3_detail").css("display")=="none"){
                  $("#card_3_detail").css('display','block');
                }
          });
          $(".rank3").mouseout(function(){
            if($("#card_3_check").css("display")=="none"){
                $("#card_3_back").css('display','none');
              }
              if($("#card_3_detail").css("display")=="block"){
                  $("#card_3_detail").css('display','none');
                }
          });
        //end card3

          //card4
          $(".rank4").click(function(e){
          if($(e.target).is('#card_4_detail')){
             e.preventDefault();
             return;
          }
          $('#card_4_check').toggle();
          $('#card_4_des').fadeToggle( "600", "linear" );
          $.count_display('card_4_check');
          });

          $(".rank4").mouseover(function(){
          if($("#card_4_back").css("display")=="none"){
            $("#card_4_back").css('display','block');
          }
          if($("#card_4_detail").css("display")=="none"){
              $("#card_4_detail").css('display','block');
            }
          });
          $(".rank4").mouseout(function(){
          if($("#card_4_check").css("display")=="none"){
            $("#card_4_back").css('display','none');
          }
          if($("#card_4_detail").css("display")=="block"){
              $("#card_4_detail").css('display','none');
            }
          });
          //end card4

          //card5
          $(".rank5").click(function(e){
          if($(e.target).is('#card_5_detail')){
               e.preventDefault();
               return;
           }
          $('#card_5_check').toggle();
          $('#card_5_des').fadeToggle( "600", "linear" );
          $.count_display('card_5_check');
          });

          $(".rank5").mouseover(function(){
          if($("#card_5_back").css("display")=="none"){
              $("#card_5_back").css('display','block');
            }
            if($("#card_5_detail").css("display")=="none"){
                $("#card_5_detail").css('display','block');
              }
          });
          $(".rank5").mouseout(function(){
          if($("#card_5_check").css("display")=="none"){
              $("#card_5_back").css('display','none');
            }
            if($("#card_5_detail").css("display")=="block"){
                $("#card_5_detail").css('display','none');
              }
          });
          //end card5

          //card6
          $(".rank6").click(function(e){
            if($(e.target).is('#card_6_detail')){
                 e.preventDefault();
                 return;
             }
            $('#card_6_check').toggle();
            $('#card_6_des').fadeToggle( "600", "linear" );
            $.count_display('card_6_check');
          });

          $(".rank6").mouseover(function(){
            if($("#card_6_back").css("display")=="none"){
                $("#card_6_back").css('display','block');
              }
              if($("#card_6_detail").css("display")=="none"){
                  $("#card_6_detail").css('display','block');
                }
          });
          $(".rank6").mouseout(function(){
            if($("#card_6_check").css("display")=="none"){
                $("#card_6_back").css('display','none');
              }
              if($("#card_6_detail").css("display")=="block"){
                  $("#card_6_detail").css('display','none');
                }
          });
          //end card6

      //card7
        $(".rank7").click(function(e){
          if($(e.target).is('#card_7_detail')){
               e.preventDefault();
               return;
           }
          $('#card_7_check').toggle();
          $('#card_7_des').fadeToggle( "600", "linear" );
          $.count_display('card_7_check');
        });

        $(".rank7").mouseover(function(){
          if($("#card_7_back").css("display")=="none"){
              $("#card_7_back").css('display','block');
            }
            if($("#card_7_detail").css("display")=="none"){
                $("#card_7_detail").css('display','block');
              }
        });
        $(".rank7").mouseout(function(){
          if($("#card_7_check").css("display")=="none"){
              $("#card_7_back").css('display','none');
            }
            if($("#card_7_detail").css("display")=="block"){
                $("#card_7_detail").css('display','none');
              }
        });
      //end card7

    //card8
        $(".rank8").click(function(e){
          if($(e.target).is('#card_8_detail')){
               e.preventDefault();
               return;
           }
          $('#card_8_check').toggle();
          $('#card_8_des').fadeToggle( "600", "linear" );
          $.count_display('card_8_check');
        });

        $(".rank8").mouseover(function(){
          if($("#card_8_back").css("display")=="none"){
              $("#card_8_back").css('display','block');
            }
            if($("#card_8_detail").css("display")=="none"){
                $("#card_8_detail").css('display','block');
              }
        });
        $(".rank8").mouseout(function(){
          if($("#card_8_check").css("display")=="none"){
              $("#card_8_back").css('display','none');
            }
            if($("#card_8_detail").css("display")=="block"){
                $("#card_8_detail").css('display','none');
              }
        });
      //end card8

      //card9
          $(".rank9").click(function(e){
            if($(e.target).is('#card_9_detail')){
                 e.preventDefault();
                 return;
             }
            $('#card_9_check').toggle();
            $('#card_9_des').fadeToggle( "600", "linear" );
            $.count_display('card_9_check');
          });

          $(".rank9").mouseover(function(){
            if($("#card_9_back").css("display")=="none"){
                $("#card_9_back").css('display','block');
              }
              if($("#card_9_detail").css("display")=="none"){
                  $("#card_9_detail").css('display','block');
                }
          });
          $(".rank9").mouseout(function(){
            if($("#card_9_check").css("display")=="none"){
                $("#card_9_back").css('display','none');
              }
              if($("#card_9_detail").css("display")=="block"){
                  $("#card_9_detail").css('display','none');
                }
          });
        //end card9

});
