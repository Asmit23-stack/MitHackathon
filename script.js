document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selections ---
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const chatInput = document.getElementById('chat-input');
    const equationPalette = document.getElementById('equation-palette');
    const equationPaletteBtn = document.getElementById('equation-palette-btn');
    const closePaletteBtn = document.querySelector('.close-palette-btn');
    const fileUploadInput = document.getElementById('file-upload-input');
    const cameraBtn = document.getElementById('camera-btn');
    const uploadBtn = document.getElementById('upload-btn');
    const exampleImageCard = document.getElementById('example-image');
    const exampleMixedCard = document.getElementById('example-mixed');

    // --- Sidebar Toggle Functionality ---
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // --- Equation Palette Toggle Functionality ---
    if (equationPaletteBtn) {
        equationPaletteBtn.addEventListener('click', () => {
            equationPalette.style.display = 'block';
        });
    }
    if (closePaletteBtn) {
        closePaletteBtn.addEventListener('click', () => {
            equationPalette.style.display = 'none';
        });
    }

    // --- Insert Symbol from Palette into Textarea ---
    if (equationPalette) {
        const symbolButtons = equationPalette.querySelectorAll('[data-symbol]');
        symbolButtons.forEach(button => {
            button.addEventListener('click', () => {
                const symbol = button.dataset.symbol;
                chatInput.value += symbol; // Append the symbol to the textarea
                chatInput.focus(); // Keep the textarea focused
            });
        });
    }

    // --- Paste Content from Example Cards into Textarea ---
    function pasteExampleText(cardElement) {
        if (cardElement && chatInput) {
            const mathProblemText = cardElement.querySelector('.math-problem').innerText;
            chatInput.value = mathProblemText;
            chatInput.focus();
        }
    }

    if (exampleImageCard) {
        exampleImageCard.addEventListener('click', () => pasteExampleText(exampleImageCard));
    }
    if (exampleMixedCard) {
        exampleMixedCard.addEventListener('click', () => pasteExampleText(exampleMixedCard));
    }
    
    // --- File Upload Functionality ---
    // Function to trigger the hidden file input
    function openFileExplorer() {
        if (fileUploadInput) {
            fileUploadInput.click();
        }
    }
    
    if (cameraBtn) {
        cameraBtn.addEventListener('click', openFileExplorer);
    }
    if (uploadBtn) {
        uploadBtn.addEventListener('click', openFileExplorer);
    }

    // Handle the file selection and display the file name
    if (fileUploadInput) {
        fileUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                // For demonstration, log the file name and show it in the input
                console.log('File selected:', file.name);
                chatInput.value = `File selected: ${file.name}`;
            }
        });
    }
     // Logic for Accordion Menu (on Landing Page)
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            header.addEventListener('click', () => {
                // Find the currently active item within the same parent container
                const parentContainer = item.closest('.accordion-container');
                const currentlyActive = parentContainer.querySelector('.accordion-item.active');

                // If there is an active item and it's not the one we clicked, close it
                if (currentlyActive && currentlyActive !== item) {
                    currentlyActive.classList.remove('active');
                }
                
                // Toggle the active state of the clicked item
                item.classList.toggle('active');
            });
        });
    }

    
    // Equation Palette Toggle
    if (equationPaletteBtn) {
        equationPaletteBtn.addEventListener('click', () => {
            equationPalette.style.display = 'block';
        });
    }
    if (closePaletteBtn) {
        closePaletteBtn.addEventListener('click', () => {
            equationPalette.style.display = 'none';
        });
    }

    // Insert symbol from palette into textarea
    if (equationPalette) {
        const symbolButtons = equationPalette.querySelectorAll('[data-symbol]');
        symbolButtons.forEach(button => {
            button.addEventListener('click', () => {
                const symbol = button.dataset.symbol;
                chatInput.value += symbol;
                chatInput.focus();
            });
        });
    }

    // Paste content from example cards into textarea
    const exampleImage = document.getElementById('example-image');
    const exampleMixed = document.getElementById('example-mixed');

    function pasteExampleText(cardElement) {
        if (cardElement && chatInput) {
            const mathProblemText = cardElement.querySelector('.math-problem').innerText;
            chatInput.value = mathProblemText;
            chatInput.focus();
        }
    }

    if (exampleImage) exampleImage.addEventListener('click', () => pasteExampleText(exampleImage));
    if (exampleMixed) exampleMixed.addEventListener('click', () => pasteExampleText(exampleMixed));

});