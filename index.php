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
    </style>

</head>
<body>
    <div id="bg"></div>
    <div id="root"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://unpkg.com/pixi.js/dist/browser/pixi.min.js"></script>
    <script src="pixi.min.js?v=<?=time()?>"></script>
    <script src="src/agtunique.js?v=<?=time()?>"></script>
    <script src="src/main.js?v=<?=time()?>"></script>
</body>
</html>

