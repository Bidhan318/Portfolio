import './style.css'

// ── Custom Cursor (desktop only) ──────────────────────────────
const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches

if (!isTouchDevice) {
  const cursor = document.getElementById('cursor')
  const ring   = document.getElementById('cursorRing')
  let mx = 0, my = 0, rx = 0, ry = 0

  document.addEventListener('mousemove', e => {
    mx = e.clientX
    my = e.clientY
  })

  function animCursor() {
    cursor.style.left = mx + 'px'
    cursor.style.top  = my + 'px'
    rx += (mx - rx) * 0.12
    ry += (my - ry) * 0.12
    ring.style.left = rx + 'px'
    ring.style.top  = ry + 'px'
    requestAnimationFrame(animCursor)
  }
  animCursor()

  document.querySelectorAll('a, button, .skill-pill, .project-card, .edu-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '20px'
      cursor.style.height = '20px'
      cursor.style.background = 'var(--c4)'
      ring.style.width  = '54px'
      ring.style.height = '54px'
    })
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '12px'
      cursor.style.height = '12px'
      cursor.style.background = 'var(--c1)'
      ring.style.width  = '36px'
      ring.style.height = '36px'
    })
  })
}

// ── Scroll Reveal ──────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal')
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.1 })

reveals.forEach(el => observer.observe(el))

// ── Photo Slideshow ────────────────────────────────────────────
const slides = document.querySelectorAll('.slide')
let current = 0

setInterval(() => {
  slides[current].classList.remove('active')
  current = (current + 1) % slides.length
  slides[current].classList.add('active')
}, 2000)

// ── Stagger Skill Pills ────────────────────────────────────────
document.querySelectorAll('.skill-pill').forEach((el, i) => {
  el.style.opacity   = '0'
  el.style.animation = `fadeUp 0.5s ${i * 0.06}s ease forwards`
})