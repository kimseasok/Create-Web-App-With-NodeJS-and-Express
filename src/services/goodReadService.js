// key: y3sndkuyV0pZtXaagsDECQ
// secret: TaqsTIFwye96joNFYoIKORitVziGjYASDz6pS85yw8

function goodReadService() {
  function getBookById() {
    return new Promise((resolve, reject) => {
      resolve({ description: 'Out diescription' });
    });
  }

  return { getBookById };
}

module.exports = goodReadService();
