// Array of image IDs (these should match the IDs in your HTML)
const imageIds = [
    'image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8', 
    'image9', 'image10', 'image11', 'image12', 'image13', 'image14', 'image15'
];

// Maximum dimensions for the images (in percentage of container width/height)
const maxWidthPercentage = 0.2; // Max 20% of container width
const maxHeightPercentage = 0.2; // Max 20% of container height

// Minimum image width
const minWidth = 280;

// Function to get a random size for the image, within reasonable limits
function getRandomSize() {
    const container = document.querySelector('.background-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Get random width and height percentages (maintaining aspect ratio)
    let width = Math.random() * (containerWidth * maxWidthPercentage);
    width = Math.max(width, minWidth); // Enforce the minimum width

    const height = width * (Math.random() * 0.8 + 0.5); // Aspect ratio between 0.5 and 0.8
    
    return { width, height };
}

// Function to get a random position for the image
function getRandomPosition(imageId, imagesPositioned) {
    const container = document.querySelector('.background-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    const { width, height } = getRandomSize();
    
    let x, y, overlap;

    // Ensure no overlap with other images
    do {
        x = Math.random() * (containerWidth - width - 20) + 10; // 10px margin
        y = Math.random() * (containerHeight - height - 20) + 10; // 10px margin
        overlap = false;
        
        // Check if this position overlaps with any other image
        for (let i = 0; i < imagesPositioned.length; i++) {
            const img = imagesPositioned[i];
            const imgRect = img.getBoundingClientRect();
            if (
                x < imgRect.left + imgRect.width + 10 &&
                x + width > imgRect.left - 10 &&
                y < imgRect.top + imgRect.height + 10 &&
                y + height > imgRect.top - 10
            ) {
                overlap = true;
                break;
            }
        }
    } while (overlap); // Keep trying until there's no overlap

    return { x, y, width, height };
}

// Function to randomly position and size each image
function positionImages() {
    const imagesPositioned = [];

    imageIds.forEach(id => {
        const image = document.getElementById(id);
        const { x, y, width, height } = getRandomPosition(id, imagesPositioned);
        
        image.style.left = `${x}px`;
        image.style.top = `${y}px`;
        image.style.width = `${width}px`;
        image.style.height = `${height}px`;

        // Store the positioned image for overlap checking
        imagesPositioned.push(image);
    });
}

// Function to open the clicked image in a larger view
function openImageModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImage.src = imageSrc;
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// Event listener for closing the modal
document.getElementById("closeModal").addEventListener("click", closeModal);

// Event listeners to open each image in the modal
imageIds.forEach(id => {
    const image = document.getElementById(id);
    image.addEventListener("click", function () {
        openImageModal(this.src);
    });
});

// Call positionImages when the page loads
window.onload = positionImages;
