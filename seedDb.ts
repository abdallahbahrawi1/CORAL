import db from './src/Database/Models/index';
const faker = require('faker');

function generateOrderNumber() {
  const randomNumber = Math.floor(Math.random() * 1000000000);
  return `#${String(randomNumber).padStart(9, '0')}`;
}

const commonCategories = [
  'Handbags',
  'Watches',
  'Skincare',
  'Jewelry',
  'Apparels',
  'Personal Care',
  'Sunglasses',
  'Wrist Watches',
  'Eye Wear',
  'Fargrance',
  'Electronics',
  'Home Decor',
  'Footwear',
  'Fitness Equipment',
  'Toys and Games',
  'Books',
  'Kitchen Appliances',
  'Furniture',
  'Sports Gear',
  'Music Instruments',
  'Garden Supplies',
  'Pet Care',
  'Travel Accessories',
  'Stationery',
  'Art and Craft',
  'Automotive',
  'Baby Products',
  'Camping Gear',
  'Outdoor Clothing',
  'Party Supplies',
  'Tech Gadgets',
  'Candles and Fragrances',
  'Beauty',
  'Health',
  'Office Supplies',
  'Gifts',
  'Food and Beverages',
  'Electrical Tools',
  'Home Improvement',
  'Smart Home Devices',
  'DIY Crafts'
];
const commonBrands = [
  'Zara',
  'Prada',
  'H&M',
  'Dolce & Gabbana',
  'Chanel',
  'Biba',
  'Nike',
  'Adidas',
  'Apple',
  'Samsung',
  'Sony',
  'Microsoft',
  'Toyota',
  'Honda',
  'Ford',
  'Coca-Cola',
  'Pepsi',
  'Amazon',
  'Google',
  'Facebook',
  'Twitter',
  'Instagram',
  "L'Oreal",
  'Maybelline',
  'Colgate',
  'Nestle',
  'Puma',
  'Reebok',
  'Levis',
  'Ray-Ban',
  'Canon',
  'Nikon',
  'Dell',
  'Lenovo',
  'HP',
  'Asus',
  'Casio',
  'LG',
  'Panasonic',
  'Hewlett-Packard',
  'Bosch',
  'Siemens',
  'Gillette',
  'Mango',
  'Forever 21',
  'Gap',
  'Under Armour',
  'Hugo Boss',
  'Calvin Klein',
  'Lacoste',
  'Ralph Lauren',
  'Tommy Hilfiger',
  'Timberland',
  'Converse',
  'Vans',
  'Gucci',
  'Versace',
  'Louis Vuitton',
  'Fendi',
  'Balenciaga',
  'Yves Saint Laurent',
  'Givenchy',
  'Prabal Gurung',
  'Valentino',
  'Burberry',
  'Michael Kors',
  'Coach',
  'Dior',
  'Christian Louboutin',
  'Alexander McQueen',
  'Bottega Veneta',
  'Jimmy Choo',
  'Marc Jacobs',
  'Stella McCartney',
  'Tiffany & Co.',
  'Hermès',
  'Chloé',
  'Celine',
  'Swarovski',
  'Rolex',
  'Cartier',
  'Omega',
  'Tag Heuer',
  'Fossil',
  'Guess',
  'Michael Michael Kors',
  'Tom Ford',
  'Balmain',
  'Topshop',
  'Lululemon',
  'Uniqlo',
  "Victoria's Secret",
  'Abercrombie & Fitch',
  'Aldo',
  'Bershka',
  'Boohoo',
  'Diesel',
  'Ecco',
  'Fila',
  'Gap Kids',
  'Abercrombie Kids',
  'Justice',
  'Old Navy',
  'Primark',
  'Superdry',
  'Swatch'
];
const logoImage = [
  'Images/Brands/zara.png',
  'Images/Brands/biba.png',
  'Images/Brands/hm.png',
  'Images/Brands/dolce.png',
  'Images/Brands/chanel.png',
  'Images/Brands/prada.png'
];
const iconPaths = [
  'Images/Category/eye_icon.png',
  'Images/Category/handbags_icon.png',
  'Images/Category/jewellery_icon.png',
  'Images/Category/skin_icon',
  'Images/Category/watches'
];
const imagePaths = ['Images/Category/care.png', 'Images/Category/handbag.png', 'Images/Category/sunglesses.png', 'Images/Category/watch.png'];
const mobileImagePaths = [
  'Images/Category/mapparels.png',
  'Images/Category/meyeware.png',
  'Images/Category/mfragrance.png',
  'Images/Category/mhandbags.png',
  'Images/Category/skincare.png'
];

const productImage = ['Images/Product/bag.png', 'Images/Product/brown.png', 'Images/Product/pink.png', 'Images/Product/duf.png'];

// Function to generate fake categories with your own image paths
const generateFakeCategory = (name, iconPaths, imagePaths, mobileImagePaths) => ({
  name,
  icon: getRandomPath(iconPaths),
  image: getRandomPath(imagePaths),
  image_mobile: getRandomPath(mobileImagePaths)
});

// Function to get a random path from an array
const getRandomPath = pathArray => pathArray[Math.floor(Math.random() * pathArray.length)];

