class Model {
    constructor() {
        this.score = 0;
        this.balance = 0;
        this.last_win = 0;
        this.mainFont = "Roboto";
        this.buttonFont = "Roboto";
        this.amountBeforeFS = 0;
        this.gametype = window.gametype || 'slots';
        this.lang = navigator.language && navigator.language.split('-')[0] || 'en';
        //this.lang = 'en';
        this.langs = {};
        this.back_textures = [];
        this.bonus_back_textures = [];
        this.lines_texture = [];
        this.black_bottom_border_txt;
        this.can_double = false;
        this.results_history=[];

        this.last_end_spin_time=0;

        this.k_max_lvl=1;

        this.replay_id=this.getQueryString('b');

        this.rateWin = 1;

        this.promo_payed=false;
        this.promo_sumpay=0;

        this.need_toogle_music=false;

        this.is_offline=false;

        this.mult=2;

        this.winlines;

        this.commonSounds = {
            "cardloop": {
                "start": 0,
                "end": 9.607143
            },
            "closeGambleArea": {
                "start": 9.857143,
                "end": 10.963265-9.857143
            },
            "closeInfoPage": {
                "start": 11.213265,
                "end": 12.7422-11.213265
            },
            "gambleWin": {
                "start": 12.9922,
                "end": 1
            },
            "moneyAnimationEndSound": {
                "start": 16.686395,
                "end": 18.052472-16.686395
            },
            "nexInfoPage": {
                "start": 18.302472,
                "end": 19.209206-18.302472
            },
            "openGambleArea": {
                "start": 19.459206,
                "end": 20.36288-19.459206
            },
            "openInfoPage": {
                "start": 20.61288,
                "end": 22.547234-20.61288
            },
            "spinSound": {
                "start": 22.797234,
                "end": 23.951088-22.797234
            },
            "startAutoSpin": {
                "start": 24.201088,
                "end": 26.239546-24.201088
            },
            "stopAutoSpin": {
                "start": 26.489546,
                "end": 28.528005-26.489546
            },
            "stopReelAllSound": {
                "start": 28.778005,
                "end": 29.083537-28.778005
            },
            "stopReelSound": {
                "start": 29.333537,
                "end": 29.516395-29.333537
            },
            "unmuteSound": {
                "start": 29.766395,
                "end": 31.699456-29.766395
            }
        };

        this.gamever = (typeof LS15.kvsodor=='undefined')?'0':LS15.kvsodor;
        this.canSwitchVer=false;
        this.settings_opened=false;
        this.betLinesMenuOpen=false;
        this.betLinesMenu;

        this.forceResize=false;

        this.faces = [
            'face_JB',
            'face_QA',
            'face_KA',
            'face_A',
        ];

        this.coins = [];
        this.coins_runned = false;
        this.coins_falled = 0;
        this.coins_group;
        this.choosed=false;

        this.isGambleState = false;
        this.gambleMoving = false;
        this.wincard=[];
        this.pokerhold=[];
        this.wincomb='';
        this.holdcomb='';
        this.auto_spin = false;
        this.spin_run = false;
        this.spin_ready = true;
        this.result = false;
        this.results_history={};
        this.max_gamble = 5;
        this.current_gamble = 0;
        this.results = [

        ];

        this.handwins=[];

        this.need_convert_int=false;
        this.ds_notify=false;

        this.last_bet_id = '';

        this.jp_area = null;
        this.jpdata = [];
        this.jpdata_updated = 0;
        this.jp_isopencard = false;
        this.jpcards=[];
        this.jpallcards=[];
        this.jp_level=0;
        this.prev_jp_level=0;
        this.jp_prev_comb_name='';
        this.jp_comb_name='';
        this.jp_wincards=[];
        this.jp_prev_wincards=[];
        this.jp_win_state=false;

        this.suit_history = [
            0, 1, 2, 3, 0
        ];
        this.stop_reels = 0;
        this.speed_spin = C.speed_spin || 66;

        this.strict_double = false;
        this.max_win_double = 0;

        this.gamble_stats = [];

        this._full_bets = [];

        this.startedSpinTime = 0;
        this.minSpinTime = C.minSpinTime || 700;

        this.replace_sym = -1;

        this.insane_mode=0;
        this.isFreespin=false;
        this.slots_area;
        this.jp_area;
        this.gamble_area;
        this.infobar;
        this.infobar_gamble;
        this.infopage_area;

        this.currency = 'EUR';
        this.currency_code = '20AC';
        this.jpenable = true;

        this.freegames_all = 0;
        this.freegames_current = 0;
        this.freegames_win = 0;

        this.can_collect = false;
        this.collecting = false;
        this.win_collected = false;

        this.total_fs_win=0;

        this.flags = {
            can_start_spin: true,
            can_end_spin: false,
            can_show_win: false,
            can_start_freegames: false,
            can_end_freegames: false,
            can_start_choose: false,
            can_end_choose: false,
            can_start_auto_spin: true,
            prepare_autospin: false,
            can_end_auto_spin: false,
            can_change_denom: true,
            can_show_info: true,
            freegames_started: false,
            can_start_gamble: false
        };

        this.bonus_mode = false;
        this._musicOn = false;
        this.soundOn = (typeof LS15.osZhsZczsu!='undefined' && LS15.osZhsZczsu=='false')?false:true;
        this.lastUnlocked = 1;
        this.defButtonSet = 4;
        this.defButtonStyle = 3;
        //
        //
        this.defaultFont = "Roboto, sans-serif";
        //
        //
        this.mainTextColor = "#ffffff";
        this.mainColor = "#ffffff";
        this.secondaryColor = "#ffff00";
        this.windowColor = "#ffffff";
        this.headerColor = "#E9B515";
        this.pointTextColor = "#ffffff";
        this.soundButtonIndex = 2;
        this.secondaryTextColor = "#ffff00";
        this.clockColor = "#ffffff";
        this.scoreColor = "#ff0000";
        this.textYellow = "#ffff99";
        this.toastTextColor = 0xffffff;
        this.toastBarColor = 0xff0000;

        this.gray_filter = null;
        this.pokerStep=1;
        this.anims_loaded=true;
        //
        //
        //
        //
        this.titleFontSize = 20;
        this.buttonFontSize = 16;
        this.defaultFontSize = 12;
        this.scoreFontSize = 12;
        this.clockFontSize = 16;
        this.pointFontSize = 16;
        //
        this.sfx = [];

        //slots
        this.winlines;
        this.win = 0;
        this.gamble_win = 0;

        this.current_lines_count = C.lines_choose[0];

        if (C.fixed_lines > 0) {
            this.current_lines_count = C.fixed_lines;
        }

        if (C.fixed_bets) {
            this.current_lines_count = 1;
        }

        this.bets = [5, 10, 25, 50, 100];

        this.roundDiv=10;

        //crypto
//        this.roundDiv=100000;

        if(C.bets) {
            this.bets = C.bets;
        }

        this.k_list = [1, 2, 5, 10, 0.1, 0.2, 0.5];

        this.pay_table = [

        ];
        this.combNames = [

        ];

        this.k = 0; //credit multiply
        this.bet_index = 0;
        this.current_bar = [];

        this.amount = this.bets[this.bet_index]*this.k_list[this.k]*this.current_lines_count;

        if(C.fixed_lines) {
            this.amount/=C.fixed_lines;
        }

        //todo may be for all?
        if(this.gametype=='roshambo') {
            this.amount=this.allBets(this.current_lines_count)[0];
        }

        this.token = null;
    }
    getHost() {
        if(typeof demo_mode!='undefined' && demo_mode) {
            return '/dinit.php';
        }

        if(this.isReplayMode()) {
            return '/rinit.php';
        }

        return C.gamename+'/init.php';
    }
    checkToken(token) {
        if(LS15.WKqhbUlTze<Date.now()) {
            return false;
        }
        if(token=='demo' || token=='replay') {
            LS15.WKqhbUlTze=Date.now()+20*60*1000;
            return true;
        }
        if(token!=this.getToken()) {
            return false;
        }
        return true;
    }
    getToken() {
        if(!this.token) {
            this.token = LS15.KpZevaOVbk;
        }
        return this.token;
    }
    openHistory() {
        let domain=location.host;
        if(location.host.split('.').length>2) {
            domain=location.host.replace(/^[^.]+\./g, "");
        }
        $.ajax({
            url: 'https://history.'+domain+'/index.php?u='+LS15.syMtvvgLJj+'&lang='+model.lang+'&game='+C.gamename,
            crossDomain: true,
            type: 'GET',
            success: function(data,t,s) {

                let theScript = document.createElement('script');

                function inject() {


                    document.querySelectorAll('.toggle').forEach(function (elem) {
                        elem.addEventListener('click', function(event){
                            var div = elem.nextElementSibling;
                            if (div.style.display !== 'none') {
                                div.style.display = 'none';
                            }
                            else {
                                div.style.display = 'block';
                            }
                        })
                    });
                }

                theScript.innerHTML = '(' + inject.toString() + '());';

                function createIframeFromData(framedata) {
                    var iframe = document.createElement("iframe");
                    iframe.id="iframe-agt-promopopup";
                    iframe.src="about:blank";
                    iframe.style.width="1024px";
                    iframe.style.height="800px";
                    iframe.style.border="0";
                    iframe.style.position="absolute";
                    iframe.style.top="0";
                    iframe.style.left="0";
                    iframe.style.width="100%";
                    iframe.style.height="100vh";
                    iframe.style['z-index']="9999";

                    iframe.margin="0";
                    iframe.frameborder="0";

                    document.body.appendChild(iframe);

                    var doc = iframe.contentWindow.document; doc.open();

                    doc.writeln(framedata);
                    doc.body.appendChild(theScript);
                    doc.close();

                }

                if(navigator.appVersion && navigator.appVersion.length && navigator.appVersion.indexOf('; wv)')>=0) {
                    //1win apk
                    createIframeFromData(data);
                    return;
                }

                try {

                    var w = window.open("",'_blank','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=800,width=1024');
                    w.document.body.innerHTML = data;
                    w.document.body.appendChild(theScript);
                    w.parentWindow=window;

                }
                catch(e) {
                    createIframeFromData(data);
                    return;
                }
            }
        });
    }
    openPromoInfo() {
        $.ajax({
            url: window.location.pathname+'/promo?l='+model.lang,
            headers: {
                token: model.getToken(),
                tokenuser: LS15.syMtvvgLJj
            },
            success: function(data,t,s) {

                let theScript = document.createElement('script');

                function inject() {

                    const formatSeconds = (secs) => {
                        const pad = (n) => n < 10 ? `0${n}` : n;


                        const h = window['Math'].floor(secs / 3600);
                        const m = window['Math'].floor(secs / 60) - (h * 60);
                        const s = window['Math'].floor(secs - h * 3600 - m * 60);

                        return `${pad(h)}:${pad(m)}:${pad(s)}`;
                    }

                    function countDownTimer() {

                        let elem=document.getElementById('promocountdown');

                        let starttime = parseInt(elem.getAttribute('data-starttime'));
                        let duration = parseInt(elem.getAttribute('data-duration'));
                        let collecttime = parseInt(elem.getAttribute('data-collecttime'));

                        let text='Promo starts at ';

                        if(starttime<(Date.now() / 1000)) {
                            starttime+=duration;

                            text='Promo ends at '
                        }

                        if(starttime<(Date.now() / 1000)) {
                            starttime+=collecttime;

                            text='Check your win '
                        }

                        let progressVal = ((Date.now() / 1000) - starttime) >= 0 ? 100 : 100 * ((starttime - (Date.now() / 1000)) / (24 * 60 * 60));

                        if (progressVal >= 100) {
                            elem.innerHTML='';
                            return;
                        }

                        elem.innerHTML=text+formatSeconds(starttime - (Date.now() / 1000));

                        setTimeout(countDownTimer, 500);
                    }

                    countDownTimer();

                    /*document.getElementById('yespromo').addEventListener('click', function(event){
                        if(window.parent && window.parent.model) {
                            window.parent.model.goToAnotherGame(elem.getAttribute('data-game'));
                        }
                        else {
                            window.parentWindow.model.goToAnotherGame(elem.getAttribute('data-game'));
                        }
                    });*/
                }

                theScript.innerHTML = '(' + inject.toString() + '());';

                function createIframeFromData(framedata) {
                    var iframe = document.createElement("iframe");
                    iframe.id="iframe-agt-promopopup";
                    iframe.src="about:blank";
                    iframe.style.width="1024px";
                    iframe.style.height="800px";
                    iframe.style.border="0";
                    iframe.style.position="absolute";
                    iframe.style.top="0";
                    iframe.style.left="0";
                    iframe.style.width="100%";
                    iframe.style.height="100vh";
                    iframe.style['z-index']="9999";

                    iframe.margin="0";
                    iframe.frameborder="0";

                    document.body.appendChild(iframe);

                    var doc = iframe.contentWindow.document; doc.open();

                    doc.writeln(framedata);
                    doc.body.appendChild(theScript);

                    document.fonts.forEach(function(e) {
                        if(e.family.indexOf('Montserrat')>=0) {
                            doc.fonts.add(e);
                        }
                    });

                    doc.close();

                }

                if(navigator.appVersion && navigator.appVersion.length && navigator.appVersion.indexOf('; wv)')>=0) {
                    //1win apk
                    createIframeFromData(data);
                    return;
                }

                try {

                    var w = window.open("",'_blank','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=800,width=1024');
                    w.document.body.innerHTML = data;

                    w.parentWindow=window;

                    w.document.body.appendChild(theScript);

                    document.fonts.forEach(function(e) {
                        if(e.family.indexOf('Montserrat')>=0) {
                            w.document.fonts.add(e);
                        }
                    });

                }
                catch(e) {
                    createIframeFromData(data);
                    return;
                }
            }
        });
    }
    openDSInfo() {
        $.ajax({
            url: window.location.pathname+'/info?l='+model.lang,
            headers: {
                token: model.getToken(),
                tokenuser: LS15.syMtvvgLJj
            },
            success: function(data,t,s) {

                function createIframeFromData(framedata) {
                    var iframe = document.createElement("iframe");
                    iframe.id="iframe-agt-dspopup";
                    iframe.src="about:blank";
                    iframe.style.width="1024px";
                    iframe.style.height="800px";
                    iframe.style.border="0";
                    iframe.style.position="absolute";
                    iframe.style.top="0";
                    iframe.style.left="0";
                    iframe.style.width="100%";
                    iframe.style.height="100vh";
                    iframe.style['z-index']="9999";

                    iframe.margin="0";
                    iframe.frameborder="0";

                    document.body.appendChild(iframe);

                    var doc = iframe.contentWindow.document; doc.open();

                    doc.writeln(framedata);

                    document.fonts.forEach(function(e) {
                        if(e.family.indexOf('Montserrat')>=0) {
                            doc.fonts.add(e);
                        }
                    });

                    doc.close();

                    (typeof eventDispatcher!=='undefined' && eventDispatcher.dispatch(G.OPENED_FS_INFO));
                }


                if((navigator.appVersion && navigator.appVersion.length && navigator.appVersion.indexOf('; wv)')>=0)) {
                    //1win apk
                    createIframeFromData(data);
                    return;
                }

                try {

                    var w = window.open("",'_blank','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=800,width=1024');

                    w.document.body.innerHTML = data;
                    document.fonts.forEach(function(e) {
                        if(e.family.indexOf('Montserrat')>=0) {
                            w.document.fonts.add(e);
                        }
                    });

                    (typeof eventDispatcher!=='undefined' && eventDispatcher.dispatch(G.OPENED_FS_INFO));
                }
                catch(e) {

                    createIframeFromData(data);
                    return;
                }
            }
        });
    }
    openLSInfo() {
        $.ajax({
            url: window.location.pathname+'/ls?l='+model.lang,
            headers: {
                token: model.getToken(),
                tokenuser: LS15.syMtvvgLJj
            },
            success: function(data,t,s) {

                let theScript = document.createElement('script');

                function inject() {

                    const formatSeconds = (secs) => {
                        const pad = (n) => n < 10 ? `0${n}` : n;


                        const h = window['Math'].floor(secs / 3600);
                        const m = window['Math'].floor(secs / 60) - (h * 60);
                        const s = window['Math'].floor(secs - h * 3600 - m * 60);

                        return `${pad(h)}:${pad(m)}:${pad(s)}`;
                    }

                    function countDownTimer() {

                        document.querySelectorAll('.onegame-block').forEach(function (elem) {
                            let countDownChilds=elem.querySelectorAll('.countdown')[0].children;
                            let starttime=parseInt(elem.getAttribute('data-starttime'));
                            let progressVal=((Date.now()/1000)-starttime)>=0?100:100*((starttime-(Date.now()/1000))/(24*60*60));

                            if(progressVal==100 &&
                                parseInt(elem.getAttribute('data-wager'))>parseInt(elem.getAttribute('data-madebets'))) {
                                countDownChilds[0].style.width='0';
                                countDownChilds[1].innerHTML='Locked';
                                return;
                            }

                            countDownChilds[0].style.width=progressVal+'%';
                            countDownChilds[1].innerHTML=progressVal==100?'Collect':formatSeconds(starttime-(Date.now()/1000));
                        });

                        setTimeout(countDownTimer,500);
                    }
                    countDownTimer();

                    document.querySelectorAll('.onegame-block').forEach(function (elem) {
                        elem.addEventListener('click', function(event){
                            if(parseInt(elem.getAttribute('data-starttime'))*1000 >= Date.now()) return;
                            if(parseInt(elem.getAttribute('data-wager'))>parseInt(elem.getAttribute('data-madebets'))) {
                                window.scrollTo(0,0);
                                return;
                            }
                            if(window.parent && window.parent.model) {
                                window.parent.model.goToAnotherGame(elem.getAttribute('data-game'));
                            }
                            else {
                                window.parentWindow.model.goToAnotherGame(elem.getAttribute('data-game'));
                            }
                            window.close();
                        })
                    });
                }

                theScript.innerHTML = '(' + inject.toString() + '());';

                function createIframeFromData(framedata) {
                    var iframe = document.createElement("iframe");
                    iframe.id="iframe-agt-lspopup";
                    iframe.src="about:blank";
                    iframe.style.width="1024px";
                    iframe.style.height="800px";
                    iframe.style.border="0";
                    iframe.style.position="absolute";
                    iframe.style.top="0";
                    iframe.style.left="0";
                    iframe.style.width="100%";
                    iframe.style.height="100vh";
                    iframe.style['z-index']="9999";

                    iframe.margin="0";
                    iframe.frameborder="0";

                    document.body.appendChild(iframe);

                    var doc = iframe.contentWindow.document; doc.open();

                    doc.writeln(framedata);
                    doc.body.appendChild(theScript);

                    document.fonts.forEach(function(e) {
                        if(e.family.indexOf('Montserrat')>=0) {
                            doc.fonts.add(e);
                        }
                    });

                    doc.close();

                    (typeof eventDispatcher!=='undefined' && eventDispatcher.dispatch(G.OPENED_FS_INFO));
                }

                if(navigator.appVersion && navigator.appVersion.length && navigator.appVersion.indexOf('; wv)')>=0) {
                    //1win apk
                    createIframeFromData(data);
                    return;
                }

                try {

                    var w = window.open("",'_blank','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=800,width=1024');
                    w.document.body.innerHTML = data;

                    w.parentWindow=window;

                    w.document.body.appendChild(theScript);

                    document.fonts.forEach(function(e) {
                        if(e.family.indexOf('Montserrat')>=0) {
                            w.document.fonts.add(e);
                        }
                    });

                    (typeof eventDispatcher!=='undefined' && eventDispatcher.dispatch(G.OPENED_FS_INFO));
                }
                catch(e) {

                    createIframeFromData(data);
                    return;
                }
            }
        });
    }
    goToAnotherGame(game) {

        if(window.strict_go_another_game) {
            return;
        }

        $.ajax({
            url: model.getHost(),
            data: {
                'action': 'anothergame',
                'gamename': game,
            },
            headers: {
                token: model.getToken(),
                tokenuser: LS15.syMtvvgLJj
            },
            dataType: 'json',
            error: function(xhr, ajaxOptions, thrownError) {
                model.mainLayer.add(new PopupMessage('Error. Closing game...',function() {
                    eventDispatcher.dispatch(G.CLOSE_GAME);
                },2000, 'error'));
            },
            success: function(data,t,s) {
                let redir_game=window.location.href.replace(window.gamename,game);
                var redir_href = new URL(redir_game);
                redir_href.searchParams.set('token', data.token);
                window.location.href = redir_href.toString();
            }
        });
    }
    showMenu() {

        if(model.infopage_area.closed==false) {
            eventDispatcher.dispatch(G.INFO_PAGE);
        }

        var tw = game.add.tween(model.menu);
        model.menu.closed=false;
        tw.onComplete.add(function () {
            eventDispatcher.dispatch('upd2');
        });

        tw.to({y: model.gamble_area.default_position}, 500, Phaser.Easing.Linear.None, true);
    }
    getCurrencyIcon() {
        var curr_code = String.fromCharCode(parseInt(model.currency_code, 16));

        if (model.currency_code.split(',').length > 1) {
            curr_code = '';
            model.currency_code.split(',').forEach(function (c) {
                curr_code += String.fromCharCode(parseInt(c, 16));
            });
        }

        return curr_code;
    }
    closeMenu() {
        model.menu.closed=true;
        eventDispatcher.dispatch('upd2');
        var tw = game.add.tween(model.menu).to({y: -game.height}, 500, Phaser.Easing.Linear.None, true);
        tw.onComplete.add(function () {
            eventDispatcher.dispatch('upd2');
        });
    }
    startGamble() {

        this.gamble_area.gamever();

        this.isGambleState = true;
        this.gambleMoving=true;
        this.flags.can_start_auto_spin = false;
        this.flags.can_end_auto_spin = false;
        this.flags.can_start_spin = false;
        this.flags.can_change_denom = false;

        this.gamble_area.y=-game.height;

        var tw = game.add.tween(this.gamble_area);
        tw.onComplete.add(function () {
            this.gambleMoving=false;

            eventDispatcher.dispatch(G.PLAY_SOUND, {
                key: 'commonSounds',
                marker: 'cardloop',
                loop: true
            });

            /*if (C.audio.singleSounds && C.audio.singleSounds.cardloop) {
                eventDispatcher.dispatch(G.PLAY_SOUND, {
                    key: 'singleSounds',
                    marker: 'cardloop',
                    loop: true
                });
            } else {
                eventDispatcher.dispatch(G.PLAY_SOUND, {
                    key: 'gambleSounds',
                    marker: 'cardloop',
                    loop: true
                });
            }*/

            this.infobar_gamble.collect_btn.gamever();
            this.gamble_area.gamever();
        },this);

        tw.to({y: model.common_area.y}, 1000, Phaser.Easing.Linear.None, true);

        if(model.common_area) {
            game.add.tween(model.common_area).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
        }

        this.infobar.gamever();
        this.infobar_gamble.gamever();
//        this.infobar.visible=false;
//        this.infobar_gamble.visible=true;
    }
    endGamble() {

        eventDispatcher.dispatch(G.STOP_SOUND, {
            key: 'commonSounds',
            marker: 'cardloop'
        });

        /*if (C.audio.singleSounds && C.audio.singleSounds.cardloop) {
            eventDispatcher.dispatch(G.STOP_SOUND, {
                key: 'singleSounds',
                marker: 'cardloop'
            });
        } else {
            eventDispatcher.dispatch(G.STOP_SOUND, {
                key: 'gambleSounds',
                marker: 'cardloop'
            });
        }*/

        if (model.freegames_win>0) {
            this.flags.can_start_freegames = true;
        }

        var time = model.gamble_win>0?1500:1000;

        game.add.tween(model.gamble_area).to({y: -game.height}, 200, Phaser.Easing.Linear.None, true, time+200);



        game.time.events.add(time, function () {
            this.gambleMoving=true;
            eventDispatcher.dispatch(G.PLAY_SOUND, {
                key: 'commonSounds',
                marker: 'closeGambleArea',
                loop: false
            });
        },this);

        if(model.common_area) {
            game.add.tween(model.common_area).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None,true,time+200);
        }

