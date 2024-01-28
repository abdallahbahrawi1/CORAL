function generateRandomString() {
  const randomNumber = Math.floor(Math.random() * 1000000000);
  const randomString = `#${String(randomNumber).padStart(9, '0')}`;
  return randomString;
}

console.log(generateRandomString())