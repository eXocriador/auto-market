import Post from '../models/Post.js';
import User from '../models/User.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// create post
export const createPost = async (req, res) => {
  try {
    const { title, price, text, engine, drive, transmission, mileage, numberPlate, fuel } = req.body;
    const user = await User.findById(req.userId);

    if (!title || !text || !price || !engine || !drive || !transmission || !mileage || !fuel) {
      return res.status(400).json({ message: 'Заповніть всі поля, включаючи опис' });
    }

    let fileName = '';

    if (req.files && req.files.image) {
      fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
    }

    const newPost = new Post({
      username: user.username,
      title,
      text,
      price,
      engine,
      transmission,
      mileage,
      fuel,
      drive,
      numberPlate,
      imgUrl: fileName,
      author: req.userId,
    });

    await newPost.save();

    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPost._id },
    });

    res.json(newPost);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: error.message || "Щось пішло не так" });
  }
};

// get all posts
export const getAll = async (req, res) => {
  try {
    const {
      priceMin,
      priceMax,
      sortBy,
      sortOrder,
      mileageMin,
      mileageMax,
      brand,
      fuel,
      engine,
      drive,
      transmission,
    } = req.query;

    let filter = {};
    let sort = {};

    if (sortBy) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1; // -1 для спадання, 1 для зростання
    }

    if (priceMin) filter.price = { $gte: Number(priceMin) };
    if (priceMax) filter.price = { ...filter.price, $lte: Number(priceMax) };
    if (mileageMin) filter.mileage = { $gte: Number(mileageMin) };
    if (mileageMax) filter.mileage = { ...filter.mileage, $lte: Number(mileageMax) };
    if (brand) filter.brand = { $regex: brand, $options: 'i' };
    if (fuel) filter.fuel = { $regex: fuel, $options: 'i' };
    if (transmission) filter.transmission = { $regex: transmission, $options: 'i' };

    if (engine) filter.engine = { $eq: parseFloat(engine) };
    if (drive) filter.drive = { $eq: drive };

    const posts = await Post.find(filter).sort(sort).sort('-createdAt'); // Додано сортування
    const popularPosts = await Post.find().limit(5).sort('-views');

    if (posts.length === 0) {
      return res.json({ message: 'Постов нет' });
    }

    res.json({ posts, popularPosts });
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};



// get post by id
export const getById = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

// get my posts
export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map(post => {
        return Post.findById(post._id);
      })
    );
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

// remove post
export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.json({ message: 'Такого поста не существует' });

    await User.findByIdAndDelete(req.userId, {
      $pull: { posts: req.params.id },
    });
    res.json({ message: 'Пост был удален' });
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

// export const getPostsByUser = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const posts = await Post.find({ author: userId }).populate('author'); 
//     if (!posts) {
//       return res.status(404).json({ message: 'Пости не знайдено для цього користувача' });
//     }
//     res.json(posts); 
//   } catch (error) {
//     console.error('Помилка отримання постів за ID користувача:', error);
//     res.status(500).json({ message: 'Не вдалося отримати пости для цього користувача', error: error.message }); 
//   }
// };
