$(function() {
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
                alert("error to load schema name!");
      },
  });
/////////////////////////////////////////////getting the version of schema

  $('#fir').on("change", function() {


  $('#spanid').empty();
        var schem =$("#fir").val();
                $.ajax({
                    type: 'GET',
                    url:'http://gate.atlascon.cz:9999/rest/s/listVersions/'+schem,
                    success:function(data2){



                    $("#sec").empty();




                         $("#sec").empty();
                       for (var i = 0; i < data2.length; i++) {


                            $("#sec").append("<option>"+data2[i]+"</option>");
                        }

                    },
                        error: function() {
                          alert("error to load version of schema!");

                         },

                });

 });


/////////////////////////////////////////////loading text schema into textarea
$(".button7").prop("disabled",true);
$(".button7").css('font-weight', 'normal');
$(".button9").prop("disabled",true);
$('#fir').on("change", function() {
$('#sec').on("change", function() {
              var one =$("#fir").val();
              var two =$("#sec").val();
              console.log(two);
              $("#tbl_S2").val(two);

                    if ($("#tbl_S2").is('empty')) {
                    console.log('empty-version-box');
                    } else {
                    $(".button9").prop("disabled",false);
                    $(".button9").css('font-weight', 'bold');
                    };

              $.ajax({
                    type: 'GET',
                    url:'http://gate.atlascon.cz:9999/rest/s/original/'+one+"/"+two,
                    success:function(data3){
                    var str = JSON.stringify(data3, undefined, 4);
                        $("#myTextArea").html(str);
                    },
                    error: function() {
                    alert("error to load text of schema!");

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

                        $(".button1, .button2, .button3, .button4").css('background-color', '#dddddd');
                        $(".button1, .button2, .button3, .button4").css('color', '#848484');
                        $(".button1, .button2, .button3, .button4").css('font-weight', 'normal');
                        $(".button7").css('font-weight', 'bold');

                        if (data4==a) {
                            $(".button1").css('background-color', '#00F8B2');
                            $(".button1").css('color', '#242424');
                            $(".button1").css('font-weight', 'bold');
                            $(".button7").prop("disabled",false);
                        }else if(data4==b){
                            $(".button2").css('background-color', '#01DF01');
                            $(".button2").css('color', '#242424');
                            $(".button2").css('font-weight', 'bold');
                            $(".button7").prop("disabled",false);
                        }else if(data4==c){
                            $(".button3").css('background-color', '#FFA200');
                            $(".button3").css('color', '#242424');
                            $(".button3").css('font-weight', 'bold');
                            $(".button7").prop("disabled",false);
                        }else if(data4==d){
                            $(".button4").css('background-color', '#FF0000');
                            $(".button4").css('color', '#242424');
                            $(".button4").css('font-weight', 'bold');

                            $(".button7").prop("disabled",true);
                            $(".button7").css('font-weight', 'normal');

                        }
                            $('#note88').html('State successfully selected ....');
                  },
                  error: function() {
                        alert("error to load state of schema !");
                  },
              });
              //////////////////////validation mark

                      var validation = $('#myTextArea').val();
                      $.ajax({
                          type: 'POST',
                          url: 'http://gate.atlascon.cz:9999/rest/s/validate',
                          data:validation,
                          contentType: "application/json",
                          success: function(data5) {
                              $('#spanid').html('<h3 style="font-size:14px; color:black; font-weight:bold; font-style:italic;">Valid Schema : <span style="font-size:20px; color:#01DF3A; font-weight:bold; font-style:italic;">&#10004;</span></h3>');
                              console.log("this is valid schema")
                          },
                          error: function() {
                              $('#spanid').html('<h3 style="font-size:14px; color:black; font-weight:bold; font-style:italic;">Invalid Schema : <span style="font-size:20px; color:red; font-weight:bold; font-style:italic;">&#10006;</span></h3>');
                          },
                    });





});
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
               alert("error in transition!");
            },
      });
    };//end of if condition
});


////////////////////////////////////// adding new schema (error 500 on both side but works)

$(".button8").on('click', function() {
    if (confirm('Are you sure ?')) {
        var version = $('#tbl_S2').val();
        var SchemaText2 = $('#myTextArea').val();
        $.ajax({
            type: 'POST',
            url: 'http://gate.atlascon.cz:9999/rest/s/'+ version,
            data:SchemaText2,
            contentType: "application/json",
            success: function() {
                                				var id2=SchemaText2.namespace;
                                				var id3=SchemaText2.name;

                                				 $("#fir").append("<option>"+id2+"."+id3+"</option>");

            },
            error: function() {
            alert("error to add a new schema !");

            },
        });
    };
  });


//////////////////////////////////////clean function


$(".button9").on('click', function reset() {
    if (confirm('Are you sure to clean version and schema values ?')) {

       $('#myTextArea').val('');

       $('input[type=number]').val('');

    };
  });





////////////////////////////////////////end
});





