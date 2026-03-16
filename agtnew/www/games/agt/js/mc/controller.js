class Controller {
    constructor() {
        this.wait_mode=false;
        eventDispatcher.add(this.gotEvent, this);
    }
    createTimer() {

        if(!model.slots_area){
            return;
        }

        if(this.wait_timer) {
            this.wait_timer.destroy(true);
        }

        this.wait_mode=false;

        this.wait_timer = game.time.create(false);
        this.wait_timer.loop(C.delayBeforeStayAnimation || 10000, this.runWaitMode, this);

        this.wait_timer.start();

        this.ambient=!model.isPortrait();
        this.ambientTry=0;

        this.initAmbient();

    }
    initAmbient() {

        if(isMobile) {
            this.removeAmbient();
            return;
        }

        if(!this.ambient && this.ambientTry==0) {
            this.removeAmbient();
        }
        else {
            this.createAmbient();
        }
    }
    svgAmbient() {
        return '<svg id="svgambient" style="display: none;" width="0" height="0">\n' +
            '            <filter\n' +
            '                id="ambilight"\n' +
            '                width="300%"\n' +
            '                height="300%"\n' +
            '                x="-0.75"\n' +
            '                y="-0.75"\n' +
            '                color-interpolation-filters="sRGB"\n' +
            '            >\n' +
            '                <feOffset in="SourceGraphic" result="source-copy" />\n' +
            '                <feColorMatrix\n' +
            '                    in="source-copy"\n' +
            '                    type="saturate"\n' +
            '                    values="3"\n' +
            '                    result="saturated-copy"\n' +
            '                />\n' +
            '                <feColorMatrix\n' +
            '                    in="saturated-copy"\n' +
            '                    type="matrix"\n' +
            '                    values="1 0 0 0 0\n' +
            '                        0 1 0 0 0\n' +
            '                        0 0 1 0 0\n' +
            '                        33 33 33 101 -132"\n' +
            '                    result="bright-colors"\n' +
            '                />\n' +
            '                <feMorphology\n' +
            '                    in="bright-colors"\n' +
            '                    operator="dilate"\n' +
            '                    radius="10"\n' +
            '                    result="spread"\n' +
            '                />\n' +
            '                <feGaussianBlur\n' +
            '                    in="spread"\n' +
            '                    stdDeviation="30"\n' +
            '                    result="ambilight-light"\n' +
            '                />\n' +
            '                <feOffset in="SourceGraphic" result="source" />\n' +
            '                <feComposite in="source" in2="ambilight-light" operator="over" />\n' +
            '            </filter>\n' +
            '        </svg>';
    }
    createAmbient() {

        if(Phaser.Device.iOS || isMobile) {
            return;
        }

        if(document.getElementById('ambilight')) {
            return;
        }

        let body = document.body;
        const div = document.createElement('div');
        div.innerHTML = this.svgAmbient();
        body.appendChild(div);

        game.canvas.style['filter']='url(#ambilight)';
    }
    removeAmbient() {
        this.ambient=false;
        if(document.getElementById('ambilight')) {
            document.getElementById('ambilight').remove();
        }
        if(document.getElementById('svgambient')) {
            document.getElementById('svgambient').remove();
        }
    }
    gotEvent(call, params) {
        // if(call=='lastWinEnd') {
        //     console.trace();
        // }
        switch (call) {
            case G.SEND_X2:
                if(model.can_double) {

                    eventDispatcher.dispatch(G.COLLECT_WIN);
                    eventDispatcher.dispatch(G.FORCE_LAST_WIN_END);

                    model.x2(params);
                    model.can_double=false;

                    if(model.settings_opened) {
                        eventDispatcher.dispatch(G.OPEN_SETTINGS);
                    }
                }
                break;
            case G.SEND_X4:
                if(model.can_double) {

                    eventDispatcher.dispatch(G.COLLECT_WIN);
                    eventDispatcher.dispatch(G.FORCE_LAST_WIN_END);

                    model.x4(params);
                    model.can_double=false;

                    if(model.settings_opened) {
                        eventDispatcher.dispatch(G.OPEN_SETTINGS);
                    }
                }
                break;
            case G.START_CHOOSE:

                if(C.bonus_chooser_automode) {
                    model.chooser.alpha=1;
                }

                model.flags.can_start_auto_spin=false;
                model.chooser.genButtons();
                model.chooser.show();

                if(model.settings_opened) {
                    eventDispatcher.dispatch(G.OPEN_SETTINGS);
                }

                break;
            case G.CHOOSE_SELECTED:
                model.flags.can_start_spin=true;
                model.flags.can_start_auto_spin=true;
                model.flags.can_start_choose = false;
                model.restoredFg=false;
                if(!C.infinity_fg) {
                    eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, model.freegames_current+' '+M.free_games_left);
                }

                if((C.FGBGMusic || C.InGameMusic) && model.need_toogle_music) {
                    eventDispatcher.dispatch(G.TOGGLE_MUSIC);
                }

                if(model.settings_opened) {
                    eventDispatcher.dispatch(G.OPEN_SETTINGS);
                }
                break;
            case G.UPDATE_FREESPINS_PROGRESS:
                if(params.all>0 && params.all==params.cur) {
                    if(model.auto_spin) {
                        eventDispatcher.dispatch(G.STOP_AUTO_SPIN);
                    }
                    model.mainLayer.add(new PopupMessage(M.total_win+': '+"\r\n"+model.total_fs_win+' '+model.currency,function() {
                        model.checkForFreespins();
                    },Phaser.Timer.SECOND*3,'fs_total_win'));
                }
                break;
            case G.END_FREEGAMES:
                eventDispatcher.dispatch(G.UPDATE_FREESPINS_PROGRESS,{all:model.fs_count, cur:model.fs_played});

                model.flags.can_start_auto_spin=true;
                model.flags.can_show_info = true;
                model.flags.freegames_started=false;

                var bgname = 'emptyback';
                if(C.scale_mode==Phaser.ScaleManager.SHOW_ALL) {
                    bgname='back';
                }

                if(!C.anim_bg_full && !C.customBgLoader) {
                    model.bg.image.loadTexture(bgname);
                }

                if(C.customChangeBg) {
                    C.customChangeBg();
                }

                if(C.extra_bonus_reels) {
                    model.slots_area.static_bg.loadTexture('reels');
                }

//                if(!C.anim_top && !C.anim_top_left_right && !C.anim_logo) {
//                    model.top_layer.loadTexture('top');
//                }

                if(C.anim_logo) {
                    C.anim_logo_interval = model.default_logo_interval;
                }

                if(model.comb_after_fg) {
                    model.results = [];
                    model.comb = model.comb_after_fg;
                    for (var i = 0; i < C.bar_count; i++) {
                        model.results.push([]);
                    }
                    for (var i in model.comb_after_fg) {
                        model.results[i % C.bar_count].push(model.comb_after_fg[i]);
                    }
                }

                if(C.anim_bg_full) {
                    var name = 'images/games/' + C.gamename + '/animations/bg/';

                    if(Phaser.Device.iOS) {
                        name+='ios/';
                    }

                    if(isMobile) {
                        name += 'bg_mobile';
                    }
                    else {
                        name += 'bg';
                    }

                    if(Phaser.Device.firefox) {
                        name+='.webm';
                    }
                    else {
                        name+='.mp4';
                    }

                    if(typeof PhasernoCache !== 'undefined') {
                        name+='?v='+game.load.noCache;
                    }

                    if(model.video.video.currentSrcShort!=name) {
                        model.video.video.currentSrcShort=name;
                        model.bg.alpha=1;
                        model.video.changeSource(name);
                        model.video.playbackRate=C.videoplaybackRate || 0.5;
                    }
                }

                if(C.bonus_chooser_automode) {
                    model.chooser.alpha=0;
                }

                model.mainLayer.remove(game.world.bonus_replace_symbol);

                model.replace_sym=-1;
                model.bonusdata=null;
                model.bonus_mode=false;

                model.slots_area && model.slots_area.removeWinLines();

                if(typeof C.specAnimFGToggle=='function') {
                    C.specAnimFGToggle();
                }


                var txt=model.convertFloat(+model.session_total_win_free)+' '+M.won;

                model.flags.can_start_spin=true;

                if(!C.no_fg_popup || C.infinity_fg) {
                    eventDispatcher.dispatch(G.PLAY_SOUND, {
                        key: 'fgSounds',
                        marker: 'endFreespins',
                        loop: false
                    });
                }

                model.need_toogle_music=true;

                if((C.FGBGMusic || C.InGameMusic)) {
                    eventDispatcher.dispatch(G.TOGGLE_MUSIC);
                }
                if(C.reel_fg_anim) {
                    model.endReelBg();
                }
                else if(typeof C.own_fg_anim=='function') {
                    C.own_fg_anim('end');
                }
                else if(!C.no_fg_popup) {
                    model.fgPopup=new PopupMessage(txt,function() {
                        model.choosed=false;
                    },Phaser.Timer.SECOND*4,'popup',true);
                    model.mainLayer.add(model.fgPopup);
                }

                model.slots_area && model.slots_area.createReels('ready');

                if(model.mainLayer.bonus_buy_btn) {
                    model.mainLayer.bonus_buy_btn.visible=true;
                }

                break;
            case G.START_FREEGAMES:

                if(!model.flags.can_start_freegames) {
                    break;
                }


                if(C.anim_logo && C.anim_logo_interval!==0.0001) {
                    model.default_logo_interval = C.anim_logo_interval || 3;
                    C.anim_logo_interval = 0.0001;
                }

                model.flags.can_start_freegames=false;
                model.flags.can_start_auto_spin=false;

                var bgname = 'emptyback';
                if(C.extra_bonus_back) {
                    bgname='emptybonusback';
                }

                if(C.extra_bonus_reels) {
                    model.slots_area.static_bg.loadTexture('bonusreels');
                }

                if(!C.anim_bg_full && !C.customBgLoader) {
                    model.bg.image.loadTexture(bgname);
                }

                if(C.customChangeBg) {
                    C.customChangeBg(true);
                }

                if(!C.anim_top && !C.anim_top_left_right) {
//                    model.top_layer.loadTexture('bonus_top');
                }
                if(C.anim_bg_full) {
                    var name = 'images/games/' + C.gamename + '/animations/bg/';

                    if(window.isAGTLocal) {
                        name='https://static.agtsoftware.local/games/agt/'+name;
                    }

                    if(Phaser.Device.iOS) {
                        name+='ios/';
                    }

                    if(isMobile) {
                        name += 'bg_mobile_bonus';
                    }
                    else {
                        name += 'bg_bonus';
                    }

                    if(Phaser.Device.firefox) {
                        name+='.webm';
                    }
                    else {
                        name+='.mp4';
                    }

                    if(typeof PhasernoCache !== 'undefined') {
                        name+='?v='+game.load.noCache;
                    }

                    if(model.video.video.currentSrcShort!=name) {
                        model.video.video.currentSrcShort=name;
                        model.bg.alpha=1;
                        model.video.changeSource(name);
                        model.video.playbackRate=C.videoplaybackRate || 0.5;
                    }
                }

                if(typeof C.specAnimFGToggle=='function' && (!C.emitter || !C.emitter.alive)) {
                    C.specAnimFGToggle();
                }

                model.flags.freegames_started=true;

                if(C.specialScatterAnimation) {
                    C.specialScatterAnimation();
                }

                if (model.auto_spin && !C.no_fg_popup) {
                    eventDispatcher.dispatch(G.STOP_AUTO_SPIN);
                }

                var txt = M.fg_won.replace('{%n}',model.freegames_current);

                model.need_toogle_music=true;

                if(model.freegames_win>0 && model.freegames_all!=model.freegames_current) {
                    txt = M.fg_won_more.replace('{%n}',model.freegames_win);
                    model.autochoose=true;
                    model.need_toogle_music=false;
                }

                //звук проигрывается внутри функции
                if(C.specialScatterAnimation) {}
                else if(!!C.infinity_fg) {
                    model.need_toogle_music=false;
                    if(model.restoredFg || model.flags.can_start_choose) {
                        eventDispatcher.dispatch(G.PLAY_SOUND, {
                            key: 'fgSounds',
                            marker: 'startFreespins',
                            loop: false
                        });

                        model.need_toogle_music=true;
                    }
                }
                else if(!C.bonus_chooser || C.bonus_chooser_automode || C.gamename=='aislot') {
                    eventDispatcher.dispatch(G.PLAY_SOUND, {
                        key: 'fgSounds',
                        marker: 'startFreespins',
                        loop: false
                    });
                }

                model.flags.can_start_auto_spin=false;
                if(!C.no_fg_popup) {
                    model.fgPopup = new PopupMessage(txt,function() {
                        model.slots_area && model.slots_area.removeWinLines();
                        if(C.bonus_chooser) {
                            if(!model.choosed || model.autochoose || model.restoredFg) {
                                if((model.freegames_current>0 && model.freegames_all==model.freegames_current) || model.restoredFg) {
                                    eventDispatcher.dispatch(G.START_CHOOSE);
                                }
                                else {
                                    game.time.events.add(Phaser.Timer.SECOND,function() {
                                        eventDispatcher.dispatch(G.CHOOSE_SELECTED);
                                    });
                                }
                            }
                        }
                        else {
                            eventDispatcher.dispatch(G.CHOOSE_SELECTED);
                        }
                    },Phaser.Timer.SECOND*4);
                    model.mainLayer.add(model.fgPopup);
                }
                else {

                    let timer=Phaser.Timer.SECOND;

                    if(!!C.non_stop_fg) {
                        timer=100;
                    }

                    game.time.events.add(timer,function() {
                        model.slots_area && model.slots_area.removeWinLines();
                        eventDispatcher.dispatch(G.CHOOSE_SELECTED);
                        if(C.reel_fg_anim) {
                            model.startReelBg();
                        }
                        else if(typeof C.own_fg_anim=='function') {
                            C.own_fg_anim('start');
                        }
                    });
                }

                if(model.slots_area) {
                    model.slots_area.createReels('ready');

                    if(C.scatter_animation) {
                        model.slots_area.scatter_animation();
                    }
                }

                if(model.mainLayer.bonus_buy_btn) {
                    model.mainLayer.bonus_buy_btn.visible=false;
                }

                break;
            case G.UPDATE_BET_BUTTON:
                if(!model.checkBalance()) {
                    eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.not_enough_credits);
                }
                break;
            case G.BET_BUTTON_EVENT:

                if(model.jp_win_state) {
                    return;
                }

                if(model.infopage_area.closed==true && (!model.menu || model.menu.closed==true) && !model.start_transform && model.insane_mode==0) {
                    if(!model.auto_spin && model.flags.can_start_spin && !model.flags.can_end_spin) {
                        if(!model.checkBalance()) {
                            eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.not_enough_credits);
                        }
                        else {
                            eventDispatcher.dispatch(G.STOP_ALL_SOUND);
                            eventDispatcher.dispatch(G.START_SPIN, params);
                        }
                    }
                    else if(model.flags.can_end_spin && !model.force_stop && !(C.noSpinning && model.flags.freegames_started)) {
                        model.force_stop=true;
                        eventDispatcher.dispatch(G.FORCE_STOP, params);
                    }
                    else if(model.can_collect && model.win>0) {
                        eventDispatcher.dispatch(G.COLLECT_WIN);
                    }
                    else if(model.collecting) {
                        eventDispatcher.dispatch(G.FORCE_LAST_WIN_END);
                    }
                    else {
                    }
                }

                if(!model.checkBalance()) {
                    eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.spin);
                }
                else if(!model.bonus_mode) {
                    eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.default);
                }

                break;
            case G.END_GAMBLE:
                eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.default);
                model.endGamble();
                break;
            case G.COLLECT_GAMBLE_WIN:

                if(model.current_gamble==0) {
                    model.balance+=model.win;
                }

                model.can_double=false;
                game.time.events.add(100, function() {
                    model.current_gamble=0;
//                    model.balance-=model.win;
                    model.collectWin();
                    eventDispatcher.dispatch(G.END_GAMBLE);
                    eventDispatcher.dispatch(G.BALANCE_UPDATED);
                },this);

                if(model.settings_opened) {
                    eventDispatcher.dispatch(G.OPEN_SETTINGS);
                }
                break;
            case G.WINLINES_STOP:
                if(model.bonusdata && model.bonusdata.win>0) {
                    if(model.show_replace2) {
                        model.show_replace=false;
                    }
                    model.winlines.replace_syms();
                    break;
                }
                break;
            case G.COLLECT_WIN:

                model.collectWin();

