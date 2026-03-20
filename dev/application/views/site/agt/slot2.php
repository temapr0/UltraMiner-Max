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
    <script>
        document.oncontextmenu = function(){return false;};
        document.onkeydown = function(e) {
            if (e.ctrlKey &&
                (e.keyCode === 67 ||
                    e.keyCode === 86 ||
                    e.keyCode === 85 ||
                    e.keyCode === 117)) {
                return false;
            } else {
                return true;
            }
        };

        window.gametype = 'slots';


        try {
            LS15 = localStorage;
        }
        catch(e) {
            LS15 = {};
        }

        <?php if(DEMO_MODE): ?>
        LS15 = {};
        <?php endif; ?>

        LS15.KpZevaOVbk = '<?php echo empty(auth::$token)?'demo':auth::$token; ?>';
        LS15.WKqhbUlTze = Date.now()+24*60*60*1000;
        <?php if(DEMO_MODE): ?>
        LS15.WKqhbUlTze = Date.now()+20*60*1000;
        <?php endif; ?>
        LS15.syMtvvgLJj = '<?php echo auth::$user_id; ?>';
        window.gamename = '<?php echo $name; ?>';
        window.ver = '<?php echo th::ver(); ?>';
        window.noStats=true;


        window.cachesRun=false;

        function startCacheAGT() {

            LS15.zujsOt = window.ver;

            caches.open('rTdgRLMkiz').then(function(cache) {
                window.cachesReady = cache;
                window.cachesRun=true;
            });
        }

        if('caches' in window) {

            if(!LS15.zujsOt || LS15.zujsOt!=window.ver) {
                caches.delete('rTdgRLMkiz').then(function() {
                    startCacheAGT();
                });
            }
            else {
                startCacheAGT();
            }
        }

        var lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            var now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        jackpotPopupName='popup';
        <?php if(in_array(auth::user()->office->currency->code,['ZAR','JMD'])): ?>
        jackpotPopupName='bonusprize';
        <?php endif; ?>

        <?php if(in_array(auth::user()->office_id,[1029,1038,1041,1043,1045,1046,1047,1050,1117,1120,1201,1219,1213,1497,2172,1672,2890])): ?>
        window.whitelogo = '1029';
        <?php elseif(in_array(auth::user()->office_id,[5563])): ?>
        window.whitelogo = 'logoempty';
        <?php elseif(auth::user()->office->owner==1156): ?>
        window.whitelogo = '1156';
        <?php endif; ?>


        window.office_id=<?php echo auth::user()->office_id; ?>;
        window.jptime=<?php echo Kohana::$config->load('static.jptime'); ?>;
        window.jp_wss_url = '<?php echo Kohana::$config->load('static.jp_wss_url'); ?>';

        demo_mode = <?php echo DEMO_MODE?'true':'false';?>;
        replay_mode = false;

        window.forceMobile=false;
        window.noCloseGame=false;
        <?php if(arr::get($_GET,'force_mobile',0)): ?>
        window.forceMobile=true;
        <?php endif; ?>
        <?php if(arr::get($_GET,'no_close',0)): ?>
        window.noCloseGame=true;
        <?php endif; ?>

        <?php if(auth::user()->office->apitype==4 && $cashierURL=arr::get($_GET,'cashierurl')): ?>
        window.showPayPopup=true;
        window.URLPayPopup='<?php echo $cashierURL; ?>';
        <?php endif; ?>

        window.fsback_enable=false;
        <?php if(auth::user()->office->enable_bia>0): ?>
        window.fsback_enable=true;
        <?php endif; ?>

        window.AGThistory_enable=false;
        <?php if(auth::user()->office->show_game_history>0): ?>
        window.AGThistory_enable=true;
        <?php endif; ?>

        window.promopanel_enable=false;
        <?php if(auth::user()->promopanel_enable()): ?>
        window.promopanel_enable=true;
        <?php endif; ?>

        window.showversion=false;
        <?php if(auth::user()->office->showfakeversion): ?>
        window.showversion='11.540. <?php echo isset($game->rtp) ? 'RTP: '.$game->rtp : '' ?>';
        <?php endif; ?>

        window.strict_go_another_game=false;
        <?php if(auth::user()->office->strictGoAnotherGame()): ?>
        window.strict_go_another_game=true;
        <?php endif; ?>

        window.reload_on_error=false;
        <?php if(auth::user()->office->owner==1156): ?>
        window.reload_on_error=true;
        <?php endif; ?>

        <?php if(defined('LOCAL') && LOCAL): ?>
        window.isAGTLocal=true;
        <?php endif; ?>

        window.clientAGTcountry=false;

        <?php if(isset($_SERVER['HTTP_CF_IPCOUNTRY'])): ?>
        window.clientAGTcountry='<?php echo strtolower($_SERVER['HTTP_CF_IPCOUNTRY']); ?>';
        <?php endif; ?>

    </script>

    <script src="js/lib/zepto.min.js?v=<?=th::ver();?>"></script>
    <script src="pixi/pixi.min.js?v=<?=th::ver();?>"></script>
    <script src="pixi/gsap.min.js?v=<?=th::ver();?>"></script>
    <script src="pixi/src/agtunique.js?v=<?=th::ver();?>"></script>
    <script src="pixi/ultraminerConf.js?v=<?=th::ver();?>"></script>
    <script src="pixi/src/main.js?v=<?=th::ver();?>"></script>
    <script src="js/mc/model.js?v=<?=th::ver();?>"></script>
    <!--<script src="pixi/src/scrollbox.js?v=<?php /*=th::ver();*/?>"></script>-->

    <script>
        const C = new Config('ultraminer');
        const model = new Model();
        window.app.apiToken = LS15.KpZevaOVbk;
        window.app.apiUser = LS15.syMtvvgLJj;
        window.app.apiHost = "<?=$_SERVER['HTTP_HOST']?>";
        window.app.office_id=window.office_id;
    </script>
    <script>
        window.addEventListener("DOMContentLoaded", () => {
            window.app.init();
        });
    </script>




</body>
</html>

