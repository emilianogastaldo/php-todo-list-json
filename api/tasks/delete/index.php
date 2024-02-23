<?php
header('Content-Type: application/json');

$source_path = __DIR__ . '/../../tasks.json';

$json_data = file_get_contents($source_path);

$tasks = $json_data;

$task_id = $_POST['id'] ?? null;
if($task_id){
    $tasks = json_decode($json_data, true);

    // Le arrow fn non ha scope come le fn normali.
    $tasks = array_filter($tasks, fn($task) => $task['id'] !== $task_id);
    
    // $tasks = array_filter($tasks, function($task) use($task_id){
    //     return $task['id'] !== $task_id;
    // });

    $tasks = json_encode($tasks);
    file_put_contents($source_path, $tasks);
}



echo $tasks;