        game.time.events.add(time+400, function () {


            this.isGambleState = false;
            this.gambleMoving=false;
            this.flags.can_start_auto_spin = true;
            this.flags.can_end_auto_spin = false;
            this.flags.can_start_spin = true;
            if (!model.bonus_mode) {
                this.flags.can_change_denom = true;
            }
            this.flags.can_show_info = true;
            eventDispatcher.dispatch(G.UPDATE_BET_BUTTON);
            if(!model.forceResize) {
                model.forceResize=true;
            }
            game.scale.queueUpdate(true); //todo ???
        }, this);

        this.infobar.gamever();
        this.infobar_gamble.gamever();

//        this.infobar.visible = true;
//        this.infobar_gamble.visible=false;
    }
    get randSym() {
        return Math.floor(Math.random() * (C.count_symbols));
    }
    upScore(points) {
        this.score += parseInt(points);
        eventDispatcher.dispatch(G.SCORE_UPDATED);
    }
    regSound(name) {
        this.sfx.push(name);
    }
    addAllSounds() {
        Object.keys(C.audio).forEach(function (sound) {
            Object.keys(C.audio[sound]).forEach(function (key) {
                mediaManager.addSound(sound, key, C.audio[sound][key].start, C.audio[sound][key].end);
            });
        });

        Object.keys(this.commonSounds).forEach(function (key) {
            mediaManager.addSound('commonSounds', key, this.commonSounds[key].start, this.commonSounds[key].end);
        }.bind(this));

    }
    set musicOn(val) {
        //main bg music: musicOn=false;
        //fg bg music: musicOn=true;
        this._musicOn = val;
        eventDispatcher.dispatch(G.MUSIC_STAT_CHANGED);
    }
    get musicOn() {
        return this._musicOn;
    }
    bar(num) {
        var bar = this.current_bar[num].map(a => a); //ЕБУЧЕЕ КЛОНИРОВАНИЕ МАССИВА

        if (!this.results[num].length) {
            for(var i1=1;i1<=model.results[num].length;i1++) {
                bar.splice(0, 0, bar[bar.length - i1]);
            }
        }

        let s = C.bigReelCenter && model.flags.freegames_started && num > 0 && num < C.bar_count - 1;
        s=false;
        //todo почему то с условием не работает

        if (this.results[num].length && !s) {
            bar.unshift(...this.results[num]);
            bar.push(...this.results[num]);
        }

        if(C.full_bar_symbols) {
            bar = this.fixForFullBarSymbols(bar);
        }

        return bar;
    }
    fixForFullBarSymbols(bar) {
        var flag=false;
        var index=-1;
        var previndex=-1;

        var cnt=0;

        var ar=[];

        while(!flag) {
            index = bar.findIndex(v=>C.full_bar_symbols.indexOf(v)!==-1);

            if(index===-1) {
                flag=true;
                break;
            }


            if(previndex==-1 || index==previndex){
                cnt++;
                bar.splice(index,1);
            }
            else{
                ar.push(index);
            }

            if(previndex==-1) {
                ar.push(index);
            }

            previndex=index;

        }

        if(index>=0 && ar.indexOf(index)==-1) {
            ar.push(index);
        }

        if(ar.length) {

            var ari=0;

            for(var i=0;i<ar.length;i++){

                bar.splice.apply(bar,[ar[i]+ari,0].concat(C.full_bar_symbols));
                ari+=ar[i]+C.full_bar_symbols.length;
            }

        }
        return bar;
    }
    collectWin() {

        if (!this.can_collect) {
            return;
        }
        this.can_collect = false;

        this.last_win = this.win;

        eventDispatcher.dispatch(G.LAST_WIN_UPDATED, {
            from: 0,
            to: model.win
        });

        this.gamble_win = this.win;
    }

    stopReel() {

        if (this.stop_reels == C.bar_count) {
            this.stop_reels = 0;

            return;
        }

        model.slots_area.reels[this.stop_reels].stop();
        game.time.events.add(400, this.stopReel, this);
        this.stop_reels++;
    }
    allBets(lines_count) {

        if(!lines_count) {
            lines_count=C.lines_choose[0];
        }

        if(this._full_bets && this._full_bets[lines_count] && this._full_bets[lines_count].length) {
            return this._full_bets[lines_count];
        }


        var k_list = this.k_list.map(a=>a).sort();

        var unique=[];

        for(var kI=0;kI<k_list.length;kI++) {
            for(var bI=0;bI<this.bets.length;bI++) {
                var v=MathFake.mult(+k_list[kI],this.bets[bI]);
                if(!C.fixed_lines && !C.fixed_bets) {
                    v=MathFake.mult(v,lines_count);
                }

                if(C.fixed_bets_k) {
                    v=MathFake.mult(v,C.fixed_bets_k);
                }

                /*if(v<1) {
                    v=parseFloat(v);
                }*/

                // v=Math.round((v*10))/10;

                if(C.min_bet && v<C.min_bet) {
                    continue;
                }

                if(C.max_bet && v>C.max_bet) {
                    continue;
                }

                if(unique.indexOf(v)>=0) {
                    continue;
                }

                if(v<=0) {
                    continue;
                }

                unique.push(v);
            }
        }

        unique.sort(function(a,b) { return a - b;});

        if(this.gametype=='videopoker') {
            unique.splice(-unique.length%5,unique.length%5);
        }

        //add dentabs
        /*if(model.gametype=='videopoker') {
            if(unique.length%5!=0) {
                var count_parts=5-(unique.length%5);

                var max_bet=unique[unique.length-1];
                var start_bet=unique[unique.length-(unique.length%5)-1];

                var parts = (max_bet-start_bet)/(count_parts+1);

                for(var i=1;i<=count_parts;i++) {
                    var v=Math.round(((start_bet+(parts*(i)))*10))/10;
                    unique.splice(-1,0,v);
                }
            }
        }*/

        return unique;
    }
    resetGame() {
        var send_params = {
            'action': 'save',
            'gamename': C.gamename,
        };

        $.ajax({
            url: model.getHost(),
            data: send_params,
            dataType: 'json',
            async: true,
            headers: {
                token: model.getToken(),
                tokenuser: LS15.syMtvvgLJj
            },
            success: function(data,t,s) {
                if(!model.checkToken(s.getResponseHeader('token'))) {

                    if(!!window.everymatrixFlag) {
                        window.parent.postMessage({
                            name: 'errorMessage',
                            sender: 'game',
                            data: {
                                errorCode: '8501',
                                errorMessage: 'Token invalid'
                            }
                        }, '*');
                    }

                    model.mainLayer.add(new PopupMessage('Session close. Closing game...',function() {
                        eventDispatcher.dispatch(G.CLOSE_GAME);
                    },2000, 'error'));
                    return;
                }

                if(model.gametype=='miner') {
                    model.current_win_level=+data.current_win_level;
                }

                eventDispatcher.dispatch(G.GAME_WAS_RESET);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                var er = xhr.getResponseHeader('CustomError') || '';

                if(er.length) {
                    er = "\n"+er+"\n";
                }

                if(!!window.everymatrixFlag) {
                    window.parent.postMessage({
                        name: 'errorMessage',
                        sender: 'game',
                        data: {
                            errorCode: '8605',
                            errorMessage: 'Error game reset'
                        }
                    }, '*');
                }

                model.mainLayer.add(new PopupMessage('Error. '+er+' Closing game...',function() {
                    eventDispatcher.dispatch(G.CLOSE_GAME);
                },2000, 'error'));
            }
        });
    }
    updateBalance() {
        var send_params = {
            'action': 'balance',
            'gamename': C.gamename,
        };

        $.ajax({
            url: model.getHost(),
            data: send_params,
            dataType: 'json',
            async: true,
            headers: {
                token: model.getToken(),
                tokenuser: LS15.syMtvvgLJj
            },
            success: function(data,t,s) {
                if(!model.checkToken(s.getResponseHeader('token'))) {

                    if(!!window.everymatrixFlag) {
                        window.parent.postMessage({
                            name: 'errorMessage',
                            sender: 'game',
                            data: {
                                errorCode: '8501',
                                errorMessage: 'Token invalid'
                            }
                        }, '*');
                    }

                    model.mainLayer.add(new PopupMessage('Session close. Closing game...',function() {
                        eventDispatcher.dispatch(G.CLOSE_GAME);
                    },2000, 'error'));
                    return;
                }

                model.balance=+data.balance;

                eventDispatcher.dispatch(G.BALANCE_UPDATED);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                var er = xhr.getResponseHeader('CustomError') || '';

                if(er.length) {
                    er = "\n"+er+"\n";
                }

                if(!!window.everymatrixFlag) {
                    window.parent.postMessage({
                        name: 'errorMessage',
                        sender: 'game',
                        data: {
                            errorCode: '8601',
                            errorMessage: 'Error updating balance'
                        }
                    }, '*');
                }

                model.mainLayer.add(new PopupMessage('Error. '+er+' Closing game...',function() {
                    eventDispatcher.dispatch(G.CLOSE_GAME);
                },2000, 'error'));
            }
        });
    }
    buyFG(cb) {

        this.buy_fg=true;

        if(!this.checkBalance()) {
            this.buy_fg=false;
            eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.not_enough_credits);
        }
        else {
            eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.default);
            model.k=this.buy_cnt;
            eventDispatcher.dispatch(G.START_SPIN, this.amount,C.bonus_buy_price*this.buy_cnt);
            cb();
        }

    }
    isReplayMode() {
        return !!window.replay_mode;
    }
    startSpin(amount) {

        if(!model.checkToken(model.getToken())) {

            if(!!window.everymatrixFlag) {
                window.parent.postMessage({
                    name: 'errorMessage',
                    sender: 'game',
                    data: {
                        errorCode: '8501',
                        errorMessage: 'Token invalid'
                    }
                }, '*');
            }

            model.mainLayer.add(new PopupMessage('Session close. Closing game...',function() {
                eventDispatcher.dispatch(G.CLOSE_GAME);
            },2000, 'error'));
            return;
        }

        if (!this.flags.can_start_spin)
            return;

        this.win_collected=false;

        if(!this.isFreespin) {
            this.balance = MathFake.a(this.balance,this.win);
        }

        this.stop_reels = 0;
        this.win = 0;

        this.can_double = false;

        if(!this.isFreespin && this.total_fs_win>0){
            this.balance = MathFake.a(this.balance,this.total_fs_win);
            this.total_fs_win=0;
        }

        let rate=1;

        if(this.buy_fg) {
            rate=C.bonus_buy_price;
        }

        if(!this.bonus_mode && !this.isFreespin) {
            this.balance = this.convertFloat(MathFake.s(this.balance,MathFake.mult(amount,rate)));
        }

        if(this.gametype=='videopoker' && this.pokerStep==2) {
            //не списываем с баланса на draw
            this.balance = MathFake.a(this.balance,amount);
            this.balance += amount;
        }

        this.amount = amount;
        this.gamble_win = 0;
        this.show_replace = false;

        if(this.gametype=='slots') {
            this.slots_area.removeWinLines();
            this.slots_area.createReels('spinning');
        }

        if(this.gametype=='shuffle') {
            this.shuffle_area.removeWinLines();
            this.shuffle_area.createReels('spinning');
        }

        this.startedSpinTime = Date.now();

        this.flags.can_start_spin = false;
        this.flags.can_show_win = false;
        this.flags.can_change_denom = false;
        this.flags.can_show_info = false;
        this.flags.can_start_freegames = false;
        this.flags.can_start_auto_spin = false;
        this.flags.can_end_auto_spin = this.auto_spin;

        // this.comb=[];
        this.result = false;

        var send_params = {
            'action': 'spin',
            'gamename': C.gamename,
            'li': (this.gametype=='videopoker')?((model.betLinesMenu.active_bet_index%5)+1):model.current_lines_count,
            'di': model.k,
            'amount': this.amount
        };

        if(typeof this.amount == 'number') {
            send_params['amount']=""+this.amount.toFixed(model.mult);
        }
        else {
            send_params['amount']=""+parseFloat(this.amount).toFixed(model.mult);
        }

        if(this.gametype=='videopoker') {
            if(this.pokerStep==2) {
                send_params.hold=[];
                model.poker_area.cards.forEach(function(c,i) {
                    if(c.isHeld) {
                        send_params.hold.push(i);
                    }
                });
            }
        }

        if(this.gametype=='keno') {
            send_params.nums = model.keno_area.choosed_nums;
        }

        if(this.gametype=='roshambo') {
            send_params.hand = model.roshambo_area.choosed_hand;
        }

        if(this.gametype=='miner') {
            send_params.num = model.miner_area.choosed_btn;
        }

        if (this.bonus_mode) {
            send_params.action = 'freespin';
        }

        if(this.buy_fg) {
            send_params.action = 'buyfg';
            this.buy_fg=false;
        }

        send_params.stat = this.getDeviceStat(send_params.action=='freespin'?'free':'normal');

        this.insane_mode=0;

        //clear results

        this.results_to_restore=this.results.map(a=>a);

        this.results = [];
        for (var i = 0; i < C.bar_count; i++) {
            this.results.push([]);
        }

        if(this.isReplayMode()) {
            send_params.b=this.replay_id;
            delete(send_params.stat);
        }

        $.ajax({
                url: model.getHost(),
                data: send_params,
                dataType: 'json',
                async: true,
                headers: {
                    token: model.getToken(),
                    tokenuser: LS15.syMtvvgLJj
                },
                success: function(data,t,s) {

                    if(data.error && data.error==1) {
                        var er = M[data.error_txt];

                        if(er.length) {
                            er = "\n"+er+"\n";
                        }

                        window.parent.postMessage({
                            name: 'errorMessage',
                            sender: 'game',
                            data: {
                                errorCode: '8602',
                                errorMessage: 'Bet error'
                            }
                        }, '*');

                        model.mainLayer.add(new PopupMessage(er,function() {
                            eventDispatcher.dispatch(G.CLOSE_GAME);
                        },2000, 'error'));
                        model.slots_area && model.slots_area.createReels('ready');
                        return;
                    }

                    if(!model.checkToken(s.getResponseHeader('token'))) {

                        if(!!window.everymatrixFlag) {
                            window.parent.postMessage({
                                name: 'errorMessage',
                                sender: 'game',
                                data: {
                                    errorCode: '8501',
                                    errorMessage: 'Token invalid'
                                }
                            }, '*');
                        }

                        model.mainLayer.add(new PopupMessage('Session close. Closing game...',function() {
                            eventDispatcher.dispatch(G.CLOSE_GAME);
                        },2000, 'error'));
                        return;
                    }

                    if(C.with_insane_mode && model.insane_mode==0 && Math.random()<0.3) {
                        model.insane_mode = Math.random()<0.5?1:2; //future
                        model.insane_mode = 1;

                        model.insane_results = [];

                    }

                    model.replay_id=false;

                    if(model.isReplayMode() && data.next_replay_id) {
                        model.replay_id=data.next_replay_id;
                        model.amount=data.next_amount;
                    }

                    if(model.gametype=='miner') {
                        model.current_win_level=+data.current_win_level;
                    }

                    if (data.rate_win) {
                        model.rateWin = data.rate_win;
                    }

                    if(data.comb_after_fg) {
                        model.comb_after_fg = data.comb_after_fg;
                    }

                    if(data.last5_history) {
                        model.results_history=data.last5_history;
                    }
                    else {
                        if(!model.results_history[model.current_lines_count-1]) {
                            model.results_history[model.current_lines_count-1]=[];
                        }
                        model.results_history[model.current_lines_count-1].push(data.comb);

                        model.results_history[model.current_lines_count-1] = model.results_history[model.current_lines_count-1].slice(-6,6);
                    }

                    model.last_bet_id=data.last_bet_id;

                    if(data.jpwin) {
                        model.jpallcards=[data.jpcard];
                        model.jpcards=[data.jpcard];
                        model.jp_win_state=true;
                    }

                    if(model.jpenable && data.jackpots && !model.bonus_mode) {
                        model.jpdata = data.jackpots.map(Number);
                        if(data.jpwin) {
                            eventDispatcher.dispatch(G.UPDATE_JP_DATA);
                        }
                    }

                    if(model.isFreespin && !model.bonus_mode) {
                        model.fs_count = +data.fs_count || 0;
                        model.fs_played = +data.fs_played || 0;

//                    eventDispatcher.dispatch(G.UPDATE_FREESPINS_PROGRESS,{all:model.fs_count, cur:model.fs_played});
                    }

                    model.total_fs_win=0;

                    if(data.total_fs_win) {
                        model.total_fs_win=MathFake.a(data.total_fs_win,data.win);
                    }

                    if(model.gametype=='roshambo' && data.handwins) {
                        model.handwins=data.handwins;
                    }

                    if(model.gametype=='videopoker') {
                        model.pokerStep = data.pokerStep;
                        model.wincard = data.wincard;
                        model.wincomb = data.wincomb || '';
                        model.holdcomb = data.holdcomb || '';
                        model.pokerhold = data.hold;
                    }

                    if (C.minibar) {
                        model.miniComb = data.mini_comb;
                    }

                    data.win = +data.win;
                    model.flags.can_end_spin = true;

                    if (data.bonus_win > 0) {
                        model.flags.can_start_freegames = true;
                    }

                    if (!model.bonus_mode && model.flags.can_start_freegames) {
                        model.flags.can_start_choose = true;
                    }
                    model.current_bar = data.extracomb;

                    if(data.comb_scatter_position) {
                        model.comb_scatter_position = data.comb_scatter_position;
                    }

                    model.comb = data.comb;

                    model.result = true;
                    model.win = data.win;
                    model.freegames_win = data.bonus_win;
                    model.session_total_win_free = data.session_total_win_free;
                    model.freegames_all = +data.bonus_all || 0;
                    if(data.bonus==0 && model.gametype!='slots' && model.gametype!='shuffle') { //????
                        model.freegames_all=0;
                    }
                    model.played_fg_all=+model.freegames_all;
                    model.freegames_current = +data.bonus || 0;
                    model.gamble_stats = data.gamble_stats;

                    if(!model.isFreespin && !model.bonus_mode) {
                        model.balance = +data.balance;
                        eventDispatcher.dispatch(G.BALANCE_UPDATED); //250220
                    }

                    model.bonus_mode = model.freegames_current > 0;

                    if(model.freegames_win==0) {
                        model.flags.can_start_freegames=false;
                    }

                    if (data.bonus_super_symbol_win) {
                        model.bonusdata = data.bonus_super_symbol_win;

                        //fix
                        model.bonusdata.linesMask.unshift(0);
                        model.bonusdata.linesValue.unshift(0);
                    }


                    if (data.replace_sym >= 0) {
                        model.replace_sym = data.replace_sym;
                    }

                    model.l = {
                        values: data.linesValue,
                        masks: data.linesMask
                    };

                    if (C.dynamicReels) {
                        model.results=data.comb;
                    } else {
                        for (var i in data.comb) {
                            model.results[i % C.bar_count].push(data.comb[i]);
    
                            if (C.scatters.indexOf(data.comb[i]) + 1 > 0) {
    //                            model.slots_area.scatters_count++;
                            }
                        }
                    }

                    if(model.gametype=='miner') {
                        model.results=data.comb;
                    }

                    if(model.gametype=='roshambo') {
                        model.results=data.comb;
                        model.winSym=data.winSym;
                    }

                    if(model.gametype=='hunt') {
                        model.results=[];
                        model.winSym=data.target;
                    }

                    // if(model.gametype=='drops') {
                    //     model.results=data.comb;
                    // }

                    if (model.startedSpinTime + model.minSpinTime < Date.now()) {
                        eventDispatcher.dispatch(G.UPDATE_REEL_STARTTIME);
                    }

                    eventDispatcher.dispatch(G.STOP_SPIN);

                    if(!model.anims_loaded && data.win>0 && model.gamever=='1') {
                        eventDispatcher.dispatch(G.START_SLOW_CONN);
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {

                    if(ajaxOptions=='abort') {
                        model.is_offline=true;
                        model.results = model.results_to_restore;

                        model.flags.can_start_auto_spin=true;
                        model.spin_run = false;
                        model.result = false;
                        model.force_stop = false;

                        model.flags.can_end_spin = false;
                        model.flags.can_start_spin = true;

                        if (!model.auto_spin) {
                            model.flags.can_show_info = true;
                            model.flags.can_change_denom = true;
                        }
                        else {
                            eventDispatcher.dispatch(G.STOP_AUTO_SPIN);
                        }

                        model.flags.can_end_auto_spin = model.auto_spin;

                        model.slots_area && model.slots_area.createReels('ready');

                        if(!model.mainLayer.offline_popup) {
                            model.mainLayer.offline_popup=new PopupMessage(M.offline_network || 'You are offline. Waiting internet connection', function () {

                            }, 2000, 'error2');
                            model.mainLayer.add(model.mainLayer.offline_popup);
                        }

                        return;
                    }

                    var er = xhr.getResponseHeader('CustomError') || '';

                    if(er.length) {
                        er = "\n"+er+"\n";
                    }

                    window.parent.postMessage({
                        name: 'errorMessage',
                        sender: 'game',
                        data: {
                            errorCode: '8602',
                            errorMessage: 'Bet error'
                        }
                    }, '*');

                    model.mainLayer.add(new PopupMessage('Error. '+er+' Closing game...',function() {
                        eventDispatcher.dispatch(G.CLOSE_GAME);
                    },2000, 'error'));
                    model.slots_area && model.slots_area.createReels('ready');
                }
            });
    }
    getPromoUpdate() {

        if(typeof PromoPanel!='function') {
            return;
        }

        if(!window.promopanel_enable) {
            return;
        }

        var send_params = {
            'action': 'promo',
            'gamename': C.gamename,
        };

        let _self=this;

        $.ajax({
            url: model.getHost(),
            dataType: 'json',
            data: send_params,
            async: true,
            headers: {
                token: model.getToken(),
                tokenuser: LS15.syMtvvgLJj
            },
            success: function (data, t, s) {
                if (!model.checkToken(s.getResponseHeader('token'))) {

                    if (!!window.everymatrixFlag) {
                        window.parent.postMessage({
                            name: 'errorMessage',
                            sender: 'game',
                            data: {
                                errorCode: '8501',
                                errorMessage: 'Token invalid'
                            }
                        }, '*');
                    }

                    model.mainLayer.add(new PopupMessage('Session close. Closing game...', function () {
                        eventDispatcher.dispatch(G.CLOSE_GAME);
                    }, 2000, 'error'));
                    return;
                }

                model.promodata=data;

                if(!model.promo_panel) {
                    _self.startLoadThumbs();
                    _self.startPromoPanel();
                }
                else {
                    model.promo_panel.drawTopWins();
                    model.promo_panel.drawEvents();
                    model.promo_panel.drawDS();
                    model.promo_panel.drawFS();
                }

                if(data.promo_popup_show) {
                    model.promoPopup=new PromoPopup(function() {

                    });
                    model.mainLayer.add(model.promoPopup);
                }

                let need_show_prize=false;

                if(model.promodata.events) {
                    model.promodata.events.forEach(function(ev) {
                        if(ev.type=='promo') {
                            need_show_prize=true;
                        }
                    });
                }

                if(model.promodata.events && model.promodata.events.length && need_show_prize && !game.cache.checkImageKey('prize')) {
                    game.load.atlasJSONHash('prize', 'images/common/ui/prize.'+ C.ext, 'images/common/ui/prize.json');

                    game.load.onLoadComplete.add(function() {
                        if(game.cache.checkImageKey('prize') && !game.state.states.StateMain.menu_group.prize_btn) {
                            game.state.states.StateMain.menu_group.prize_btn=new PrizeButton();
                            game.state.states.StateMain.menu_group.add(game.state.states.StateMain.menu_group.prize_btn);
                            game.state.states.StateMain.menu_group.prize_btn.gamever();
                        }
                    },model);

                    game.load.start();
                }

                if(model.promo_payed) {
                    model.promoPopup=new PromoPopup(function() {

                    },'end');
                    model.promo_payed=false;
                    model.mainLayer.add(model.promoPopup);
                }

            },
            error: function () {
            }
        });
    }
    startLoadThumbs() {
        model.promodata.topwins.forEach(function(topwin,n) {
            game.load.image('thumb_'+topwin.game,"sqthumb/"+topwin.game+"."+C.ext);
        });

        /*model.promodata.events.forEach(function(one_event) {
            if (one_event.type == 'progressive') {
                game.load.image('banner_' + one_event.id, one_event.banner);
            }
        });*/

        game.load.onLoadComplete.add(function() {
            this.smallThumbsLoaded=true;
        },this);

        game.load.start();
    }
    startPromoPanel() {
        if(fontsLoaded && !!this.smallThumbsLoaded) {
            game.time.events.add(Phaser.Timer.SECOND, function() {
                model.promo_panel = new PromoPanel();
            }, this);
        }
        else game.time.events.add(500,this.startPromoPanel,this);
    }
    checkForFreespins() {

        this.start_check_fs=true;

        var send_params = {
            'action': 'fscheck',
            'gamename': C.gamename,
        };

        $.ajax({
            url: model.getHost(),
            dataType: 'json',
            data: send_params,
            async: true,
            headers: {
                token: model.getToken(),
                tokenuser: LS15.syMtvvgLJj
            },
            success: function (data, t, s) {
                if (!model.checkToken(s.getResponseHeader('token'))) {

                    if (!!window.everymatrixFlag) {
                        window.parent.postMessage({
                            name: 'errorMessage',
                            sender: 'game',
                            data: {
                                errorCode: '8501',
                                errorMessage: 'Token invalid'
                            }
                        }, '*');
                    }

                    model.mainLayer.add(new PopupMessage('Session close. Closing game...', function () {
                        eventDispatcher.dispatch(G.CLOSE_GAME);
                    }, 2000, 'error'));
                    return;
                }

                if(data.recheck) {
                    model.checkForFreespins();
                    return;
                }

                if(data.fs_count && data.fs_count>data.fs_played) {
                    model.isFreespin = true;
                    model.fs_count = +data.fs_count;
                    model.fs_played = +data.fs_played;
                    model.fs_active = +data.fs_active;
                    model.fs_type = data.fs_type;
                    model.fs_created = +data.fs_created*1000;
                    model.fs_game = data.fs_game;
                    model.fs_id = data.fs_id;
                    model.fs_gamename = data.fs_gamename;
                    model.fs_lines = data.li;
                    model.amount = +data.amount;
                    model.total_fs_win=+data.total_fs_win;

                    game.state.states.StateLoad.fsPopup=new FsPopup(function() {

                    });
                }

            },
            error: function () {
            }
        });
    }
    endSpin(params) {

        this.flags.can_start_auto_spin=true;
        //show result
        this.spin_run = false;
        this.result = false;
        this.force_stop = false;

        this.flags.can_end_spin = false;
        this.flags.can_start_spin = true;

        if (!this.auto_spin) {
            this.flags.can_show_info = true;
            this.flags.can_change_denom = true;
        }

        this.flags.can_end_auto_spin = this.auto_spin;

        if (this.bonus_mode) {
            this.flags.can_change_denom = false;
        }

        //moved here because "stay" animation not should use mask
        this.slots_area && this.slots_area.createReels('ready');

        if (this.win > 0) {
            this.flags.can_start_spin = false; //wait for win
            this.last_win = this.win;
            if(!this.strict_double) {
                this.can_double = true;
            }
            if(!!this.isFreespin || this.bonus_mode || (this.freegames_all>0 && this.freegames_current==0)) {
                this.can_double = false;
            }
            this.can_collect = true;
            if(this.bonusdata && this.bonusdata.win>0) {
                this.can_collect = false;
                this.show_replace2 = true;
            }
            this.flags.can_start_auto_spin = false;
//                this.flags.can_end_auto_spin;

            //moved upper
            //this.slots_area && this.slots_area.createReels('ready');

            if(C.replace_wild_bar && this.win>0) {
                this.winlines.replace_bars_wild();
            }
            else if(C.reel_ug && this.win>0) {
                this.winlines.reel_ug_start();
            }
            else if(C.replace_wild_around){
                this.winlines.replace_around_wild();
            }
            else if(C.explode_and_clear_around_wild){
                this.winlines.explode_and_clear_around_wild();
            }
            else if(this.drops_area) {
                // eventDispatcher.dispatch(G.START_FADE_AFTER_DROP);
            }
            else {
                eventDispatcher.dispatch(G.SHOW_WIN);
            }
        }

        var prev = this.isFreespin;
        this.isFreespin = model.fs_count && model.fs_count>model.fs_played;
        prev && eventDispatcher.dispatch(G.UPDATE_FREESPINS_PROGRESS,{all:model.fs_count, cur:model.fs_played});

        if(prev && !this.isFreespin) {
            this.amount=this.amountBeforeFS;
        }

        eventDispatcher.dispatch(G.UPDATE_BET_BUTTON);

        if(this.win==0) {
            if(this.jpcards.length && !this.jp_area) {
                if(this.auto_spin) {
                    eventDispatcher.dispatch(G.STOP_AUTO_SPIN);
                }
                this.jp_area = new JParea();
                this.mainLayer.add(this.jp_area);
                this.mainLayer.moveDown(this.jp_area);
            }

            if(this.freegames_win==0 && C.specialScatterAnimation) {
                C.specialScatterAnimation();
            }
        }

        if (this.win == 0 && this.freegames_all > 0 && this.freegames_current == 0) {
            if(this.auto_spin && !C.no_fg_popup) {
                eventDispatcher.dispatch(G.STOP_AUTO_SPIN);
            }
            eventDispatcher.dispatch(G.END_FREEGAMES);

            if(C.no_fg_popup && this.auto_spin) {
                if(this.checkBalance()) {
                    game.time.events.add(C.noSpinning?1700:700, function() {
                        eventDispatcher.dispatch(G.START_SPIN, this.amount);
                    },this);
                }
                else {
                    eventDispatcher.dispatch(G.STOP_AUTO_SPIN);
                    this.flags.can_show_info = true;
                }
            }
        }
        else if(this.freegames_win>0 && this.win == 0) {
            model.slots_area && model.slots_area.reels.forEach(function(r) {
                r.symbols.forEach(function (symbol, index) {
                    if(symbol.in_slots_area && C.scatters.indexOf(symbol.num)>=0) {
                        symbol.animate();
                    }
                });
            });
            eventDispatcher.dispatch(G.LAST_WIN_END);
        }
        else if (this.win == 0 && this.auto_spin) {
            if(this.checkBalance()) {
                game.time.events.add(C.noSpinning?1700:700, function() {
                    this.auto_spin && eventDispatcher.dispatch(G.START_SPIN, this.amount);
                },this);
            }
            else {
                eventDispatcher.dispatch(G.STOP_AUTO_SPIN);
                this.flags.can_show_info = true;
            }
        }

        if(!this.checkBalance()) {
            eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.not_enough_credits);
        }
    }
    showPayWindow() {

        if(!window.showPayPopup) {
            return;
        }

        if(this.payPopup) {
            this.payPopup.destroy(true);
        }

        this.payPopup=this.mainLayer.add(new PayPopup());
    }
    checkBalance(bonus_buy=false) {

        if(this.pokerStep==2) {
            return true;
        }

        if(model.isFreespin) {
            return true;
        }

        if(typeof this.freegames_current!='undefined' && this.freegames_all>0 && this.freegames_current>0) {
            return true;
        }

        var curBet = MathFake.mult(this.bets[this.bet_index],this.k_list[this.k]);

        curBet=this.amount;

        if(this.buy_fg || bonus_buy) {
            curBet*=C.bonus_buy_price;
        }

        if((+this.balance+this.win+(this.total_fs_win || 0)) >= curBet) {
            return true;
        }


        return false;
    }
    x2(color) {

        if(!this.can_double) {
            return;
        }

        if(!model.checkToken(model.getToken())) {

            if(!!window.everymatrixFlag) {
                window.parent.postMessage({
                    name: 'errorMessage',
                    sender: 'game',
                    data: {
                        errorCode: '8501',
                        errorMessage: 'Token invalid'
                    }
                }, '*');
            }

            model.mainLayer.add(new PopupMessage('Session close. Closing game...',function() {
                eventDispatcher.dispatch(G.CLOSE_GAME);
            },2000, 'error'));
            return;
        }

        var send_params = {
            'action': 'double',
            'gamename': C.gamename,
            'li': 0,
            'color': color,
            'stat': this.getDeviceStat('double')
        };

        eventDispatcher.dispatch(G.PLAY_SOUND, {
            key: 'mainSounds',
            marker: 'gambleCardClickSound',
            loop: false
        });

        $.ajax({
            url: model.getHost(),
            data: send_params,
            headers: {
                token: model.getToken(),
                tokenuser: LS15.syMtvvgLJj
            },
            dataType: 'json',
            success: function(data,t,s) {

                if(data.error && data.error==1) {
                    var er = M[data.error_txt];

                    if(er.length) {
                        er = "\n"+er+"\n";
                    }

                    if(!!window.everymatrixFlag) {
                        window.parent.postMessage({
                            name: 'errorMessage',
                            sender: 'game',
                            data: {
                                errorCode: '8603',
                                errorMessage: 'X2 error'
                            }
                        }, '*');
                    }

                    model.mainLayer.add(new PopupMessage(er,function() {
                        eventDispatcher.dispatch(G.CLOSE_GAME);
                    },2000, 'error'));
                    model.slots_area && model.slots_area.createReels('ready');
                    return;
                }

                if(!model.checkToken(s.getResponseHeader('token'))) {

                    if(!!window.everymatrixFlag) {
                        window.parent.postMessage({
                            name: 'errorMessage',
                            sender: 'game',
                            data: {
                                errorCode: '8501',
                                errorMessage: 'Token invalid'
                            }
                        }, '*');
                    }

                    model.mainLayer.add(new PopupMessage('Session close. Closing game...',function() {
                        eventDispatcher.dispatch(G.CLOSE_GAME);
                    },2000, 'error'));
                    return;
                }

                data.win = +data.win;

                model.gamble_stats = data.gamble_stats;
                model.suit_history = data.gamble_suit_history;
                model.win = data.win;
                model.gamble_win = data.win;

                model.last_bet_id=data.last_bet_id;

                if (model.win > 0) {
                    model.can_collect = true;
                }

                model.balance = +data.balance + data.win;

                if (model.win > 0) {
                    eventDispatcher.dispatch(G.PLAY_SOUND, {
                        key: 'commonSounds',
                        marker: 'gambleWin'
                    });
//                    eventDispatcher.dispatch(G.PLAY_SOUND, {
//                        key: 'gambleSounds',
//                        marker: 'win' + (model.current_gamble)
//                    });
                } else {
                }

                if (C.delay_gamble_win) {
                    game.time.events.add(C.delay_gamble_win, function () {
                        model.collectWin();
                    }, this);
                } else {
                    model.collectWin();
                }

                eventDispatcher.dispatch(G.OPEN_CARD, 0);
                eventDispatcher.dispatch(G.UPDATE_STATS, 0);

//                game.time.events.add(Phaser.Timer.SECOND*2,function() {
                model.current_gamble++;
//                },this);

            },
            error: function(xhr, ajaxOptions, thrownError) {

                var er = xhr.getResponseHeader('CustomError') || '';

                if(er.length) {
                    er = "\n"+er+"\n";
                }

                if(!!window.everymatrixFlag) {
                    window.parent.postMessage({
                        name: 'errorMessage',
                        sender: 'game',
                        data: {
                            errorCode: '8603',
                            errorMessage: 'X2 error'
                        }
                    }, '*');
                }

                model.slots_area && model.slots_area.createReels('ready');
                model.mainLayer.add(new PopupMessage('Error. '+er+' Closing game...',function() {
                    eventDispatcher.dispatch(G.CLOSE_GAME);
                },2000, 'error'));
            }
        });
    }
    x4(suit_check) {

        if(!this.can_double) {
            return;
        }

        if(!model.checkToken(model.getToken())) {

            if(!!window.everymatrixFlag) {
                window.parent.postMessage({
                    name: 'errorMessage',
                    sender: 'game',
                    data: {
                        errorCode: '8501',
                        errorMessage: 'Token invalid'
                    }
                }, '*');
            }

            model.mainLayer.add(new PopupMessage('Session close. Closing game...',function() {
                eventDispatcher.dispatch(G.CLOSE_GAME);
            },2000, 'error'));
            return;
        }

        var send_params = {
            'action': 'double',
            'gamename': C.gamename,
            'li': 0,
            'color': suit_check,
            'stat': this.getDeviceStat('double')
        };

        eventDispatcher.dispatch(G.PLAY_SOUND, {
            key: 'mainSounds',
            marker: 'gambleCardClickSound',
            loop: false
        });


        $.ajax({
            url: model.getHost(),
            data: send_params,
            headers: {
                token: model.getToken(),
                tokenuser: LS15.syMtvvgLJj
            },
            dataType: 'json',
            success: function(data,t,s) {

                if(data.error && data.error==1) {
                    var er = M[data.error_txt];

                    if(er.length) {
                        er = "\n"+er+"\n";
                    }

                    if(!!window.everymatrixFlag) {
                        window.parent.postMessage({
                            name: 'errorMessage',
                            sender: 'game',
                            data: {
                                errorCode: '8604',
                                errorMessage: 'X4 error'
                            }
                        }, '*');
                    }

                    model.mainLayer.add(new PopupMessage(er,function() {
                        eventDispatcher.dispatch(G.CLOSE_GAME);
                    },2000, 'error'));
                    model.slots_area && model.slots_area.createReels('ready');
                    return;
                }

                if(!model.checkToken(s.getResponseHeader('token'))) {

                    if(!!window.everymatrixFlag) {
                        window.parent.postMessage({
                            name: 'errorMessage',
                            sender: 'game',
                            data: {
                                errorCode: '8501',
                                errorMessage: 'Token invalid'
                            }
                        }, '*');
                    }

                    model.mainLayer.add(new PopupMessage('Session close. Closing game...',function() {
                        eventDispatcher.dispatch(G.CLOSE_GAME);
                    },2000, 'error'));
                    return;
                }

                data.win = +data.win;

                model.gamble_stats = data.gamble_stats;
                model.suit_history = data.gamble_suit_history;
                model.win = data.win;
                if (data.win > 0) {
                    model.gamble_win = data.win;
                } else {
                    model.gamble_win = 0;
                }

                if (model.win > 0) {
                    model.can_collect = true;
                }

                model.last_bet_id=data.last_bet_id;

                if (model.win > 0) {
                    var s = model.current_gamble+1;
                    if(s>=model.max_gamble) {
                        s=model.max_gamble-1;
                    }
                    eventDispatcher.dispatch(G.PLAY_SOUND, {
                        key: 'commonSounds',
                        marker: 'gambleWin'
                    });
//                    eventDispatcher.dispatch(G.PLAY_SOUND, {
//                        key: 'gambleSounds',
//                        marker: 'win' + s
//                    });
                } else {
                }

//                eventDispatcher.dispatch(G.UPDATE_SUITS,model.win);

                model.balance = +data.balance + data.win;

                if (C.delay_gamble_win) {
                    game.time.events.add(C.delay_gamble_win, function () {
                        model.collectWin();
                    }, this);
                } else {
                    model.collectWin();
                }

                eventDispatcher.dispatch(G.OPEN_CARD, 0);
                eventDispatcher.dispatch(G.UPDATE_STATS, 0);

//                game.time.events.add(Phaser.Timer.SECOND*2,function() {
                model.current_gamble++;
                model.current_gamble++;

//                },this);
            },
            error: function(xhr, ajaxOptions, thrownError) {

                var er = xhr.getResponseHeader('CustomError') || '';

                if(er.length) {
                    er = "\n"+er+"\n";
                }

                if(!!window.everymatrixFlag) {
                    window.parent.postMessage({
                        name: 'errorMessage',
                        sender: 'game',
                        data: {
                            errorCode: '8604',
                            errorMessage: 'X4 error'
                        }
                    }, '*');
                }

                model.slots_area && model.slots_area.createReels('ready');
                model.mainLayer.add(new PopupMessage('Error. '+er+' Closing game...',function() {
                    eventDispatcher.dispatch(G.CLOSE_GAME);
                },2000, 'error'));
            }
        });
    }
    runCoins(time = 4, duration, winK, src='win') {

        if (this.coins_runned) {
            return;
        }
        this.coins_runned = true;

        model.megawin.calcPos(model.win);
        time=model.megawin.times;
        duration=3000*model.megawin.times;

        //stop winline sounds

        for (var s in C.audio.winSounds) {
            eventDispatcher.dispatch(G.STOP_SOUND, {
                key: 'winSounds',
                marker: s
            });
        }

        model.coins_falled = 0;
        eventDispatcher.dispatch(G.STOP_ALL_SOUND);
        mediaManager.forceMuteBGToggle();
        eventDispatcher.dispatch(G.PLAY_SOUND, {
            key: 'mainSounds',
            marker: 'coinsSound',
            loop: true,
            callback: function() {
                mediaManager.forceMuteBGToggle();
            }
        });

        if (!this.coins_group) {
            this.coins_group = game.add.group();
            this.coins_group.tmr = game.time.create(false);
            this.coins_group.tmr.loop(8, function() {}, this);
            this.coins_group.tmr.start();
        }

        this.coins_group.tmr.removeAll();
        this.coins_group.removeAll(true);
        this.coins.forEach(function (c) {
            c.destroy(true);
        });
        this.coins=[];

        var r = game.rnd.integerInRange(20, 40);

        r=time*29;

        var type='Silver';
        if(winK>=40) {
            type='Gold';
        }

        for (var i = 0; i <= r; i++) {
            this.coins_group.tmr.add(i * 100, function () {
                if (this.coins_runned) {
                    var coin = new Coin(Phaser.ArrayUtils.getRandomItem([6, 8, 10, 12, 14, 16, 18, 20, 22, 24]), time, duration, type,src);
                    this.coins_group.add(coin);
                    this.coins.push(coin);
                }
            }, this);
        }

        this.coins_group.sort('coin_scale');

        if((!Phaser.Device.iOS && !Phaser.Device.macOS) && "vibrate" in window.navigator && window.navigator.vibrate!=undefined) {
            window.navigator.vibrate(300);
            setTimeout(function() {
                window.navigator.vibrate(0);
                window.navigator.vibrate(300);
                setTimeout(function() {
                    window.navigator.vibrate(0);
                    window.navigator.vibrate(duration/2-600);
                },600);
            },300);
//            window.navigator.vibrate(duration);
        }


//        game.world.bringToTop(this.coins_group);

        if(src!='jp') {
            model.megawin.addAt(this.coins_group,0);
        }
        else {
            model.mainLayer.add(this.coins_group);
        }
    }
    stopCoins() {
        if (model.coins_falled < model.coins.length) {
            return;
        }

        if (!this.coins_runned) {
            return;
        }

        this.coins_runned = false;

        eventDispatcher.dispatch(G.FORCE_LAST_WIN_END);

        if((!Phaser.Device.iOS && !Phaser.Device.macOS) && "vibrate" in window.navigator && window.navigator.vibrate!=undefined) {
            window.navigator.vibrate(0);
        }

    }
    getRndSuit() {
        return Phaser.ArrayUtils.getRandomItem([0, 1, 2, 3]);
    }
    toggleFullscreen(event, forcefull=false) {

        if(window.isLocal) {
            return;
        }

        if(Phaser.Device.iOS) {
            return;
        }

        var element = document.body;

        if (event instanceof HTMLElement) {
            element = event;
        }

        var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

        element.requestFullScreen = element.webkitRequestFullScreen || element.requestFullScreen || element.mozRequestFullScreen || function () {
            return false;
        };
        document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () {
            return false;
        };


        if(forcefull && isFullscreen) {
            return false;
        }

        isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
    }
    endReelBg() {

       this.reelbg && this.reelbg.forEach(function(r) {

           r.loadTexture('anim_reel_bg_start',0,false);

           r.loop_anim && r.loop_anim.stop();
           r.start_anim.stop();
           r.start_anim.onComplete.addOnce(function() {
               if(!C.reel_fg_anim_no_mask) {
                    r.mask_bar.destroy(true);
               }
                r.destroy(true);
                model.slots_area.remove(r);
           },r);

           r.start_anim.reverseOnce().play(C.frame_rate || 30,false);

       });
       this.reelbg = [];
    }
    startReelBg() {
        if(this.reelbg && this.reelbg.length) {
            return;
        }
        this.reelbg = [];
        for(var n=0;n<C.bar_count; n++) {
            this.reelbg[n] = model.slots_area.create(0,0,'anim_reel_bg_start',0,true,1);

            this.reelbg[n].centerX=model.slots_area.reels[n].centerX-model.slots_area.static_bg.width/2-C.reelBorder;
            this.reelbg[n].centerY=C.reelHeight/2+C.reelBorder;

            if(!C.reel_fg_anim_no_mask) {
                this.reelbg[n].mask_bar = game.add.graphics(0, 0);
                this.reelbg[n].mask_bar.key='mask_bar';
                this.reelbg[n].mask_bar.beginFill(0xffffff);
                this.reelbg[n].mask_bar.drawRoundedRect(this.reelbg[n].x-(C.reelExtraWidth || 0)-(C.reelBGExtraOffset || 0), C.reelBorder, C.reelWidth,C.reelHeight,C.reelBorderRadius || 10);
                this.reelbg[n].mask_bar.endFill();

                model.slots_area.add(this.reelbg[n].mask_bar);

                this.reelbg[n].mask=this.reelbg[n].mask_bar;
            }

            this.reelbg[n].start_anim = this.reelbg[n].animations.add('play_reel_start_'+n);
            this.reelbg[n].start_anim.onComplete.addOnce(function() {
                this.loadTexture('anim_reel_bg_loop',0,false);
                this.loop_anim = this.animations.add('aanim_reel_bg_loop'+this.z).play(C.reel_fg_anim_frame_rate || 30,true);
            }, this.reelbg[n]);
            this.reelbg[n].start_anim.play(C.frame_rate || 30,false);
        }
    }
    isPortrait() {
        if(C.isPortrait) {
            return C.isPortrait();
        }
        return (window.innerWidth/window.innerHeight)<0.86;
    }
    getShortDeviceStat() {

        var stats = this.getDeviceStat('none');

        var ready_stats={};

        ready_stats.android = stats.android;
        ready_stats.pc = stats.pc;
        ready_stats.mobile = stats.mobile;
        ready_stats.ios = stats.ios;

        return ready_stats;
    }
    getDeviceStat(bettype) {

        if(window.noStats) {
            return {};
        }

        try {
            var a = {};

            a.sound_on=+model.soundOn;
            a.sound_off=+!model.soundOn;

            a.res1200=+(window.screen.width>1199 && !game.scale.isPortrait);
            a.res991=+(window.screen.width>991 && window.screen.width<1200 && !game.scale.isPortrait);
            a.res768=+(window.screen.width>767 && window.screen.width<992 && !game.scale.isPortrait);
            a.res480=+(window.screen.width>479 && window.screen.width<768 && !game.scale.isPortrait);
            a.res0=+(window.screen.width<480 && !game.scale.isPortrait);

            a.res1200v=+(window.screen.width>1199 && game.scale.isPortrait);
            a.res991v=+(window.screen.width>991 && window.screen.width<1200 && game.scale.isPortrait);
            a.res768v=+(window.screen.width>767 && window.screen.width<992 && game.scale.isPortrait);
            a.res480v=+(window.screen.width>479 && window.screen.width<768 && game.scale.isPortrait);
            a.res0v=+(window.screen.width<480 && game.scale.isPortrait);

            a.mobile = +isMobile;
            a.pc=+Phaser.Device.desktop;

            a.ios=+Phaser.Device.iOS;
            a.android=+Phaser.Device.android;
            a.mac=+Phaser.Device.macOS;
            a.win=+Phaser.Device.windows;
            a.other_os=+(!Phaser.Device.iOS && !Phaser.Device.android && !Phaser.Device.macOS && !Phaser.Device.windows);

            a.chrome_pc=+(Phaser.Device.chrome && Phaser.Device.desktop);
            a.chrome_ios=+(Phaser.Device.chrome && Phaser.Device.iOS);
            a.chrome_android=+(Phaser.Device.chrome && Phaser.Device.android);
            a.chrome_win=+(Phaser.Device.chrome && Phaser.Device.windows);
            a.chrome_mac=+(Phaser.Device.chrome && Phaser.Device.macOS);

            a.safari_pc=+(Phaser.Device.safari && Phaser.Device.desktop);
            a.safari_ios=+(Phaser.Device.safari && Phaser.Device.iOS);
            a.safari_android=+(Phaser.Device.safari && Phaser.Device.android);
            a.safari_win=+(Phaser.Device.safari && Phaser.Device.windows);
            a.safari_mac=+(Phaser.Device.safari && Phaser.Device.macOS);

            a.mozilla_pc=+(Phaser.Device.firefox && Phaser.Device.desktop);
            a.mozilla_ios=+(Phaser.Device.firefox && Phaser.Device.iOS);
            a.mozilla_android=+(Phaser.Device.firefox && Phaser.Device.android);
            a.mozilla_win=+(Phaser.Device.firefox && Phaser.Device.windows);
            a.mozilla_mac=+(Phaser.Device.firefox && Phaser.Device.macOS);

            a.bettype=(bettype=='double')?'double':'normal';

            a.other_browser_pc=+(!Phaser.Device.chrome && !Phaser.Device.firefox && !Phaser.Device.opera && Phaser.Device.desktop);
            a.other_browser_android=+(!Phaser.Device.chrome && !Phaser.Device.firefox && !Phaser.Device.opera && Phaser.Device.android);
            a.other_browser_ios=+(!Phaser.Device.chrome && !Phaser.Device.firefox && !Phaser.Device.opera && Phaser.Device.iOS);
            a.other_browser_win=+(!Phaser.Device.chrome && !Phaser.Device.firefox && !Phaser.Device.opera && Phaser.Device.windows);
            a.other_browser_mac=+(!Phaser.Device.chrome && !Phaser.Device.firefox && !Phaser.Device.opera && Phaser.Device.macOS);

            a.vert_mobile=+(game.scale.isPortrait && isMobile);
            a.horizont_mobile=+(!game.scale.isPortrait && isMobile);
        }
        catch(e) {
            a.error = JSON.stringify(e);
            a.device = JSON.stringify(Phaser.Device);
        }
        return a;
    }
    convertFunc(int) {

        if(parseInt(int)<10000) {
            return int+'';
        }

        var intpostfix = '';
        var fullint = int;
        var length = (fullint + "").length;


        if (length == 5) {
            int = (fullint / 1000);
            intpostfix = 'K';
        } else if (length == 6) {
            int = (fullint / 1000);
            intpostfix = 'K';
        } else if (length >= 7) {
            int = (fullint / 1000000);
            intpostfix = 'M';
        }
        return int + intpostfix;
    }
    converInt(int) {

        if(!this.need_convert_int) {
            return int;
        }

        return this.convertFunc(int);
    }
    convertFloat(float,force_mult) {

        if(!force_mult) {
            force_mult=model.mult;
        }

        if(force_mult==0) {
            return float;
        }

        let try_float=rightTrim(Number(float).toFixed(force_mult),'0');
        let try_split=try_float.split('.');

        if(typeof(try_split[1])=='undefined' || try_float.split('.')[1].length==0) {
            return try_split[0];
        }

        return try_float;
    }
    getQueryString(parameter)
    {
        if (parameter === undefined) { parameter = ''; }

        var output = {};
        var keyValues = location.search.substring(1).split('&');

        for (var i in keyValues)
        {
            var key = keyValues[i].split('=');

            if (key.length > 1)
            {
                if (parameter && parameter === this.decodeURI(key[0]))
                {
                    return this.decodeURI(key[1]);
                }
                else
                {
                    output[this.decodeURI(key[0])] = this.decodeURI(key[1]);
                }
            }
        }

        return output;
    }
    decodeURI(value)
    {
        return decodeURIComponent(value.replace(/\+/g, ' '));
    }
    placeText(text,fontSize,color, align, font) {
        if(false && Phaser.Device.iOS && C.use_webgl) {
            var text=game.add.bitmapText(0, 0, 'roboto',text,fontSize);
            text.fill=color;
        }
        else {
            var text=game.add.text(0, 0, text);
            if(align) {
                text.align=align;
            }

            if (font != "none")
            {
                text.font = font;
            }
            text.fontSize = fontSize;
            text.fill=color;
        }

        return text;
    }
}