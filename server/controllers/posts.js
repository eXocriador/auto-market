import Post from '../models/Post.js';
import User from '../models/User.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// create post
export const createPost = async (req, res) => {
  try {
    const { 
      title, 
      price, 
      text, 
      brand,
      model,
      year,
      engine, 
      drive, 
      transmission, 
      mileage, 
      numberPlate, 
      fuel,
      color,
      bodyType,
      power,
      doors,
      condition,
      hasAccident,
      accidentDescription,
      defects,
      isCustomsCleared,
      isFirstOwner,
      features,
      phone,
      location
    } = req.body;
    
    const user = await User.findById(req.userId);

    if (!title || !text || !price || !brand || !model || !year || !engine || !drive || !transmission || !mileage || !fuel) {
      return res.status(400).json({ message: 'Заповніть всі обов\'язкові поля' });
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
      price: Number(price),
      brand,
      model,
      year: Number(year),
      engine,
      transmission,
      mileage: Number(mileage),
      fuel,
      drive,
      numberPlate,
      color,
      bodyType,
      power: power ? Number(power) : undefined,
      doors: doors ? Number(doors) : 4,
      condition: condition || 'good',
      hasAccident: hasAccident === 'true' || hasAccident === true,
      accidentDescription,
      defects: defects ? defects.split(',').map(d => d.trim()) : [],
      isCustomsCleared: isCustomsCleared !== 'false',
      isFirstOwner: isFirstOwner === 'true' || isFirstOwner === true,
      features: features ? features.split(',').map(f => f.trim()) : [],
      phone,
      location,
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

// get all posts with pagination
export const getAll = async (req, res) => {
  try {
    console.log('📝 GET /posts - Request received');
    console.log('🔍 Query parameters:', req.query);

    const {
      priceMin,
      priceMax,
      sortBy,
      sortOrder,
      mileageMin,
      mileageMax,
      yearMin,
      yearMax,
      brand,
      fuel,
      transmission,
      bodyType,
      condition,
      hasAccident,
      search,
      page = 1,          // <- default page = 1
      limit = 9,        // <- default 10 posts per page
    } = req.query;

    let filter = {};
    let sort = { createdAt: -1 }; // Default sort by newest

    // 🔎 Search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { text: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
      ];
    }

    // 💲 Price filter
    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = Number(priceMin);
      if (priceMax) filter.price.$lte = Number(priceMax);
    }

    // 🛣️ Mileage filter
    if (mileageMin || mileageMax) {
      filter.mileage = {};
      if (mileageMin) filter.mileage.$gte = Number(mileageMin);
      if (mileageMax) filter.mileage.$lte = Number(mileageMax);
    }

    // 📅 Year filter
    if (yearMin || yearMax) {
      filter.year = {};
      if (yearMin) filter.year.$gte = Number(yearMin);
      if (yearMax) filter.year.$lte = Number(yearMax);
    }

    // ⚙️ Other filters
    if (brand) filter.brand = brand;
    if (fuel) filter.fuel = fuel;
    if (transmission) filter.transmission = transmission;
    if (bodyType) filter.bodyType = bodyType;
    if (condition) filter.condition = condition;
    if (hasAccident !== undefined) filter.hasAccident = hasAccident === 'true';

    // 📊 Sorting
    switch (sortBy) {
      case 'price': sort = { price: sortOrder === 'desc' ? -1 : 1 }; break;
      case 'mileage': sort = { mileage: sortOrder === 'desc' ? -1 : 1 }; break;
      case 'year': sort = { year: sortOrder === 'desc' ? -1 : 1 }; break;
      case 'views': sort = { views: sortOrder === 'desc' ? -1 : 1 }; break;
      case 'createdAt': sort = { createdAt: sortOrder === 'desc' ? -1 : 1 }; break;
      default: sort = { createdAt: -1 };
    }

    // 📌 Pagination logic
    const skip = (Number(page) - 1) * Number(limit);

    const posts = await Post.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Post.countDocuments(filter);

    const popularPosts = await Post.find().limit(5).sort('-views');

    res.json({
      posts,
      popularPosts,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        hasMore: skip + posts.length < total,
      },
    });

  } catch (error) {
    console.error('❌ Get all posts error:', error);
    res.status(500).json({ message: 'Щось пішло не так' });
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
      return res.status(404).json({ message: 'Пост не знайдено' });
    }

    res.json(post);
  } catch (error) {
    console.error('Get post by id error:', error);
    res.status(500).json({ message: 'Щось пішло не так' });
  }
};

// get my posts
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Get my posts error:', error);
    res.status(500).json({ message: 'Щось пішло не так' });
  }
};

// remove post
export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.json({ message: 'Такого поста не існує' });

    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });
    res.json({ message: 'Пост було видалено' });
  } catch (error) {
    console.error('Remove post error:', error);
    res.status(500).json({ message: 'Щось пішло не так' });
  }
};

// update post
export const updatePost = async (req, res) => {
  try {
    const { 
      title, 
      price, 
      text, 
      brand,
      model,
      year,
      engine, 
      drive, 
      transmission, 
      mileage, 
      numberPlate, 
      fuel,
      color,
      bodyType,
      power,
      doors,
      condition,
      hasAccident,
      accidentDescription,
      defects,
      isCustomsCleared,
      isFirstOwner,
      features,
      phone,
      location
    } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Пост не знайдено' });
    }

    // Check if user owns the post
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Немає прав для редагування цього поста' });
    }

    let fileName = post.imgUrl;

    if (req.files && req.files.image) {
      fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        text,
        price: Number(price),
        brand,
        model,
        year: Number(year),
        engine,
        transmission,
        mileage: Number(mileage),
        fuel,
        drive,
        numberPlate,
        color,
        bodyType,
        power: power ? Number(power) : undefined,
        doors: doors ? Number(doors) : 4,
        condition: condition || 'good',
        hasAccident: hasAccident === 'true' || hasAccident === true,
        accidentDescription,
        defects: defects ? defects.split(',').map(d => d.trim()) : [],
        isCustomsCleared: isCustomsCleared !== 'false',
        isFirstOwner: isFirstOwner === 'true' || isFirstOwner === true,
        features: features ? features.split(',').map(f => f.trim()) : [],
        phone,
        location,
        imgUrl: fileName,
      },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Щось пішло не так' });
  }
};

// like/unlike post
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Пост не знайдено' });
    }

    // For now, just increment likes count
    // In a real app, you'd want to track which users liked which posts
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({ message: 'Щось пішло не так' });
  }
};
