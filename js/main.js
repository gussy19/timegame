'use strict';

{
    // クリアフラグを定義。クリアしたら1
    let clearFlag = 0;

    /* 変数定義 */
    const count = document.getElementById('count');
    const stop = document.getElementById('stopBtn');
    const reset = document.getElementById('rtnBtn');
    const rsltMsg = document.getElementById('rsltMsg');
    const secBtn = document.getElementsByClassName('secBtn');

    let startTime;
    let timeoutId;
    let elapsedTime = 0;
    let minutes;
    let sec;
    let msec;
    let countSec;
    let zeroFlg;

    for (let i = 0; i < secBtn.length; i++) {
        secBtn[i].addEventListener("click", () => {
            if (secBtn[i].getAttribute('id') == '20') {
                countSec = 20000;
            } else {
                "エラー"
            }

            document.getElementById('page1').classList.add("displayNone");
            document.getElementById('page2').classList.remove("displayNone");

            startTime = Date.now();
            startCountDown();
        }, false);
    }

    // スタート用カウントダウン関数
    function startCountDown() {
        zeroFlg = true;
        const d = new Date(startTime - Date.now() + 5999); // 5秒カウント後スタート
        const s = String(d.getSeconds()).padStart(1, '0'); // 1桁表示（小数点以下なし）
        count.textContent = `${s}`;

        timeoutId = setTimeout(() => {
            if (count.textContent == '0') { // カウントが0になったら計測開始可能へ
                stop.classList.remove('inactive');
                count.classList.remove('count');
                count.classList.add('counter');
                startTime = Date.now();
                countDown();
            } else {
                startCountDown();
            }
        }, 1000); //1秒感覚でテキスト数値を更新
    }

    // カウントダウン用関数
    function countDown() {
        if (zeroFlg == true) {
            const d = new Date(startTime - Date.now() + countSec);
            const s = String(d.getSeconds()).padStart(2, '0'); // 秒計測用 2桁
            const ms = String(d.getMilliseconds()).padStart(3, '0'); //小数点以下 3桁
            count.textContent = `${s}.${ms}`;

            sec = `${s}`;
            msec = `${ms}`;

        // 時間を隠す
            if (Date.now() - startTime >= 5000) {
                document.getElementById('count').classList.add("displayNone");
                document.getElementById('question').classList.remove("displayNone"); // 5秒後に??.???表示
            }

            if (sec == '00' && parseInt(msec) <= parseInt('010')) {
                startTime = Date.now();
                zeroFlg = false;
            }
        } else {
        // カウントアップさせる(オーバータイムをマイナスで表示)
            const d = new Date(Date.now() - startTime);
            const m = String(d.getMinutes()).padStart(2, '0');
            const s = String(d.getSeconds()).padStart(2, '0');
            const ms = String(d.getMilliseconds()).padStart(3, '0');
            count.textContent = `-${s}.${ms}`;

            minutes = `${m}`;
            sec = `${s}`;
            msec = `${ms}`;
        }

        timeoutId = setTimeout(() => {
        countDown();
        }, 10);
    }

    // ストップ時処理
    stop.addEventListener('click', () => {
        if (stop.classList.contains('inactive') === true) {
            return;
        }
        // setButtonStateStopped();
        clearTimeout(timeoutId);
        // elapsedTime += Date.now() - startTime;

        document.getElementById('rsltSec').textContent = count.textContent;
        document.getElementById('question').classList.add("displayNone");

        // ストップした時の残り時間が0±1であるかどうかの判定
        if (sec == '00' && msec == '000') {
            rsltMsg.textContent = 'Clear!!!!! あなたは答えをしっている！';
            clearFlag = 1;
        } else if (sec == '00' || sec == '01' && msec == '000') {
            rsltMsg.textContent = 'Clear!!    ピッタリまでもう一歩！';
            clearFlag = 1;
        } else {
            rsltMsg.textContent = 'Game Over...  Always Ask "Why me？"';
        }

        // pege切り替え（結果ページへ）
        document.getElementById('page2').classList.add("displayNone");
        document.getElementById('page3').classList.remove("displayNone");
        document.getElementById('count').classList.remove("displayNone");
    });

    // リセット時処理
    reset.addEventListener('click', () => {
    // pege切り替え
        document.getElementById('page3').classList.add("displayNone");
        document.getElementById('page1').classList.remove("displayNone");
        document.getElementById('count').classList.remove("displayNone");

        stop.classList.add('inactive');
    });
}