<?php
require 'flight/Flight.php';
require 'lib/functions.php';


header('Access-Control-Allow-Origin: *');

//default: return a standard message to show that the service is active
Flight::route('/', function(){
    echo 'Hi to everyone. I\' am alive!! :)';
});

/*response_moves: create a web service on  "EXECUTION_DOMAIN:PORT/vitamin/moves"
 getting as input the configuration of the vitamins eg: "3B 4B 5G 6W"
 and returning the list of moves to make the colors of the shapes white */

Flight::route('GET|POST /vitamin/moves', function(){
    $s_vitamins="";
    if ($_POST){$s_vitamins=$_POST['vitamins'];}
    if ($_GET){$s_vitamins=$_GET['vitamins'];}
    echo json_encode(makeAllWhite($s_vitamins));

});


Flight::route('GET|POST /vitamin/statuses', function(){
    $s_vitamins="";
    if ($_POST){$s_vitamins=$_POST['vitamins'];}
    if ($_GET){$s_vitamins=$_GET['vitamins'];}
    $var=makeAllWhite($s_vitamins);
    echo json_encode(makeAllWhiteStatus($s_vitamins,$var));

});


Flight::start();
?>