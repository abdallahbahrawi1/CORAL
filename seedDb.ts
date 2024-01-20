
const db = require('./src/Database/Models/index');
const faker = require('faker');

function generateOrderNumber() {
    const randomNumber = Math.floor(Math.random() * 1000000000); 
    return `#${String(randomNumber).padStart(9, '0')}`; 
}

const commonCategories = [
  "Handbags",
  "Watches",
  "Skincare",
  "Jewelry",
  "Apparels",
  "Personal Care",
  "Sun Glasses",
  "Wrist Watches",
  "Eye Wear",
  "Electronics",
  "Home Decor",
  "Footwear",
  "Fitness Equipment",
  "Toys and Games",
  "Books",
  "Kitchen Appliances",
  "Furniture",
  "Sports Gear",
  "Music Instruments",
  "Garden Supplies",
  "Pet Care",
  "Travel Accessories",
  "Stationery",
  "Art and Craft",
  "Automotive",
  "Baby Products",
  "Camping Gear",
  "Outdoor Clothing",
  "Party Supplies",
  "Tech Gadgets",
  "Candles and Fragrances",
  "Beauty",
  "Health",
  "Office Supplies",
  "Gifts",
  "Food and Beverages",
  "Electrical Tools",
  "Home Improvement",
  "Smart Home Devices",
  "DIY Crafts",
];
const commonBrands = [
  "Zara",
  "Prada",
  "H&M",
  "Dolce & Gabbana",
  "Chanel",
  "Biba",
  "Nike",
  "Adidas",
  "Apple",
  "Samsung",
  "Sony",
  "Microsoft",
  "Toyota",
  "Honda",
  "Ford",
  "Coca-Cola",
  "Pepsi",
  "Amazon",
  "Google",
  "Facebook",
  "Twitter",
  "Instagram",
  "L'Oreal",
  "Maybelline",
  "Colgate",
  "Nestle",
  "Puma",
  "Reebok",
  "Levis",
  "Ray-Ban",
  "Canon",
  "Nikon",
  "Dell",
  "Lenovo",
  "HP",
  "Asus",
  "Casio",
  "LG",
  "Panasonic",
  "Hewlett-Packard",
  "Bosch",
  "Siemens",
  "Gillette",
  "Mango",
  "Forever 21",
  "Gap",
  "Under Armour",
  "Hugo Boss",
  "Calvin Klein",
  "Lacoste",
  "Ralph Lauren",
  "Tommy Hilfiger",
  "Timberland",
  "Converse",
  "Vans",
  "Gucci",
  "Versace",
  "Louis Vuitton",
  "Fendi",
  "Balenciaga",
  "Yves Saint Laurent",
  "Givenchy",
  "Prabal Gurung",
  "Valentino",
  "Burberry",
  "Michael Kors",
  "Coach",
  "Dior",
  "Christian Louboutin",
  "Alexander McQueen",
  "Bottega Veneta",
  "Jimmy Choo",
  "Marc Jacobs",
  "Stella McCartney",
  "Tiffany & Co.",
  "Hermès",
  "Chloé",
  "Celine",
  "Swarovski",
  "Rolex",
  "Cartier",
  "Omega",
  "Tag Heuer",
  "Fossil",
  "Guess",
  "Michael Michael Kors",
  "Tom Ford",
  "Balmain",
  "Topshop",
  "Lululemon",
  "Uniqlo",
  "Victoria's Secret",
  "Abercrombie & Fitch",
  "Aldo",
  "Bershka",
  "Boohoo",
  "Diesel",
  "Ecco",
  "Fila",
  "Gap Kids",
  "Abercrombie Kids",
  "Justice",
  "Old Navy",
  "Primark",
  "Superdry",
  "Swatch",
];


const generateFakeCategory = (name) => ({ name });

// Function to generate a fake brand
const generateFakeBrand = (name) => ({ name });

// Generate fake categories and brands
const fakeCategories = commonCategories.map(generateFakeCategory);
const fakeBrands = commonBrands.map(generateFakeBrand);

const generateFakeDiscount = () => {
  return {
    percentage:faker.random.number({ min: 0,max:100}),
    start_date:faker.date.past({ years: 1 }),
    expiry_date:faker.date.future({ years: 1 })
  };
};

const generateFakeProducts = (creartedCategories,createdBrands,creartedDiscount) => {
  return {
    name: faker.commerce.productName(),
    sub_title:faker.commerce.productAdjective(),
    model:faker.random.alphaNumeric(8),
    description :faker.commerce.productDescription(), 
    price :faker.commerce.price(), 
    stock_quantity :faker.random.number({ min: 0,max:2000}),
    discount_id:faker.random.arrayElement(creartedDiscount.map((discount) => discount.id)),
    brand_id :faker.random.arrayElement(createdBrands.map((brand) => brand.id)),
    category_id :faker.random.arrayElement(creartedCategories.map((category) => category.id))
    
  };
};


