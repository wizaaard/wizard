import hljs from 'highlight.js';
import Marked from 'marked';

const renderer = new Marked.Renderer();

renderer.image = (href, _title, text): string =>
  `<div class="md-img-container">
  <img class="md-img" src="${href}" alt="${text}" />
  </div>`;

export const marked = Marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: code => {
    return hljs.highlightAuto(code).value;
  },
});
