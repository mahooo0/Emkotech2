const VideoBanner = () => {
    // const [videoSrc, setVideoSrc] = useState<any>(null);

    // // Fetch the video URL on the client-side after the page loads
    // useEffect(() => {
    //     const fetchVideo = async () => {
    //         try {
    //             const res = await fetch('/api/video');

    //             // Check if the response is successful
    //             // if (!res.ok) {
    //             //     throw new Error('Failed to fetch video');
    //             // }

    //             // Directly set the video URL to the src
    //             const videoUrl = URL.createObjectURL(await res.blob()); // Create an object URL for the video blob
    //             setVideoSrc(videoUrl); // Set the video URL as the source for the video player
    //         } catch (error) {
    //             console.error('Error fetching video:', error);
    //         }
    //     };

    //     fetchVideo();
    // }, []);

    // if (!videoSrc) {
    //     return <div>Loading video...</div>; // Show a loading message while fetching the video URL
    // }

    return (
        <video
            className="w-full h-full z-0 object-cover max-h-[553px]"
            loop={true}
            autoPlay={true}
            muted={true}
            // src={videoSrc}
        />
    );
};

export default VideoBanner;
