import * as $ from "jquery";
import Post from "./Post";
import json from "@assets/json";
import img from "@assets/someImg.jpg";
import imagePng from "@assets/youTube";
import xml from "@assets/data.xml";
import "./styles/style.scss";

const post = new Post("Webpack Post Title", imagePng);
$("pre").html(post.toString());

console.log("JSON:", json);
console.log("XML:", xml);
