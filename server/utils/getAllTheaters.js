module.exports = async (db) => {
  const theaters = await db.get_all_theaters(db)
  return theaters
}