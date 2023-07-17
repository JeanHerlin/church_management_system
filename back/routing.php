<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: *");

require "controllers/PostsController.php";


//getting current URL

$current_link = $_SERVER['REQUEST_URI'];

// exit;

if($current_link == "/api/dataEglise"){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "GET":
            $data=getEglise();
            echo $data; 
        break;
        case "PUT":
            $posts = json_decode(file_get_contents('php://input'));
         echo updateEglise($posts->ideglise,$posts->Solde);
        break;
        case "PATCH":
            $posts = json_decode(file_get_contents('php://input'));
            deletPosts($posts->Codepro);
    }

}elseif($current_link == "/api/signUp"){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case  "POST":
            $posts = json_decode(file_get_contents('php://input'));
            echo setEglise($posts->ideglise,$posts->Design,$posts->EmailG,$posts->Password,$posts->Solde);
        break;
    }
}elseif($current_link == "/api/login"){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case  "POST":
            $posts = json_decode(file_get_contents('php://input'));
            echo selectEglise($posts->email,$posts->password);
        break;
    }
}elseif($current_link == "/api/activities"){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "PUT":
            $posts = json_decode(file_get_contents('php://input'));
            $data = getActivities($posts->ideglise);
            echo $data; 
        break;
    }
}elseif($current_link == "/api/entre"){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "GET":
            $data=getAllEnter();
            echo $data; 
        break;
        case "PUT":
            $posts = json_decode(file_get_contents('php://input'));
            $data = getEntre($posts->ideglise);
            echo $data; 
        break;
        case "POST":
            $posts = json_decode(file_get_contents('php://input'));
           echo  setEntre($posts->idcle,$posts->Motif,$posts->Montant,$posts->dateEnter,$posts->ideglise,$posts->Donneur,$posts->Activity);
        break;
      }
}
elseif($current_link == "/api/sortie"){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "GET":
            $data=getAllSortie();
            echo $data; 
        break;
        case "PUT":
            $posts = json_decode(file_get_contents('php://input'));
            $data = getSortie($posts->ideglise);
            echo $data; 
        break;
        case "POST":
            $posts = json_decode(file_get_contents('php://input'));
           echo  setSortie($posts->idcle,$posts->Motif,$posts->Montant,$posts->dateSortie,$posts->ideglise,$posts->Donneur,$posts->Activity);
        break;
      }
}elseif($current_link == "/api/searchSortie"){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "POST":
            $posts = json_decode(file_get_contents('php://input'));
            $data = searchBydateSortie($posts->date1,$posts->date2,$posts->ideglise); 
            echo $data;
        break;
      }
}
elseif($current_link == "/api/searchEnter"){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "POST":
            $posts = json_decode(file_get_contents('php://input'));
            $data = searchBydateEnter($posts->date1,$posts->date2,$posts->ideglise); 
            echo $data;
        break;
      }
}elseif($current_link == "/api/searchEnterUsingLike"){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "POST":
            $posts = json_decode(file_get_contents('php://input'));
            $data = searchUsingLikeEnter($posts->like,$posts->ideglise); 
            echo $data;
        break;
      }
}elseif($current_link == "/api/searchSortieUsingLike"){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "POST":
            $posts = json_decode(file_get_contents('php://input'));
            $data = searchUsingLikeSortie($posts->like,$posts->ideglise); 
            echo $data;
        break;
      }
}
elseif($current_link == "/api/ModifEnter"){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "PUT":
            $posts = json_decode(file_get_contents('php://input'));
            echo modifEnter($posts->Motif,$posts->Montant,$posts->idcle,$posts->date); 
        break;
      }
}
elseif($current_link == "/api/ModifSortie"){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "PUT":
            $posts = json_decode(file_get_contents('php://input'));
            echo modifSortie($posts->Motif,$posts->Montant,$posts->idcle,$posts->date); 
        break;
      }
}
elseif($current_link == "/api/Suppsortie"){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "PATCH":
            $posts = json_decode(file_get_contents('php://input'));
            echo deletSortie($posts->idcle); 
        break;
      }
}
elseif($current_link == "/api/Suppentre"){
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "PATCH":
            $posts = json_decode(file_get_contents('php://input'));
            echo deletEnter($posts->idcle); 
        break;
      }
}
// $urls = [
//     "/backend/posts" => "PostsController@getPostsFromDatabase"
// ];



