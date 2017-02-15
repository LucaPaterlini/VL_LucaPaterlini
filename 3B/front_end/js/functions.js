//CONSTANTS
const CONST_HEIGHT=200;
const DICT_COLORS={"B":"black","G":"gray","W":"white"};
const INPUT_CHECK_RANGE="(60|[1-5][0-9]|[^0-9]?[3-9])";
const COLOR_LIST="BGW";
const EXAMPLE_STATUS="3B 4B 5G 6W";
const URL_MOVES="http://127.0.0.1:5000/vitamin/statuses";
const REFRESH_RATE=1000;

//GLOBAL VARIABLES
var input_regex_string="^(?:("+INPUT_CHECK_RANGE+")["+COLOR_LIST+"]\\ (?!.*\\1))*";
input_regex_string+="("+INPUT_CHECK_RANGE+")["+COLOR_LIST+"](?!.*\\1)$";
var input_regex = new RegExp(input_regex_string);

/*commandToArray: takes as input the string containing the status and returns an array of items (value,color_letter)*/
function commandToArray(s_vitamin) {
    var arr=[];
    s_vitamin.split(" ").forEach(function(item) {
        var v_shape=parseInt(item.substring(0,item.length-1));
        var c_shape=item.substring(item.length-1,item.length);
        arr.push([v_shape,c_shape]);
    });
    return arr;
}

/*aquireData: get the unsort command as input and return le input string elements sorted and
              the array with the status transitions during the solution of the task */
function aquireData(tosort_s_command){
    /*sorting the input string by shape_side ascending */
    var input_array=commandToArray(tosort_s_command);
    input_array.sort( function(a,b) { return a[0] - b[0]; } );
    var s_command="";
    input_array.forEach(function(element) {
        s_command+=String(element[0])+element[1]+" ";
    });
    /* getting the input from the web service*/
    var array_status=[];
    $.getJSON({
        dataType: "json",
        url: URL_MOVES,
        data:{"vitamins": s_command},
        crossDomain: true,
        async: false,
        success: function( data ) {
            array_status=data;
        }
    });
    return array_status;
}

/*createShapes: take as input the cavas configuration object and the string containing the configuration ,
 than draws the shapes filling them with the right color*/
function createShapes(s_command){
    var status_array_vitamins=commandToArray(s_command);
    var tmp_stage = new Konva.Stage({container: 'container', width: window.innerWidth, height: CONST_HEIGHT});
    var tmp_layer = new Konva.Layer({id:"main_l"});

    function showShapes(array_v) {
        for(var i=0;i<array_v.length;i++) {
            var x_t = i * 100 + 100;
            var n_side = array_v[i][0];
            var polygon = new Konva.RegularPolygon({
                x: x_t,
                y: 100,
                sides: n_side,
                radius: 35,
                fill: DICT_COLORS[array_v[i][1]],
                stroke: 'black',
                strokeWidth: 2,
                id: String(n_side)
            });
            tmp_layer.add(polygon);
        }
    }
    showShapes(status_array_vitamins);
    tmp_stage.add(tmp_layer);
    return tmp_stage;
}

/*changeColor: change the color of the shapes accordingly with the tmp_arr passed as input */
function changeColor(tmp_stage,tmp_arr){
    tmp_arr.forEach(function (item) {
        tmp_stage.find("#" + item[0]).fill(DICT_COLORS[item[1]]);
        tmp_stage.find("#main_l").draw();
    });
}

$(document).ready(function(){

    $("#vitamins").attr("placeholder", EXAMPLE_STATUS);
    $("#mrb" ).click(function() {

        var tosort_s_command = $("#vitamins").val().trim();
        console.log("\""+tosort_s_command+"\"");

        /* check the input sent by the user*/
        if (!input_regex.test(tosort_s_command)) {
            alert("The input format wrong and/or items value are not unique." +
                " Retry ! :) Example: " + EXAMPLE_STATUS);
        } else {
            $("#vitamins").prop('disabled', true);
            $("#container").innerHTML="";

            var array_status=aquireData(tosort_s_command);
            var g_stage=createShapes(array_status[0]);

            var i=1;
            var time = setInterval(function(){
                var arr_command=commandToArray(array_status[i]);
                changeColor(g_stage, arr_command);
                i++;
                if (i>=array_status.length) {
                    clearInterval(time);
                    $("#vitamins").prop('disabled', false);
                }
            },REFRESH_RATE);
        }
    });
});
