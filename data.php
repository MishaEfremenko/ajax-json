<?php
    $server="localhost";
    $user="u0847564_default";
    $pass="********";
    $db="u0847564_formules";

    $link=mysql_connect($server,$user,$pass);
    mysql_query("SET NAMES 'utf8'",$link);
    mysql_select_db($db,$link);
    if($_GET['num']==1)// таблица формул 
    {
        $res=mysql_query("SELECT * FROM `formules`");

        while($row=mysql_fetch_array($res))
        {
            $ar = array();
            array_push($ar,$row['name']);
            for ($i=1;$i<=20;$i++)
            {
                if ($row['znak'.$i]!=null)
                {
                    $znzn = new znakznach;
                    $znzn->znak=$row['znak'.$i];
                    $znzn->znach=$row['znach'.$i];
                    array_push($ar,$znzn);
                }
            }
            $myjson = json_encode($ar, JSON_UNESCAPED_UNICODE);
            print($myjson);
            print("raz");
        }
    }
    else// таблица ссылок на рисунки
    {
        $res=mysql_query("SELECT * FROM `risunki`");
        while($row=mysql_fetch_array($res))
        {
            $znhr = new znakhref;
            $znhr->name=$row['name'];
            $znhr->href=$row['imhref'];
            $znhr->edinizy=$row['edinizy'];
            $myjson = json_encode($znhr, JSON_UNESCAPED_UNICODE);
            print($myjson);
            print("raz");
        }
    }
    class znakznach
    {
        var $znak;
        var $znach;
    }
    class znakhref
    {
        var $name;
        var $href;
        var $edinizy;
    }
?>