<?php
header('Content-Type: application/json');

$source_path = __DIR__ . '/../tasks.json';

$json_data = file_get_contents($source_path);

$tasks = $json_data;

$task_text = $_POST['task_text'] ?? '';
if($task_text){
    $tasks = json_decode($json_data, true);
    $new_task = [
        'id' => uniqid(),
        'text' => $task_text,
        'done' => false
    ];
    $tasks[] = $new_task;
    $tasks = json_encode($tasks);
    file_put_contents($source_path, $tasks);
} 

echo $tasks;