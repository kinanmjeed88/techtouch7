// Image compression functionality for Netlify CMS
function compressImage(file, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve) => {
        const canvas = document.createElement(\'canvas\');
        const ctx = canvas.getContext(\'2d\');
        const img = new Image();
        
        img.onload = function() {
            // Calculate new dimensions
            let { width, height } = img;
            
            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }
            
            // Set canvas dimensions
            canvas.width = width;
            canvas.height = height;
            
            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);
            
            canvas.toBlob(resolve, \'image/jpeg\', quality);
        };
        
        img.src = URL.createObjectURL(file);
    });
}

// Override the default file upload behavior
if (window.CMS) {
    window.CMS.registerEventListener({
        name: \'preSave\',
        handler: async ({ entry }) => {
            let data = entry.toJS(); // Convert Immutable.js to plain JS object
            
            // Compress image if present
            if (data.image && data.image instanceof File) {
                const compressedImage = await compressImage(data.image);
                data.image = compressedImage; // Update the image with compressed one
            }
            
            return { entry: Immutable.fromJS(data) }; // Convert back to Immutable.js
        }
    });
}

