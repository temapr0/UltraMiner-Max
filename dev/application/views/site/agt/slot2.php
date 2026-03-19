<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #000;
    width: 100%;
    height: 100%;
}
#root {
    position: fixed;
    left: 0;
    top: 0;

    width: 100vw;
    height: 100dvh;

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 1; /* поверх фона */
}
.app-fullscreen {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100dvh;      /* важно: dvh для мобильных */
    overflow: hidden;
    z-index: 999999;
    background: #000;
}
    </style>

</head>
<body>
    <div id="bg"></div>
    <div id="root"></div>
    <script src="pixi/pixi.min.js?v=<?=time()?>"></script>
    <script src="pixi/gsap.min.js"></script>
    <script src="pixi/src/agtunique.js?v=<?=time()?>"></script>
    <script src="pixi/src/main.js?v=<?=time()?>"></script>
    <script src="js/mc/model.js?v=<?=time()?>"></script>
    <script>
        window.app.apiToken = "<?=empty(auth::$token)?"demo":auth::$token?>";
        window.app.apiUser = "<?=auth::$user_id?>";
        window.app.apiHost = "<?=$_SERVER['HTTP_HOST']?>";
        window.app.office_id=<?php echo auth::user()->office_id; ?>;
    </script>
    <script>
        window.addEventListener("DOMContentLoaded", () => {
            window.app.init();
        });
    </script>




</body>
</html>

