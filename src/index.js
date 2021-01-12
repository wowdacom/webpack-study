import _ from "lodash";
import "../style/file.css";

function component() {
  const element = document.createElement("div");

  // instead of Lodash, currently included via a script, is required for this line to work
  // Lodash, now imported by this script
  element.innerHTML = _.join(["Hello", "webpack", "I am coming!"], " ");
  element.classList.add("mystyle");

  return element;
}

document.body.appendChild(component());
