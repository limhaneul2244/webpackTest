import plus from './plus.js';
import './style.css';
import img01 from './img01.jpg';

// DOMContentLoaded : DOM이 완성된 다음
document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `<img src="${img01}"/>`;
})
console.log(plus(3, 3))
