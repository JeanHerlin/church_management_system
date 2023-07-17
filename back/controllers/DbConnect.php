<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

class DbConnect
{
    public $db_host = "localhost";
    public $db_user = "root";
    public $db_password = "";
    public $db_database = "projetphp";

    public function connect()
    {
        try{
            $conn= new PDO('mysql:host=' .$this->db_host .';dbname=' .$this->db_database,$this->db_user , $this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        }catch(\Exception $e){
            echo "Database connection error : " . $e->getMessage();
        }
    }
}