<?php

namespace Controller;

use Model\Api;

class Home extends View {
    public function fetch($api){
        $sort = $_REQUEST['sort'] ?? 'id';
        $dir = $_REQUEST['dir'] ?? 'DESC';
        $page = (int)($_REQUEST['page'] ?? 1);
        $dir = strtoupper($dir) == 'DESC' ? 'DESC' : 'ASC';
        $sort = in_array($sort, ['id', 'username', 'email', 'complete']) ? $sort : 'id';

        if(isset($_POST['ajax'])){
            switch ($_POST['ajax']){
                case "task/add":
                    $username = $_POST['name'] ?? '';
                    $email = $_POST['email'] ?? '';
                    $text = $_POST['text'] ?? '';

                    $errors = [];
                    if(empty($username)){
                        $errors['name'] = 'Укажите Ваше имя';
                    }
                    if(empty($email)){
                        $errors['email'] = 'Укажите Ваш email';
                    }
                    elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                        $errors['email'] = 'Укажите правильный email';
                    }
                    if(empty($text)){
                        $errors['text'] = 'Введите текст задачи';
                    }

                    if(!$errors){
                        $api->task->create(compact('username', 'email', 'text'));
                        return json_encode([
                            'success' => true,
                            'message' => 'Задача успешно добавлена',
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

        $title = 'Главная';

        $api->view->assign(compact('tasks', 'total', 'title', 'page' , 'sort', 'dir'));

        return $api->view->fetch('home.tpl');
    }
}