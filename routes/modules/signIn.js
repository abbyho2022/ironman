const express = require('express')
const router = express.Router()
const { user } = require('../../models/index')
const passwordUtils = require('../../utils/passwordUtils')

router.get('/', (req, res) => {
  res.render('signIn',{error:null})
})

router.post('/', async(req, res) => {
  const { username, password } = req.body // 從 POST 請求中獲取用戶名和密碼
  let userData
  try {
    userData = await user.findOne({
      where: {
        username: username,
      }
    ,raw: true})

  }catch(error){
    console.error("An error occurred:", error)
  }

  if(userData) res.render('signIn', { 'error': 'This account is already registered.' }) 
  await user.create({ username: username, password, password }, { raw: true })

  res.render('signIn', { 'error': 'Registration successful. Please go to the login page to log in again.' }) 
})

module.exports = router