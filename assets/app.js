gsap.registerPlugin(ScrollTrigger);

/* ---------- NAV: scroll state ---------- */
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const p = h > 0 ? (window.scrollY / h) * 100 : 0;
  document.getElementById('topProgress').style.width = p + '%';
});

/* ---------- NAV: dropdowns (hover desktop / click fallback) ---------- */
document.querySelectorAll('.nav-links li.dd').forEach(li=>{
  let closeTimer;
  li.addEventListener('mouseenter', ()=>{
    clearTimeout(closeTimer);
    li.classList.add('open');
  });
  li.addEventListener('mouseleave', ()=>{
    closeTimer = setTimeout(()=> li.classList.remove('open'), 260);
  });
  const btn = li.querySelector('button.link');
  btn.addEventListener('click', ()=>{
    clearTimeout(closeTimer);
    document.querySelectorAll('.nav-links li.dd.open').forEach(other=>{ if(other!==li) other.classList.remove('open'); });
    li.classList.toggle('open');
  });
});
/* close any open dropdown on outside click or Escape */
document.addEventListener('click', (e)=>{
  if(!e.target.closest('.nav-links li.dd')){
    document.querySelectorAll('.nav-links li.dd.open').forEach(li=> li.classList.remove('open'));
  }
});
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    document.querySelectorAll('.nav-links li.dd.open').forEach(li=> li.classList.remove('open'));
  }
});

/* ---------- MOBILE MENU ---------- */
const mobilePanel = document.getElementById('mobilePanel');
document.getElementById('burgerBtn').addEventListener('click', ()=> mobilePanel.classList.add('open'));
document.getElementById('mobileClose').addEventListener('click', ()=> mobilePanel.classList.remove('open'));
mobilePanel.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('click', ()=>{ if(!el.dataset.open) mobilePanel.classList.remove('open'); });
});

/* ---------- MODALS ---------- */
function openModal(id){
  const m = document.getElementById(id);
  if(!m) return;
  m.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(m){
  m.classList.remove('open');
  document.body.style.overflow='';
}
document.querySelectorAll('[data-open]').forEach(el=>{
  el.addEventListener('click', (e)=>{
    e.preventDefault();
    mobilePanel.classList.remove('open');
    openModal(el.dataset.open);
  });
});
document.querySelectorAll('.modal-overlay').forEach(overlay=>{
  overlay.addEventListener('click', (e)=>{ if(e.target === overlay) closeModal(overlay); });
  overlay.querySelectorAll('[data-close]').forEach(btn=> btn.addEventListener('click', ()=> closeModal(overlay)));
});


/* ---------- JOIN MODAL FLOW ---------- */
const joinRoleTitle = document.getElementById('joinRoleTitle');
const joinRoleTag = document.getElementById('joinRoleTag');
function showStep(prefix, n){
  document.querySelectorAll('#'+ (prefix==='join'?'joinModal':'loginModal') +' .mini-step').forEach(s=>s.classList.remove('active'));
  document.getElementById(prefix+'Step'+n).classList.add('active');
}
document.querySelectorAll('#joinStep1 .role-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    const role = card.dataset.role;
    joinRoleTitle.textContent = 'Quero ser ' + role;
    joinRoleTag.textContent = (role.includes('Tech') ? '🧑‍🏫 ' : '👨‍💻 ') + role;
    showStep('join', 2);
  });
});
document.getElementById('joinSubmit').addEventListener('click', ()=> showStep('join', 3));
document.querySelectorAll('[data-back]').forEach(b=>{
  b.addEventListener('click', ()=>{
    const targetId = b.dataset.back;
    const prefix = targetId.startsWith('join') ? 'join' : 'login';
    const n = targetId.replace(prefix+'Step','');
    showStep(prefix, n);
  });
});

/* ---------- LOGIN MODAL FLOW ---------- */
const loginRoleTitle = document.getElementById('loginRoleTitle');
document.querySelectorAll('#loginStep1 .role-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    loginRoleTitle.textContent = card.dataset.login;
    showStep('login', 2);
  });
});

