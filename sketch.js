// Configuración de modelos 3D y sus metadatos
window.modelInfo = {
    venus: {
        obj: 'assets/venus2.obj',
        texture: 'assets/venus2.png',
        title: 'Cabeza y busto de figura antropomorfa',
        id: 'GA-1-2644-82',
        culture: 'VALDIVIA',
        period: 'FORMATIVO (1800 a.C. y 500 d. C)',
        height: '7.60',
        width: '4.60'
    },
    tolita: {
        obj: 'assets/tolita.obj',
        texture: 'assets/tolita.png',
        title: 'Figura Zoomorfa',
        id: 'GA-35-1924-81',
        culture: 'TOLITA',
        period: 'DESARROLLO REGIONAL (500 y 1450 d. C)',
        height: '74.20',
        width: '42.50'
    }
};

// Modelo inicial a mostrar
window.currentModel = 'venus';

// Variables para almacenar el modelo 3D y su textura
let objModel, textureImg;

// Estado global de la visualización
window.viewState = {
    rotation: { x: 0, y: 0 },    // Rotación actual del modelo
    zoom: 2,                      // Nivel de zoom (2 = 200%)
    mouse: { x: 0, y: 0 },       // Posición actual del ratón
    isDragging: false,           // Indica si se está arrastrando el modelo
    continuousRotation: true,    // Rotación automática activada/desactivada
    useNormalMaterial: false,    // Modo de visualización normal
    showWireframe: false         // Modo de visualización malla
};

// Precarga de recursos antes de iniciar la aplicación
function preload() {
    const model = window.modelInfo[window.currentModel];
    objModel = loadModel(model.obj, true);      // Carga el modelo 3D
    textureImg = loadImage(model.texture);      // Carga la textura
}

// Configuración inicial del canvas y escena 3D
function setup() {
    // Crea un canvas que se ajusta al contenedor
    const canvas = createCanvas(
        document.getElementById('canvasContainer').offsetWidth, 
        document.getElementById('canvasContainer').offsetHeight, 
        WEBGL                    // Habilita el modo 3D
    );
    canvas.parent('canvasContainer');
}

// Bucle principal de renderizado
function draw() {
    background(0);               // Fondo negro
    
    // Configuración de iluminación
    ambientLight(255);          // Luz ambiental blanca
    specularMaterial(255);      // Material reflectante
    shininess(1);              // Nivel bajo de brillo para mejor visualización
    
    // Transformaciones básicas
    translate(0, 0, 0);        // Centra el modelo
    scale(viewState.zoom);     // Aplica el zoom actual
    
    // Gestión de materiales y modos de visualización
    if (viewState.showWireframe) {
        stroke(255);           // Líneas blancas para la malla
        noFill();             // Sin relleno para ver la estructura
    } else {
        if (viewState.useNormalMaterial) {
            normalMaterial();  // Material que muestra las normales
        } else {
            texture(textureImg); // Aplica la textura
        }
        noStroke();           // Oculta las líneas de la malla
    }

    // Sistema de rotación interactiva
    if (viewState.isDragging) {
        // Calcula la rotación basada en el movimiento del ratón
        viewState.rotation.x -= (mouseY - viewState.mouse.y) * 0.01;
        viewState.rotation.y += (mouseX - viewState.mouse.x) * 0.01;
    }

    viewState.mouse.x = mouseX;
    viewState.mouse.y = mouseY;

    rotateX(viewState.rotation.x);
    rotateY(viewState.rotation.y);
    rotateX(PI);
    rotateY(PI);

    if (viewState.continuousRotation) {
        rotateY(frameCount * 0.01);
    }
    
    // Dibujar el modelo
    model(objModel);
}

// Gestión de interacción del usuario
function mousePressed() {
    // Inicia el arrastre con el botón izquierdo del ratón
    if (mouseButton === LEFT) {
        viewState.isDragging = true;
        viewState.mouse = { x: mouseX, y: mouseY };
    }
}

function mouseReleased() {
    // Detiene el arrastre al soltar el botón
    if (mouseButton === LEFT) {
        viewState.isDragging = false;
    }
}

function mouseWheel(event) {
    // Controla el zoom con la rueda del ratón
    // delta: negativo = zoom in, positivo = zoom out
    // constrain mantiene el zoom entre 0.1 (10%) y 5 (500%)
    viewState.zoom = constrain(viewState.zoom - event.delta * 0.001, 0.1, 5);
}

function windowResized() {
    // Ajusta el tamaño del canvas cuando cambia el tamaño de la ventana
    resizeCanvas(
        document.getElementById('canvasContainer').offsetWidth,
        document.getElementById('canvasContainer').offsetHeight
    );
}

// Función para cambiar entre modelos 3D
function changeModel() {
    // Registra el estado actual para depuración
    console.group('Proceso de Cambio de Modelo');
    console.log('Estado actual:', {
        model: window.currentModel,
        modalInfo: window.modelInfo[window.currentModel].modalInfo
    });

    // Alterna entre los modelos disponibles
    window.currentModel = window.currentModel === 'venus' ? 'tolita' : 'venus';
    const model = window.modelInfo[window.currentModel];

    // Carga el nuevo modelo y su textura
    objModel = loadModel(model.obj, true);
    textureImg = loadImage(model.texture);
    
    // Actualiza la información en el modal
    const modalTitle = document.getElementById('infoModalLabel');
    const modalContent = document.querySelector('.modal-body .card-body');
    
    if (modalTitle && modalContent) {
        const info = model.modalInfo;
        
        // Actualiza el contenido del modal con la información del nuevo modelo
        modalTitle.textContent = info.title;
        modalContent.innerHTML = `
            <h6 class="card-subtitle mb-3 text-muted">No. ${info.id}</h6>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <i class="fas fa-landmark text-primary"></i>
                    <strong>Cultura:</strong> ${info.culture}
                </li>
                <li class="list-group-item">
                    <i class="fas fa-clock text-primary"></i>
                    <strong>Periodo:</strong> ${info.period}
                </li>
                <li class="list-group-item">
                    <i class="fas fa-ruler-combined text-primary"></i>
                    <strong>Medidas:</strong>
                    <ul class="list-unstyled ml-4 mb-0">
                        <li>Alto: ${info.height} cms</li>
                        <li>Ancho: ${info.width} cms</li>
                    </ul>
                </li>
            </ul>`;
    }
}

// Función para alternar el modo de visualización del material
function toggleMaterial() {
    // Alterna entre textura normal y visualización de normales
    viewState.useNormalMaterial = !viewState.useNormalMaterial;
}

// Función para alternar la visualización de la malla
function toggleWireframe() {
    // Alterna la visualización de la estructura del modelo
    viewState.showWireframe = !viewState.showWireframe;
    // Si se activa el modo malla, desactiva el material normal
    if (viewState.showWireframe) {
        viewState.useNormalMaterial = false;
    }
}