//                model.spin_run=false;
                model.can_collect=false;

//                if(model.freegames_win>0) {
//                    eventDispatcher.dispatch(G.START_FREEGAMES);
//                    model.auto_spin=false;
//                }
                /*if (((model.bonusdata && model.bonusdata.win>0 && model.show_replace) || (model.bonusdata && model.bonusdata.win==0 && model.win>0)) && model.freegames_all > 0 && model.freegames_current == 0) {
                    if(model.auto_spin) {
                        eventDispatcher.dispatch(G.STOP_AUTO_SPIN);
                    }
                    eventDispatcher.dispatch(G.END_FREEGAMES);
                }*/

                if(model.win==0) {
                    model.spin_ready=true;
                }

                if(model.win==0 && model.auto_spin) {
                    var ti = Phaser.Timer.SECOND;
                    game.time.events.add(ti,function() {
                        if(!model.isGambleState) {
                            if(!model.checkBalance()) {
                                eventDispatcher.dispatch(G.STOP_AUTO_SPIN);
                                eventDispatcher.dispatch(G.ZERO);
                                eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.not_enough_credits);
                            }
                            else if(model.auto_spin) {
                                eventDispatcher.dispatch(G.START_SPIN,model.amount);
                            }
                        }
                    });
                    break;
                }

                break;
            case G.LAST_WIN_END:

                if(!model.spin_ready) {
                    return;
                }

                typeof C.animationBgToggle=='function' && C.animationBgToggle();

                model.spin_ready=false;

                eventDispatcher.dispatch(G.STOP_ALL_SOUND);

                if(!model.isGambleState && !model.jp_win_state) {
                    model.flags.can_start_spin=true;

                    model.flags.can_start_auto_spin=true;

                    if(model.flags.can_start_freegames) {
                        model.flags.can_start_spin=false;
                        eventDispatcher.dispatch(G.START_FREEGAMES);
                    }

                    if(model.freegames_all>0 && model.freegames_all==model.freegames_current) {
                        model.flags.can_start_auto_spin=false;
                    }

                }

                if(model.freegames_all>0 && model.freegames_current==0) {
                    if(model.auto_spin && !C.no_fg_popup) {
                        eventDispatcher.dispatch(G.STOP_AUTO_SPIN);
                    }
                    if(!model.isGambleState) {
                        eventDispatcher.dispatch(G.END_FREEGAMES);
                    }
                }


                if(model.jpcards  && model.jpcards.length && !model.jp_area) {
                    if(model.auto_spin) {
                        eventDispatcher.dispatch(G.STOP_AUTO_SPIN);
                    }
                    game.time.events.add(500,function() {
                        model.jp_area = new JParea();
                        model.mainLayer.add(model.jp_area);
                        model.mainLayer.moveDown(model.jp_area);
                    });
                }

                if(model.auto_spin) {
                    var ti = Phaser.Timer.SECOND*1.5;
                    if(model.bonusdata && model.bonusdata.win>0) {
                        ti+=2000;
                    }
                    game.time.events.add(ti,function() {
                        if(!model.isGambleState && model.auto_spin) {
                            if(!model.checkBalance()) {
                                if(model.auto_spin) {
                                    eventDispatcher.dispatch(G.STOP_AUTO_SPIN);
                                }
                                eventDispatcher.dispatch(G.ZERO);
                                eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.not_enough_credits);
                            }
                            else {
                                eventDispatcher.dispatch(G.START_SPIN,model.amount);
                            }
                        }

                        model.spin_ready=true;
                    });
                    break;
                }
                else {
                    model.spin_ready=true;
                }

                break;
            case G.START_AUTO_SPIN:

                if(model.gametype=='keno' && !model.keno_area.choosed_nums.length) {
                    return;
                }

                if(model.gametype=='miner' && model.miner_area.max_rows<0) {
                    return;
                }

                if(['lkl','betsafelkl'].indexOf(C.gamename)>=0) {
                    return;
                }

                if(model.infopage_area.closed==true && model.flags.can_start_auto_spin) {


                    eventDispatcher.dispatch(G.COLLECT_WIN);
                    if(model.collecting) {
                        eventDispatcher.dispatch(G.FORCE_LAST_WIN_END);
                    }

                    model.auto_spin=true;
                        if(!model.checkBalance()) {
                            eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.not_enough_credits);
                        }
                        else {
                            if(model.spin_ready) {
                                eventDispatcher.dispatch(G.START_SPIN,params);
                            }
                            eventDispatcher.dispatch(G.PLAY_SOUND, {
                                key: 'commonSounds',
                                marker: 'startAutoSpin',
                                loop: false
                            });

                    }
                }
                break;
            case G.CHANGE_GAME_VER:
                model.forceResize=true;
                game.scale.queueUpdate(true);
                break;
            case G.STOP_AUTO_SPIN:
                model.auto_spin=false;

                if(!model.bonus_mode) {
                    model.flags.can_change_denom=true;
                }

                model.flags.can_start_spin=true;

                eventDispatcher.dispatch(G.PLAY_SOUND, {
                    key: 'commonSounds',
                    marker: 'stopAutoSpin',
                    loop: false
                });

                if(model.collecting) {
                    eventDispatcher.dispatch(G.FORCE_LAST_WIN_END);
                }

                model.flags.can_end_auto_spin=false;

