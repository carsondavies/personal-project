module.exports = async (db) => {
  const auditions = await db.get_all_auditions(db)
  return auditions
}