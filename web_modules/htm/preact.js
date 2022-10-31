import { p as preact_module } from '../common/preact.module-c2015350.js';
import require$$0 from '../htm.js';

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var preact = createCommonjsModule(function (module, exports) {
var e,t=((e=require$$0)&&"object"==typeof e&&"default"in e?e.default:e).bind(preact_module.h);exports.h=preact_module.h,exports.render=preact_module.render,exports.Component=preact_module.Component,exports.html=t;
});

var Component = preact.Component;
export default preact;
var h = preact.h;
var html = preact.html;
var render = preact.render;
export { Component, preact as __moduleExports, h, html, render };
