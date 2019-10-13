const livereload = require("easy-livereload");
const path = require("path");

const file_type_map = {
  jade: "html", // `index.jade` maps to `index.html`
  styl: "css", // `styles/site.styl` maps to `styles/site.css`
  scss: "css", // `styles/site.scss` maps to `styles/site.css`
  sass: "css", // `styles/site.scss` maps to `styles/site.css`
  less: "css" // `styles/site.scss` maps to `styles/site.css`
  // add the file type being edited and what you want it to be mapped to.
};
var file_type_regex = new RegExp(
  "\\.(" + Object.keys(file_type_map).join("|") + ")$"
);

const liveReload = (app, port) => {
  app.use(
    livereload(
      {
        app: app
      },
      () => {
        console.log("sdasdsa");
      }
    )
  );
};
module.exports = liveReload;
