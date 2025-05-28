//realizadas por CHATGPT :(
export function showLoadingScreen() {
    // Crear el div de carga
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-screen';
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = 0;
    loadingDiv.style.left = 0;
    loadingDiv.style.width = '100%';
    loadingDiv.style.height = '100%';
    loadingDiv.style.background = 'rgba(0, 0, 0, 0.5)';
    loadingDiv.style.color = 'white';
    loadingDiv.style.fontSize = '2rem';
    loadingDiv.style.display = 'flex';
    loadingDiv.style.alignItems = 'center';
    loadingDiv.style.justifyContent = 'center';
    loadingDiv.style.zIndex = 9999;
    loadingDiv.textContent = 'Cargando...';

    // Agregar al body
    document.body.appendChild(loadingDiv);
}

export function hideLoadingScreen() {
    const loadingDiv = document.getElementById('loading-screen');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

