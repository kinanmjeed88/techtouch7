// Image compression functionality for Netlify CMS
function compressImage(file, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
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
            
            canvas.toBlob(resolve, 'image/jpeg', quality);
        };
        
        img.src = URL.createObjectURL(file);
    });
}

// Override the default file upload behavior
if (window.CMS) {
    window.CMS.registerEventListener({
        name: 'preSave',
        handler: async ({ entry }) => {
            const data = entry.get('data');
            
            // Compress image if present
            if (data.get('image')) {
                const imageFile = data.get('image');
                if (imageFile instanceof File) {
                    const compressedImage = await compressImage(imageFile);
                    data.set('image', compressedImage);
                }
            }
            
            return { entry: entry.set('data', data) };
        }
    });
}

