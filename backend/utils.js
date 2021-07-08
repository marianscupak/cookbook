const fs = require('fs');

const findImages = (id) => {
  const images = [];
  
  fs.readdirSync(`public/${id}`).forEach(file => {
    images.push(file);
  });

  return images;
}

module.exports = {
  findImages
}