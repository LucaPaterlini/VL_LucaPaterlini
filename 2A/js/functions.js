/*CONSTANTS*/
const CONST_HEIGHT=200;
const DICT_COLORS={"B":"black","G":"gray","W":"white"};
const START_STATUS="3B 4B 5G 6W";

/*commandToArray: takes as input the string containing the status and returns an array of items (value,color_letter)*/
function commandToArray(s_vitamin) {
    var arr=[];
    s_vitamin.split(" ").forEach(function(item) {
        var v_shape=parseInt(item.substring(0,item.length-1));
        var c_shape=item.substring(1,2);
        arr.push([v_shape,c_shape]);
    });
    return arr;
}
/*createShapes: take as input the cavas configuration object and the string containing the configuration ,
                than draws the shapes filling them with the right color*/
function createShapes(s_command){
    var status_array_vitamins=commandToArray(s_command);
    var tmp_stage = new Konva.Stage({container: 'container', width: window.innerWidth, height: CONST_HEIGHT});
    var layer = new Konva.Layer({name:"main_l"});

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
            layer.add(polygon);
        }
    }
    showShapes(status_array_vitamins);
    tmp_stage.add(layer);
    return tmp_stage;
}

$(document).ready(function(){
    createShapes(START_STATUS);
});
