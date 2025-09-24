import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// Regsiter user
export const register = async (req, res) =>{
  try {
    const {username, password} = req.body

    const isUsed = await User.findOne({username})

    if(isUsed){
      return res.json({
        message: 'Данний username уже занят.'
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new User({
      username, 
      password: hash,
    })

    const token = jwt.sign({
      id: newUser._id,
    }, process.env.JWT_SECRET,
     { expiresIn: '30d' },
    )

    await newUser.save()

    res.json({
      newUser, message: 'Регистрация прошла успешна',

    })

  } catch (error) {
    res.json({message:'Ошибка при создание пользивателя'})
  }
}

// Login user
export const login = async (req, res) =>{
  try {
    const {username, password} = req.body
    const user = await User.findOne({username})
    if(!user){
      return res.json({
        message: 'Такого юзера не существует' 
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
      return res.json({
        message: 'Неверний пароль'
      })
    }

    const token = jwt.sign({
      id: user._id,
    }, process.env.JWT_SECRET,
     { expiresIn: '30d' },
    )

    res.json({
      token, user, message: 'Ви вошли в систему',
    })

  } catch (error) {
    res.json({ message: 'Ошибка при авторизации. '})
  }
}
// Get me
export const getMe = async (req, res) => {
  try {
    // Проверяем, передан ли userId в запросе (он должен быть установлен через middleware)
    if (!req.userId) {
      return res.status(401).json({ message: 'Нет доступа' });
    }

    // Ищем пользователя в базе данных
    const user = await User.findById(req.userId);

    // Если пользователь не найден, возвращаем ошибку
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const token = jwt.sign({
      id: user._id,
    }, process.env.JWT_SECRET,
     { expiresIn: '30d' },
    )

    res.json({
      user, 
      token,
    })
  } catch (error) {
    res.status(500).json({ message: 'Нет доступа пользивателя' });
  }
};

// export const getUserById = async (req, res) => {
//   try {
//     const userId = req.params.userId; // Отримуємо ID користувача з параметрів запиту

//     const user = await User.findById(userId); // Знаходимо користувача за ID

//     if (!user) {
//       return res.status(404).json({ message: 'Користувач не знайдений' }); // Якщо користувач не знайдений, повертаємо помилку 404
//     }

//     // Можна повернути лише певні поля, якщо не хочете відправляти все
//     const { password, ...userData } = user.toObject(); // Exclude password
//     res.json(userData); // Повертаємо дані користувача (без пароля)

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Помилка при отриманні користувача', error: error.message }); // Повертаємо помилку 500
//   }
// };