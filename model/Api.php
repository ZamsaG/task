<?php

namespace Model;


/**
 * Class Api
 * @package Model
 * @property Task task
 * @property Database database
 * @property View view
 * @property Manager manager
 */
class Api {
    private static $objects;

    public function __get($name) {
        if(isset(self::$objects[$name])){
            return(self::$objects[$name]);
        }

        $class = '\\Model\\'.ucfirst($name);

        if(!class_exists($class)) {
            return $class;
        }

        self::$objects[$name] = new $class();

        return self::$objects[$name];
    }
}