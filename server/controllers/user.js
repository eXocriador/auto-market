// controllers/users.js
import User from '../models/User.js'

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) return res.status(404).json({ message: 'Користувача не знайдено' })

    res.json({
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      createdAt: user.createdAt,
    })
  } catch (error) {
    res.status(500).json({ message: 'Помилка при отриманні користувача' })
  }
}
