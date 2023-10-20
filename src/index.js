import Post from "./Post";
import json from "@assets/json";
import img from "@assets/someImg.jpg";
import imagePng from "@assets/youTube";
import xml from "@assets/data.xml";
import "./styles/style.css";

const post = new Post("Webpack Post Title", imagePng);

console.log("Post to String", post.toString());

console.log("JSON:", json);
console.log("XML:", xml);