/* reset modal state on close */
document.querySelectorAll('.modal-overlay').forEach(overlay=>{
  overlay.addEventListener('transitionend', ()=>{
    if(!overlay.classList.contains('open')){
      if(overlay.id==='joinModal') showStep('join',1);
      if(overlay.id==='loginModal') showStep('login',1);
    }
  });
});

/* ---------- COMO FUNCIONA TABS ---------- */
function activateTab(tab){
  const panel = document.getElementById('tab-'+tab);
  if(!panel) return;
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active', b.dataset.tabBtn===tab));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  panel.classList.add('active');
  gsap.fromTo(panel, {opacity:0, y:10}, {opacity:1, y:0, duration:.4, ease:'power2.out'});
}
document.querySelectorAll('[data-tab-btn]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    activateTab(btn.dataset.tabBtn);
    history.replaceState(null, '', '#'+btn.dataset.tabBtn);
  });
});
/* activate tab based on URL hash on load (links from other pages: como-funciona.html#leaders) */
if(document.querySelector('.tab-panel')){
  const initialTab = (location.hash || '').replace('#','');
  activateTab(initialTab === 'leaders' ? 'leaders' : 'devs');
  window.addEventListener('hashchange', ()=>{
    const t = (location.hash || '').replace('#','');
    activateTab(t === 'leaders' ? 'leaders' : 'devs');
  });
}

/* ---------- FAQ ACCORDION ---------- */
document.querySelectorAll('.faq-item').forEach(item=>{
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', ()=>{
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o=>{
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
    });
    if(!isOpen){
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

/* ---------- CONTACT FORM ---------- */
function setAudience(value){
  const btn = document.querySelector('.audience-btn[data-audience="'+value+'"]');
  if(!btn) return;
  document.querySelectorAll('.audience-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}
document.querySelectorAll('.audience-btn').forEach(btn=>{
  btn.addEventListener('click', ()=> setAudience(btn.dataset.audience));
});
/* quick option cards at the top of the Contato page */
document.querySelectorAll('[data-quick-audience]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    setAudience(btn.dataset.quickAudience);
    const nameField = document.querySelector('#contactForm input[type="text"]');
    if(nameField) nameField.focus({preventScroll:false});
    document.getElementById('contactForm')?.scrollIntoView({behavior:'smooth', block:'center'});
  });
});
/* preselect audience via ?audience=Empresa coming from Parcerias page links */
const urlAudience = new URLSearchParams(location.search).get('audience');
if(urlAudience) setAudience(urlAudience);

const contactFormEl = document.getElementById('contactForm');
if(contactFormEl){
  contactFormEl.addEventListener('submit', (e)=>{
    e.preventDefault();
    contactFormEl.style.display='none';
    document.getElementById('contactSuccess').classList.add('show');
  });
}

/* ---------- MAIN ANIMATIONS (kicked off after the loading intro) ---------- */
function initAnimations(){

  /* ---------- COUNT UP STATS ---------- */
  document.querySelectorAll('.count').forEach(el=>{
    const target = parseInt(el.dataset.count, 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: ()=>{
        let obj = {v:0};
        gsap.to(obj, {v:target, duration:1.4, ease:'power2.out', onUpdate:()=>{ el.textContent = Math.round(obj.v); }});
      }
    });
  });

  /* ---------- XP BAR ---------- */
  ScrollTrigger.create({
    trigger:'#xpFill', start:'top 85%', once:true,
    onEnter:()=> gsap.to('#xpFill', {width:'62%', duration:1.6, ease:'power3.out'})
  });

  /* ---------- REVEAL ON SCROLL ---------- */
  gsap.utils.toArray('.reveal').forEach(el=>{
    gsap.to(el, {
      opacity:1, y:0, duration:.8, ease:'power2.out',
      scrollTrigger:{ trigger:el, start:'top 88%', once:true }
    });
  });

  /* ---------- HERO ENTRANCE ---------- */
  gsap.timeline({defaults:{ease:'power3.out'}})
    .to('.hero .eyebrow', {opacity:1, y:0, duration:.7}, .1)
    .to('.hero h1', {opacity:1, y:0, duration:.9}, .2)
    .to('.hero p.lead', {opacity:1, y:0, duration:.8}, .35)
    .to('.hero-ctas', {opacity:1, y:0, duration:.8}, .5)
    .to('.stat-hud', {opacity:1, y:0, duration:.8}, .65);

  /* ---------- STRUCTURE FLOW DRAW-IN ---------- */
  gsap.from('.structure-node', {
    opacity:0, y:16, duration:.6, stagger:.12, ease:'power2.out',
    scrollTrigger:{ trigger:'.structure-flow', start:'top 85%', once:true }
  });

  /* ---------- CYCLE FLOW DRAW-IN ---------- */
  gsap.from('.cycle-step', {
    opacity:0, x:20, duration:.5, stagger:.08, ease:'power2.out',
    scrollTrigger:{ trigger:'.cycle-flow', start:'top 85%', once:true }
  });

  /* ---------- JOURNEY RAIL: build nodes from sections ---------- */
  const railTrack = document.getElementById('railTrack');
  const railFill = document.getElementById('railFill');
  const railSections = Array.from(document.querySelectorAll('main [data-rail], .hero[data-rail]'))
    .filter(el=>el.dataset.rail);

  const railNodes = [];
  railSections.forEach((sec, i)=>{
    const node = document.createElement('div');
    node.className = 'rail-node';
    node.style.top = (railSections.length>1 ? (i/(railSections.length-1))*100 : 0) + '%';
    const label = document.createElement('div');
    label.className = 'rail-label';
    label.textContent = 'N.' + String(i+1).padStart(2,'0') + ' ' + sec.dataset.rail.toUpperCase();
    node.appendChild(label);
    node.addEventListener('click', ()=> sec.scrollIntoView({behavior:'smooth'}));
    railTrack.appendChild(node);
    railNodes.push({node, sec});
  });

  railSections.forEach((sec, i)=>{
    ScrollTrigger.create({
      trigger: sec,
      start:'top 55%',
      end:'bottom 55%',
      onEnter:()=> setActiveRail(i),
      onEnterBack:()=> setActiveRail(i),
    });
  });
  function setActiveRail(i){
    railNodes.forEach((r,idx)=> r.node.classList.toggle('active', idx===i));
    const pct = railNodes.length>1 ? (i/(railNodes.length-1))*100 : 0;
    gsap.to(railFill, {height: pct+'%', duration:.5, ease:'power2.out'});
  }

  ScrollTrigger.refresh();
}

