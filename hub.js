/* SUPER AWESOME ARCADE shared SDK. Edit CONFIG (C) only. Loaded by the hub and every game. */
window.HUB=(()=>{
const C={brand:'SUPER AWESOME ARCADE',free:5,store:'https://superawesomearcade.gumroad.com/l/access-token',gc:'superawesomearcade',tag:'#SuperAwesomeArcade',hashes:['5ded5396092c1f9643d40f6aee6fd40cd000dc5fe599543d77f56966031f678e']};
const B={bg:'#0D0E12',pink:'#FF007F',green:'#39FF14',white:'#FFFFFF'};
const PAL={cyan:'#00F3FF',amber:'#FFB000',violet:'#9D4EDD',orange:'#FF6B1A',ice:'#7DF9FF',yellow:'#FFE600'}; // game signature colors (never green)
const base=document.currentScript.src.replace(/hub\.js.*$/,'');
const g=k=>{try{return localStorage.getItem(k)}catch(e){return null}},p=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const today=()=>new Date().toLocaleDateString('en-CA');
const sha=s=>crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)).then(b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join(''));
// shared look: font, colors, arcade UI classes
const st=document.createElement('style');st.textContent=`
@font-face{font-family:'Press Start 2P';src:url(${base}fonts/PressStart2P-Regular.ttf) format('truetype');font-display:swap}
:root{--bg:${B.bg};--pink:${B.pink};--green:${B.green};--white:${B.white};--font:'Press Start 2P','Courier New',monospace}
.hub-ov{position:fixed;inset:0;z-index:99;background:${B.bg}f2;color:#fff;display:flex;align-items:center;justify-content:center;text-align:center;font-family:var(--font);padding:20px;line-height:1.7}
.hub-ov>div{max-width:340px;width:100%}.hub-ov h2{color:var(--pink);font-size:20px;margin:0 0 10px;text-shadow:3px 3px 0 #39FF1455}
.hub-ov p{font-size:9px;color:#b8b8c0;margin:8px 0}.hub-ov input{width:100%;box-sizing:border-box;padding:12px;margin:8px 0;background:#000;color:#fff;border:2px solid #333;font:11px var(--font);text-align:center}
.hub-btn{display:block;width:100%;box-sizing:border-box;padding:12px;background:var(--pink);color:#fff;border:0;font:12px var(--font);cursor:pointer;text-align:center;text-decoration:none;margin-top:6px}
.hub-tok{display:block;padding:12px;border:2px dashed var(--green);color:var(--green);text-decoration:none;font-size:10px;margin-top:12px}
.hub-blink{animation:hubb 1s steps(2) infinite}@keyframes hubb{50%{opacity:0}}`;
document.head.appendChild(st);
if(C.gc){const s=document.createElement('script');s.async=1;s.dataset.goatcounter=`https://${C.gc}.goatcounter.com/count`;s.src='https://gc.zgo.at/count.js';document.head.appendChild(s)}
function track(game,ev,d){const path=`ev/${game}/${ev}`;try{window.goatcounter&&goatcounter.count({path,title:ev+(d!=null?' '+d:''),event:true})}catch(e){}console.debug('[hub]',path,d??'')}
const first=g('hub_first');if(!first)p('hub_first',today());else if(first!==today()&&g('hub_ret')!==today()){p('hub_ret',today());track('hub','return_visit')}
const H={C,B,PAL,track,sha,onUnlock:null,unlocked:()=>g('hub_unlocked')==='1',ini:()=>g('hub_ini')};
H.ready=document.fonts?document.fonts.load('12px "Press Start 2P"').catch(()=>{}):Promise.resolve();
const key=game=>`plays_${game}_${today()}`;
H.credits=game=>H.unlocked()?Infinity:Math.max(0,C.free-(+g(key(game))||0));
H.creditsText=game=>H.unlocked()?'CREDITS: UNLIMITED':'CREDITS: '+H.credits(game);
H.canPlay=game=>{if(H.unlocked())return true;const n=+g(key(game))||0;if(n>=C.free){paywall(game);return false}p(key(game),n+1);return true};
H.best=(game,score)=>{const k='best_'+game,b=+g(k)||0;if(score>b){p(k,score);return{best:score,isNew:true}}return{best:b,isNew:false}};
H.watermark=(x,W,Hh)=>{x.save();x.font='7px "Press Start 2P",monospace';x.textAlign='center';x.fillStyle=B.pink;x.globalAlpha=.55;x.fillText('SUPER AWESOME ARCADE',W/2,Hh-10);x.restore()};
H.share=(game,title,score,btn)=>{
  const url=location.href.split('?')[0]+'?utm_source=share&utm_content='+game,who=H.ini()||'I';
  const t=`🕹️ ${who} scored ${score} on ${title}! Beat me? ${C.free} free credits daily: ${url} ${C.tag}`;
  const done=()=>{const o=btn.textContent;btn.textContent='COPIED!';setTimeout(()=>btn.textContent=o,1500)};
  (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(done,()=>prompt('Copy your challenge:',t));
  track(game,'share_click',score)};
H.initials=cb=>{
  const d=document.createElement('div');d.className='hub-ov';
  d.innerHTML=`<div><h2>NEW BEST!</h2><p>ENTER YOUR INITIALS</p><input id="hub-in" maxlength="3" autocomplete="off" placeholder="AAA"><button class="hub-btn" id="hk">OK</button></div>`;
  document.body.appendChild(d);const i=d.querySelector("#hub-in");i.focus();
  d.querySelector('#hk').onclick=()=>{const v=i.value.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,3).padEnd(3,'-');p('hub_ini',v);d.remove();cb&&cb(v)}};
function paywall(game){
  if(document.getElementById('hub-pw'))return;
  track(game,'paywall_view');
  const d=document.createElement('div');d.id='hub-pw';d.className='hub-ov';
  d.innerHTML=`<div><h2 class="hub-blink">INSERT COIN</h2><p>CREDITS: 0</p>
  <p>${C.free} FREE CREDITS RETURN DAILY. OR GRAB AN ALL-ACCESS TOKEN FOR EVERY GAME.</p>
  <input id="hub-key" placeholder="ACCESS KEY"><button class="hub-btn" id="hub-go">UNLOCK</button>
  <p id="hub-err" style="color:#ff6b6b;min-height:14px"></p>
  <a class="hub-tok" id="hub-buy" href="${C.store}" target="_blank" rel="noopener">GET ALL-ACCESS TOKEN</a></div>`;
  document.body.appendChild(d);
  d.querySelector('#hub-buy').onclick=()=>track(game,'checkout_click');
  d.querySelector('#hub-go').onclick=async()=>{track(game,'unlock_attempt');
    if(C.hashes.includes(await sha(d.querySelector('#hub-key').value.trim()))){p('hub_unlocked','1');track(game,'unlock_success');d.remove();H.onUnlock&&H.onUnlock()}
    else d.querySelector('#hub-err').textContent='INVALID KEY'}}
  const kq=new URLSearchParams(location.search).get('key');
if(kq&&!H.unlocked())sha(kq.trim()).then(h=>{if(C.hashes.includes(h)){p('hub_unlocked','1');track('hub','unlock_success')}});
return H})();