//                eventDispatcher.dispatch(G.PLAY_SOUND, {
//                    key: 'mainSounds',
//                    marker: 'stopAutoplaySound',
//                    loop: false
//                });
                break;
            case G.GAME_WAS_RESET:
                model.flags.can_start_spin=true;
                break;
            case G.RESET_GAME:
                model.flags.can_start_spin=false;
                if(model.auto_spin && !params) {
                    eventDispatcher.dispatch(G.STOP_AUTO_SPIN);
                }
                model.can_double=false;
                model.resetGame();
                break;
            case G.START_SPIN:

                if(model.gametype=='keno' && !model.keno_area.choosed_nums.length) {
                    return;
                }

                if(model.gametype=='miner' && model.miner_area.choosed_btn<0) {
                    return;
                }

                if(model.is_offline) {
                    return;
                }

                if(model.betLinesMenuOpen) {
                    eventDispatcher.dispatch(G.BET_LINES_OPEN);
                }

                if(model.settings_opened) {
                    eventDispatcher.dispatch(G.OPEN_SETTINGS);
                }

                if(model.infopage_area.closed==true) {

                    var check_balance = model.checkBalance();

                    if(!check_balance) {
                        eventDispatcher.dispatch(G.END_SPIN);
                        console.error('check balance');
                        break;
                    }


                    model.can_collect=false;
                    model.flags.can_start_gamble=true;


                    model.startSpin(params);

                    var txtline=M.spin;
                    if(model.bonus_mode) {
                        if(C.infinity_fg && model.freegames_all>0) {
                            txtline=M.total_free_spins_count+': '+(model.freegames_current);
                        }
                        else {
                            txtline=(model.freegames_current-1)+' '+M.free_games_left;
                        }
                        eventDispatcher.dispatch(G.UPDATE_FREEGAMES_PROGRESS,{cur:model.freegames_all-model.freegames_current+1,all:model.freegames_all})
                    }
                    else if(model.isFreespin){
                        eventDispatcher.dispatch(G.UPDATE_FREESPINS_PROGRESS,{all:model.fs_count, cur:model.fs_played});
                    }

                    eventDispatcher.dispatch(G.BALANCE_UPDATED);

                    eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, txtline);

                    if(model.gametype=='slots') {
                        var spin_key='commonSounds';
                        var spin_marker = 'spinSound';
                        if(C.audio.singleSounds && C.audio.singleSounds.spinSound) {
                            eventDispatcher.dispatch(G.PLAY_SOUND, {
                                key: 'singleSounds',
                                marker: 'spinSound',
                                loop: false
                            });
                        }

                        if(C.audio.singleSounds && C.audio.singleSounds.startSpinSound) {
                            spin_key='singleSounds';
                            spin_marker='startSpinSound';
                        }

                        eventDispatcher.dispatch(G.PLAY_SOUND, {
                            key: spin_key,
                            marker: spin_marker,
                            loop: false
                        });
                    }
                    else if(model.gametype=='videopoker') {
                        eventDispatcher.dispatch(G.PLAY_SOUND, {
                            key: 'pokerSounds',
                            marker: 'start',
                            loop: false
                        });
                    }
                    else if(model.gametype=='roshambo') {
                        eventDispatcher.dispatch(G.PLAY_SOUND, {
                            key: 'roshamboSounds',
                            marker: 'startSound',
                            loop: false
                        });
                    }
                    else if(model.gametype=='shuffle') {
                        eventDispatcher.dispatch(G.PLAY_SOUND, {
                            key: 'shuffleSounds',
                            marker: 'startSound',
                            loop: false
                        });
                    }
                }
                break;
            case G.SHOW_WIN:
                if(model.gametype=='slots') {
                    model.slots_area.showWinLines(model.l);
                }
                else if(model.gametype=='videopoker') {
                    model.poker_area.showWinCards(model.wincard);
                }
                else if(model.gametype=='keno') {
                    model.keno_area.showWin();
                }
                else if(model.gametype=='roshambo') {
                    model.roshambo_area.showWin();
                }
                else if(model.gametype=='shuffle') {
                    model.shuffle_area.showWin(model.l);
                }
                else if(model.gametype=='drops') {
                    model.drops_area.showWin(model.l);
                }
                typeof C.animationBgToggle=='function' && C.animationBgToggle();
                model.collectWin();

                break;
            case G.END_SPIN:
                model.last_end_spin_time=Date.now();
                if(!model.bonus_mode) {
                    eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.default);
                }
                if(model.gametype=='slots' && !C.no_reelStop_sound) {
                    var spin_key='commonSounds';
                    if(C.audio.singleSounds && C.audio.singleSounds.spinSound) {
                        spin_key='singleSounds';
                    }
                    eventDispatcher.dispatch(G.STOP_SOUND, {
                        key: spin_key,
                        marker: 'spinSound'
                    });
                }
                else if(model.gametype=='videopoker') {
                    eventDispatcher.dispatch(G.STOP_SOUND, {
                        key: 'pokerSounds',
                        marker: 'start'
                    });
                }

                game.time.events.add(100,function() {
                    model.endSpin(params);
                });

                break;
            case G.SET_B:
                if(model.gametype=='videopoker') {
                    eventDispatcher.dispatch(G.PLAY_SOUND, {
                        key: 'pokerSounds',
                        marker: 'selectbet'
                    });
                }
                if(!model.checkBalance()) {
                    eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.not_enough_credits);
                }
                else {
                    eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.default);
                }
                break;
            case G.NEXT_B:



                if(model.bets[model.bet_index+1]==undefined) {
                    model.bet_index=0;
                }
                else {
                    model.bet_index++;
                }

                if(model.gametype=='videopoker') {
                    eventDispatcher.dispatch(G.PLAY_SOUND, {
                        key: 'pokerSounds',
                        marker: 'selectbet'
                    });
                }

                if(!model.checkBalance()) {
                    eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.not_enough_credits);
                }
                else {
                    eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.default);
                }

                break;
            case G.SET_K:
                model.k = params;

                if(!model.checkBalance()) {
                    eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.not_enough_credits);
                }
                else {
                    eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.default);
                }

                break;
            case G.NEXT_K:

                if(!params) {
                    eventDispatcher.dispatch(G.PLAY_SOUND, {
                        key: 'mainSounds',
                        marker: 'currencySound',
                        loop: false
                    });

                    if(model.k_list[model.k+1]==undefined) {
                        model.k=0;
                    }
                    else {
                        model.k++;
                    }
                }

                if(!model.checkBalance()) {
                    eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.not_enough_credits);
                }
                else {
                    eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.default);
                }

                break;
            case G.INFO_PAGE:
                if(model.menu && model.menu.closed==false) {
                    model.closeMenu();
                }

                if(model.betLinesMenuOpen) {
                    eventDispatcher.dispatch(G.BET_LINES_OPEN);
                    return;
                }

                if(model.settings_opened) {
                    eventDispatcher.dispatch(G.OPEN_SETTINGS);
                }

                if(model.infopage_area.closed==true) {

                    model.info_page_states = {};
                    model.info_page_states.k = model.k;
                    model.info_page_states.bet_index = model.bet_index;
                    model.info_page_states.can_change_denom = model.flags.can_change_denom;

                    model.flags.can_change_denom=true;

                    model.slots_area && model.slots_area.removeWinLines();
                    model.slots_area && model.slots_area.createReels('ready');

                    if(model.common_area) {
                        game.add.tween(model.common_area).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None).start();
                    }

                    model.infopage_area.show();
                    model.infopage_area.showPage();

                    eventDispatcher.dispatch(G.PLAY_SOUND, {
                        key: 'commonSounds',
                        marker: 'openInfoPage',
                        loop: false
                    });
                }
                else {
                    if(model.bonus_mode || model.isFreespin) {
                        model.k=model.info_page_states.k;
                        model.bet_index = model.info_page_states.bet_index;
                    }
                    model.flags.can_change_denom=model.info_page_states.can_change_denom;

                    eventDispatcher.dispatch(G.NEXT_K, true);

                    eventDispatcher.dispatch(G.PLAY_SOUND, {
                        key: 'commonSounds',
                        marker: 'closeInfoPage',
                        loop: false
                    });

                    if(model.common_area) {
                        game.add.tween(model.common_area).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None).start();
                    }

                    model.infopage_area.hide();
                }
                break;
            case G.TOGGLE_SOUND:

                model.soundOn = !model.soundOn;
                LS15.osZhsZczsu = model.soundOn;


                if(model.soundOn) {
                    eventDispatcher.dispatch(G.PLAY_SOUND, {
                        key: 'commonSounds',
                        marker: 'unmuteSound',
                        loop: false
                    });
                }
                else {
                    eventDispatcher.dispatch(G.STOP_ALL_SOUND);
                }
                break;
            case G.CLOSE_GAME:

                if(window.noCloseGame) {
//                    return;
                }

                window.parent.postMessage('closeGame','*');

                if(!!window.everymatrixFlag) {
                    window.parent.postMessage({
                        name: 'closed',
                        sender: 'game'
                    }, '*');
                }

                var closeurl = model.getQueryString('closeurl');
                if(typeof closeurl=='string') {
                    try {
                        if(window.noCloseGame) {
                            window.location = closeurl;
                        }
                        else {
                            window.top.location = closeurl;
                        }
                    }
                    catch(e) {
                        window.location = closeurl;
                    }
                }
                else {
                    try {
                        if(window.self !== window.top) {
                            window.top.location.reload();
                        }
                        else {
                            window.location = window.location.origin;
                        }
                    }
                    catch(e) {
                        window.location = window.location.origin;
                    }

                }

                break;
            case G.GO_SPEC_URL:

                var specurl = model.getQueryString('specurl');

                if(typeof specurl=='string') {
                    window.top.location = specurl;
                }
                else {
//                    window.location = window.location.origin;
                }

                break;
            case G.GO_CASHIER_URL:

                var closeurl = window.URLPayPopup;
                if (typeof closeurl == 'string') {
                    try {
                        if (window.noCloseGame) {
                            window.location = closeurl;
                        } else {
                            window.top.location = closeurl;
                        }
                    } catch (e) {
                        window.location = closeurl;
                    }
                }

                break;
            case G.OPEN_HISTORY:
                model.openHistory();
                break;
            case G.TOGGLE_FULLSCREEN:

                if(isMobile) {
                    model.toggleFullscreen();
                    return;
                }

                if (game.scale.isFullScreen) {
                    game.scale.stopFullScreen();
                }
                else {
                    game.scale.startFullScreen(true);
                }
                break;
            case G.TOGGLE_MUSIC:
                model.musicOn = !model.musicOn;
                break;
            case G.OPEN_SETTINGS:
                model.settings_opened=!model.settings_opened;
                if(model.settings_opened && model.auto_spin==true) {
                    eventDispatcher.dispatch(G.STOP_AUTO_SPIN);
                }
                break;
            case G.OPEN_MENU:
                if((model.menu && model.menu.closed==true)) {
                    model.slots_area && model.slots_area.removeWinLines();
                    model.slots_area && model.slots_area.createReels('ready');
                    model.showMenu();
                }
                else {
                    model.closeMenu();
                }
                break;
            case G.BET_LINES_OPEN:
                model.betLinesMenuOpen=!model.betLinesMenuOpen;
                break;
            case G.START_GAMBLE:

                if(model.flags.can_start_gamble) {

                    if(model.settings_opened) {
                        eventDispatcher.dispatch(G.OPEN_SETTINGS);
                    }

                    model.rateWin=1;

                    model.flags.can_start_freegames=false;

                    eventDispatcher.dispatch(G.COLLECT_WIN);
                    eventDispatcher.dispatch(G.FORCE_LAST_WIN_END);

                    eventDispatcher.dispatch(G.PLAY_SOUND, {
                        key: 'commonSounds',
                        marker: 'openGambleArea',
                        loop: false
                    });

                    if(model.auto_spin) {
                        eventDispatcher.dispatch(G.STOP_AUTO_SPIN);
                    }

                    if(!model.infopage_area.closed) {
                        model.infopage_area.hide();
                    }

                    eventDispatcher.dispatch(G.MESSAGE_LINE_UPDATED, M.gamble);
                    model.slots_area && model.slots_area.removeWinLines();
                    model.startGamble();
                    model.slots_area && model.slots_area.createReels('ready'); //for scaled image default size

                    model.gamble_win=model.win;
                    eventDispatcher.dispatch(G.UPDATE_STATS, 0);


                    if(model.coins_runned) {
                        eventDispatcher.dispatch(G.FORCE_LAST_WIN_END);
                    }
                }
                break;
            case G.END_GAME:
                game.state.start("StateOver");
                break;
            case G.GO_AGT:
                window.open(params,'_blank');
                break;
            case G.OPEN_FS_INFO:
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

                            eventDispatcher.dispatch(G.OPENED_FS_INFO);
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

                            eventDispatcher.dispatch(G.OPENED_FS_INFO);
                        }
                        catch(e) {

                            createIframeFromData(data);
                            return;
                        }
                    }
                });
                break;
            case G.OPEN_LS_INFO:
                model.openLSInfo();
                break;
        }
        if(window.gametype=='slots') {
            this.createTimer();
        }

        if(!isMobile) {
            if(this.ambient && (game.time.fps > 1 && game.time.suggestedFps > game.time.fps)) {
                if (this.ambientTry < 3) {
                    this.ambientTry++;
                    return;
                }
                this.removeAmbient();
            }
            else {
                this.createAmbient();
            }
        }

    }
    runWaitMode() {
        this.wait_mode=true;

        var symbols = [];

        model.slots_area.reels.forEach(function(reel) {
            if(C.bigReelCenter && model.flags.freegames_started) {
                if ([1, 3].indexOf(reel.num) < 0) return;
                if (reel.num == 2) {
                    symbols = symbols.concat([reel.visible_symbols_nums[0]]);
                    return;
                }
            }
            symbols = symbols.concat(reel.visible_symbols_nums);
        });

        var r = Phaser.ArrayUtils.getRandomItem(symbols);

        var all_count = symbols.filter(function(v) {
            return v===r;
        }).length;

        var rnd_count = game.rnd.integerInRange(1,all_count);

        model.slots_area.reels.forEach(function(reel) {
            if(rnd_count<=0) {
                return;
            }

            reel.visible_symbols.forEach(function(ind) {
                var s = reel.symbols[ind];

                if(s.num==r) {
                    game.time.events.add(300*ind,function() {
                        this.parent && this.animate(false,true);
                    },s);
                    rnd_count--;
                }
            });

        });

    }
}