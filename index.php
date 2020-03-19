<?php

session_start();
require 'config.php';

require 'vendor/autoload.php';

$view = new \Controller\View();
echo $view->show();