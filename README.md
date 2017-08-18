This is is backend-centered signup page built on `Koa.js`.

If you need the static HTML for legacy webapp, refer to branch `legacy`.

This version has no plan to follow origami in terms of:

* Sass. We plan to use postcss as bower is being deprecated, and since bower is the pillar of origami we shall use alternatives to bower and node-sass. Another reason is the c-binding for node-sass fails too often upon installation, which is not inducive to continuous integration.

* Front-end should be as simple as possible, because both css and js are hard to develop when logic becomes complex.

* Put most of login to backend.