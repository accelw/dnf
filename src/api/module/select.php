<?php header('Access-Control-Allow-Origin:*');
include("../db.php");

$name = $_GET["name"];
$password = $_GET["password"];

$sql = 'select * from user where name="' . $name . '" and password="' . $password .'"';
// echo $sql;
$res = mysql_query($sql);

$arr = array();
while ($row = mysql_fetch_assoc($res)) {
  array_push($arr, $row);
}

if ($res) {
  echo json_encode(array(
    "res_code" => 200,
    "res_message" => "登录成功",
    "res_body" => array(
        "list" => $arr
      )
  ));
} else {
  echo json_encode(array(
    "res_code" => 201,
    "res_message" => "网络错误，登录失败，请重试"
  ));
}


?>