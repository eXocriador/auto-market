import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    username: { type: String },
    title: { type: String, required: true },
    text: { type: String, required: true },
    imgUrl: { type: String, default: "" }, 
    price: { type: Number, required: true },
    views: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    
    // Основні характеристики
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    fuel: { type: String, required: true },
    drive: { type: String, required: true },
    engine: { type: String, required: true },
    transmission: { type: String, required: true },
    mileage: { type: Number, required: true },
    numberPlate: { type: String },
    
    // Додаткові характеристики
    color: { type: String },
    bodyType: { type: String }, // седан, хетчбек, універсал, кросовер, пікап
    power: { type: Number }, // потужність в к.с.
    doors: { type: Number, default: 4 },
    
    // Стан автомобіля
    condition: { type: String, enum: ['excellent', 'good', 'fair', 'poor'], default: 'good' },
    hasAccident: { type: Boolean, default: false },
    accidentDescription: { type: String },
    defects: [{ type: String }], // масив дефектів
    isCustomsCleared: { type: Boolean, default: true },
    isFirstOwner: { type: Boolean, default: false },
    
    // Додаткові опції
    features: [{ type: String }], // кондиціонер, навігація, тощо
    
    // Контактна інформація
    phone: { type: String },
    location: { type: String },
    
    // Статистика
    likes: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
