import * as $ from "jquery";
import React from "react";
import { createRoot } from "react-dom/client";
import Post from "./Post";
import json from "@assets/json";
import img from "@assets/someImg.jpg";
import yt from "@assets/youTube.png";
import imagePng from "@assets/youTube";
import xml from "@assets/data.xml";
import "./styles/style.scss";
import "./babel";

const post = new Post("Webpack Post Title", imagePng);
// $("pre").addClass("code").html(post.toString());

const App = () => {
  return (
    <div className="container">
      <h1>Webpack Course</h1>
      <hr />
      <pre></pre>
      <div className="imageStyle">Hello</div>
      <img src={img} alt="image" />
      <img src={yt} alt="image" />
    </div>
  );
};

const root = document.getElementById("root");
const rootElement = createRoot(root);
rootElement.render(<App />);

// console.log("JSON:", json);
// console.log("XML:", xml);
