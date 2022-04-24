
console.log('hello');

import './circus.css'

import { Remarkable } from 'remarkable';
import hljs from 'highlight.js'; // https://highlightjs.org/

// Actual default values
var md = new Remarkable({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ''; // use external default escaping
  }
});

import svelte from './docs/svelte.md?raw';

document.getElementById('content').innerHTML = md.render(svelte);