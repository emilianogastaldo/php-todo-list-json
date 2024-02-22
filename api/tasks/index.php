<?php
$tasks_json = 'http://localhost/php-todo-list-json/api/tasks.json';

$datas = file_get_contents($tasks_json);

header('Content-Type: application/json');

echo $datas;