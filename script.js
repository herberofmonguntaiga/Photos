// Array of image IDs (these should match the IDs in your HTML)
const imageIds = [
    'image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8', 
    'image9', 'image10', 'image11', 'image12', 'image13', 'image14', 'image15'
];

// Minimum size for images
const minWidth = 280; // Minimum width of 280px
const minHeight = 160; // Minimum height of 160px

// Maximum percentage for image width and height
const maxWidthPercentage = 0.25; // Max 25% of container width
const maxHeightPercentage = 0.25; // Max 25% of container height

// Function to get random size for the image, respecting aspect ratio and minimum size
function getRandomSize() {
    const container = document.querySelector('.background-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    let width = Math.random() * (containerWidth * maxWidthPercentage);
    width = Math.max(width, minWidth); // Enforce minimum width
    let height = width * (Math.random() * 0.8 + 0.5); // Random aspect ratio between 0.5 and 0.8

    height = Math.max(height, minHeight); // Enforce minimum height

    return { width, height };
}

// Function to get random position while avoiding overlap
function getRandomPosition(imagesPositioned, imageWidth, imageHeight) {
    const container = document.querySelector('.background-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    let x, y, overlap;

    do {
        x = Math.random() * (containerWidth - imageWidth - 20) + 10; // Ensure 10px margin
        y = Math.random() * (containerHeight - imageHeight - 20) + 10; // Ensure 10px margin
        overlap = false;

        // Check if this position overlaps with any other image
        for (let i = 0; i < imagesPositioned.length; i++) {
            const img = imagesPositioned[i];
            const imgRect = img.getBoundingClientRect();
            if (
                x < imgRect.left + imgRect.width + 10 &&
                x + imageWidth > imgRect.left - 10 &&
                y < imgRect.top + imgRect.height + 10 &&
                y + imageHeight > imgRect.top - 10
            ) {
                overlap = true;
                break;
            }
        }
    } while (overlap); // Retry if there's overlap

    return { x, y };
}

// Function to position and size all the images
function positionImages() {
    const imagesPositioned = [];
    const container = document.querySelector('.background-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const totalArea = containerWidth * containerHeight;
    const targetArea = totalArea * 0.8; // 80% of the background

    let totalImageArea = 0;

    imageIds.forEach(id => {
        const image = document.getElementById(id);
        const { width, height } = getRandomSize();
        totalImageArea += width * height;

        const { x, y } = getRandomPosition(imagesPositioned, width, height);

        image.style.left = `${x}px`;
        image.style.top = `${y}px`;
        image.style.width = `${width}px`;
        image.style.height = `${height}px`;

        imagesPositioned.push(image);
    });

    // Ensure total image area is around 80% of the background area
    if (totalImageArea < targetArea) {
        positionImages(); // Recalculate if the total image area is too small
    }
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

// Event listener to close the modal by clicking anywhere in the modal background
document.getElementById("imageModal").addEventListener("click", function (event) {
    if (event.target === this) { // Only close if clicking on the background (not the image)
        closeModal();
    }
});

// Call positionImages when the page loads
window.onload = positionImages;
