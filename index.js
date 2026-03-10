const express = require('express');
const mongoose = require('mongoose');

const app = express();

// استخدام express.json لتفسير البيانات في body الطلبات
app.use(express.json());

// الاتصال بقاعدة بيانات MongoDB
mongoose.connect('mongodb+srv://zywnyalsyd87:Password@cluster0.vvk9c.mongodb.net/APIDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false // تعطيل التخزين المؤقت للطلبات
})
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// إنشاء نموذج المستخدم
const User = mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true }
}));

// GET API: جلب جميع المستخدمين
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST API: إضافة مستخدم جديد
app.post('/users', async (req, res) => {
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    return res.status(400).json({ message: "All fields are required: name, age, email" });
  }

  const user = new User({ name, age, email });

  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// تحديد المنفذ
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// تم حذف الكود التالي لأنه غير ضروري في هذا السياق
