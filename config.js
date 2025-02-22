require('dotenv').config();

module.exports = {
  YOUTUBE_CLIENT_ID: process.env.YOUTUBE_CLIENT_ID,
  YOUTUBE_CLIENT_SECRET: process.env.YOUTUBE_CLIENT_SECRET,
  YOUTUBE_REFRESH_TOKEN: process.env.YOUTUBE_REFRESH_TOKEN,
  UPLOAD_FOLDER: "./uploads",
  PROCESSED_FOLDER: "./processed",
  SCHEDULE_TIME: "0 9 * * *" // Runs every day at 9 AM
};
