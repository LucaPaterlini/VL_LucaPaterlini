//CONSTANTS
const CONST_HEIGHT=200;
const DICT_COLORS={"B":"black","G":"gray","W":"white"};
const INPUT_CHECK_RANGE="(60|[1-5][0-9]|[^0-9]?[3-9])";
const COLOR_LIST="BGW";
const START_STATUS="3B 4B 5G 6W";
const LEN_STATUS=4;

//GLOBAL VARIABLES
var input_regex_string="^(?:("+INPUT_CHECK_RANGE+")["+COLOR_LIST+"]\\ (?!.*\\1)){"+String(LEN_STATUS-1);
input_regex_string+="}("+INPUT_CHECK_RANGE+")["+COLOR_LIST+"](?!.*\\1)$";
var input_regex = new RegExp(input_regex_string);

/*changeColor: change the color of the shapes accordingly with the tmp_arr passed as input */
function changeColor(tmp_stage,tmp_arr){
        tmp_arr.forEach(function (item) {
            tmp_stage.find("#" + item[0]).fill(DICT_COLORS[item[1]]);
            tmp_stage.find("#main_l").draw();
        });
}
/*commandToArray: takes as input the string containing the status and returns an array of items (value,color_letter)*/
function commandToArray(s_vitamin) {
    var arr=[];
    s_vitamin.split(" ").forEach(function(item) {
        var v_shape=parseInt(item.substring(0,item.length-1));
        var c_shape=item.substring(1,2);
        arr.push([v_shape,c_shape]);
    });
    arr.sort(function(a,b){return a[0] - b[0]})
    return arr;
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
    return tmp_stage
}

$(document).ready(function(){

    $("#vitamins").attr("placeholder", START_STATUS);
    var g_stage=createShapes(START_STATUS);

    $("#mrb" ).click(function() {
        var s_command=$("#vitamins").val().trim();
        if(input_regex.test(s_command)) {
            var arr_command=commandToArray(s_command);
            changeColor(g_stage,arr_command);}
        else{alert("The input format is of type [3-60][BGW]{"+(LEN_STATUS)+"}. Retry ! :) Example: "+START_STATUS);}
    });
});
