<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>Поиск физических формул</title>
    <link rel="stylesheet" type="text/css" href="css/anim.css">
    <?php 
    function isMobile() { 

        return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
        }
        
        if(isMobile()){
            print('<link rel="stylesheet" type="text/css" href="css/up_mobile.css">');
        }
        else { 
            print('<link rel="stylesheet" type="text/css" href="css/up.css">');
        }
    ?>
    <link rel="stylesheet" type="text/css" href="css/down.css">
    <link rel="stylesheet" type="text/css" href="css/podbor.css">
    <link rel="shortcut icon" href="css/icon.ico" type="image">
    <script src="Javascript/ajax.js"></script>
</head>
<body>
    <up>
        <yacheika id="left">
            <input type="text" name="" id="varpar" placeholder="введите величины (xuf)" class="input_text" oninput="search_parametrs1(this.value)">
        </yacheika>

        <or_anim>
            или
        </or_anim>

        <yacheika>
            <input type="text" name="" id="varznk" placeholder="время, сила тока, расстояние" class="input_text"  oninput="search_parametrs2(this.value)">
        </yacheika>

        <find onclick="search_znach()">
            поиск...
        </find>
    </up>
    <varianti id = "var">

    </varianti>
    <down>
        <div style="color:white;font-size:3.5em">
            <img src="xuf.png" alt="" srcset="">принимает 1 значение, выбирайте из предложенных вариантов
        </div>
        <div style="color:white;font-size:3.5em">
            <img src="time.png" alt="" srcset="">начинайте писать и выбирайте из предложенных вариантов
        </div>
    </down>
    <?php 
    $user_agent = $_SERVER["HTTP_USER_AGENT"];
    if (strpos($user_agent, "Firefox") !== false) echo"<style>variant{left:-100%;}</style>"?>
</body>

<script>function q(){window.location="www.google.com"}</script>
</html>