// Generate fake categories with your own image paths
const fakeCategories = commonCategories.map(category => generateFakeCategory(category, iconPaths, imagePaths, mobileImagePaths));

// const generateFakeCategory = (name) => ({ name });

// // Function to generate a fake brand
const generateFakeBrand = (name, brandInmages) => ({
  name,
  logo: getRandomPath(logoImage)
});

// // Generate fake categories and brands
// const fakeCategories = commonCategories.map(generateFakeCategory);
const fakeBrands = commonBrands.map(brand => generateFakeBrand(brand, logoImage));

const generateFakeDiscount = () => {
  return {
    percentage: faker.random.number({ min: 0, max: 100 }),
    start_date: faker.date.between(
      new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      new Date(new Date().setFullYear(new Date().getFullYear()))
    ),
    expiry_date: faker.date.between(
      new Date(new Date().setFullYear(new Date().getFullYear())),
      new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    )
  };
};

const generateFakeProducts = (creartedCategories, createdBrands, creartedDiscount) => {
  return {
    name: faker.commerce.productName(),
    sub_title: faker.commerce.productAdjective(),
    model: faker.random.alphaNumeric(8),
    description: faker.commerce.productDescription(),
    price: faker.random.number({ min: 1, max: 450 }),
    stock_quantity: faker.random.number({ min: 0, max: 1000 }),
    discount_id: faker.random.arrayElement(creartedDiscount.map(discount => discount.id)),
    brand_id: faker.random.arrayElement(createdBrands.map(brand => brand.id)),
    category_id: faker.random.arrayElement(creartedCategories.map(category => category.id))
  };
};

// const generateFakeProductsImages = (creartedProducts) => {
//   return {
//     image_url: faker.random.arrayElement(productImage),
//     product_id:faker.random.arrayElement(creartedProducts.map((product) => product.id)),
//   };
// };

const generateFakeUser = () => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    mobile: faker.phone.phoneNumber(),
    birth_date: faker.date.between(
      new Date(new Date().setFullYear(new Date().getFullYear() - 80)),
      new Date(new Date().setFullYear(new Date().getFullYear() - 12))
    ),
    createdAt: faker.date.between(
      new Date(new Date().setFullYear(new Date().getFullYear() - 3)),
      new Date(new Date().setFullYear(new Date().getFullYear() ))
    )
  };
};
const generateFakeAddress = createdUsers => ({
  full_name: faker.name.firstName() + " " +faker.name.lastName(),
  country: faker.address.country(),
  city: faker.address.city(),
  street: faker.address.streetName(),
  phone: faker.phone.phoneNumber(),
  address_line1: faker.address.streetAddress(),
  address_line2: faker.address.secondaryAddress(),
  postal_code: faker.address.zipCode(),
  user_id: faker.random.arrayElement(createdUsers).id
});
const ratingProbabilities = [0.05, 0.1, 0.2, 0.3, 0.35]; // Adjust these probabilities as needed

// Generate a random rating based on probabilities
const getRandomRating = () => {
  const rand = Math.random();
  let cumulativeProbability = 0;

  for (let i = 0; i < ratingProbabilities.length; i++) {
    cumulativeProbability += ratingProbabilities[i];
    if (rand <= cumulativeProbability) {
      return i + 1; // Ratings are 1-indexed
    }
  }

  // In case of rounding errors or if probabilities don't sum up to 1
  return ratingProbabilities.length;
};

const generateFakeReviews = (createdProducts, createdUsers) => {
  return {
    comment: faker.lorem.sentence(),
    rating: getRandomRating(),
    product_id: faker.random.arrayElement(createdProducts.map(product => product.id)),
    user_id: faker.random.arrayElement(createdUsers.map(user => user.id))
  };
};

const generateFakeWishlist = (createdProducts, createdUsers) => {
  return {
    comment: faker.lorem.sentence(),
    product_id: faker.random.arrayElement(createdProducts.map(product => product.id)),
    user_id: faker.random.arrayElement(createdUsers.map(user => user.id))
  };
};

const generateFakeShoppinglist = (createdProducts, createdUsers) => {
  return {
    quantity: faker.random.number({ min: 1, max: 50 }),
    product_id: faker.random.arrayElement(createdProducts.map(product => product.id)),
    user_id: faker.random.arrayElement(createdUsers.map(user => user.id))
  };
};
// const generateOrders = (createdUsers, createdAdresses,createdProducts) => {
  // const orderDate = 
  // );

  // return {
  //   order_number: generateOrderNumber(),
  //   status: faker.random.arrayElement(['completed', 'processing', 'cancelled']),
  //   payment_method: faker.random.arrayElement(['card', 'cash', 'paypal', 'bank_transfer', 'crypto']),
  //   user_id: faker.random.arrayElement(createdUsers).id,
  //   address_id: faker.random.arrayElement(createdAdresses).id,
  //   order_date: orderDate,
  //   orderItems: Array.from({ length: faker.random.number({ min: 1, max: 10 }) }, () => {
  //     const createdAtForOrderItem = orderDate; // Use the same orderDate for orderItems
  //     return {
  //       quantity: faker.random.number({ min: 1, max: 50 }),
  //       price: faker.commerce.price(),
  //       product_id: faker.random.arrayElement(createdProducts.map(product => product.id)),
  //       createdAt: createdAtForOrderItem
  //     };
  //   })
  // };