const generateFakeUser = () => {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      first_name:faker.name.firstName(),
      last_name:faker.name.lastName(),
      mobile:faker.phone.phoneNumber(),
      birth_date: faker.date.between('1950-01-01', '2000-12-31').toISOString().split('T')[0]
    };
  };
  const generateFakeAddress = (createdUsers) => ({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    country: faker.address.country(),
    city: faker.address.city(),
    street: faker.address.streetName(),
    phone: faker.phone.phoneNumber(),
    address_line1: faker.address.streetAddress(),
    address_line2: faker.address.secondaryAddress(),
    postal_code: faker.address.zipCode(),
    user_id: faker.random.arrayElement(createdUsers).id,
  });

  const generateFakeReviews = (createdProducts,createdUsers) => {
    return {
      comment: faker.lorem.sentence(),
      rating: faker.random.number({ min: 1, max: 5 }),
      product_id: faker.random.arrayElement(createdProducts.map((product) => product.id)), 
      user_id:faker.random.arrayElement(createdUsers.map((user) => user.id)),
    };
  };
  
  
  const generateFakeWishlist = (createdProducts,createdUsers) => {
    return {
      comment: faker.lorem.sentence(),
      product_id: faker.random.arrayElement(createdProducts.map((product) => product.id)), 
      user_id:faker.random.arrayElement(createdUsers.map((user) => user.id)),
    };
  };
  
    
  const generateFakeShoppinglist = (createdProducts,createdUsers) => {
    return {
      quantity:faker.random.number({ min: 1 ,max:100}),
      product_id: faker.random.arrayElement(createdProducts.map((product) => product.id)), 
      user_id:faker.random.arrayElement(createdUsers.map((user) => user.id)),
    };
  };

  const generateOrders = (createdUsers,createdAdresses) => {
    return {
        order_number: generateOrderNumber(),
        status: faker.random.arrayElement(['completed', 'processing', 'cancelled']),
        payment_method: faker.random.arrayElement(['card', 'cash', 'paypal', 'bank_transfer', 'crypto']),
        user_id: faker.random.arrayElement(createdUsers).id,
        address_id: faker.random.arrayElement(createdAdresses).id,


    }
    };

  
    const generateOrderItems = (createdProducts,createdOrders) => {
      return {
          quantity:faker.random.number({ min: 1, max:100}),
          price :faker.commerce.price(), 
          product_id: faker.random.arrayElement(createdProducts.map((product) => product.id)),
          order_id: faker.random.arrayElement(createdOrders.map((order) => order.id)),
        }
      };
    const generateFakeSession = (createdUsers) => {
      // Calculate the expiry date 6 hours from now
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 6);
  
      // Format the expiry date as a string in ISO format
      const formattedExpiryDate = expiryDate.toISOString();
  
      return {
          session_key: faker.random.alphaNumeric(20),
          user_id: faker.random.arrayElement(createdUsers.map((user) => user.id)),
          expiry_date: formattedExpiryDate,
      };
  };
  
  
 
  export const populateDatabase = async () => {
    try {
   
      const createdCategories=await db.categories.bulkCreate(fakeCategories);
      // Insert fake brands into the database
      const createdBrands=await db.brands.bulkCreate(fakeBrands);
      // Generate and insert fake data for Discounts
      const fakeDiscount = Array.from({ length: 20 }, () => generateFakeDiscount());
      const creartedDiscount = await db.discounts.bulkCreate(fakeDiscount, { returning: true });
  
      // Generate and insert fake data for Users
      const fakeUsers = Array.from({ length: 50 }, () => generateFakeUser());
      const createdUsers = await db.users.bulkCreate(fakeUsers, { returning: true });

   // Generate and insert fake data for Adresses
        const fakeAdresses = Array.from({ length: 100 }, () => generateFakeAddress(createdUsers));
        const createdAdresses = await db.addresses.bulkCreate(fakeAdresses, { returning: true });

      // Generate and insert fake data for Products
      const fakeProducts = Array.from({ length: 200 }, () => generateFakeProducts(createdCategories, createdBrands, creartedDiscount));
      const createdProducts = await db.products.bulkCreate(fakeProducts, { returning: true });
  
      // Generate and insert fake data for Reviews
      const fakeReviews = Array.from({ length: 100 }, () => generateFakeReviews(createdProducts, createdUsers));
      const createdReviews = await db.reviews.bulkCreate(fakeReviews, { returning: true });
  
      // Generate and insert fake data for Wishlists
      const fakeWishlist = Array.from({ length: 20 }, () => generateFakeWishlist(createdProducts, createdUsers));
      const createdWishlist = await db.wishlists.bulkCreate(fakeWishlist, { returning: true });
  
      // Generate and insert fake data for ShoppingCarts
      const fakeShoppingCart = Array.from({ length: 20 }, () => generateFakeShoppinglist(createdProducts, createdUsers));
      const createdShoppingCarts = await db.shoppingCarts.bulkCreate(fakeShoppingCart, { returning: true });
  
      // Generate and insert fake data for Orders
      const fakeOrders = Array.from({ length: 100 }, () => generateOrders(createdUsers,createdAdresses));
      const createdOrders = await db.orders.bulkCreate(fakeOrders, { returning: true });
      // Generate and insert fake data for OrderItems
      const fakeOrderItems = Array.from({ length: 200 }, () => generateOrderItems(createdProducts,createdOrders));
      const createdOrderItems = await db.ordersItems.bulkCreate(fakeOrderItems, { returning: true })
  
      // Generate and insert fake data for Sessions
      const fakeSessions = Array.from({ length: 30 }, () => generateFakeSession(createdUsers));
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
