import _ from "lodash";
import "../style/file.css";

var MyApp = {};
MyApp.MyModule = (function () {
  const loadImage = () => {
    let base64link1 = require("../images/app-store.png");
    let myImg1 = document.querySelector(".app-store-image");
    myImg1.setAttribute("src", base64link1.default);

    let base64link2 = require("../images/google-play.png");
    let myImg2 = document.querySelector(".google-play-image");
    myImg2.setAttribute("src", base64link2.default);
  };

  return {
    loadImage,
  };
})();

MyApp.MyModule.loadImage();
