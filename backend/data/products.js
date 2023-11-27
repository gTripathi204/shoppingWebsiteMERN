const mongooes = require("mongoose");

const products = [
  {
    name: "Apple Airpods",
    image: "/images/airpods1.jpg",
    description:
      "AirPods Pro feature up to 2x more Active Noise Cancellation, plus Adaptive Transparency, and Personalised Spatial Audio with dynamic head tracking for immersive sound. Now with multiple ear tips (XS, S, M, L) and up to 6 hours of listening time.",
    brand: "Apple",
    catagory: "Electronic",
    price: 8999,
    discont: 5,
    countInStock: 3,
    rating: 4,
    numReviews: 10,
  },
  {
    name: "Micromax 1N",
    image: "/images/micromaxInB.jpg",
    description:
      " Micromax J22 powerpacked Feature Phone with Soft &Vibrant Keypad ; 22 REGIONAL LANGUAGES READ & WRITE Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Santhali, Oriya, Punjabi, Sanskrit, Sindhi, Tamil, Telugu, Urdu and English ; Automatic CALL RECORDING ; ANTI-THEFT ; 1000 mAhBattery with Super Battery Mode ; Dual Sim ; FM Radio ; Music ; Bright Torch ; Videos",
    brand: "Micromax",
    catagory: "Electronic",
    price: 8999,
    discont: 5,
    countInStock: 7,
    rating: 4,
    numReviews: 10,
  },
  {
    name: "Canon EOS 3000D DSLR",
    image: "/images/camera.jpg",
    description:
      " If you are a photography enthusiast, then the Canon EOS 3000D DSLR Camera is a must-have gadget. Featuring an 18 MP (APS-C) CMOS sensor and the DIGIC 4+ imaging processor, you can capture amazing photos of your subject at all times, even in low-light conditions. Moreover, the remote Live View function lets you control this camera remotely using your smartphone so you can capture amazing photos even from a distance. ",
    brand: "Canon",
    catagory: "Electronic",
    price: 32400,
    discont: 15,
    countInStock: 15,
    rating: 3.9,
    numReviews: 200,
  },
  {
    name: "Echo Dot (3rd Gen)",
    image: "/images/alexa.jpg",
    description:
      "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small spaces. Improved speaker quality - Better speaker quality than Echo Dot Gen 2 for richer and louder sound. Pair with a second Echo Dot for stereo sound. Voice control your music - Stream songs from Amazon Music, Apple Music, Sirius XM, Spotify, Deezer, and others. You can also listen to audiobooks from Audible. Ready to help - Ask Alexa to play music, answer questions, read the news, check the weather, set alarms, control compatible smart home devices, and more.",
    brand: "Amazon",
    catagory: "Electronic",
    price: 1945,
    discont: 10,
    countInStock: 200,
    rating: 4,
    numReviews: 102,
  },
  {
    name: "Logitech B100",
    image: "/images/mouse.jpg",
    description:
      "You can plug the Logitech B100 wired optical mouse into the USB port of your computer or laptop, and it will be ready for use. It sports an ambidextrous design that lets both right- and left-handed users use it conveniently. Plus, its robust build ensures a reliable lifespan.",
    brand: "Logitech",
    catagory: "Electronic",
    price: 365,
    discont: 0,
    countInStock: 150,
    rating: 4.7,
    numReviews: 300,
  },
  {
    name: "SONY PlayStation 5 ",
    image: "/images/playstation.jpg",
    description:
      "Brace yourself for a whole new world of possibilities as the PS5 unleashes unparalleled power and innovation. Get ready to elevate your gaming experience to new heights with the Sony PlayStation 5 Console. Unleash the power of play, immerse yourself in stunning visuals, and explore a world of endless possibilities. With the PS5, gaming will never be the same again.",
    brand: "SONY",
    catagory: "Electronic",
    price: 200,
    discont: 10,
    countInStock: 100,
    rating: 4.6,
    numReviews: 1200,
  },
];

module.exports = products ;
