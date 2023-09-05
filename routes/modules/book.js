const express = require('express')
const router = express.Router()
const { mysqlConnection } = require('../../config/mysqlConnection')

router.use((req, res, next) => {
  console.log('requestTime: ', new Date(new Date().getTime() + 8 * 60 * 60 * 1000)) //取得現在時間（台灣時間）
  next()  // 呼叫 next() 執行下一個函式
})


// define the book page route by get method
router.get('/', async (req, res) => {

  try {
    // 建立與數據庫的連接
    const connection  = await mysqlConnection()
	  await connection.query('SELECT * FROM `booktest`')

    // 關閉連接
    connection.end()
  } catch (error) {
    console.error('連接數據庫時出現錯誤：', error)
  }

  // res.send('Get a book')
  res.render('page',{'text': 'Get a book'})
})


// define the book route by post method
router.post('/', async (req, res) => {

  try {
    // 建立與數據庫的連接
    const connection = await mysqlConnection()
    await connection.query('INSERT INTO `booktest` (`bookName`) VALUES ("testBook-1")')

    // 關閉連接
    connection.end()
  } catch (error) {
    console.error('連接數據庫時出現錯誤：', error)
  }

  // res.send('Post a book')
  res.render('page',{'text': 'Post a book'})
})

// define the book route by delete method
router.delete('/', async (req, res) => {

  try {
    // 建立與數據庫的連接
    const connection = await mysqlConnection()
    await connection.query('DELETE FROM `booktest`  WHERE id = 1')

    // 關閉連接
    connection.end()
  } catch (error) {
    console.error('連接數據庫時出現錯誤：', error)
  }

  // res.send('Delete the book')
  res.render('page',{'text': 'Delete the book'})
})

module.exports = router