import './style.css'
import anime from 'animejs'
// ── LOADER ──────────────────────────────────────
 

// Spawn particles
const particlesEl = document.getElementById('particles')
const PARTICLE_COUNT = 14
const pEls = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const p = document.createElement('div')
  p.className = 'particle'
  const rad = (i / PARTICLE_COUNT) * Math.PI * 2
  const r = 70 + Math.random() * 20
  p.style.left = (130 + Math.cos(rad) * r) + 'px'
  p.style.top  = (130 + Math.sin(rad) * r) + 'px'
  particlesEl.appendChild(p)
  return p
})

const progressPct  = document.getElementById('progressPct')
const progressFill = document.getElementById('progressFill')
const logoImg      = document.getElementById('logoImg')

// Progress counter animation
anime({ targets: progressFill, width: ['0%','100%'], duration: 2800, easing: 'easeInOutQuart',
  update: a => { progressPct.textContent = Math.round(a.progress) + '%' }
})

const tl = anime.timeline({ easing: 'easeOutExpo' })

tl
.add({ targets: '.progress-pct', opacity: [0,1], duration: 400 }, 0)
.add({ targets: '#ringOuter', opacity:[0,1], scale:[0.3,1], rotate:[0,360], duration:900, easing:'easeOutBack(1.4)' }, 100)
.add({ targets: '#ringScan', opacity:[0,0.9], rotate:[0,540], duration:1100, easing:'easeOutCubic' }, 400)
.add({ targets: '#logoImg', opacity:[0,1], scale:[0.1,1.12,1], duration:700, easing:'easeOutBack(2)',
  update: a => {
    const p = a.progress / 100
    logoImg.style.filter = `drop-shadow(0 0 ${Math.round(p*28)}px rgba(245,158,11,${0.4+p*0.5})) brightness(${1+p*0.15})`
  }
}, 650)
.add({ targets: '.halo', opacity:[0,0.8,0], scale:[0.8,1.5], duration:900, easing:'easeOutCubic' }, 900)
.add({ targets: '.halo-2', opacity:[0,0.5,0], scale:[0.6,1.8], duration:1200, easing:'easeOutCubic' }, 1000)
.add({ targets: pEls, opacity:[0,1,0], scale:[0,1.6,0], delay:anime.stagger(40), duration:700, easing:'easeOutCubic' }, 950)
.add({ targets: '#nameText .char', opacity:[0,1], translateY:[40,0], rotateX:[-90,0], delay:anime.stagger(60), duration:500, easing:'easeOutBack(1.6)' }, 1100)
.add({ targets: '#lineBar', opacity:[0,1], width:[0,180], duration:500, easing:'easeOutExpo' }, 1500)
.add({ targets: '#taglineText', opacity:[0,0.7], scaleX:[0.4,1], duration:600, easing:'easeOutBack(1.3)' }, 1700)
.add({ targets: '#nameText', backgroundPosition:['0% center','260% center'], duration:1000, easing:'easeInOutQuad' }, 2000)
.add({ targets: '#ringOuter', rotate:[0,720], opacity:[1,0], scale:[1,1.4], duration:600, easing:'easeInCubic' }, 2900)
.add({ targets: '#ringScan', opacity:[0.9,0], scale:[1,0.4], duration:400, easing:'easeInQuad' }, 2950)
.add({ targets: '#nameText .char', opacity:[1,0], translateY:[0,-30], delay:anime.stagger(30,{direction:'reverse'}), duration:350, easing:'easeInQuad' }, 2900)
.add({ targets: ['#taglineText','#lineBar'], opacity:[null,0], translateY:[0,-20], duration:300, easing:'easeInQuad' }, 2920)
.add({ targets: '#logoImg', scale:[1,0], opacity:[1,0], duration:500, easing:'easeInBack(3)',
  update: a => {
    const p = 1 - a.progress/100
    logoImg.style.filter = `drop-shadow(0 0 ${Math.round(p*30)}px rgba(245,158,11,${p*0.9})) brightness(${1+p*0.1})`
  }
}, 3000)
.add({ targets: '.progress-wrap', opacity:[1,0], translateY:[0,12], duration:300, easing:'easeInQuad' }, 2900)
.add({ targets: '#flash', opacity:[0,0.18,0], duration:500, easing:'easeInOutQuad' }, 3200)
.add({ targets: '#bt-loader', opacity:[1,0], scale:[1,0.96], duration:500, easing:'easeInQuad',
  complete: () => {
    document.getElementById('bt-loader').style.display = 'none'
    document.getElementById('bt-loader').style.pointerEvents = 'none'
  }
}, 3300)