/* ============================================================
   LOADING INTRO — "ARENA DEV" preloader
   ============================================================ */
(function(){
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  const pct = document.getElementById('preloaderPct');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.body.classList.add('loading-lock');

  if(!preloader || reduceMotion){
    if(preloader) preloader.style.display = 'none';
    document.body.classList.remove('loading-lock');
    initAnimations();
    return;
  }

  const counter = {v:0};
  const introTl = gsap.timeline({
    onComplete:()=>{
      document.body.classList.remove('loading-lock');
      preloader.style.display = 'none';
      initAnimations();
    }
  });

  introTl
    .to('.pl-letter', {opacity:1, y:0, duration:.65, stagger:.045, ease:'back.out(1.8)'}, .15)
    .to('.preloader-sub', {opacity:1, duration:.4, ease:'power1.out'}, '-=0.25')
    .to('.preloader-bar-wrap', {opacity:1, duration:.4, ease:'power1.out'}, '-=0.25')
    .to(counter, {
      v:100, duration:1.5, ease:'power1.inOut',
      onUpdate:()=>{
        const v = Math.round(counter.v);
        fill.style.width = v + '%';
        pct.textContent = String(v).padStart(2,'0') + '%';
      }
    }, '+=0.05')
    .call(()=>{ const s = document.querySelector('.preloader-status'); if(s) s.textContent = 'PRONTO'; })
    .to('.preloader-content', {opacity:0, y:-18, duration:.45, ease:'power2.in'}, '+=0.15')
    .to(preloader, {
      yPercent:-100, duration:.85, ease:'power3.inOut'
    }, '-=0.05')
    .fromTo('.hero', {opacity:.4}, {opacity:1, duration:.6, ease:'power1.out'}, '-=0.6');
})();
