module.exports = async (db) => {
  const videos = await db.get_all_videos(db)
  return videos
}