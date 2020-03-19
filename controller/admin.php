<?php

namespace Controller;

use Model\Api;

class Admin extends View {
    public function fetch(Api $api){
        if(!isset($_SESSION['admin'])){
            if(isset($_POST['ajax'])){
                return json_encode([
                    'success' => false,
                    'message' => '',
                    'data' => ['redirect' => '/login'],
                ]);
            }
            header('Location: /login');
            exit();
        }
        $sort = $_REQUEST['sort'] ?? 'id';
        $dir = $_REQUEST['dir'] ?? 'DESC';
        $page = (int)($_REQUEST['page'] ?? 1);
        $dir = strtoupper($dir) == 'DESC' ? 'DESC' : 'ASC';
        $sort = in_array($sort, ['id', 'username', 'email', 'complete']) ? $sort : 'id';

        if(isset($_POST['ajax'])){
            switch ($_POST['ajax']){
                case "task/update":
                    $id = (int)($_POST['id'] ?? 0);
                    $text = $_POST['text'] ?? '';
                    $complete = (int)(bool)($_POST['complete'] ?? 0);

                    $errors = [];
                    if(empty($text)){
                        $errors['text'] = 'Введите текст задачи';
                    }

                    $task = $api->task->selectOne(['id' => $id]);
                    if(!$task){
                        $errors['test_nf'] = 'Задача не найдена';
                    }

                    if(!$errors){
                        if(!$task->edited) {
                            $edited = (int)($task->text != $text);
                        } else {
                            $edited = $task->edited;
                        }
                        $api->task->update($task->id, compact('complete', 'text', 'edited'));
                        return json_encode([
                            'success' => true,
                            'message' => 'Задача успешно изменена',
                        ]);
                    } else {
                        return json_encode([
                            'success' => false,
                            'message' => '',
                            'data' => $errors,
                        ]);
                    }
                    break;
                case "task/all":
                    $tasks = $api->task->paginate($page, $sort, $dir);
                    $total = $api->task->count();
                    $api->view->assign(compact('tasks', 'total', 'page', 'sort', 'dir'));
                    return json_encode([
                        'success' => true,
                        'message' => '',
                        'data' => [
                            'html' => $api->view->fetch('partials/tasks.table.tpl'),
                        ],
                    ]);
                    break;
            }
        }

        $tasks = $api->task->paginate($page, $sort, $dir);
        $total = $api->task->count();

        $title = 'Админ-панель';
        $api->view->assign(compact('tasks', 'total', 'title', 'page' , 'sort', 'dir'));

        return $api->view->fetch('admin.tpl');
    }
}