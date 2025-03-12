// Function to open the larger image in a popup
function openImage(imageSrc) {
    const popup = document.getElementById("image-popup");
    const popupImage = document.getElementById("popup-image");
    popupImage.src = imageSrc; // Set the source of the popup image to the clicked image's source
    popup.style.display = "flex"; // Show the popup
}

// Function to close the popup when clicked
function closePopup() {
    const popup = document.getElementById("image-popup");
    popup.style.display = "none"; // Hide the popup
}