// Continuous ring spin
anime({ targets: '#ringOuter', rotate:360, duration:2400, loop:true, easing:'linear', delay:1000 })

// Continuous logo pulse
setTimeout(() => {
  anime({ targets: '#logoImg', scale:[1,1.05,1], duration:1600, loop:true, easing:'easeInOutSine',
    update: a => {
      const pulse = Math.sin(a.progress / 100 * Math.PI)
      const glow = 18 + Math.round(pulse * 14)
      logoImg.style.filter = `drop-shadow(0 0 ${glow}px rgba(245,158,11,${0.55+pulse*0.35})) brightness(${1.08+pulse*0.08})`
    }
  })
}, 1600)

// ── END LOADER ───────────────────────────────────

// ── Scroll progress bar ────────────────────────────────────────
const bar = document.getElementById('progress-bar')
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
  bar.style.width = pct + '%'
})

// ── Custom Cursor (desktop only) ──────────────────────────────
const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches

if (!isTouchDevice) {
  const cursor = document.getElementById('cursor')
  const ring   = document.getElementById('cursorRing')
  let mx = 0, my = 0, rx = 0, ry = 0

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY })

  ;(function animCursor() {
    cursor.style.left = mx + 'px'
    cursor.style.top  = my + 'px'
    rx += (mx - rx) * 0.12
    ry += (my - ry) * 0.12
    ring.style.left = rx + 'px'
    ring.style.top  = ry + 'px'
    requestAnimationFrame(animCursor)
  })()

  document.querySelectorAll('a, button, .skill-pill, .project-card, .edu-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px'; cursor.style.height = '20px'
      cursor.style.background = 'var(--c4)'
      ring.style.width = '54px'; ring.style.height = '54px'
    })
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px'; cursor.style.height = '12px'
      cursor.style.background = 'var(--c1)'
      ring.style.width = '36px'; ring.style.height = '36px'
    })
  })
}

// ── Star canvas ────────────────────────────────────────────────
const canvas = document.getElementById('stars')
const ctx    = canvas.getContext('2d')
let stars    = []

function resizeCanvas() {
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
}
resizeCanvas()
window.addEventListener('resize', () => { resizeCanvas(); initStars() })

function initStars() {
  stars = []
  const count = Math.floor((canvas.width * canvas.height) / 8000)
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.7 + 0.1,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2
    })
  }
}
initStars()

