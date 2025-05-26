const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://harimbuniversity:Hari.12%402003@helloficluster.pjitdvs.mongodb.net/hellofi?retryWrites=true&w=majority&appName=HelloFiCluster';
const client = new MongoClient(uri);

const sampleMobiles = [
  {
    _id: '1',
    name: 'iPhone 13 Pro',
    description: 'Latest iPhone with Pro camera system and A15 Bionic chip',
    imageUrl: '/images/iphone_13_image.png',
    basePrice: 82917  // 999 * 83
  },
  {
    _id: '2',
    name: 'Samsung Galaxy S21',
    description: 'Powerful Android flagship with amazing camera capabilities',
    imageUrl: '/images/galaxy.webp',
    basePrice: 66317  // 799 * 83
  },
  {
    _id: '3',
    name: 'Google Pixel 6',
    description: 'Best camera phone with pure Android experience',
    imageUrl: '/images/pixel.jpg',
    basePrice: 49717  // 599 * 83
  },
  {
    _id: '4',
    name: 'OnePlus 9',
    description: 'Flagship killer with Hasselblad camera system',
    imageUrl: '/images/oneplus.webp',
    basePrice: 58017  // 699 * 83
  },
  {
    _id: '5',
    name: 'iPhone 16',
    description: 'Newest iPhone with advanced features and design.',
    imageUrl: '/images/iphone_16.webp',
    basePrice: 107817  // 1299 * 83
  }
];

async function run() {
  try {
    await client.connect();
    const db = client.db('hellofi');
    const mobiles = db.collection('mobiles');
    await mobiles.deleteMany({}); // Optional: clear old data
    await mobiles.insertMany(sampleMobiles);
    console.log('Sample mobiles inserted!');
  } finally {
    await client.close();
  }
}

run().catch(console.dir); 