<?php
$tasks_json = 'http://localhost/php-todo-list-json/api/tasks.json';

$json_data = file_get_contents($tasks_json);

$php_data = json_decode($json_data, true);






header('Content-Type: application/json');

echo json_encode($datas);