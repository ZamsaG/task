<?php
namespace Model;

class Manager extends Api {
    private $table;

    public function __construct()
    {
        $this->table = $this->database->getTableName('manager');
    }

    public function login($username, $pass){
        $pass = md5($pass);
        $manager = $this->selectOne(['username' => $username, 'password' => $pass]);
        if($manager){
            $_SESSION['admin'] = [
                'session_id' => session_id(),
                'manager' => $manager,
            ];
        }
        return $manager;
    }

    public function logout(){
        unset($_SESSION['admin']);
        return true;
    }

    function selectOne($values = false){
        $where = '';
        if($values){
            $where = $this->database->escapeArray($values, 'AND');
        }
        $this->database->query("SELECT * FROM ".$this->table ." WHERE 1 ".$where. " LIMIT 1");
        $manager = $this->database->result();

        return $manager;
    }

}