function drawStars(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (const s of stars) {
    const a = s.alpha * (0.5 + 0.5 * Math.sin(t * s.speed * 1000 + s.phase))
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(200, 220, 255, ${a})`
    ctx.fill()
  }
  requestAnimationFrame(drawStars)
}
requestAnimationFrame(drawStars)

// ── Typing animation ───────────────────────────────────────────
const phrases = [
  'Computer Engineering Student',
  'Qt & C++ Developer',
  'Web Developer',
  'Builder of Real-World Apps',
  'Networking Enthusiast',
  'Open Source Explorer'
]
const typedEl = document.getElementById('typed')
let pi = 0, ci = 0, deleting = false, pauseTimer = null

function type() {
  const phrase = phrases[pi]
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++ci)
    if (ci === phrase.length) {
      deleting = true
      pauseTimer = setTimeout(type, 1800)
      return
    }
  } else {
    typedEl.textContent = phrase.slice(0, --ci)
    if (ci === 0) {
      deleting = false
      pi = (pi + 1) % phrases.length
    }
  }
  setTimeout(type, deleting ? 45 : 85)
}
setTimeout(type, 1200)

// ── Scroll reveal ──────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible')
      observer.unobserve(e.target)
    }
  })
}, { threshold: 0.12 })
document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

// ── Counter animation ──────────────────────────────────────────
function animateCounter(el, target, duration = 1200) {
  const span = el.querySelector('span')
  const start = performance.now()
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    span.textContent = Math.floor(ease * target)
    if (progress < 1) requestAnimationFrame(tick)
    else span.textContent = target
  }
  requestAnimationFrame(tick)
}

const statNums = document.querySelectorAll('.stat-num[data-target]')
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.dataset.target)
      animateCounter(e.target, target)
      statsObs.unobserve(e.target)
    }
  })
}, { threshold: 0.5 })
statNums.forEach(el => statsObs.observe(el))

// ── Stagger skill pills ────────────────────────────────────────
document.querySelectorAll('.skill-pill').forEach((el, i) => {
  el.style.opacity = '0'
  el.style.animation = `fadeUp 0.5s ${i * 0.07}s ease forwards`
})

// ── Photo slideshow ────────────────────────────────────────────
const slides = document.querySelectorAll('.slide')
let current = 0
setInterval(() => {
  slides[current].classList.remove('active')
  current = (current + 1) % slides.length
  slides[current].classList.add('active')
}, 2000)


// ── Navbar: scroll shadow + active section highlight ──────────
const navbar     = document.getElementById('navbar')
const hamburger  = document.getElementById('navHamburger')
const mobileMenu = document.getElementById('navMobileMenu')
const navLinks   = document.querySelectorAll('.nav-link, .nav-mobile-link')

// Add "scrolled" shadow when page is scrolled
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30)
}, { passive: true })

// Hamburger toggle
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open')
  hamburger.classList.toggle('open', isOpen)
  hamburger.setAttribute('aria-expanded', isOpen)
})

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('.nav-mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open')
    hamburger.classList.remove('open')
    hamburger.setAttribute('aria-expanded', false)
  })
})

// Close mobile menu on outside click
document.addEventListener('click', e => {
  if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open')
    hamburger.classList.remove('open')
    hamburger.setAttribute('aria-expanded', false)
  }
})

// Active section highlight via scroll position
const sections = [
  { id: 'home',      selector: '#home' },
  { id: 'about',     selector: '#about' },
  { id: 'education', selector: '#education' },
  { id: 'skills',    selector: '#skills' },
  { id: 'projects',  selector: '#projects' },
]

const sectionEls = sections.map(s =>
  document.querySelector(s.selector) || document.getElementById(s.id)
).filter(Boolean)

function setActiveLink(id) {
  navLinks.forEach(link => {
    const href = link.getAttribute('href')
    link.classList.toggle('active', href === '#' + id)
  })
}

function updateActiveLink() {
  const scrollY = window.scrollY
  const windowH = window.innerHeight

  // At bottom of page, always activate last section
  if (window.innerHeight + scrollY >= document.body.scrollHeight - 10) {
    setActiveLink(sections[sections.length - 1].id)
    return
  }

  let current = sections[0].id
  sectionEls.forEach((el, i) => {
    const nextEl = sectionEls[i + 1]
    const sectionTop = el.offsetTop - 100
    const sectionBottom = nextEl
      ? nextEl.offsetTop - 100
      : el.offsetTop + el.offsetHeight

    const middle = sectionTop + (sectionBottom - sectionTop) * 0.5

    if (scrollY >= middle || scrollY >= sectionTop) {
      current = sections[i].id
    }
  })

  setActiveLink(current)
}

window.addEventListener('scroll', updateActiveLink, { passive: true })
updateActiveLink()

// ── Project cards 3D scene tilt on mouse
const proj3d = document.getElementById('projects3d')
if (proj3d) {
  document.getElementById('projects').addEventListener('mousemove', e => {
    const rect = document.getElementById('projects').getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const rx = -(e.clientY - cy) / rect.height * 10
    const ry =  (e.clientX - cx) / rect.width  * 10
    proj3d.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`
  })
  document.getElementById('projects').addEventListener('mouseleave', () => {
    proj3d.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
    proj3d.style.transition = 'transform 0.6s ease'
  })
}