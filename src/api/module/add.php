<?php header('Access-Control-Allow-Origin:*');
include("../db.php");

$name = $_GET["name"];
$password = $_GET["password"];
$phone = $_GET["phone"];



$sql = "insert into user (name, password, phone) values ('$name', '$password', '$phone')";

$res = mysql_query($sql);

if ($res) {
  echo json_encode(array(
    "res_code" => 200,
    "res_message" => "新增数据成功"
  ));
} else {
  echo json_encode(array(
    "res_code" => 201,
    "res_message" => "网络错误，新增失败，请重试"
  ));
}

?>