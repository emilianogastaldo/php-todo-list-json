<?php
header('Content-Type: application/json');

$source_path = __DIR__ . '/../tasks.json';

$json_data = file_get_contents($source_path);

$tasks = $json_data;

$new_task = $_POST['task'] ?? '';
if($new_task){
    $tasks = json_decode($json_data, true);
    $tasks[] = $new_task;
    $tasks = json_encode($tasks);
    file_put_contents($source_path, $tasks);
} 



echo $tasks;