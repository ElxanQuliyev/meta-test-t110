const apiConfig = {
    baseUrl : 'https://api.themoviedb.org/3/',
    apiKey: '2aa03d4a403769e7950d5c57f1efb2d4',
    orginalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
   w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,

}

export default apiConfig;