import './style.css'

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

// Active section highlight via IntersectionObserver
const sections = [
  { id: 'hero',      selector: '.hero' },
  { id: 'about',     selector: '#about' },
  { id: 'education', selector: '#education' },
  { id: 'skills',    selector: '#skills' },
  { id: 'projects',  selector: '#projects' },
]

function setActiveLink(id) {
  navLinks.forEach(link => {
    const href = link.getAttribute('href')
    link.classList.toggle('active', href === '#' + id)
  })
}

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const matchedId = sections.find(s =>
        entry.target.matches(s.selector) || entry.target.id === s.id
      )
      if (matchedId) setActiveLink(matchedId.id)
    }
  })
}, {
  rootMargin: '-30% 0px -60% 0px',
  threshold: 0
})

sections.forEach(s => {
  const el = document.querySelector(s.selector) || document.getElementById(s.id)
  if (el) sectionObserver.observe(el)
})