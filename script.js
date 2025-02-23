// DOM Elements
const form = document.getElementById('listing-form');
const imageInput = document.getElementById('images');
const imagePreview = document.getElementById('image-preview');
const uploadContainer = document.querySelector('.upload-container');

// State
let selectedImages = [];

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

// Handle image upload
function handleImageUpload(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                
                // Create preview element
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                
                const img = document.createElement('img');
                img.src = imageUrl;
                img.className = 'preview-image';
                img.alt = 'Preview';
                
                const removeButton = document.createElement('button');
                removeButton.className = 'remove-image';
                removeButton.innerHTML = '×';
                removeButton.onclick = () => {
                    previewItem.remove();
                    selectedImages = selectedImages.filter(img => img.url !== imageUrl);
                };
                
                previewItem.appendChild(img);
                previewItem.appendChild(removeButton);
                imagePreview.appendChild(previewItem);
                
                selectedImages.push({
                    file: file,
                    url: imageUrl
                });
            };
            
            reader.readAsDataURL(file);
        }
    });
}

// File input change handler
imageInput.addEventListener('change', (e) => {
    handleImageUpload(e.target.files);
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
    handleImageUpload(e.dataTransfer.files);
});

// Form submission
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
        images: selectedImages
    };
    
    // Log the data (replace with your API call)
    console.log('Form submitted:', data);
    
    // Reset form and preview
    form.reset();
    imagePreview.innerHTML = '';
    selectedImages = [];
    
    // Show success message
    alert('Listing submitted successfully!');
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

const photo = [
    "img/image1.jpg",
    "img/image2.jpg",
    "img/image3.jpg",
    "img/image4.jpg"
];

const photoblock = document.querySelector(".slide-2");
let i = 0;
function updateBackgroundImage() {
    photoblock.style.backgroundImage = `url(${photo[i]})`; 
}

updateBackgroundImage();
// sliding photos,below nav bar
setInterval(() => {
    i++;
    if(i === photo.length) i = 0; 
    updateBackgroundImage();
}, 3000);