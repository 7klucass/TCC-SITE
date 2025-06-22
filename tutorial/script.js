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

