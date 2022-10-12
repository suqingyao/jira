module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.username === 'saber' && req.body.password === '1234') {
      console.log('😁')
      return res.status(200).json({
        user: {
          token: '123'
        }
      })
    } else {
      console.log('😭')
      return res.status(400).json({ message: '用户名或密码错误' })
    }
  }

  if (req.method === 'GET' && req.path === '/me') {
    return res.status(200).json({
      user: {
        name: 'saber'
      }
    })
  }

  if (req.method === 'POST' && req.path === '/register') {
    return res.status(200).json({
      user: {
        name: req.body.username
      }
    })
  }

  next()
}
