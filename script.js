// DOM Elements
const form = document.getElementById('listing-form');
const mediaInput = document.getElementById('media');
const mediaPreview = document.getElementById('media-preview');
const uploadContainer = document.querySelector('.upload-container');

// State
let selectedMedia = [];

// Toggle filter dropdowns
function toggleFilter(filterId) {
    const filterElement = document.getElementById(filterId);
    const isVisible = filterElement.style.display === 'block';
    
    // Close all filters first
    document.querySelectorAll('.filter-options').forEach(el => {
        el.style.display = 'none';
    });
    
    // Toggle the clicked filter
    filterElement.style.display = isVisible ? 'none' : 'block';
}

// Close filters when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-container')) {
        document.querySelectorAll('.filter-options').forEach(el => {
            el.style.display = 'none';
        });
    }
});

// Handle media (image & video) uploads
function handleMediaUpload(files) {
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';

            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'preview-image';
                img.alt = 'Preview';
                previewItem.appendChild(img);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = e.target.result;
                video.controls = true;
                video.className = 'preview-video';
                previewItem.appendChild(video);
            }

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-image';
            removeButton.innerHTML = '×';
            removeButton.onclick = () => {
                previewItem.remove();
                selectedMedia = selectedMedia.filter(item => item.url !== e.target.result);
            };

            previewItem.appendChild(removeButton);
            mediaPreview.appendChild(previewItem);

            selectedMedia.push({
                file: file,
                url: e.target.result
            });
        };
        reader.readAsDataURL(file);
    });
}

// File input change handler
mediaInput.addEventListener('change', (e) => {
    handleMediaUpload(e.target.files);
});

// Drag and drop handlers
uploadContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadContainer.classList.add('dragover');
});

uploadContainer.addEventListener('dragleave', () => {
    uploadContainer.classList.remove('dragover');
});

uploadContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadContainer.classList.remove('dragover');
    handleMediaUpload(e.dataTransfer.files);
});

// ✅ Fixed Form Submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather form data
    const formData = new FormData(form);
    const data = {
        title: formData.get('title'),
        description: formData.get('description'),
        price: formData.get('price'),
        location: formData.get('location'),
        propertyType: formData.get('propertyType'),
        capacity: formData.get('capacity'),
        roomType: formData.get('roomType'),
        bedrooms: formData.get('bedrooms'),
        beds: formData.get('beds'),
        roomSize: formData.get('roomSize'),
        roomLocation: Array.from(formData.getAll('roomLocation')),
        transportDistance: formData.get('transportDistance'),
        hostGender: formData.get('hostGender'),
        foodFacility: formData.get('foodFacility'),
        amenities: Array.from(formData.getAll('amenities')),
        discounts: Array.from(formData.getAll('discounts')),
        images: selectedMedia
    };

    console.log('Form submitted:', data);

    // Simulating form submission (Replace this with an actual API call if needed)
    setTimeout(() => {
        alert('Listing submitted successfully!');
        form.reset();
        mediaPreview.innerHTML = ''; // Clear previews
        selectedMedia = []; // Reset uploaded media
    }, 500);
});

// Close filters when clicking escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.filter-options').forEach(el => {
            el.style.display = 'none';
        });
    }
});

// Initialize tooltips for better UX
const inputs = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.setAttribute('title', input.getAttribute('placeholder') || '');
    });
});

// Sliding Photos Functionality
const photoArray = [
    "img/image1.jpg",
    "img/image2.jpg",
    "img/image3.jpg",
    "img/image4.jpg"
];

const photoBlock = document.querySelector(".slide-2");
let currentIndex = 0;

function updateBackgroundImage() {
    if (photoBlock) {
        photoBlock.style.backgroundImage = `url(${photoArray[currentIndex]})`;
    }
}

updateBackgroundImage();

// Change the background image every 3 seconds
setInterval(() => {
    currentIndex++;
    if (currentIndex === photoArray.length) currentIndex = 0;
    updateBackgroundImage();
}, 3000);