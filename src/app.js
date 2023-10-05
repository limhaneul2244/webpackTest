import plus from './plus.js';
import './style.css';
import img03 from './img03.png';

let env;
if (process.env.NODE_ENV === 'development') {
  env = dev;
} else {
  env = pro;
}

console.log(env);

// DOMContentLoaded : DOM이 완성된 다음
document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `<img src="${img03}"/>`;
})
console.log(plus(3, 3))