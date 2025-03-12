// Array of image IDs (these should match the IDs in your HTML)
const imageIds = [
    'image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8', 
    'image9', 'image10', 'image11', 'image12', 'image13', 'image14', 'image15'
];

// Image dimensions (width and height) as specified
const imageDimensions = {
    'image1': { width: 454, height: 268 },
    'image2': { width: 439, height: 265.66 },
    'image3': { width: 370, height: 227.54 },
    'image4': { width: 476, height: 288.06 },
    'image5': { width: 283, height: 496.26 },
    'image6': { width: 423, height: 260.13 },
    'image7': { width: 445, height: 261.70 },
    'image8': { width: 392.98, height: 237.81 },
    'image9': { width: 414.73, height: 236.95 },
    'image10': { width: 266, height: 434.34 },
    'image11': { width: 280.09, height: 166.21 },
    'image12': { width: 522.4, height: 294.94 },
    'image13': { width: 444.63, height: 262.61 },
    'image14': { width: 483.29, height: 315.28 },
    'image15': { width: 410.60, height: 252.10 }
};

// Function to get a random position for the image
function getRandomPosition(imageId) {
    const container = document.querySelector('.background-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    const imageWidth = imageDimensions[imageId].width;
    const imageHeight = imageDimensions[imageId].height;

    // Generate random coordinates
    const x = Math.random() * (containerWidth - imageWidth - 20) + 10; // Between 10px and containerWidth - imageWidth - 10px
    const y = Math.random() * (containerHeight - imageHeight - 20) + 10; // Between 10px and containerHeight - imageHeight - 10px
    
    return { x, y };
}

// Function to randomly position each image
function positionImages() {
    imageIds.forEach(id => {
        const image = document.getElementById(id);
        const { x, y } = getRandomPosition(id);
        image.style.left = `${x}px`;
        image.style.top = `${y}px`;
    });
}

// Call positionImages when the page loads
window.onload = positionImages;
