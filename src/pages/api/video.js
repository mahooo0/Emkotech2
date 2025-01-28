// pages/api/video.js
export default async function handler(req, res) {
    try {
        // Fetch the video URL from the API or another source
        const data = await fetch(
            'https://emkotech.epart.az/api/home/top-banner'
        );
        const videoUrl = data.data.video; // Assuming this is the URL of the video

        // Fetch the actual video file
        const fileResponse = await fetch(videoUrl);
        const videoBuffer = await fileResponse.buffer();

        // Set the appropriate headers for the video file
        res.setHeader('Content-Type', 'video/mp4'); // Or any other video MIME type
        res.setHeader('Content-Length', videoBuffer.length);
        res.status(200).send(videoBuffer); // Send the video file as a buffer
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch video' });
    }
}
