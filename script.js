class RomanticSlideshow {
    constructor() {
        this.currentScene = 1;
        this.totalScenes = 6;
        this.isAnimating = false;
        
        this.initializeElements();
        this.bindEvents();
        this.startFloatingHearts();
    }

    initializeElements() {
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.scenes = document.querySelectorAll('.scene');
        this.indicators = document.querySelectorAll('.indicator');
    }

    bindEvents() {
        // Botones de navegación
        this.prevBtn.addEventListener('click', () => this.previousScene());
        this.nextBtn.addEventListener('click', () => this.nextScene());
        
        // Indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToScene(index + 1));
        });
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                this.previousScene();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                this.nextScene();
            }
        });

        // Navegación táctil (swipe)
        let startX = 0;
        let endX = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - next scene
                this.nextScene();
            } else {
                // Swipe right - previous scene
                this.previousScene();
            }
        }
    }

    nextScene() {
        if (this.isAnimating) return;
        
        const nextScene = this.currentScene < this.totalScenes ? this.currentScene + 1 : 1;
        this.goToScene(nextScene);
    }

    previousScene() {
        if (this.isAnimating) return;
        
        const prevScene = this.currentScene > 1 ? this.currentScene - 1 : this.totalScenes;
        this.goToScene(prevScene);
    }

    goToScene(sceneNumber) {
        if (this.isAnimating || sceneNumber === this.currentScene) return;
        
        this.isAnimating = true;
        
        // Actualizar indicadores
        this.updateIndicators(sceneNumber);
        
        // Actualizar escenas
        this.updateScenes(sceneNumber);
        
        // Actualizar escena actual
        this.currentScene = sceneNumber;
        
        // Permitir nueva animación después de completar la transición
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }

    updateIndicators(activeScene) {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index + 1 === activeScene);
        });
    }

    updateScenes(activeScene) {
        this.scenes.forEach((scene, index) => {
            const sceneNumber = index + 1;
            scene.classList.remove('active', 'prev');
            
            if (sceneNumber === activeScene) {
                scene.classList.add('active');
            } else if (sceneNumber < activeScene) {
                scene.classList.add('prev');
            }
        });
    }

    startFloatingHearts() {
        // Crear nuevos corazones flotantes de vez en cuando
        setInterval(() => {
            this.createFloatingHeart();
        }, 3000);
    }

    createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = this.getRandomHeart();
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        heart.style.fontSize = (Math.random() * 0.8 + 1.2) + 'rem';
        
        document.querySelector('.floating-hearts').appendChild(heart);
        
        // Remover el corazón después de la animación
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 10000);
    }

    getRandomHeart() {
        const hearts = ['💖', '💕', '💗', '💝', '💘', '💓', '💟', '❤️', '🩷', '🤍'];
        return hearts[Math.floor(Math.random() * hearts.length)];
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new RomanticSlideshow();
    
    // Agregar efectos de sonido suaves al hacer clic (opcional)
    const addClickSound = () => {
        // Se podría agregar un sonido suave aquí si se desea
        console.log('💖 Navegando con amor...');
    };
    
    document.querySelectorAll('.nav-btn, .indicator').forEach(btn => {
        btn.addEventListener('click', addClickSound);
    });
});

// Función para cambiar las frases fácilmente
function updateMessages(newMessages) {
    const scenes = document.querySelectorAll('.romantic-text');
    
    newMessages.forEach((message, index) => {
        if (scenes[index]) {
            scenes[index].textContent = message;
        }
    });
}

// Ejemplo de uso para personalizar las frases:
// updateMessages([
//     "Tu nueva frase 1",
//     "Tu nueva frase 2", 
//     "Tu nueva frase 3",
//     "Tu nueva frase 4",
//     "Tu nueva frase 5"
// ]);