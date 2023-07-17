<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "DbConnect.php";


     function getEglise()
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "SELECT * FROM eglise";
             $stmt = $conn->prepare($sql);
            $stmt->execute();

            $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return json_encode($produits);
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }

     function setEglise($ideglise,$Design,$EmailG,$Passwd,$Solde)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "INSERT INTO eglise(ideglise,Design,EmailG,Passwd,Solde) VALUES(:ideglise,:Design,:EmailG,:Passwd,:Solde)";
             $stmt = $conn->prepare($sql);
            $stmt->bindParam(':ideglise',$ideglise);
            $stmt->bindParam(':Design',$Design);
            $stmt->bindParam(':EmailG',$EmailG);
            $stmt->bindParam(':Passwd',$Passwd);
            $stmt->bindParam(':Solde',$Solde);

            if($stmt->execute()){
               $res = ['Status'=> 1, 'message'=> 'Ajout reussi...'];
               return json_encode($res);
            }
            else{
               $res = ['Status'=> 0, 'message'=> 'Ajout non reussi...'];
               return json_encode($res);
            }
     
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }


     function selectEglise($email,$passwd)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "SELECT * FROM eglise WHERE EmailG = :EmailG AND Passwd=:Passwd";
             $stmt = $conn->prepare($sql);
            $stmt->bindParam(':EmailG',$email);
            $stmt->bindParam(':Passwd',$passwd);

            if($stmt->execute()){
               $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
               $res = ['Status'=> 1, 'message'=> 'found'];
               // $data = ['message'=> 'found', 'user'=> $user];
               return json_encode($user);
            }
            else{
               $res = ['Status'=> 0, 'message'=> 'Notfound'];
               return json_encode($res);
            }

            
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }

     function updateEglise($ideglise,$Solde)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "UPDATE eglise SET Solde=:Solde WHERE ideglise = :ideglise";
             $stmt = $conn->prepare($sql);
            $stmt->bindParam(':ideglise',$ideglise);
            $stmt->bindParam(':Solde',$Solde);

            if($stmt->execute()){
               $res = ['Status'=> 1, 'message'=> 'Ajout reussi...'];
               return json_encode($res);
            }
            else{
               $res = ['Status'=> 0, 'message'=> 'Ajout non reussi...'];
               return json_encode($res);
            }

            
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }

     function getAllEnter()
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "SELECT * FROM entre";
            $stmt = $conn->prepare($sql);
            $stmt->execute();

            $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return json_encode($produits);
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
      } 

     function getActivities($ideglise)
     {

      $objDB = new DbConnect;
      $conn = $objDB->connect();
       try
       {
          $sql = "SELECT * FROM activities WHERE ideglise = :ideglise ORDER BY idactivity ASC";
           $stmt = $conn->prepare($sql);
           $stmt->bindParam(':ideglise',$ideglise);

          $stmt->execute();

          $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

          return json_encode($data);
       }
       catch(\Exception $e)
       {
          return ($e->getMessage());
          exit;
       }
     }

     function setActivities($idcle,$ideglise,$motif,$donneur,$activity,$dateEntre,$montant)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "INSERT INTO activities(idcle,ideglise,Motif,Donneur,Activity,dateActivity,Montant) VALUES(:idcle,:ideglise,:Motif,:Donneur,:Activity,STR_TO_DATE('$dateEntre','%d/%m/%Y'),:Montant)";
             $stmt = $conn->prepare($sql);
            $stmt->bindParam(':idcle',$idcle);
            $stmt->bindParam(':ideglise',$ideglise);
            $stmt->bindParam(':Motif',$motif);
            $stmt->bindParam(':Donneur',$donneur);
            $stmt->bindParam(':Activity',$activity);
            $stmt->bindParam(':Montant',$montant);

            if($stmt->execute()){
               $res = ['Status'=> 1, 'message'=> 'Ajout activite reussi...'];
               return json_encode($res);
            }
            else{
               $res = ['Status'=> 0, 'message'=> 'Ajout activite non reussi...'];
               return json_encode($res);
            }
     
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }
     function AllEntre()
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "SELECT * FROM entre ORDER BY identre DESC";
             $stmt = $conn->prepare($sql);
             $stmt->bindParam(':ideglise',$ideglise);

            $stmt->execute();

            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return json_encode($data);
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }
     

     function getEntre($ideglise)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "SELECT * FROM entre WHERE ideglise =:ideglise ORDER BY identre ASC";
             $stmt = $conn->prepare($sql);
             $stmt->bindParam(':ideglise',$ideglise);

            $stmt->execute();

            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return json_encode($data);
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }


     function setEntre($idcle,$motif,$montantEntre,$dateEntre,$ideglise,$donneur,$activity)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "INSERT INTO entre(idcle,ideglise,motif,montantEntre,dateEntre) VALUES(:idcle,:ideglise,:motif,:montantEntre,STR_TO_DATE('$dateEntre','%d/%m/%Y'))";
             $stmt = $conn->prepare($sql);
            $stmt->bindParam(':idcle',$idcle);
            $stmt->bindParam(':ideglise',$ideglise);
            $stmt->bindParam(':motif',$motif);
            $stmt->bindParam(':montantEntre',$montantEntre);
            // $stmt->bindParam(':dateEntre',);

            if($stmt->execute()){
               $res = ['Status'=> 1, 'message'=> 'Ajout reussi...'];
               // return json_encode($res);
               return setActivities($idcle,$ideglise,$motif,$donneur,$activity,$dateEntre,$montantEntre);
            }
            else{
               $res = ['Status'=> 0, 'message'=> 'Ajout entre non reussi...'];
               return json_encode($res);
            }
     
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }

     function getAllSortie()
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "SELECT * FROM sortie ORDER BY idsortie DESC";
             $stmt = $conn->prepare($sql);
            $stmt->execute();

            $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return json_encode($produits);
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
      } 
     function getSortie($ideglise)
     {

      $objDB = new DbConnect;
      $conn = $objDB->connect();
       try
       {
          $sql = "SELECT * FROM sortie WHERE ideglise = :ideglise ORDER BY idsortie DESC";
           $stmt = $conn->prepare($sql);
           $stmt->bindParam(':ideglise',$ideglise);

          $stmt->execute();

          $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

          return json_encode($data);
       }
       catch(\Exception $e)
       {
          return ($e->getMessage());
          exit;
       }
     }


     function setSortie($idcle,$motif,$montantSortie,$dateSortie,$ideglise,$donneur,$activity)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "INSERT INTO sortie(idcle,ideglise,motif,montantSortie,dateSortie) VALUES(:idcle,:ideglise,:motif,:montantSortie,STR_TO_DATE('$dateSortie','%d/%m/%Y'))";
             $stmt = $conn->prepare($sql);
            $stmt->bindParam(':idcle',$idcle);
            $stmt->bindParam(':ideglise',$ideglise);
            $stmt->bindParam(':motif',$motif);
            $stmt->bindParam(':montantSortie',$montantSortie);
            // $stmt->bindParam(':dateSortie',$dateSortie);

            if($stmt->execute()){
               $res = ['Status'=> 1, 'message'=> 'Ajout reussi...'];
               // return json_encode($res);
               return setActivities($idcle,$ideglise,$motif,$donneur,$activity,$dateSortie,$montantSortie);
            }
            else{
               $res = ['Status'=> 0, 'message'=> 'Ajout entre non reussi...'];
               return json_encode($res);
            }
     
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }

     function searchBydateSortie($date1,$date2,$ideglise)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "SELECT * FROM sortie WHERE ideglise=:ideglise and dateSortie BETWEEN STR_TO_DATE('$date1','%d/%m/%Y') AND STR_TO_DATE('$date2','%d/%m/%Y') ";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':ideglise',$ideglise);
            
            $stmt->execute();
        
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return json_encode($data);
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }

     function searchBydateEnter($date1,$date2,$ideglise)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "SELECT * FROM entre WHERE ideglise=:ideglise and dateEntre BETWEEN STR_TO_DATE('$date1','%d/%m/%Y') AND STR_TO_DATE('$date2','%d/%m/%Y') ";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':ideglise',$ideglise);
            
            $stmt->execute();
        
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return json_encode($data);
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }

     function searchUsingLikeEnter($like,$ideglise)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "SELECT * FROM entre WHERE ideglise=:ideglise AND motif LIKE '%$like%' ";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':ideglise',$ideglise);
            
            $stmt->execute();
        
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return json_encode($data);
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }

     function searchUsingLikeSortie($like,$ideglise)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "SELECT * FROM sortie WHERE ideglise=:ideglise AND motif LIKE '%$like%' ";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':ideglise',$ideglise);
            
            $stmt->execute();
        
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return json_encode($data);
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }
     function modifActivities($motif,$montant,$idcle,$newDate)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "UPDATE activities SET Motif=:motif,dateActivity=STR_To_Date('$newDate','%d/%m/%Y'),Montant=:montant WHERE idcle = :idcle";
             $stmt = $conn->prepare($sql);
            $stmt->bindParam(':motif',$motif);
            $stmt->bindParam(':montant',$montant);
            $stmt->bindParam(':idcle',$idcle);

            if($stmt->execute()){
               $res = ['Status'=> 1, 'message'=> 'Modification reussi...'];
               return json_encode($res);
            }
            else{
               $res = ['Status'=> 0, 'message'=> 'Modification non reussi...'];
               return json_encode($res);
            }

            
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }

     function modifEnter($motif,$montant,$idcle,$newDate)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "UPDATE entre SET motif=:motif,montantEntre=:montant,dateEntre=STR_To_Date('$newDate','%d/%m/%Y') WHERE idcle = :idcle";
             $stmt = $conn->prepare($sql);
            $stmt->bindParam(':motif',$motif);
            $stmt->bindParam(':montant',$montant);
            $stmt->bindParam(':idcle',$idcle);

            if($stmt->execute()){
               $res = ['Status'=> 1, 'message'=> 'Ajout reussi...'];
               return modifActivities($motif,$montant,$idcle,$newDate);
            }
            else{
               $res = ['Status'=> 0, 'message'=> 'Ajout non reussi...'];
               return json_encode($res);
            }

            
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }

     function modifSortie($motif,$montant,$idcle,$newDate)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "UPDATE sortie SET motif=:motif,montantSortie=:montant,dateSortie=STR_To_Date('$newDate','%d/%m/%Y') WHERE idcle = :idcle";
             $stmt = $conn->prepare($sql);
            $stmt->bindParam(':motif',$motif);
            $stmt->bindParam(':montant',$montant);
            $stmt->bindParam(':idcle',$idcle);

            if($stmt->execute()){
               $res = ['Status'=> 1, 'message'=> 'Ajout reussi...'];
               return modifActivities($motif,$montant,$idcle,$newDate);
            }
            else{
               $res = ['Status'=> 0, 'message'=> 'Ajout non reussi...'];
               return json_encode($res);
            }

            
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }

     function deletActivities($idcle)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "DELETE FROM activities WHERE idcle = :idcle";
             $stmt = $conn->prepare($sql);
            $stmt->bindParam(':idcle',$idcle);

            if($stmt->execute()){
               $res = ['Status'=> 1, 'message'=> 'Suppression d\'une activité...'];
               return json_encode($res);
            }
            else{
               $res = ['Status'=> 0, 'message'=> 'Ajout non reussi...'];
               return json_encode($res);
            }

            
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }

     function deletSortie($idcle)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "DELETE FROM sortie WHERE idcle = :idcle";
             $stmt = $conn->prepare($sql);
            $stmt->bindParam(':idcle',$idcle);

            if($stmt->execute()){
               $res = ['Status'=> 1, 'message'=> 'Ajout reussi...'];
               return deletActivities($idcle);
            }
            else{
               $res = ['Status'=> 0, 'message'=> 'Ajout non reussi...'];
               return json_encode($res);
            }

            
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }

     function deletEnter($idcle)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "DELETE FROM entre WHERE idcle = :idcle";
             $stmt = $conn->prepare($sql);
            $stmt->bindParam(':idcle',$idcle);

            if($stmt->execute()){
               $res = ['Status'=> 1, 'message'=> 'Ajout reussi...'];
               return deletActivities($idcle);
            }
            else{
               $res = ['Status'=> 0, 'message'=> 'Ajout non reussi...'];
               return json_encode($res);
            }

            
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }



     function modifPosts($Codepro,$Libelle,$Pu,$Couleur,$Poids)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "UPDATE produit SET Libelle=:Libelle,Pu=:Pu, Couleur=:Couleur,Poids=:Poids WHERE Codepro = :Codepro";
             $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Codepro',$Codepro);
            $stmt->bindParam(':Libelle',$Libelle);
            $stmt->bindParam(':Pu',$Pu);
            $stmt->bindParam(':Couleur',$Couleur);
            $stmt->bindParam(':Poids',$Poids);

            if($stmt->execute()){
               $res = ['Status'=> 1, 'message'=> 'Ajout reussi...'];
               return json_encode($res);
            }
            else{
               $res = ['Status'=> 0, 'message'=> 'Ajout non reussi...'];
               return json_encode($res);
            }

            
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }


     function deletPosts($Codepro)
     {

        $objDB = new DbConnect;
        $conn = $objDB->connect();
         try
         {
            $sql = "DELETE FROM produit WHERE Codepro = :Codepro";
             $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Codepro',$Codepro);

            if($stmt->execute()){
               $res = ['Status'=> 1, 'message'=> 'Ajout reussi...'];
               return json_encode($res);
            }
            else{
               $res = ['Status'=> 0, 'message'=> 'Ajout non reussi...'];
               return json_encode($res);
            }

            
         }
         catch(\Exception $e)
         {
            return ($e->getMessage());
            exit;
         }
     }

