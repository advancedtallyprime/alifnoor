// ==========================================================
// Alif Noor Dresses — shared site behaviour
// ==========================================================
const WA_NUMBER = "917715064245";
const IG_HANDLE = "ayatsk9144";
const IG_LINK = `https://instagram.com/${IG_HANDLE}`;

function waLink(message){
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
function waLinkForProduct(name, id){
  return waLink(`Assalamualaikum! I'm interested in the "${name}" (${id}) from Alif Noor Dresses. Could you share sizing, price and delivery details?`);
}
const GENERAL_WA_MESSAGE = "Assalamualaikum! I'd like to know more about Alif Noor Dresses.";

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Wire up any generic WhatsApp / Instagram placeholders ----------
  document.querySelectorAll('[data-wa]').forEach(el => {
    const custom = el.getAttribute('data-wa');
    el.href = custom && custom !== 'general' ? waLink(custom) : waLink(GENERAL_WA_MESSAGE);
  });
  document.querySelectorAll('[data-ig]').forEach(el => { el.href = IG_LINK; });

  // ---------- Topbar scroll state ----------
  const topbar = document.getElementById('topbar');
  if(topbar){
    const onScroll = () => topbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
  }

  // ---------- Floating WhatsApp button: hide over the hero, show after it ----------
  const floatWa = document.querySelector('.float-wa');
  const hero = document.querySelector('.hero');
  if(floatWa && hero){
    floatWa.classList.add('hero-gated');
    const heroIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        floatWa.classList.toggle('show', !entry.isIntersecting);
      });
    }, { threshold:0.15 });
    heroIo.observe(hero);
  }

  // ---------- Mobile menu ----------
  const openBtn = document.getElementById('navOpen');
  const closeBtn = document.getElementById('navClose');
  const menu = document.getElementById('mobileMenu');
  if(openBtn && menu){
    openBtn.addEventListener('click', () => { menu.classList.add('open'); document.body.style.overflow='hidden'; });
  }
  if(closeBtn && menu){
    closeBtn.addEventListener('click', () => { menu.classList.remove('open'); document.body.style.overflow=''; });
  }
  if(menu){
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open'); document.body.style.overflow='';
    }));
  }

  // ---------- Active nav link ----------
  const page = document.body.getAttribute('data-page');
  if(page){
    document.querySelectorAll(`.nav-links a[data-nav="${page}"], .mobile-menu a[data-nav="${page}"]`)
      .forEach(a => a.classList.add('active'));
  }

  // ---------- Scroll reveal ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.15, rootMargin:'0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---------- Footer year ----------
  document.querySelectorAll('.footer-year').forEach(el => { el.textContent = new Date().getFullYear(); });
});
