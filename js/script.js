(function(){
  // Contatos da clínica (bio do Instagram). Para trocar, mude só aqui.
  var WHATSAPP='5511978747790';
  var INSTAGRAM='https://www.instagram.com/odontobemclinica/';
  var MSG='Olá! Vim pelo site da Odonto Bem e quero agendar minha avaliação gratuita.';

  var doc=document.documentElement;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  doc.classList.add('js');

  // links de WhatsApp e Instagram; data-msg troca a mensagem do WhatsApp
  document.querySelectorAll('[data-wa]').forEach(function(a){
    a.href='https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(a.dataset.msg?'Olá, Odonto Bem! '+a.dataset.msg:MSG);
  });
  document.querySelectorAll('[data-ig]').forEach(function(a){a.href=INSTAGRAM});

  // topo
  var top=document.getElementById('top');
  function onScroll(){top.classList.toggle('scrolled',window.scrollY>30)}
  addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  // menu do celular
  var burger=document.getElementById('burger'), nav=document.getElementById('nav');
  function setMenu(open){
    nav.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',open);
    burger.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
    document.body.style.overflow=open?'hidden':'';
  }
  burger.addEventListener('click',function(){setMenu(!nav.classList.contains('open'))});
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
  addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});

  // elementos aparecem ao rolar, em sequência dentro do mesmo grupo
  var els=document.querySelectorAll('.reveal');
  els.forEach(function(e){
    var sib=[].filter.call(e.parentElement.children,function(c){return c.classList.contains('reveal')});
    e.style.setProperty('--d',(sib.indexOf(e)*0.08)+'s');
  });
  if(reduce||!('IntersectionObserver' in window)){
    els.forEach(function(e){e.classList.add('in')});
  }else{
    var io=new IntersectionObserver(function(en){
      en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}});
    },{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(e){io.observe(e)});
  }

  // destaca no menu a seção visível
  var links={};
  nav.querySelectorAll('a[href^="#"]').forEach(function(a){links[a.getAttribute('href').slice(1)]=a});
  if('IntersectionObserver' in window){
    var so=new IntersectionObserver(function(en){
      en.forEach(function(x){var a=links[x.target.id]; if(a) a.classList.toggle('active',x.isIntersecting)});
    },{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(links).forEach(function(id){var s=document.getElementById(id); if(s) so.observe(s)});
  }

  // cards: inclinação 3D e brilho seguindo o mouse
  if(!reduce&&matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.querySelectorAll('.tilt').forEach(function(c){
      c.addEventListener('mousemove',function(e){
        var r=c.getBoundingClientRect(), x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
        c.style.transform='perspective(800px) rotateX('+((0.5-y)*7)+'deg) rotateY('+((x-0.5)*9)+'deg) translateY(-6px)';
        c.style.setProperty('--mx',x*100+'%'); c.style.setProperty('--my',y*100+'%');
      });
      c.addEventListener('mouseleave',function(){c.style.transform=''});
    });
  }

  // FAQ: uma resposta aberta por vez
  var ds=document.querySelectorAll('.faq details');
  ds.forEach(function(d){d.addEventListener('toggle',function(){
    if(d.open) ds.forEach(function(o){if(o!==d) o.open=false});
  })});
})();
