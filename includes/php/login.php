﻿<?php

//SECRET password for protecting database connection (connection not possible without secret)

define("SALT1","sg4dsf846es64dfs2ef4");
define("SALT2","gs5g4s64g6s8gf4skyugkh5");
require_once ("db_config.php");

$connection=connectToDB();
session_start();

if(!isset($_SESSION["id"]))
{
    if (!empty($_POST["email"]) AND !empty($_POST["password"]))
    {
        $email = $_POST["email"];
        $password = sha1(SALT1 . $_POST["password"] . SALT2); //encrypting password to match with the encrypted password in database


        global $connection;

        $sql = "SELECT * FROM user WHERE email='$email' and password='$password'";
        $result = mysqli_query($connection, $sql) or die(mysqli_error($connection));

        if (mysqli_num_rows($result) > 0) {
            $record["user"] = mysqli_fetch_array($result, MYSQLI_ASSOC);
            $record["user"]["image"] = "http://www.gravatar.com/avatar/" . md5($email) . ".jpg";

            $_SESSION["email"] = $email;
            $_SESSION["password"] = $password;

            $send_back = json_encode($record);

            echo $send_back;

        }
        else
        {
            $record["status"] = "Nepostojeći nalog!";

            $send_back = json_encode($record);

            echo $send_back;
        }
    }
    else
    {
        $record["status"] = "Nepravilni ulazni parametri!";

        $send_back = json_encode($record);

        echo $send_back;
    }
}
else
{
    $record["status"] = "Već ujavljen korisnik!";

    $send_back = json_encode($record);

    echo $send_back;
}
