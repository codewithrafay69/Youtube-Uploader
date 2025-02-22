const cron = require("node-cron");
const { uploadVideos } = require("./youtubeUploader");

// Schedule the job (Runs every day at 12 PM)
cron.schedule("0 12 * * *", async () => {
  console.log("⏳ Uploading videos...");
  await uploadVideos();
  console.log("✅ Upload task completed.");
});

console.log("📅 Scheduler is running...");
