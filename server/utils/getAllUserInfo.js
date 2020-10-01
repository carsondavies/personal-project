module.exports = async (db, id) => {
  let user = await db.userCtrl.get_user_info([id])
  console.log('everything hit')
  if (!user[0]) {
    user = await db.userCtrl.get_user_without_connections([id])
    console.log('without connections hit')
  }
  if (!user[0]) {
    user = await db.userCtrl.get_user_without_videos([id])
    console.log('wo vidoes hit')
  }
  if (!user[0]) {
    user = await db.userCtrl.get_user_without_auditions([id])
    console.log('wo auditions hit')
  }
  if (!user[0]) {
    user = await db.userCtrl.get_user_without_theaters([id])
    console.log('wo theaters hit')
  }
  return user
}
// const getUserInfo = async (db, id) => {

// }