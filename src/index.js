import Post from "./Post";
import json from "./assets/json";
import img from "./assets/someImg.jpg";
import imagePng from "./assets/youTube.png";
import "./styles/style.css";

const post = new Post("Webpack Post Title", img);

console.log("Post to String", post.toString());

console.log("JSON:", json);
