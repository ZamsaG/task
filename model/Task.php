<?php

namespace Model;

class Task extends Api {
    private $table;

    public function __construct()
    {
        $this->table = $this->database->getTableName('tasks');
    }

    function all(string $sort = 'id', string $dir = 'DESC', $limit = 0, $offset = 0){
        $dir = strtoupper($dir) == 'DESC' ? 'DESC' : 'ASC';
        $sort = in_array($sort, ['id', 'username', 'email', 'complete']) ? $sort : 'id';
        $limit = (int)$limit;
        $offset = (int)$offset;
        $this->database->query("SELECT * FROM ".$this->table ." ORDER BY ".$sort." ".$dir.($limit?" LIMIT ".$offset.", ".$limit:""));
        $tasks = $this->database->results();

        return $tasks;
    }

    public function paginate(int $page, string $sort, string $dir)
    {
        $limit = 3;
        $offset = (max($page, 1) - 1) * $limit;
        return $this->all($sort, $dir, $limit, $offset);
    }

    public function count($values = []){
        $where = '';
        if($values){
            $where = $this->database->escapeArray($values, 'AND');
        }
        $this->database->query("SELECT count(*) as c FROM ".$this->table ." WHERE 1 ".$where."");
        return $this->database->result('c');
    }

    function select($values = false){
        $where = '';
        if($values){
            $where = $this->database->escapeArray($values, 'AND');
        }

        $this->database->query("SELECT * FROM ".$this->table ." WHERE 1 ".$where." ORDER BY id DESC");
        $tasks = $this->database->results();

        return $tasks;
    }

    function selectOne($values = false){
        $where = '';
        if($values){
            $where = $this->database->escapeArray($values, 'AND');
        }

        $this->database->query("SELECT * FROM ".$this->table ." WHERE 1 ".$where." LIMIT 1");
        $task = $this->database->result();

        return $task;
    }

    function create($values){
        $this->database->query('INSERT INTO '.$this->table.' SET '.$this->database->escapeArray($values));
        return $this->database->insertId();
    }

    function update($id, $values){
        $this->database->query('UPDATE '.$this->table.' SET '.$this->database->escapeArray($values)." WHERE id = ".((int)$id));
        return $id;
    }

    function delete($id){
        return $this->database->query('DELETE FROM '.$this->table." WHERE id = ".((int)$id));
    }

}