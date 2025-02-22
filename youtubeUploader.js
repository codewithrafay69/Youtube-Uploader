const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const config = require("./config");

// YouTube API setup
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  config.REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: config.REFRESH_TOKEN });

const youtube = google.youtube({ version: "v3", auth: oauth2Client });

// Function to upload a video
const uploadVideo = async (videoPath, title, description) => {
  try {
    const response = await youtube.videos.insert({
      part: "snippet,status",
      requestBody: {
        snippet: {
          title,
          description,
          tags: ["AI", "Automation", "YouTube Bot"],
          categoryId: "28", // Science & Technology
        },
        status: {
          privacyStatus: "public",
        },
      },
      media: {
        body: fs.createReadStream(videoPath),
      },
    });

    console.log(`✅ Uploaded: ${title}`);
    return response.data;
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
};

// Move processed video after upload
const moveProcessedVideo = (videoPath) => {
  const processedPath = path.join(config.PROCESSED_FOLDER, path.basename(videoPath));
  fs.renameSync(videoPath, processedPath);
};

// Upload videos from the folder
const uploadVideos = async () => {
  const files = fs.readdirSync(config.UPLOAD_FOLDER);
  for (let file of files) {
    const filePath = path.join(config.UPLOAD_FOLDER, file);
    const title = path.basename(file, path.extname(file));
    const description = `Uploaded by YouTube Bot`;
    
    await uploadVideo(filePath, title, description);
    moveProcessedVideo(filePath);
  }
};

// Export function
module.exports = { uploadVideos };
