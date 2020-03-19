<?php

namespace Controller;

use Model\Api;

class Login extends View {
    public function fetch(Api $api){
        if(isset($_SESSION['admin'])){
            if(isset($_POST['ajax'])){
                return json_encode([
                    'success' => false,
                    'message' => '',
                    'data' => ['redirect' => '/admin'],
                ]);
            }
            header('Location: /admin');
            exit();
        }
        if(isset($_POST['ajax'])){
            switch ($_POST['ajax']){
                case "login":
                    $username = $_POST['login'] ?? '';
                    $password = $_POST['password'] ?? '';

                    $errors = [];
                    if(empty($username)){
                        $errors['login'] = 'Укажите логин';
                    }
                    if(empty($password)){
                        $errors['password'] = 'Укажите пароль';
                    }
                    if($errors){
                        return json_encode([
                            'success' => false,
                            'message' => '',
                            'data' => $errors,
                        ]);
                    }

                    if($api->manager->login($username, $password)){
                        return json_encode(
                            [
                                'success' => true,
                                'message' => '',
                                'data' => ['redirect' => '/admin']
                            ]
                        );
                    } else {
                        return json_encode([
                            'success' => false,
                            'message' => 'Введен неверный логин или пароль',
                        ]);
                    }
                    break;
            }
        }

        $title = 'Авторизация';
        $api->view->assign(compact('title'));

        return $api->view->fetch('login.tpl');
    }
}