// };
const generateOrders = (createdUsers, createdAdresses) => {
  return {
    order_number: generateOrderNumber(),
    status: faker.random.arrayElement(['completed', 'processing', 'cancelled']),
    payment_method: faker.random.arrayElement(['card', 'cash', 'paypal', 'bank_transfer', 'crypto']),
    user_id: faker.random.arrayElement(createdUsers).id,
    address_id: faker.random.arrayElement(createdAdresses).id,
    order_date:faker.date.between(
      new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      new Date(new Date().setFullYear(new Date().getFullYear())))
  };
};

const generateOrderItems = (createdProducts,orderDate, orderId) => {
  return {
    quantity: faker.random.number({ min: 1, max: 50 }),
    price: faker.commerce.price(),
    product_id: faker.random.arrayElement(createdProducts.map(product => product.id)),
    order_id: orderId,
    createdAt:orderDate
  };
};
const generateFakeSession = createdUsers => {
  const minutesLater = new Date();
  minutesLater.setMinutes(minutesLater.getMinutes() + 60);

  return {
    session_key: faker.random.alphaNumeric(20),
    user_id: faker.random.arrayElement(createdUsers.map(user => user.id)),
    expiry_date: minutesLater,
  };
};

export const populateDatabase = async () => {
  try {
    const createdCategories = await db.categories.bulkCreate(fakeCategories);
    // Insert fake brands into the database
    const createdBrands = await db.brands.bulkCreate(fakeBrands);
    // Generate and insert fake data for Discounts
    const fakeDiscount = Array.from({ length: 20 }, () => generateFakeDiscount());
    const creartedDiscount = await db.discounts.bulkCreate(fakeDiscount, { returning: true });

    // Generate and insert fake data for Users
    const fakeUsers = Array.from({ length: 500 }, () => generateFakeUser());
    const createdUsers = await db.users.bulkCreate(fakeUsers, { returning: true });

    // Generate and insert fake data for Adresses
    const fakeAdresses = Array.from({ length: 1000 }, () => generateFakeAddress(createdUsers));
    const createdAdresses = await db.addresses.bulkCreate(fakeAdresses, { returning: true });

    // Generate and insert fake data for Products
    const fakeProducts = Array.from({ length: 1000 }, () => generateFakeProducts(createdCategories, createdBrands, creartedDiscount));
    const createdProducts = await db.products.bulkCreate(fakeProducts, { returning: true });
    //Generate and insert fake data for Products Images
    const fakeProductsImages = createdProducts.map(product => ({
      image_url: faker.random.arrayElement(productImage),
      product_id: product.id
    }));
    const createdProductsImages = await db.productsImages.bulkCreate(fakeProductsImages, { returning: true });
    // Generate and insert fake data for Reviews
    const fakeReviews = Array.from({ length: 10000 }, () => generateFakeReviews(createdProducts, createdUsers));
    const createdReviews = await db.reviews.bulkCreate(fakeReviews, { returning: true });

    // Generate and insert fake data for Wishlists
    const fakeWishlist = Array.from({ length: 250 }, () => generateFakeWishlist(createdProducts, createdUsers));
    const createdWishlist = await db.wishlists.bulkCreate(fakeWishlist, { returning: true });

    // Generate and insert fake data for ShoppingCarts
    const fakeShoppingCart = Array.from({ length: 200 }, () => generateFakeShoppinglist(createdProducts, createdUsers));
    const createdShoppingCarts = await db.shoppingCarts.bulkCreate(fakeShoppingCart, { returning: true });

    // Generate and insert fake data for Orders
    const fakeOrders = Array.from({ length: 1000 }, () => generateOrders(createdUsers, createdAdresses));
    const createdOrders = await db.orders.bulkCreate(fakeOrders, { returning: true });
    // Generate and insert fake data for OrderItems
    // const fakeOrderItems = Array.from({ length: 5000 }, () => generateOrderItems(createdProducts, createdOrders));
    // const createdOrderItems = await db.ordersItems.bulkCreate(fakeOrderItems, { returning: true });
    const fakeOrderItems = createdOrders.flatMap(order => 
      Array.from({ length: 5 }, () => generateOrderItems(createdProducts, order.order_date, order.id))
    );
    
    // Bulk create fake order items
    const createdOrderItems = await db.ordersItems.bulkCreate(fakeOrderItems, { returning: true });
    // Generate and insert fake data for Sessions
    const fakeSessions = Array.from({ length: 200 }, () => generateFakeSession(createdUsers));
    const createdSessions = await db.sessions.bulkCreate(fakeSessions, { returning: true });

    console.log('Fake data inserted successfully.');
  } catch (error) {
    console.error('Error inserting fake data:', error);
  } finally {
    // Close the database connection
    await db.sequelize.close();
  }
};

populateDatabase();
