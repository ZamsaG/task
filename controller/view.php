<?php

namespace Controller;

use Model\Api;

class View {
    public function show(){
        $controller = in_array($_GET['q'] ??'', ['home', 'admin', 'login', 'logout']) ? $_GET['q'] : 'home';
        $viewClass = '\\Controller\\'.ucfirst(in_array($controller, ['home', 'admin', 'login']) ? $controller : 'home');

        $api = new Api();

        if($controller == 'logout'){
            $api->manager->logout();
            header('Location: /');
            exit();
        }

        $api->view->assign('controller', $controller);
        $api->view->assign('authorised', isset($_SESSION['admin']));

        $view = new $viewClass();
        return $view->fetch($api);
    }
}