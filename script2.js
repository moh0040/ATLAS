$(document).ready(function(e) {
/////////////////////////////////////getting schema name

  $.ajax({
      type: 'GET',
      url: 'http://gate.atlascon.cz:9999/rest/s/listSchemaNames',
      success: function(data) {
            for (var i = 0; i < data.length; i++) {
                $("#fir").append("<option>"+data[i]+"</option>");
            }
                $('#note22').html( "Name of Schema are loaded....");
      },
            error: function() {
                $('#note33').html('error loading schema name!');
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
                        $('#note44').append( "<span style=color:#F5F5F5;font-weight:bold>"+ data2 +"</span>  has been selected as version of Schema....");
                    },
                    error: function() {
                        $('#note55').html('error loading version!');
                    },
                });

 });


/////////////////////////////////////////////loading text schema into textarea
$('#fir').on("change", function() {
$('#sec').on("change", function() {
              var one =$("#fir").val();
              var two =$("#sec").val();
              console.log(two);
              $("#tbl_S2").val(two);
              $.ajax({
                    type: 'GET',
                    url:'http://gate.atlascon.cz:9999/rest/s/original/'+one+"/"+two,
                    success:function(data3){
                    var str = JSON.stringify(data3, undefined, 4);
                        $("#myTextArea").html(str);
                        $('#test2').html( "Note: Schema succcessfully loaded from server...");
                        $('#note66').html( "Schema has loaded into textarea....");
                    },
                    error: function() {
                        $('#test3').html( "error for loading from server...");
                        $("#myTextArea").empty();
                        $('#note77').html('error loading Schema text!');
                    },
              });

//////////////////////////////////////////////////////////////state of schema
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
                            $(".button3").css('background-color', '#FFA200');
                        }else if(data4==d){
                            $(".button4").css('background-color', '#FF0000');
                        }
                            $('#note88').html('State successfully selected ....');
                  },
                  error: function() {
                        $('#note99').html('error loading state!');
                  },
              });
});
});
//////////////////////////////////////update schema (error 500 on bot side but works)
$(".button5").on('click', function() {
var SchemName = $('#fir').val();
var VerSchem = $('#sec').val();
    if (confirm('Are you sure ?')) {
    var SchemaText1 = $('#myTextArea').val();
          $.ajax({
              type: 'POST',
              url: 'http://gate.atlascon.cz:9999/rest/s/updateDraft/'+ SchemName+"/"+VerSchem,
              data:SchemaText1,
              contentType: "application/json",
              success: function(data5) {
              $('#test1').html( "data are succcessfully post to server...");
              $('#note100').html( "data are succcessfully post to server...");
              },
              error: function() {
              $('#test4').html("Error in Posting data to server!");
              $('#note101').html("Error in Posting data to server!");
              },
          });
    };//end of if condition
});
//////////////////////////////////////Transition
$(".button7").on('click', function() {
    var SchemName = $('#fir').val();
    var VerSchem = $('#sec').val();
    if (confirm('Do you want to change the state of schema ?')) {
        $.ajax({
            type: 'POST',
            url: 'http://gate.atlascon.cz:9999/rest/s/stateTransition/'+ SchemName+"/"+VerSchem,
            contentType: "application/json",
            success: function(data5) {
                $('#note102').html( "Transition was succcessfull...");
            },
            error: function() {
                $('#note103').html("Error in Transition!");
            },
      });
    };//end of if condition
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
                $('#test').html( "New Schema succcessfully upload to server...");
            },
            error: function() {
                $('#test5').html("Error in Posting new schema to server!");
            },
        });
    };
  });


//////////////////////////////////////schema version






////////////////////////////////////////end
});


