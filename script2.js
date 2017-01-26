$(document).ready(function(e) {
/////////////////////////////////////getting schema name 
  $.ajax({
      type: 'GET',
      url: 'http://gate.atlascon.cz:9999/rest/s/listSchemaNames',
      success: function(data) {
        for (var i = 0; i < data.length; i++) {
        $("#fir").append("<option>"+data[i]+"</option>");
        }
        //$('#note2').html( "Name of Applications are loaded....");
      },
        error: function() {
         //$('#note3').html('error loading listNames!');
      },
  });
/////////////////////////////////////////////getting the version of schema
  $('#fir').on("change", function() {
        var schem =$("#fir").val();
                $.ajax({
                  type: 'GET',
                  url:'http://gate.atlascon.cz:9999/rest/s/listVersions/'+schem,
                  success:function(data2){
                    $("#sec").empty();
                    for (var i = 0; i < data2.length; i++) {
                    $("#sec").append("<option>"+data2[i]+"</option>");
                    }
                    //$('#note4').html( "<span style=color:#F5F5F5;font-weight:bold>"+ data2 +"</span>  has been selected as version of Schema....");
                  },
                  error: function() {
                    //$('#note5').html('error loading Name Space!');
                    },
                });
//end  of select
  });
/////////////////////////////////////////////add text schema into textarea

$('#fir').on("change", function() {
$('#sec').on("change", function() {
      var one =$("#fir").val();
      var two =$("#sec").val();
      $.ajax({
        type: 'GET',
        url:'http://gate.atlascon.cz:9999/rest/s/original/'+one+"/"+two,
        success:function(data3){
        var str = JSON.stringify(data3, undefined, 4);
        $("#myTextArea").html(str);
          //$('#note4').html( "<span style=color:#F5F5F5;>"+ data2 +"</span>  has been selected as NameSpace of Application....");
        },
          error: function() {
          $("#myTextArea").empty();
          //$('#note5').html('error loading Name Space!');
          },
      });
//////////////////////////////////////update schema (error 500 on bot side but works)
$(".button5").on('click', function() {
    if (confirm('Are you sure ?')) {
    var SchemName = $('#fir').val();
    var VerSchem = $('#sec').val();
    var SchemaText1 = $('#myTextArea').val();
      $.ajax({
          type: 'POST',
          url: 'http://gate.atlascon.cz:9999/rest/s/updateDraft/'+ SchemName+"/"+VerSchem,
          data:SchemaText1,
          contentType: "application/json",
          success: function(data5) {
          //$('#test').html( "data are succcessfully sended to server...");
          },
          error: function() {
          //$('#test').html("Error in Posting data to server!");    
          },
      });
    };//end of if condition
});                                
///////////////////////////////////////////////////////state of schema
  $.ajax({
      type: 'GET',
      url:'http://gate.atlascon.cz:9999/rest/s/state/'+one+"/"+two,
      success: function(data4) {
        var a="DRAFT";
        var b="PUBLISHED";
        var c="DEPRECATED";
        var d="INVALID";
            $(".button1, .button2, .button3, .button4").css('background-color', '#555555');
            if (data4==a) {
              $(".button1").css('background-color', '#01DF01');
            }else if(data4==b){
                $(".button2").css('background-color', '#088A29');
            }else if(data4==c){
                $(".button3").css('background-color', '#088A08');
            }else if(data4==d){
                $(".button4").css('background-color', '#088A08');
            }
      },
        error: function() {
         //$('#note3').html('error loading listNames!');
      },
  });
});
});
////////////////////////////////////// adding new schema (error 500 on both side but works)
  $(".button8").on('click', function() {
    if (confirm('Are you sure ?')) {
    var version = $('#VersionSchema').val();
    var SchemaText2 = $('#TextAreaSchema').val();
      $.ajax({
          type: 'PUT',
          url: 'http://gate.atlascon.cz:9999/rest/s/'+ version,
          data:SchemaText2,
          contentType: "application/json",
          success: function(NewApp2) {
          console.log(NewApp2)
            $('#test').html( "data are succcessfully sended to server...");
          },
          error: function() {
            $('#test').html("Error in Posting data to server!");    
          },
      });
    };
  });
////////////////////////////////////////end
});


