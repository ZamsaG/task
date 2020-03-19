<?php

namespace Model;

use mysqli;

class Database extends Api {
    /** @var mysqli $mysqli */
    private $mysqli;
    /** @var \mysqli_result $query */
    private $query;

    public function __construct()
    {
        $this->connect();
    }

    public function __destruct()
    {
        $this->disconnect();
    }

    public function connect()
    {
        if(!empty($this->mysqli)) {
            return $this->mysqli;
        }
        else {
            $this->mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        }

        if($this->mysqli->connect_error) {
            trigger_error("Could not connect to the database: ".$this->mysqli->connect_error, E_USER_WARNING);
            return false;
        }
        else {
            if(DB_CHARSET)
                $this->mysqli->query('SET NAMES '.DB_CHARSET);
            if(DB_TIMEZONE)
                $this->mysqli->query('SET time_zone = "'.DB_TIMEZONE.'"');
        }
        return $this->mysqli;
    }

    public function disconnect()
    {
        if(!@$this->mysqli->close())
            return true;
        else
            return false;
    }

    public function escape($str){
        return $this->mysqli->real_escape_string($str);
    }

    public function escapeArray($arr, $delimiter = ","){
        $delimiter = strtoupper($delimiter);
        $allowedDelimiters = ['AND', 'OR', 'LIKE'];
        if(!in_array($delimiter, $allowedDelimiters)){
            $delimiter = ",";
        }

        $sql = "";
        foreach ($arr as $key=>$value){
            $keyExploded = explode(":", $key);
            $key = $keyExploded[0];
            if(count($keyExploded) > 1 && in_array($keyExploded[1], $allowedDelimiters)){
                $delimiter = $keyExploded[1];
            }

            if($sql) $sql .= " ".$delimiter." ";
            elseif (in_array($delimiter, $allowedDelimiters)){
                $sql = "AND ".$sql;
            }
            $sql .= "`".$this->escape($key)."`"."="."'".$this->escape($value)."'";
        }
        return $sql;
    }

    public function query($sql){
        $this->query = $this->mysqli->query($sql);

        return $this->query;
    }

    public function results($field = false, $sql = false){
        if(!$this->query){
            if(!$sql) return [];
            $this->query($sql);
        }

        $results = [];
        while ($row = $this->query->fetch_object()){
            if($field){
                $results[] = $row->$field;
            } else {
                $results[] = $row;
            }
        }

        return $results;
    }

    public function result($field = false, $sql = false){
        if(!$this->query){
            if(!$sql) return [];
            $this->query($sql);
        }

        $row = $this->query->fetch_object();
        if($field){
            $result = $row->$field;
        } else {
            $result = $row;
        }

        return $result;
    }

    public function getTableName($table){
        return DB_PREFIX.$table;
    }

    public function insertId()
    {
        return $this->mysqli->insert_id;
    }



}