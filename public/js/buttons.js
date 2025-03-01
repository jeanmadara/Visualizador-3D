function toggleInstructions() {
    const instructions = document.getElementById('instructions');
    const button = document.getElementById('toggleButton');
    if (instructions.style.display === 'none') {
      instructions.style.display = 'block';
      button.textContent = 'Ocultar Instrucciones';
    } else {
      instructions.style.display = 'none';
      button.textContent = 'Mostrar Instrucciones';
    }
  }

  function changeModel() {
    if (currentModel === 'venus') {
      objModel = loadModel('assets/tolita.obj', true);
      textureImg = loadImage('assets/tolita.png');
      currentModel = 'tolita';
    } else {
      objModel = loadModel('assets/venus2.obj', true);
      textureImg = loadImage('assets/venus2.png');
      currentModel = 'venus';
    }
  }

  function toggleRotation() {
      window.viewState.continuousRotation = !window.viewState.continuousRotation;
      const button = document.getElementById('toggleRotationButton');
      if (window.viewState.continuousRotation) {
          button.textContent = 'Detener Rotación';
      } else {
          button.textContent = 'Reanudar Rotación';
      }
  }

  function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
      sidebar.classList.toggle('active');
  }
  }

  function toggleMaterial() {
    viewState.useNormalMaterial = !viewState.useNormalMaterial;
    // Desactivar wireframe cuando se cambia el material
    if (viewState.useNormalMaterial) {
        viewState.showWireframe = false;
    }
    
    // Actualizar el estado visual del botón de malla
    const wireframeBtn = document.querySelector('button[onclick="toggleWireframe()"]');
    if (wireframeBtn) {
        wireframeBtn.classList.remove('active');
    }
  }

  function toggleWireframe() {
    viewState.showWireframe = !viewState.showWireframe;
    // Desactivar normalMaterial cuando se activa el wireframe
    if (viewState.showWireframe) {
        viewState.useNormalMaterial = false;
        
        // Actualizar el estado visual del botón de material
        const materialBtn = document.querySelector('button[onclick="toggleMaterial()"]');
        if (materialBtn) {
            materialBtn.classList.remove('active');
        }
    }
  }