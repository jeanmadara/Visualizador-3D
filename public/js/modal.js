function updateModalInfo(modelKey) {
    const modalTitle = document.getElementById('infoModalLabel');
    const modalContent = document.querySelector('.modal-body .card-body');
    
    if (modalTitle && modalContent) {
        const model = window.modelInfo[modelKey];
        modalTitle.textContent = model.title;
        modalContent.innerHTML = `
            <h6 class="card-subtitle mb-3 text-muted">No. ${model.id}</h6>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <i class="fas fa-landmark text-primary"></i>
                    <strong>Cultura:</strong> ${model.culture}
                </li>
                <li class="list-group-item">
                    <i class="fas fa-clock text-primary"></i>
                    <strong>Periodo:</strong> ${model.period}
                </li>
                <li class="list-group-item">
                    <i class="fas fa-ruler-combined text-primary"></i>
                    <strong>Medidas:</strong>
                    <ul class="list-unstyled ml-4 mb-0">
                        <li>Alto: ${model.height} cms</li>
                        <li>Ancho: ${model.width} cms</li>
                    </ul>
                </li>
            </ul>`;
    }
}

// Initialize modal with correct content
document.addEventListener('DOMContentLoaded', () => {
    updateModalInfo(window.currentModel);
});

// Add event listener for model changes
document.getElementById('changeModelButton').addEventListener('click', () => {
    updateModalInfo(window.currentModel);
});