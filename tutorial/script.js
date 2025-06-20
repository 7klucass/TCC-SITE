// Elementos do DOM
const video = document.getElementById("tutorialVideo")
const placeholder = document.getElementById("videoPlaceholder")

// Função para reproduzir o vídeo
function playVideo() {
  placeholder.style.display = "none"
  video.style.display = "block"
  video.play().catch((error) => {
    console.error("Erro ao reproduzir o vídeo:", error)
    showPlaceholder()
  })
}

// Função para pausar o vídeo
function pauseVideo() {
  if (video && !video.paused) {
    video.pause()
  }
}

// Função para reiniciar o vídeo
function restartVideo() {
  if (video) {
    video.currentTime = 0
    if (video.paused) {
      playVideo()
    }
  }
}

// Função para mostrar o placeholder
function showPlaceholder() {
  placeholder.style.display = "flex"
  video.style.display = "none"
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar placeholder quando o vídeo terminar
  video.addEventListener("ended", () => {
    showPlaceholder()
  })

  // Mostrar placeholder se houver erro no carregamento
  video.addEventListener("error", (e) => {
    console.error("Erro no vídeo:", e)
    showPlaceholder()
  })

  // Adicionar feedback visual aos botões
  const controlButtons = document.querySelectorAll(".control-button")
  controlButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Adicionar efeito de clique
      this.style.transform = "translateY(2px)"
      setTimeout(() => {
        this.style.transform = "translateY(0)"
      }, 100)
    })
  })

  // Adicionar suporte a teclado para o botão de play
  const playButton = document.querySelector(".play-button")
  playButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      playVideo()
    }
  })

  // Tornar o botão de play acessível via teclado
  playButton.setAttribute("tabindex", "0")
  playButton.setAttribute("role", "button")
  playButton.setAttribute("aria-label", "Reproduzir vídeo tutorial")
})

// Função para controle de volume (opcional)
function setVolume(level) {
  if (video) {
    video.volume = Math.max(0, Math.min(1, level))
  }
}

// Função para alternar tela cheia (opcional)
function toggleFullscreen() {
  if (video) {
    if (video.requestFullscreen) {
      video.requestFullscreen()
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen()
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen()
    }
  }
}

// Função para verificar se o vídeo está carregado
function checkVideoStatus() {
  if (video.readyState >= 2) {
    console.log("Vídeo carregado e pronto para reprodução")
  } else {
    console.log("Vídeo ainda carregando...")
  }
}

// Exportar funções para uso global (se necessário)
window.playVideo = playVideo
window.pauseVideo = pauseVideo
window.restartVideo = restartVideo

const products = [
  {
    name: "Componente XYZ",
    price: "R$ 299,90",
    description:
      "Utilizamos o componente XYZ para otimização de performance, pois ele oferece alta eficiência energética, tornando o protótipo mais eficiente e acessível.",
  },
  {
    name: "Componente ABC",
    price: "R$ 459,90",
    description:
      "Utilizamos o componente ABC para processamento avançado, pois ele oferece velocidade superior, tornando o protótipo mais rápido e confiável.",
  },
  {
    name: "Componente DEF",
    price: "R$ 189,90",
    description:
      "Utilizamos o componente DEF para conectividade wireless, pois ele oferece estabilidade de sinal, tornando o protótipo mais versátil e moderno.",
  },
  {
    name: "Componente GHI",
    price: "R$ 699,90",
    description:
      "Utilizamos o componente GHI para inteligência artificial, pois ele oferece processamento neural avançado, tornando o protótipo mais inteligente e autônomo.",
  },
]

// Estado do carrossel
let currentSlide = 0
const totalSlides = products.length

// Elementos do DOM
const carouselTrack = document.getElementById("carouselTrack")
const productName = document.getElementById("productName")
const productPrice = document.getElementById("productPrice")
const productDescription = document.getElementById("productDescription")
const indicators = document.querySelectorAll(".indicator")

// Função para atualizar o conteúdo do produto
function updateProductInfo(index) {
  const product = products[index]

  // Animação de fade out
  if (productName) {
    productName.style.opacity = "0"
    productPrice.style.opacity = "0"
    productDescription.style.opacity = "0"

    setTimeout(() => {
      productName.textContent = product.name
      productPrice.textContent = product.price
      productDescription.textContent = product.description

      // Animação de fade in
      productName.style.opacity = "1"
      productPrice.style.opacity = "1"
      productDescription.style.opacity = "1"
    }, 200)
  }
}

// Função para atualizar os indicadores
function updateIndicators(activeIndex) {
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === activeIndex)
  })
}

// Função para mover o carrossel
function moveCarousel(index) {
  if (carouselTrack) {
    const translateX = -index * 100
    carouselTrack.style.transform = `translateX(${translateX}%)`
    currentSlide = index
    updateProductInfo(index)
    updateIndicators(index)
  }
}

// Função para próximo slide
function nextSlide() {
  const nextIndex = (currentSlide + 1) % totalSlides
  moveCarousel(nextIndex)
}

// Função para slide anterior
function previousSlide() {
  const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides
  moveCarousel(prevIndex)
}

// Função para ir para um slide específico
function goToSlide(index) {
  moveCarousel(index)
}

// Auto-play do carrossel (opcional)
let autoPlayInterval

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000) // Muda a cada 5 segundos
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval)
}

// Inicialização do carrossel quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  // Adicionar transições suaves aos elementos de texto
  if (productName) {
    productName.style.transition = "opacity 0.3s ease"
    productPrice.style.transition = "opacity 0.3s ease"
    productDescription.style.transition = "opacity 0.3s ease"

    // Inicializar com o primeiro produto
    updateProductInfo(0)
    updateIndicators(0)

    // Iniciar auto-play
    startAutoPlay()

    // Pausar auto-play quando o mouse estiver sobre o carrossel
    const carouselSection = document.querySelector(".carousel-section")
    if (carouselSection) {
      carouselSection.addEventListener("mouseenter", stopAutoPlay)
      carouselSection.addEventListener("mouseleave", startAutoPlay)
    }
  }
})

// Suporte a teclado para o carrossel
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    previousSlide()
  } else if (e.key === "ArrowRight") {
    nextSlide()
  }
})

// Suporte a touch/swipe para dispositivos móveis
let startX = 0
let endX = 0

if (carouselTrack) {
  carouselTrack.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
  })

  carouselTrack.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX
    handleSwipe()
  })
}

function handleSwipe() {
  const threshold = 50 // Mínimo de pixels para considerar um swipe
  const diff = startX - endX

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      nextSlide() // Swipe para esquerda = próximo
    } else {
      previousSlide() // Swipe para direita = anterior
    }
  }
}

// Função para toggle do tema (opcional)
const themeToggle = document.getElementById("theme-toggle")
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("light-theme")
})

// Exportar funções para uso global
window.nextSlide = nextSlide
window.previousSlide = previousSlide
window.goToSlide = goToSlide