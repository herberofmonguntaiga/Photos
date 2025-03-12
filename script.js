document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.querySelector(".image-container");
    const imageFiles = [
        "img002.jpg", "img003.jpg", "img004.jpg", "img006.jpg",
        "img007.jpg", "img008-2.jpg", "img008.jpg", "img010-2.jpg",
        "img010.jpg", "img012.jpg", "img016.jpg", "img018-2.jpg",
        "img018.jpg", "img019-2.jpg", "img019.jpg", "img024.jpg"
    ];

    function getRandomPosition(image, maxWidth, maxHeight) {
        let imgWidth = image.naturalWidth;
        let imgHeight = image.naturalHeight;
        let aspectRatio = imgWidth / imgHeight;
        
        let maxSize = Math.min(maxWidth, maxHeight) / 4; 
        let newWidth = maxSize;
        let newHeight = maxSize / aspectRatio;

        let x = Math.random() * (maxWidth - newWidth);
        let y = Math.random() * (maxHeight - newHeight);

        return { x, y, width: newWidth, height: newHeight };
    }

    function placeImages() {
        imageContainer.innerHTML = "";
        let placedImages = [];

        imageFiles.forEach(file => {
            let img = new Image();
            img.src = file;
            img.onload = function () {
                let background = document.querySelector(".background");
                let maxWidth = background.clientWidth;
                let maxHeight = background.clientHeight;

                let position;
                let attempts = 0;
                let overlap = false;

                do {
                    position = getRandomPosition(img, maxWidth, maxHeight);
                    overlap = placedImages.some(p => 
                        !(position.x + position.width < p.x ||
                          position.x > p.x + p.width ||
                          position.y + position.height < p.y ||
                          position.y > p.y + p.height)
                    );
                    attempts++;
                } while (overlap && attempts < 100);

                img.style.left = `${position.x}px`;
                img.style.top = `${position.y}px`;
                img.style.width = `${position.width}px`;
                img.style.height = `${position.height}px`;

                placedImages.push(position);
                imageContainer.appendChild(img);

                img.addEventListener("click", function () {
                    showLightbox(file);
                });
            };
        });
    }

    function showLightbox(imageSrc) {
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");
        lightboxImg.src = imageSrc;
        lightbox.style.display = "flex";
    }

    document.querySelector(".close").addEventListener("click", function () {
        document.getElementById("lightbox").style.display = "none";
    });

    window.addEventListener("resize", placeImages);
    placeImages();
});
