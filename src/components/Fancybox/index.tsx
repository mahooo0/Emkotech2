import React, { useEffect } from 'react';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

interface FancyboxExampleProps {
    isOpen: boolean; // Determines if Fancybox should open
    images: string[] | undefined; // Array of image URLs
    currentImageIndex: number;
    setisopen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FancyboxExample: React.FC<FancyboxExampleProps> = ({
    isOpen,
    images,
    currentImageIndex,
    setisopen,
}) => {
    useEffect(() => {
        if (isOpen)
            if (images)
                if (images[currentImageIndex]) {
                    Fancybox.show(
                        images.map((src, index) => ({
                            src,
                            type: 'image',
                            opts: {
                                caption: `Image ${index + 1}`,
                            },
                        })),
                        {
                            startIndex: currentImageIndex, // Show the current image first
                            // Loop through images infinitely
                        }
                    );
                }
        return () => {
            setisopen(false);
        };
    }, [images]);

    return null; // No visible UI as Fancybox is programmatically controlled
};

export default FancyboxExample;
