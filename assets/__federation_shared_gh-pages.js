import { a as getAugmentedNamespace, c as commonjsGlobal, g as getDefaultExportFromCjs } from './_commonjsHelpers.js';

var lib$1 = {};

const __viteBrowserExternal = {};

const __viteBrowserExternal$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: __viteBrowserExternal
}, Symbol.toStringTag, { value: 'Module' }));

const require$$1$1 = /*@__PURE__*/getAugmentedNamespace(__viteBrowserExternal$1);

var escapeStringRegexp$1;
var hasRequiredEscapeStringRegexp$1;

function requireEscapeStringRegexp$1 () {
	if (hasRequiredEscapeStringRegexp$1) return escapeStringRegexp$1;
	hasRequiredEscapeStringRegexp$1 = 1;

	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

	escapeStringRegexp$1 = function (str) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}

		return str.replace(matchOperatorsRe, '\\$&');
	};
	return escapeStringRegexp$1;
}

var trimRepeated;
var hasRequiredTrimRepeated;

function requireTrimRepeated () {
	if (hasRequiredTrimRepeated) return trimRepeated;
	hasRequiredTrimRepeated = 1;
	var escapeStringRegexp = requireEscapeStringRegexp$1();

	trimRepeated = function (str, target) {
		if (typeof str !== 'string' || typeof target !== 'string') {
			throw new TypeError('Expected a string');
		}

		return str.replace(new RegExp('(?:' + escapeStringRegexp(target) + '){2,}', 'g'), target);
	};
	return trimRepeated;
}

var filenameReservedRegex = {exports: {}};

var hasRequiredFilenameReservedRegex;

function requireFilenameReservedRegex () {
	if (hasRequiredFilenameReservedRegex) return filenameReservedRegex.exports;
	hasRequiredFilenameReservedRegex = 1;
	/* eslint-disable no-control-regex */
	// TODO: remove parens when Node.js 6 is targeted. Node.js 4 barfs at it.
	filenameReservedRegex.exports = () => (/[<>:"\/\\|?*\x00-\x1F]/g);
	filenameReservedRegex.exports.windowsNames = () => (/^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i);
	return filenameReservedRegex.exports;
}

var escapeStringRegexp;
var hasRequiredEscapeStringRegexp;

function requireEscapeStringRegexp () {
	if (hasRequiredEscapeStringRegexp) return escapeStringRegexp;
	hasRequiredEscapeStringRegexp = 1;

	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

	escapeStringRegexp = function (str) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}

		return str.replace(matchOperatorsRe, '\\$&');
	};
	return escapeStringRegexp;
}

var stripOuter;
var hasRequiredStripOuter;

function requireStripOuter () {
	if (hasRequiredStripOuter) return stripOuter;
	hasRequiredStripOuter = 1;
	var escapeStringRegexp = requireEscapeStringRegexp();

	stripOuter = function (str, sub) {
		if (typeof str !== 'string' || typeof sub !== 'string') {
			throw new TypeError();
		}

		sub = escapeStringRegexp(sub);
		return str.replace(new RegExp('^' + sub + '|' + sub + '$', 'g'), '');
	};
	return stripOuter;
}

var filenamify_1$1;
var hasRequiredFilenamify$1;

function requireFilenamify$1 () {
	if (hasRequiredFilenamify$1) return filenamify_1$1;
	hasRequiredFilenamify$1 = 1;
	const trimRepeated = requireTrimRepeated();
	const filenameReservedRegex = requireFilenameReservedRegex();
	const stripOuter = requireStripOuter();

	// Doesn't make sense to have longer filenames
	const MAX_FILENAME_LENGTH = 100;

	const reControlChars = /[\u0000-\u001f\u0080-\u009f]/g; // eslint-disable-line no-control-regex
	const reRelativePath = /^\.+/;
	const reTrailingPeriods = /\.+$/;

	const filenamify = (string, options = {}) => {
		if (typeof string !== 'string') {
			throw new TypeError('Expected a string');
		}

		const replacement = options.replacement === undefined ? '!' : options.replacement;

		if (filenameReservedRegex().test(replacement) && reControlChars.test(replacement)) {
			throw new Error('Replacement string cannot contain reserved filename characters');
		}

		string = string.replace(filenameReservedRegex(), replacement);
		string = string.replace(reControlChars, replacement);
		string = string.replace(reRelativePath, replacement);
		string = string.replace(reTrailingPeriods, '');

		if (replacement.length > 0) {
			string = trimRepeated(string, replacement);
			string = string.length > 1 ? stripOuter(string, replacement) : string;
		}

		string = filenameReservedRegex.windowsNames().test(string) ? string + replacement : string;
		string = string.slice(0, typeof options.maxLength === 'number' ? options.maxLength : MAX_FILENAME_LENGTH);

		return string;
	};

	filenamify_1$1 = filenamify;
	return filenamify_1$1;
}

var filenamifyPath_1;
var hasRequiredFilenamifyPath;

function requireFilenamifyPath () {
	if (hasRequiredFilenamifyPath) return filenamifyPath_1;
	hasRequiredFilenamifyPath = 1;
	const path = require$$1$1;
	const filenamify = requireFilenamify$1();

	const filenamifyPath = (filePath, options) => {
		filePath = path.resolve(filePath);
		return path.join(path.dirname(filePath), filenamify(path.basename(filePath), options));
	};

	filenamifyPath_1 = filenamifyPath;
	return filenamifyPath_1;
}

var filenamify_1;
var hasRequiredFilenamify;

function requireFilenamify () {
	if (hasRequiredFilenamify) return filenamify_1;
	hasRequiredFilenamify = 1;
	const filenamify = requireFilenamify$1();
	const filenamifyPath = requireFilenamifyPath();

	const filenamifyCombined = filenamify;
	filenamifyCombined.path = filenamifyPath;

	filenamify_1 = filenamify;
	return filenamify_1;
}

var commondir;
var hasRequiredCommondir;

function requireCommondir () {
	if (hasRequiredCommondir) return commondir;
	hasRequiredCommondir = 1;
	var path = require$$1$1;

	commondir = function (basedir, relfiles) {
	    if (relfiles) {
	        var files = relfiles.map(function (r) {
	            return path.resolve(basedir, r);
	        });
	    }
	    else {
	        var files = basedir;
	    }
	    
	    var res = files.slice(1).reduce(function (ps, file) {
	        if (!file.match(/^([A-Za-z]:)?\/|\\/)) {
	            throw new Error('relative path without a basedir');
	        }
	        
	        var xs = file.split(/\/+|\\+/);
	        for (
	            var i = 0;
	            ps[i] === xs[i] && i < Math.min(ps.length, xs.length);
	            i++
	        );
	        return ps.slice(0, i);
	    }, files[0].split(/\/+|\\+/));
	    
	    // Windows correctly handles paths with forward-slashes
	    return res.length > 1 ? res.join('/') : '/'
	};
	return commondir;
}

var pkgDir = {exports: {}};

var findUp = {exports: {}};

var locatePath = {exports: {}};

var pLocate = {exports: {}};

var pLimit = {exports: {}};

var pTry = {exports: {}};

var hasRequiredPTry;

function requirePTry () {
	if (hasRequiredPTry) return pTry.exports;
	hasRequiredPTry = 1;

	const pTry$1 = (fn, ...arguments_) => new Promise(resolve => {
		resolve(fn(...arguments_));
	});

	pTry.exports = pTry$1;
	// TODO: remove this in the next major version
	pTry.exports.default = pTry$1;
	return pTry.exports;
}

var hasRequiredPLimit;

function requirePLimit () {
	if (hasRequiredPLimit) return pLimit.exports;
	hasRequiredPLimit = 1;
	const pTry = requirePTry();

	const pLimit$1 = concurrency => {
		if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
			return Promise.reject(new TypeError('Expected `concurrency` to be a number from 1 and up'));
		}

		const queue = [];
		let activeCount = 0;

		const next = () => {
			activeCount--;

			if (queue.length > 0) {
				queue.shift()();
			}
		};

		const run = (fn, resolve, ...args) => {
			activeCount++;

			const result = pTry(fn, ...args);

			resolve(result);

			result.then(next, next);
		};

		const enqueue = (fn, resolve, ...args) => {
			if (activeCount < concurrency) {
				run(fn, resolve, ...args);
			} else {
				queue.push(run.bind(null, fn, resolve, ...args));
			}
		};

		const generator = (fn, ...args) => new Promise(resolve => enqueue(fn, resolve, ...args));
		Object.defineProperties(generator, {
			activeCount: {
				get: () => activeCount
			},
			pendingCount: {
				get: () => queue.length
			},
			clearQueue: {
				value: () => {
					queue.length = 0;
				}
			}
		});

		return generator;
	};

	pLimit.exports = pLimit$1;
	pLimit.exports.default = pLimit$1;
	return pLimit.exports;
}

var hasRequiredPLocate;

function requirePLocate () {
	if (hasRequiredPLocate) return pLocate.exports;
	hasRequiredPLocate = 1;
	const pLimit = requirePLimit();

	class EndError extends Error {
		constructor(value) {
			super();
			this.value = value;
		}
	}

	// The input can also be a promise, so we await it
	const testElement = async (element, tester) => tester(await element);

	// The input can also be a promise, so we `Promise.all()` them both
	const finder = async element => {
		const values = await Promise.all(element);
		if (values[1] === true) {
			throw new EndError(values[0]);
		}

		return false;
	};

	const pLocate$1 = async (iterable, tester, options) => {
		options = {
			concurrency: Infinity,
			preserveOrder: true,
			...options
		};

		const limit = pLimit(options.concurrency);

		// Start all the promises concurrently with optional limit
		const items = [...iterable].map(element => [element, limit(testElement, element, tester)]);

		// Check the promises either serially or concurrently
		const checkLimit = pLimit(options.preserveOrder ? 1 : Infinity);

		try {
			await Promise.all(items.map(element => checkLimit(finder, element)));
		} catch (error) {
			if (error instanceof EndError) {
				return error.value;
			}

			throw error;
		}
	};

	pLocate.exports = pLocate$1;
	// TODO: Remove this for the next major release
	pLocate.exports.default = pLocate$1;
	return pLocate.exports;
}

var hasRequiredLocatePath;

function requireLocatePath () {
	if (hasRequiredLocatePath) return locatePath.exports;
	hasRequiredLocatePath = 1;
	const path = require$$1$1;
	const fs = require$$1$1;
	const {promisify} = require$$1$1;
	const pLocate = requirePLocate();

	const fsStat = promisify(fs.stat);
	const fsLStat = promisify(fs.lstat);

	const typeMappings = {
		directory: 'isDirectory',
		file: 'isFile'
	};

	function checkType({type}) {
		if (type in typeMappings) {
			return;
		}

		throw new Error(`Invalid type specified: ${type}`);
	}

	const matchType = (type, stat) => type === undefined || stat[typeMappings[type]]();

	locatePath.exports = async (paths, options) => {
		options = {
			cwd: process.cwd(),
			type: 'file',
			allowSymlinks: true,
			...options
		};
		checkType(options);
		const statFn = options.allowSymlinks ? fsStat : fsLStat;

		return pLocate(paths, async path_ => {
			try {
				const stat = await statFn(path.resolve(options.cwd, path_));
				return matchType(options.type, stat);
			} catch (_) {
				return false;
			}
		}, options);
	};

	locatePath.exports.sync = (paths, options) => {
		options = {
			cwd: process.cwd(),
			allowSymlinks: true,
			type: 'file',
			...options
		};
		checkType(options);
		const statFn = options.allowSymlinks ? fs.statSync : fs.lstatSync;

		for (const path_ of paths) {
			try {
				const stat = statFn(path.resolve(options.cwd, path_));

				if (matchType(options.type, stat)) {
					return path_;
				}
			} catch (_) {
			}
		}
	};
	return locatePath.exports;
}

var pathExists = {exports: {}};

var hasRequiredPathExists$1;

function requirePathExists$1 () {
	if (hasRequiredPathExists$1) return pathExists.exports;
	hasRequiredPathExists$1 = 1;
	const fs = require$$1$1;
	const {promisify} = require$$1$1;

	const pAccess = promisify(fs.access);

	pathExists.exports = async path => {
		try {
			await pAccess(path);
			return true;
		} catch (_) {
			return false;
		}
	};

	pathExists.exports.sync = path => {
		try {
			fs.accessSync(path);
			return true;
		} catch (_) {
			return false;
		}
	};
	return pathExists.exports;
}

var hasRequiredFindUp;

function requireFindUp () {
	if (hasRequiredFindUp) return findUp.exports;
	hasRequiredFindUp = 1;
	(function (module) {
		const path = require$$1$1;
		const locatePath = requireLocatePath();
		const pathExists = requirePathExists$1();

		const stop = Symbol('findUp.stop');

		module.exports = async (name, options = {}) => {
			let directory = path.resolve(options.cwd || '');
			const {root} = path.parse(directory);
			const paths = [].concat(name);

			const runMatcher = async locateOptions => {
				if (typeof name !== 'function') {
					return locatePath(paths, locateOptions);
				}

				const foundPath = await name(locateOptions.cwd);
				if (typeof foundPath === 'string') {
					return locatePath([foundPath], locateOptions);
				}

				return foundPath;
			};

			// eslint-disable-next-line no-constant-condition
			while (true) {
				// eslint-disable-next-line no-await-in-loop
				const foundPath = await runMatcher({...options, cwd: directory});

				if (foundPath === stop) {
					return;
				}

				if (foundPath) {
					return path.resolve(directory, foundPath);
				}

				if (directory === root) {
					return;
				}

				directory = path.dirname(directory);
			}
		};

		module.exports.sync = (name, options = {}) => {
			let directory = path.resolve(options.cwd || '');
			const {root} = path.parse(directory);
			const paths = [].concat(name);

			const runMatcher = locateOptions => {
				if (typeof name !== 'function') {
					return locatePath.sync(paths, locateOptions);
				}

				const foundPath = name(locateOptions.cwd);
				if (typeof foundPath === 'string') {
					return locatePath.sync([foundPath], locateOptions);
				}

				return foundPath;
			};

			// eslint-disable-next-line no-constant-condition
			while (true) {
				const foundPath = runMatcher({...options, cwd: directory});

				if (foundPath === stop) {
					return;
				}

				if (foundPath) {
					return path.resolve(directory, foundPath);
				}

				if (directory === root) {
					return;
				}

				directory = path.dirname(directory);
			}
		};

		module.exports.exists = pathExists;

		module.exports.sync.exists = pathExists.sync;

		module.exports.stop = stop; 
	} (findUp));
	return findUp.exports;
}

var hasRequiredPkgDir;

function requirePkgDir () {
	if (hasRequiredPkgDir) return pkgDir.exports;
	hasRequiredPkgDir = 1;
	const path = require$$1$1;
	const findUp = requireFindUp();

	const pkgDir$1 = async cwd => {
		const filePath = await findUp('package.json', {cwd});
		return filePath && path.dirname(filePath);
	};

	pkgDir.exports = pkgDir$1;
	// TODO: Remove this for the next major release
	pkgDir.exports.default = pkgDir$1;

	pkgDir.exports.sync = cwd => {
		const filePath = findUp.sync('package.json', {cwd});
		return filePath && path.dirname(filePath);
	};
	return pkgDir.exports;
}

var makeDir$1 = {exports: {}};

var semver = {exports: {}};

var hasRequiredSemver;

function requireSemver () {
	if (hasRequiredSemver) return semver.exports;
	hasRequiredSemver = 1;
	(function (module, exports) {
		var define_process_env_default = {};
		exports = module.exports = SemVer;
		var debug;
		if (typeof process === "object" && define_process_env_default && define_process_env_default.NODE_DEBUG && /\bsemver\b/i.test(define_process_env_default.NODE_DEBUG)) {
		  debug = function() {
		    var args = Array.prototype.slice.call(arguments, 0);
		    args.unshift("SEMVER");
		    console.log.apply(console, args);
		  };
		} else {
		  debug = function() {
		  };
		}
		exports.SEMVER_SPEC_VERSION = "2.0.0";
		var MAX_LENGTH = 256;
		var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
		9007199254740991;
		var MAX_SAFE_COMPONENT_LENGTH = 16;
		var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
		var re = exports.re = [];
		var safeRe = exports.safeRe = [];
		var src = exports.src = [];
		var t = exports.tokens = {};
		var R = 0;
		function tok(n) {
		  t[n] = R++;
		}
		var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
		var safeRegexReplacements = [
		  ["\\s", 1],
		  ["\\d", MAX_LENGTH],
		  [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
		];
		function makeSafeRe(value) {
		  for (var i2 = 0; i2 < safeRegexReplacements.length; i2++) {
		    var token = safeRegexReplacements[i2][0];
		    var max = safeRegexReplacements[i2][1];
		    value = value.split(token + "*").join(token + "{0," + max + "}").split(token + "+").join(token + "{1," + max + "}");
		  }
		  return value;
		}
		tok("NUMERICIDENTIFIER");
		src[t.NUMERICIDENTIFIER] = "0|[1-9]\\d*";
		tok("NUMERICIDENTIFIERLOOSE");
		src[t.NUMERICIDENTIFIERLOOSE] = "\\d+";
		tok("NONNUMERICIDENTIFIER");
		src[t.NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-]" + LETTERDASHNUMBER + "*";
		tok("MAINVERSION");
		src[t.MAINVERSION] = "(" + src[t.NUMERICIDENTIFIER] + ")\\.(" + src[t.NUMERICIDENTIFIER] + ")\\.(" + src[t.NUMERICIDENTIFIER] + ")";
		tok("MAINVERSIONLOOSE");
		src[t.MAINVERSIONLOOSE] = "(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[t.NUMERICIDENTIFIERLOOSE] + ")";
		tok("PRERELEASEIDENTIFIER");
		src[t.PRERELEASEIDENTIFIER] = "(?:" + src[t.NUMERICIDENTIFIER] + "|" + src[t.NONNUMERICIDENTIFIER] + ")";
		tok("PRERELEASEIDENTIFIERLOOSE");
		src[t.PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[t.NUMERICIDENTIFIERLOOSE] + "|" + src[t.NONNUMERICIDENTIFIER] + ")";
		tok("PRERELEASE");
		src[t.PRERELEASE] = "(?:-(" + src[t.PRERELEASEIDENTIFIER] + "(?:\\." + src[t.PRERELEASEIDENTIFIER] + ")*))";
		tok("PRERELEASELOOSE");
		src[t.PRERELEASELOOSE] = "(?:-?(" + src[t.PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[t.PRERELEASEIDENTIFIERLOOSE] + ")*))";
		tok("BUILDIDENTIFIER");
		src[t.BUILDIDENTIFIER] = LETTERDASHNUMBER + "+";
		tok("BUILD");
		src[t.BUILD] = "(?:\\+(" + src[t.BUILDIDENTIFIER] + "(?:\\." + src[t.BUILDIDENTIFIER] + ")*))";
		tok("FULL");
		tok("FULLPLAIN");
		src[t.FULLPLAIN] = "v?" + src[t.MAINVERSION] + src[t.PRERELEASE] + "?" + src[t.BUILD] + "?";
		src[t.FULL] = "^" + src[t.FULLPLAIN] + "$";
		tok("LOOSEPLAIN");
		src[t.LOOSEPLAIN] = "[v=\\s]*" + src[t.MAINVERSIONLOOSE] + src[t.PRERELEASELOOSE] + "?" + src[t.BUILD] + "?";
		tok("LOOSE");
		src[t.LOOSE] = "^" + src[t.LOOSEPLAIN] + "$";
		tok("GTLT");
		src[t.GTLT] = "((?:<|>)?=?)";
		tok("XRANGEIDENTIFIERLOOSE");
		src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
		tok("XRANGEIDENTIFIER");
		src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + "|x|X|\\*";
		tok("XRANGEPLAIN");
		src[t.XRANGEPLAIN] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIER] + ")(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")(?:" + src[t.PRERELEASE] + ")?" + src[t.BUILD] + "?)?)?";
		tok("XRANGEPLAINLOOSE");
		src[t.XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:" + src[t.PRERELEASELOOSE] + ")?" + src[t.BUILD] + "?)?)?";
		tok("XRANGE");
		src[t.XRANGE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAIN] + "$";
		tok("XRANGELOOSE");
		src[t.XRANGELOOSE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAINLOOSE] + "$";
		tok("COERCE");
		src[t.COERCE] = "(^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:$|[^\\d])";
		tok("COERCERTL");
		re[t.COERCERTL] = new RegExp(src[t.COERCE], "g");
		safeRe[t.COERCERTL] = new RegExp(makeSafeRe(src[t.COERCE]), "g");
		tok("LONETILDE");
		src[t.LONETILDE] = "(?:~>?)";
		tok("TILDETRIM");
		src[t.TILDETRIM] = "(\\s*)" + src[t.LONETILDE] + "\\s+";
		re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], "g");
		safeRe[t.TILDETRIM] = new RegExp(makeSafeRe(src[t.TILDETRIM]), "g");
		var tildeTrimReplace = "$1~";
		tok("TILDE");
		src[t.TILDE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAIN] + "$";
		tok("TILDELOOSE");
		src[t.TILDELOOSE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + "$";
		tok("LONECARET");
		src[t.LONECARET] = "(?:\\^)";
		tok("CARETTRIM");
		src[t.CARETTRIM] = "(\\s*)" + src[t.LONECARET] + "\\s+";
		re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], "g");
		safeRe[t.CARETTRIM] = new RegExp(makeSafeRe(src[t.CARETTRIM]), "g");
		var caretTrimReplace = "$1^";
		tok("CARET");
		src[t.CARET] = "^" + src[t.LONECARET] + src[t.XRANGEPLAIN] + "$";
		tok("CARETLOOSE");
		src[t.CARETLOOSE] = "^" + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + "$";
		tok("COMPARATORLOOSE");
		src[t.COMPARATORLOOSE] = "^" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + ")$|^$";
		tok("COMPARATOR");
		src[t.COMPARATOR] = "^" + src[t.GTLT] + "\\s*(" + src[t.FULLPLAIN] + ")$|^$";
		tok("COMPARATORTRIM");
		src[t.COMPARATORTRIM] = "(\\s*)" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + "|" + src[t.XRANGEPLAIN] + ")";
		re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], "g");
		safeRe[t.COMPARATORTRIM] = new RegExp(makeSafeRe(src[t.COMPARATORTRIM]), "g");
		var comparatorTrimReplace = "$1$2$3";
		tok("HYPHENRANGE");
		src[t.HYPHENRANGE] = "^\\s*(" + src[t.XRANGEPLAIN] + ")\\s+-\\s+(" + src[t.XRANGEPLAIN] + ")\\s*$";
		tok("HYPHENRANGELOOSE");
		src[t.HYPHENRANGELOOSE] = "^\\s*(" + src[t.XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[t.XRANGEPLAINLOOSE] + ")\\s*$";
		tok("STAR");
		src[t.STAR] = "(<|>)?=?\\s*\\*";
		for (var i = 0; i < R; i++) {
		  debug(i, src[i]);
		  if (!re[i]) {
		    re[i] = new RegExp(src[i]);
		    safeRe[i] = new RegExp(makeSafeRe(src[i]));
		  }
		}
		exports.parse = parse;
		function parse(version, options) {
		  if (!options || typeof options !== "object") {
		    options = {
		      loose: !!options,
		      includePrerelease: false
		    };
		  }
		  if (version instanceof SemVer) {
		    return version;
		  }
		  if (typeof version !== "string") {
		    return null;
		  }
		  if (version.length > MAX_LENGTH) {
		    return null;
		  }
		  var r = options.loose ? safeRe[t.LOOSE] : safeRe[t.FULL];
		  if (!r.test(version)) {
		    return null;
		  }
		  try {
		    return new SemVer(version, options);
		  } catch (er) {
		    return null;
		  }
		}
		exports.valid = valid;
		function valid(version, options) {
		  var v = parse(version, options);
		  return v ? v.version : null;
		}
		exports.clean = clean;
		function clean(version, options) {
		  var s = parse(version.trim().replace(/^[=v]+/, ""), options);
		  return s ? s.version : null;
		}
		exports.SemVer = SemVer;
		function SemVer(version, options) {
		  if (!options || typeof options !== "object") {
		    options = {
		      loose: !!options,
		      includePrerelease: false
		    };
		  }
		  if (version instanceof SemVer) {
		    if (version.loose === options.loose) {
		      return version;
		    } else {
		      version = version.version;
		    }
		  } else if (typeof version !== "string") {
		    throw new TypeError("Invalid Version: " + version);
		  }
		  if (version.length > MAX_LENGTH) {
		    throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
		  }
		  if (!(this instanceof SemVer)) {
		    return new SemVer(version, options);
		  }
		  debug("SemVer", version, options);
		  this.options = options;
		  this.loose = !!options.loose;
		  var m = version.trim().match(options.loose ? safeRe[t.LOOSE] : safeRe[t.FULL]);
		  if (!m) {
		    throw new TypeError("Invalid Version: " + version);
		  }
		  this.raw = version;
		  this.major = +m[1];
		  this.minor = +m[2];
		  this.patch = +m[3];
		  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
		    throw new TypeError("Invalid major version");
		  }
		  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
		    throw new TypeError("Invalid minor version");
		  }
		  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
		    throw new TypeError("Invalid patch version");
		  }
		  if (!m[4]) {
		    this.prerelease = [];
		  } else {
		    this.prerelease = m[4].split(".").map(function(id) {
		      if (/^[0-9]+$/.test(id)) {
		        var num = +id;
		        if (num >= 0 && num < MAX_SAFE_INTEGER) {
		          return num;
		        }
		      }
		      return id;
		    });
		  }
		  this.build = m[5] ? m[5].split(".") : [];
		  this.format();
		}
		SemVer.prototype.format = function() {
		  this.version = this.major + "." + this.minor + "." + this.patch;
		  if (this.prerelease.length) {
		    this.version += "-" + this.prerelease.join(".");
		  }
		  return this.version;
		};
		SemVer.prototype.toString = function() {
		  return this.version;
		};
		SemVer.prototype.compare = function(other) {
		  debug("SemVer.compare", this.version, this.options, other);
		  if (!(other instanceof SemVer)) {
		    other = new SemVer(other, this.options);
		  }
		  return this.compareMain(other) || this.comparePre(other);
		};
		SemVer.prototype.compareMain = function(other) {
		  if (!(other instanceof SemVer)) {
		    other = new SemVer(other, this.options);
		  }
		  return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
		};
		SemVer.prototype.comparePre = function(other) {
		  if (!(other instanceof SemVer)) {
		    other = new SemVer(other, this.options);
		  }
		  if (this.prerelease.length && !other.prerelease.length) {
		    return -1;
		  } else if (!this.prerelease.length && other.prerelease.length) {
		    return 1;
		  } else if (!this.prerelease.length && !other.prerelease.length) {
		    return 0;
		  }
		  var i2 = 0;
		  do {
		    var a = this.prerelease[i2];
		    var b = other.prerelease[i2];
		    debug("prerelease compare", i2, a, b);
		    if (a === void 0 && b === void 0) {
		      return 0;
		    } else if (b === void 0) {
		      return 1;
		    } else if (a === void 0) {
		      return -1;
		    } else if (a === b) {
		      continue;
		    } else {
		      return compareIdentifiers(a, b);
		    }
		  } while (++i2);
		};
		SemVer.prototype.compareBuild = function(other) {
		  if (!(other instanceof SemVer)) {
		    other = new SemVer(other, this.options);
		  }
		  var i2 = 0;
		  do {
		    var a = this.build[i2];
		    var b = other.build[i2];
		    debug("prerelease compare", i2, a, b);
		    if (a === void 0 && b === void 0) {
		      return 0;
		    } else if (b === void 0) {
		      return 1;
		    } else if (a === void 0) {
		      return -1;
		    } else if (a === b) {
		      continue;
		    } else {
		      return compareIdentifiers(a, b);
		    }
		  } while (++i2);
		};
		SemVer.prototype.inc = function(release, identifier) {
		  switch (release) {
		    case "premajor":
		      this.prerelease.length = 0;
		      this.patch = 0;
		      this.minor = 0;
		      this.major++;
		      this.inc("pre", identifier);
		      break;
		    case "preminor":
		      this.prerelease.length = 0;
		      this.patch = 0;
		      this.minor++;
		      this.inc("pre", identifier);
		      break;
		    case "prepatch":
		      this.prerelease.length = 0;
		      this.inc("patch", identifier);
		      this.inc("pre", identifier);
		      break;
		    // If the input is a non-prerelease version, this acts the same as
		    // prepatch.
		    case "prerelease":
		      if (this.prerelease.length === 0) {
		        this.inc("patch", identifier);
		      }
		      this.inc("pre", identifier);
		      break;
		    case "major":
		      if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
		        this.major++;
		      }
		      this.minor = 0;
		      this.patch = 0;
		      this.prerelease = [];
		      break;
		    case "minor":
		      if (this.patch !== 0 || this.prerelease.length === 0) {
		        this.minor++;
		      }
		      this.patch = 0;
		      this.prerelease = [];
		      break;
		    case "patch":
		      if (this.prerelease.length === 0) {
		        this.patch++;
		      }
		      this.prerelease = [];
		      break;
		    // This probably shouldn't be used publicly.
		    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
		    case "pre":
		      if (this.prerelease.length === 0) {
		        this.prerelease = [0];
		      } else {
		        var i2 = this.prerelease.length;
		        while (--i2 >= 0) {
		          if (typeof this.prerelease[i2] === "number") {
		            this.prerelease[i2]++;
		            i2 = -2;
		          }
		        }
		        if (i2 === -1) {
		          this.prerelease.push(0);
		        }
		      }
		      if (identifier) {
		        if (this.prerelease[0] === identifier) {
		          if (isNaN(this.prerelease[1])) {
		            this.prerelease = [identifier, 0];
		          }
		        } else {
		          this.prerelease = [identifier, 0];
		        }
		      }
		      break;
		    default:
		      throw new Error("invalid increment argument: " + release);
		  }
		  this.format();
		  this.raw = this.version;
		  return this;
		};
		exports.inc = inc;
		function inc(version, release, loose, identifier) {
		  if (typeof loose === "string") {
		    identifier = loose;
		    loose = void 0;
		  }
		  try {
		    return new SemVer(version, loose).inc(release, identifier).version;
		  } catch (er) {
		    return null;
		  }
		}
		exports.diff = diff;
		function diff(version1, version2) {
		  if (eq(version1, version2)) {
		    return null;
		  } else {
		    var v1 = parse(version1);
		    var v2 = parse(version2);
		    var prefix = "";
		    if (v1.prerelease.length || v2.prerelease.length) {
		      prefix = "pre";
		      var defaultResult = "prerelease";
		    }
		    for (var key in v1) {
		      if (key === "major" || key === "minor" || key === "patch") {
		        if (v1[key] !== v2[key]) {
		          return prefix + key;
		        }
		      }
		    }
		    return defaultResult;
		  }
		}
		exports.compareIdentifiers = compareIdentifiers;
		var numeric = /^[0-9]+$/;
		function compareIdentifiers(a, b) {
		  var anum = numeric.test(a);
		  var bnum = numeric.test(b);
		  if (anum && bnum) {
		    a = +a;
		    b = +b;
		  }
		  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
		}
		exports.rcompareIdentifiers = rcompareIdentifiers;
		function rcompareIdentifiers(a, b) {
		  return compareIdentifiers(b, a);
		}
		exports.major = major;
		function major(a, loose) {
		  return new SemVer(a, loose).major;
		}
		exports.minor = minor;
		function minor(a, loose) {
		  return new SemVer(a, loose).minor;
		}
		exports.patch = patch;
		function patch(a, loose) {
		  return new SemVer(a, loose).patch;
		}
		exports.compare = compare;
		function compare(a, b, loose) {
		  return new SemVer(a, loose).compare(new SemVer(b, loose));
		}
		exports.compareLoose = compareLoose;
		function compareLoose(a, b) {
		  return compare(a, b, true);
		}
		exports.compareBuild = compareBuild;
		function compareBuild(a, b, loose) {
		  var versionA = new SemVer(a, loose);
		  var versionB = new SemVer(b, loose);
		  return versionA.compare(versionB) || versionA.compareBuild(versionB);
		}
		exports.rcompare = rcompare;
		function rcompare(a, b, loose) {
		  return compare(b, a, loose);
		}
		exports.sort = sort;
		function sort(list, loose) {
		  return list.sort(function(a, b) {
		    return exports.compareBuild(a, b, loose);
		  });
		}
		exports.rsort = rsort;
		function rsort(list, loose) {
		  return list.sort(function(a, b) {
		    return exports.compareBuild(b, a, loose);
		  });
		}
		exports.gt = gt;
		function gt(a, b, loose) {
		  return compare(a, b, loose) > 0;
		}
		exports.lt = lt;
		function lt(a, b, loose) {
		  return compare(a, b, loose) < 0;
		}
		exports.eq = eq;
		function eq(a, b, loose) {
		  return compare(a, b, loose) === 0;
		}
		exports.neq = neq;
		function neq(a, b, loose) {
		  return compare(a, b, loose) !== 0;
		}
		exports.gte = gte;
		function gte(a, b, loose) {
		  return compare(a, b, loose) >= 0;
		}
		exports.lte = lte;
		function lte(a, b, loose) {
		  return compare(a, b, loose) <= 0;
		}
		exports.cmp = cmp;
		function cmp(a, op, b, loose) {
		  switch (op) {
		    case "===":
		      if (typeof a === "object")
		        a = a.version;
		      if (typeof b === "object")
		        b = b.version;
		      return a === b;
		    case "!==":
		      if (typeof a === "object")
		        a = a.version;
		      if (typeof b === "object")
		        b = b.version;
		      return a !== b;
		    case "":
		    case "=":
		    case "==":
		      return eq(a, b, loose);
		    case "!=":
		      return neq(a, b, loose);
		    case ">":
		      return gt(a, b, loose);
		    case ">=":
		      return gte(a, b, loose);
		    case "<":
		      return lt(a, b, loose);
		    case "<=":
		      return lte(a, b, loose);
		    default:
		      throw new TypeError("Invalid operator: " + op);
		  }
		}
		exports.Comparator = Comparator;
		function Comparator(comp, options) {
		  if (!options || typeof options !== "object") {
		    options = {
		      loose: !!options,
		      includePrerelease: false
		    };
		  }
		  if (comp instanceof Comparator) {
		    if (comp.loose === !!options.loose) {
		      return comp;
		    } else {
		      comp = comp.value;
		    }
		  }
		  if (!(this instanceof Comparator)) {
		    return new Comparator(comp, options);
		  }
		  comp = comp.trim().split(/\s+/).join(" ");
		  debug("comparator", comp, options);
		  this.options = options;
		  this.loose = !!options.loose;
		  this.parse(comp);
		  if (this.semver === ANY) {
		    this.value = "";
		  } else {
		    this.value = this.operator + this.semver.version;
		  }
		  debug("comp", this);
		}
		var ANY = {};
		Comparator.prototype.parse = function(comp) {
		  var r = this.options.loose ? safeRe[t.COMPARATORLOOSE] : safeRe[t.COMPARATOR];
		  var m = comp.match(r);
		  if (!m) {
		    throw new TypeError("Invalid comparator: " + comp);
		  }
		  this.operator = m[1] !== void 0 ? m[1] : "";
		  if (this.operator === "=") {
		    this.operator = "";
		  }
		  if (!m[2]) {
		    this.semver = ANY;
		  } else {
		    this.semver = new SemVer(m[2], this.options.loose);
		  }
		};
		Comparator.prototype.toString = function() {
		  return this.value;
		};
		Comparator.prototype.test = function(version) {
		  debug("Comparator.test", version, this.options.loose);
		  if (this.semver === ANY || version === ANY) {
		    return true;
		  }
		  if (typeof version === "string") {
		    try {
		      version = new SemVer(version, this.options);
		    } catch (er) {
		      return false;
		    }
		  }
		  return cmp(version, this.operator, this.semver, this.options);
		};
		Comparator.prototype.intersects = function(comp, options) {
		  if (!(comp instanceof Comparator)) {
		    throw new TypeError("a Comparator is required");
		  }
		  if (!options || typeof options !== "object") {
		    options = {
		      loose: !!options,
		      includePrerelease: false
		    };
		  }
		  var rangeTmp;
		  if (this.operator === "") {
		    if (this.value === "") {
		      return true;
		    }
		    rangeTmp = new Range(comp.value, options);
		    return satisfies(this.value, rangeTmp, options);
		  } else if (comp.operator === "") {
		    if (comp.value === "") {
		      return true;
		    }
		    rangeTmp = new Range(this.value, options);
		    return satisfies(comp.semver, rangeTmp, options);
		  }
		  var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
		  var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
		  var sameSemVer = this.semver.version === comp.semver.version;
		  var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
		  var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
		  var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
		  return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
		};
		exports.Range = Range;
		function Range(range, options) {
		  if (!options || typeof options !== "object") {
		    options = {
		      loose: !!options,
		      includePrerelease: false
		    };
		  }
		  if (range instanceof Range) {
		    if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
		      return range;
		    } else {
		      return new Range(range.raw, options);
		    }
		  }
		  if (range instanceof Comparator) {
		    return new Range(range.value, options);
		  }
		  if (!(this instanceof Range)) {
		    return new Range(range, options);
		  }
		  this.options = options;
		  this.loose = !!options.loose;
		  this.includePrerelease = !!options.includePrerelease;
		  this.raw = range.trim().split(/\s+/).join(" ");
		  this.set = this.raw.split("||").map(function(range2) {
		    return this.parseRange(range2.trim());
		  }, this).filter(function(c) {
		    return c.length;
		  });
		  if (!this.set.length) {
		    throw new TypeError("Invalid SemVer Range: " + this.raw);
		  }
		  this.format();
		}
		Range.prototype.format = function() {
		  this.range = this.set.map(function(comps) {
		    return comps.join(" ").trim();
		  }).join("||").trim();
		  return this.range;
		};
		Range.prototype.toString = function() {
		  return this.range;
		};
		Range.prototype.parseRange = function(range) {
		  var loose = this.options.loose;
		  var hr = loose ? safeRe[t.HYPHENRANGELOOSE] : safeRe[t.HYPHENRANGE];
		  range = range.replace(hr, hyphenReplace);
		  debug("hyphen replace", range);
		  range = range.replace(safeRe[t.COMPARATORTRIM], comparatorTrimReplace);
		  debug("comparator trim", range, safeRe[t.COMPARATORTRIM]);
		  range = range.replace(safeRe[t.TILDETRIM], tildeTrimReplace);
		  range = range.replace(safeRe[t.CARETTRIM], caretTrimReplace);
		  range = range.split(/\s+/).join(" ");
		  var compRe = loose ? safeRe[t.COMPARATORLOOSE] : safeRe[t.COMPARATOR];
		  var set = range.split(" ").map(function(comp) {
		    return parseComparator(comp, this.options);
		  }, this).join(" ").split(/\s+/);
		  if (this.options.loose) {
		    set = set.filter(function(comp) {
		      return !!comp.match(compRe);
		    });
		  }
		  set = set.map(function(comp) {
		    return new Comparator(comp, this.options);
		  }, this);
		  return set;
		};
		Range.prototype.intersects = function(range, options) {
		  if (!(range instanceof Range)) {
		    throw new TypeError("a Range is required");
		  }
		  return this.set.some(function(thisComparators) {
		    return isSatisfiable(thisComparators, options) && range.set.some(function(rangeComparators) {
		      return isSatisfiable(rangeComparators, options) && thisComparators.every(function(thisComparator) {
		        return rangeComparators.every(function(rangeComparator) {
		          return thisComparator.intersects(rangeComparator, options);
		        });
		      });
		    });
		  });
		};
		function isSatisfiable(comparators, options) {
		  var result = true;
		  var remainingComparators = comparators.slice();
		  var testComparator = remainingComparators.pop();
		  while (result && remainingComparators.length) {
		    result = remainingComparators.every(function(otherComparator) {
		      return testComparator.intersects(otherComparator, options);
		    });
		    testComparator = remainingComparators.pop();
		  }
		  return result;
		}
		exports.toComparators = toComparators;
		function toComparators(range, options) {
		  return new Range(range, options).set.map(function(comp) {
		    return comp.map(function(c) {
		      return c.value;
		    }).join(" ").trim().split(" ");
		  });
		}
		function parseComparator(comp, options) {
		  debug("comp", comp, options);
		  comp = replaceCarets(comp, options);
		  debug("caret", comp);
		  comp = replaceTildes(comp, options);
		  debug("tildes", comp);
		  comp = replaceXRanges(comp, options);
		  debug("xrange", comp);
		  comp = replaceStars(comp, options);
		  debug("stars", comp);
		  return comp;
		}
		function isX(id) {
		  return !id || id.toLowerCase() === "x" || id === "*";
		}
		function replaceTildes(comp, options) {
		  return comp.trim().split(/\s+/).map(function(comp2) {
		    return replaceTilde(comp2, options);
		  }).join(" ");
		}
		function replaceTilde(comp, options) {
		  var r = options.loose ? safeRe[t.TILDELOOSE] : safeRe[t.TILDE];
		  return comp.replace(r, function(_, M, m, p, pr) {
		    debug("tilde", comp, _, M, m, p, pr);
		    var ret;
		    if (isX(M)) {
		      ret = "";
		    } else if (isX(m)) {
		      ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
		    } else if (isX(p)) {
		      ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
		    } else if (pr) {
		      debug("replaceTilde pr", pr);
		      ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
		    } else {
		      ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
		    }
		    debug("tilde return", ret);
		    return ret;
		  });
		}
		function replaceCarets(comp, options) {
		  return comp.trim().split(/\s+/).map(function(comp2) {
		    return replaceCaret(comp2, options);
		  }).join(" ");
		}
		function replaceCaret(comp, options) {
		  debug("caret", comp, options);
		  var r = options.loose ? safeRe[t.CARETLOOSE] : safeRe[t.CARET];
		  return comp.replace(r, function(_, M, m, p, pr) {
		    debug("caret", comp, _, M, m, p, pr);
		    var ret;
		    if (isX(M)) {
		      ret = "";
		    } else if (isX(m)) {
		      ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
		    } else if (isX(p)) {
		      if (M === "0") {
		        ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
		      } else {
		        ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
		      }
		    } else if (pr) {
		      debug("replaceCaret pr", pr);
		      if (M === "0") {
		        if (m === "0") {
		          ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
		        } else {
		          ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
		        }
		      } else {
		        ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
		      }
		    } else {
		      debug("no pr");
		      if (M === "0") {
		        if (m === "0") {
		          ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
		        } else {
		          ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
		        }
		      } else {
		        ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
		      }
		    }
		    debug("caret return", ret);
		    return ret;
		  });
		}
		function replaceXRanges(comp, options) {
		  debug("replaceXRanges", comp, options);
		  return comp.split(/\s+/).map(function(comp2) {
		    return replaceXRange(comp2, options);
		  }).join(" ");
		}
		function replaceXRange(comp, options) {
		  comp = comp.trim();
		  var r = options.loose ? safeRe[t.XRANGELOOSE] : safeRe[t.XRANGE];
		  return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
		    debug("xRange", comp, ret, gtlt, M, m, p, pr);
		    var xM = isX(M);
		    var xm = xM || isX(m);
		    var xp = xm || isX(p);
		    var anyX = xp;
		    if (gtlt === "=" && anyX) {
		      gtlt = "";
		    }
		    pr = options.includePrerelease ? "-0" : "";
		    if (xM) {
		      if (gtlt === ">" || gtlt === "<") {
		        ret = "<0.0.0-0";
		      } else {
		        ret = "*";
		      }
		    } else if (gtlt && anyX) {
		      if (xm) {
		        m = 0;
		      }
		      p = 0;
		      if (gtlt === ">") {
		        gtlt = ">=";
		        if (xm) {
		          M = +M + 1;
		          m = 0;
		          p = 0;
		        } else {
		          m = +m + 1;
		          p = 0;
		        }
		      } else if (gtlt === "<=") {
		        gtlt = "<";
		        if (xm) {
		          M = +M + 1;
		        } else {
		          m = +m + 1;
		        }
		      }
		      ret = gtlt + M + "." + m + "." + p + pr;
		    } else if (xm) {
		      ret = ">=" + M + ".0.0" + pr + " <" + (+M + 1) + ".0.0" + pr;
		    } else if (xp) {
		      ret = ">=" + M + "." + m + ".0" + pr + " <" + M + "." + (+m + 1) + ".0" + pr;
		    }
		    debug("xRange return", ret);
		    return ret;
		  });
		}
		function replaceStars(comp, options) {
		  debug("replaceStars", comp, options);
		  return comp.trim().replace(safeRe[t.STAR], "");
		}
		function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
		  if (isX(fM)) {
		    from = "";
		  } else if (isX(fm)) {
		    from = ">=" + fM + ".0.0";
		  } else if (isX(fp)) {
		    from = ">=" + fM + "." + fm + ".0";
		  } else {
		    from = ">=" + from;
		  }
		  if (isX(tM)) {
		    to = "";
		  } else if (isX(tm)) {
		    to = "<" + (+tM + 1) + ".0.0";
		  } else if (isX(tp)) {
		    to = "<" + tM + "." + (+tm + 1) + ".0";
		  } else if (tpr) {
		    to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
		  } else {
		    to = "<=" + to;
		  }
		  return (from + " " + to).trim();
		}
		Range.prototype.test = function(version) {
		  if (!version) {
		    return false;
		  }
		  if (typeof version === "string") {
		    try {
		      version = new SemVer(version, this.options);
		    } catch (er) {
		      return false;
		    }
		  }
		  for (var i2 = 0; i2 < this.set.length; i2++) {
		    if (testSet(this.set[i2], version, this.options)) {
		      return true;
		    }
		  }
		  return false;
		};
		function testSet(set, version, options) {
		  for (var i2 = 0; i2 < set.length; i2++) {
		    if (!set[i2].test(version)) {
		      return false;
		    }
		  }
		  if (version.prerelease.length && !options.includePrerelease) {
		    for (i2 = 0; i2 < set.length; i2++) {
		      debug(set[i2].semver);
		      if (set[i2].semver === ANY) {
		        continue;
		      }
		      if (set[i2].semver.prerelease.length > 0) {
		        var allowed = set[i2].semver;
		        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
		          return true;
		        }
		      }
		    }
		    return false;
		  }
		  return true;
		}
		exports.satisfies = satisfies;
		function satisfies(version, range, options) {
		  try {
		    range = new Range(range, options);
		  } catch (er) {
		    return false;
		  }
		  return range.test(version);
		}
		exports.maxSatisfying = maxSatisfying;
		function maxSatisfying(versions, range, options) {
		  var max = null;
		  var maxSV = null;
		  try {
		    var rangeObj = new Range(range, options);
		  } catch (er) {
		    return null;
		  }
		  versions.forEach(function(v) {
		    if (rangeObj.test(v)) {
		      if (!max || maxSV.compare(v) === -1) {
		        max = v;
		        maxSV = new SemVer(max, options);
		      }
		    }
		  });
		  return max;
		}
		exports.minSatisfying = minSatisfying;
		function minSatisfying(versions, range, options) {
		  var min = null;
		  var minSV = null;
		  try {
		    var rangeObj = new Range(range, options);
		  } catch (er) {
		    return null;
		  }
		  versions.forEach(function(v) {
		    if (rangeObj.test(v)) {
		      if (!min || minSV.compare(v) === 1) {
		        min = v;
		        minSV = new SemVer(min, options);
		      }
		    }
		  });
		  return min;
		}
		exports.minVersion = minVersion;
		function minVersion(range, loose) {
		  range = new Range(range, loose);
		  var minver = new SemVer("0.0.0");
		  if (range.test(minver)) {
		    return minver;
		  }
		  minver = new SemVer("0.0.0-0");
		  if (range.test(minver)) {
		    return minver;
		  }
		  minver = null;
		  for (var i2 = 0; i2 < range.set.length; ++i2) {
		    var comparators = range.set[i2];
		    comparators.forEach(function(comparator) {
		      var compver = new SemVer(comparator.semver.version);
		      switch (comparator.operator) {
		        case ">":
		          if (compver.prerelease.length === 0) {
		            compver.patch++;
		          } else {
		            compver.prerelease.push(0);
		          }
		          compver.raw = compver.format();
		        /* fallthrough */
		        case "":
		        case ">=":
		          if (!minver || gt(minver, compver)) {
		            minver = compver;
		          }
		          break;
		        case "<":
		        case "<=":
		          break;
		        /* istanbul ignore next */
		        default:
		          throw new Error("Unexpected operation: " + comparator.operator);
		      }
		    });
		  }
		  if (minver && range.test(minver)) {
		    return minver;
		  }
		  return null;
		}
		exports.validRange = validRange;
		function validRange(range, options) {
		  try {
		    return new Range(range, options).range || "*";
		  } catch (er) {
		    return null;
		  }
		}
		exports.ltr = ltr;
		function ltr(version, range, options) {
		  return outside(version, range, "<", options);
		}
		exports.gtr = gtr;
		function gtr(version, range, options) {
		  return outside(version, range, ">", options);
		}
		exports.outside = outside;
		function outside(version, range, hilo, options) {
		  version = new SemVer(version, options);
		  range = new Range(range, options);
		  var gtfn, ltefn, ltfn, comp, ecomp;
		  switch (hilo) {
		    case ">":
		      gtfn = gt;
		      ltefn = lte;
		      ltfn = lt;
		      comp = ">";
		      ecomp = ">=";
		      break;
		    case "<":
		      gtfn = lt;
		      ltefn = gte;
		      ltfn = gt;
		      comp = "<";
		      ecomp = "<=";
		      break;
		    default:
		      throw new TypeError('Must provide a hilo val of "<" or ">"');
		  }
		  if (satisfies(version, range, options)) {
		    return false;
		  }
		  for (var i2 = 0; i2 < range.set.length; ++i2) {
		    var comparators = range.set[i2];
		    var high = null;
		    var low = null;
		    comparators.forEach(function(comparator) {
		      if (comparator.semver === ANY) {
		        comparator = new Comparator(">=0.0.0");
		      }
		      high = high || comparator;
		      low = low || comparator;
		      if (gtfn(comparator.semver, high.semver, options)) {
		        high = comparator;
		      } else if (ltfn(comparator.semver, low.semver, options)) {
		        low = comparator;
		      }
		    });
		    if (high.operator === comp || high.operator === ecomp) {
		      return false;
		    }
		    if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
		      return false;
		    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
		      return false;
		    }
		  }
		  return true;
		}
		exports.prerelease = prerelease;
		function prerelease(version, options) {
		  var parsed = parse(version, options);
		  return parsed && parsed.prerelease.length ? parsed.prerelease : null;
		}
		exports.intersects = intersects;
		function intersects(r1, r2, options) {
		  r1 = new Range(r1, options);
		  r2 = new Range(r2, options);
		  return r1.intersects(r2);
		}
		exports.coerce = coerce;
		function coerce(version, options) {
		  if (version instanceof SemVer) {
		    return version;
		  }
		  if (typeof version === "number") {
		    version = String(version);
		  }
		  if (typeof version !== "string") {
		    return null;
		  }
		  options = options || {};
		  var match = null;
		  if (!options.rtl) {
		    match = version.match(safeRe[t.COERCE]);
		  } else {
		    var next;
		    while ((next = safeRe[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
		      if (!match || next.index + next[0].length !== match.index + match[0].length) {
		        match = next;
		      }
		      safeRe[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
		    }
		    safeRe[t.COERCERTL].lastIndex = -1;
		  }
		  if (match === null) {
		    return null;
		  }
		  return parse(match[2] + "." + (match[3] || "0") + "." + (match[4] || "0"), options);
		} 
	} (semver, semver.exports));
	return semver.exports;
}

var hasRequiredMakeDir$1;

function requireMakeDir$1 () {
	if (hasRequiredMakeDir$1) return makeDir$1.exports;
	hasRequiredMakeDir$1 = 1;
	const fs = require$$1$1;
	const path = require$$1$1;
	const {promisify} = require$$1$1;
	const semver = requireSemver();

	const useNativeRecursiveOption = semver.satisfies(process.version, '>=10.12.0');

	// https://github.com/nodejs/node/issues/8987
	// https://github.com/libuv/libuv/pull/1088
	const checkPath = pth => {
		if (process.platform === 'win32') {
			const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path.parse(pth).root, ''));

			if (pathHasInvalidWinCharacters) {
				const error = new Error(`Path contains invalid characters: ${pth}`);
				error.code = 'EINVAL';
				throw error;
			}
		}
	};

	const processOptions = options => {
		// https://github.com/sindresorhus/make-dir/issues/18
		const defaults = {
			mode: 0o777,
			fs
		};

		return {
			...defaults,
			...options
		};
	};

	const permissionError = pth => {
		// This replicates the exception of `fs.mkdir` with native the
		// `recusive` option when run on an invalid drive under Windows.
		const error = new Error(`operation not permitted, mkdir '${pth}'`);
		error.code = 'EPERM';
		error.errno = -4048;
		error.path = pth;
		error.syscall = 'mkdir';
		return error;
	};

	const makeDir = async (input, options) => {
		checkPath(input);
		options = processOptions(options);

		const mkdir = promisify(options.fs.mkdir);
		const stat = promisify(options.fs.stat);

		if (useNativeRecursiveOption && options.fs.mkdir === fs.mkdir) {
			const pth = path.resolve(input);

			await mkdir(pth, {
				mode: options.mode,
				recursive: true
			});

			return pth;
		}

		const make = async pth => {
			try {
				await mkdir(pth, options.mode);

				return pth;
			} catch (error) {
				if (error.code === 'EPERM') {
					throw error;
				}

				if (error.code === 'ENOENT') {
					if (path.dirname(pth) === pth) {
						throw permissionError(pth);
					}

					if (error.message.includes('null bytes')) {
						throw error;
					}

					await make(path.dirname(pth));

					return make(pth);
				}

				try {
					const stats = await stat(pth);
					if (!stats.isDirectory()) {
						throw new Error('The path is not a directory');
					}
				} catch (_) {
					throw error;
				}

				return pth;
			}
		};

		return make(path.resolve(input));
	};

	makeDir$1.exports = makeDir;

	makeDir$1.exports.sync = (input, options) => {
		checkPath(input);
		options = processOptions(options);

		if (useNativeRecursiveOption && options.fs.mkdirSync === fs.mkdirSync) {
			const pth = path.resolve(input);

			fs.mkdirSync(pth, {
				mode: options.mode,
				recursive: true
			});

			return pth;
		}

		const make = pth => {
			try {
				options.fs.mkdirSync(pth, options.mode);
			} catch (error) {
				if (error.code === 'EPERM') {
					throw error;
				}

				if (error.code === 'ENOENT') {
					if (path.dirname(pth) === pth) {
						throw permissionError(pth);
					}

					if (error.message.includes('null bytes')) {
						throw error;
					}

					make(path.dirname(pth));
					return make(pth);
				}

				try {
					if (!options.fs.statSync(pth).isDirectory()) {
						throw new Error('The path is not a directory');
					}
				} catch (_) {
					throw error;
				}
			}

			return pth;
		};

		return make(path.resolve(input));
	};
	return makeDir$1.exports;
}

var findCacheDir;
var hasRequiredFindCacheDir;

function requireFindCacheDir () {
	if (hasRequiredFindCacheDir) return findCacheDir;
	hasRequiredFindCacheDir = 1;
	const path = require$$1$1;
	const fs = require$$1$1;
	const commonDir = requireCommondir();
	const pkgDir = requirePkgDir();
	const makeDir = requireMakeDir$1();

	const {env, cwd} = process;

	const isWritable = path => {
		try {
			fs.accessSync(path, fs.constants.W_OK);
			return true;
		} catch (_) {
			return false;
		}
	};

	function useDirectory(directory, options) {
		if (options.create) {
			makeDir.sync(directory);
		}

		if (options.thunk) {
			return (...arguments_) => path.join(directory, ...arguments_);
		}

		return directory;
	}

	function getNodeModuleDirectory(directory) {
		const nodeModules = path.join(directory, 'node_modules');

		if (
			!isWritable(nodeModules) &&
			(fs.existsSync(nodeModules) || !isWritable(path.join(directory)))
		) {
			return;
		}

		return nodeModules;
	}

	findCacheDir = (options = {}) => {
		if (env.CACHE_DIR && !['true', 'false', '1', '0'].includes(env.CACHE_DIR)) {
			return useDirectory(path.join(env.CACHE_DIR, options.name), options);
		}

		let {cwd: directory = cwd()} = options;

		if (options.files) {
			directory = commonDir(directory, options.files);
		}

		directory = pkgDir.sync(directory);

		if (!directory) {
			return;
		}

		const nodeModules = getNodeModuleDirectory(directory);
		if (!nodeModules) {
			return undefined;
		}

		return useDirectory(path.join(directory, 'node_modules', '.cache', options.name), options);
	};
	return findCacheDir;
}

var fs$4 = {};

var universalify = {};

var hasRequiredUniversalify;

function requireUniversalify () {
	if (hasRequiredUniversalify) return universalify;
	hasRequiredUniversalify = 1;

	universalify.fromCallback = function (fn) {
	  return Object.defineProperty(function (...args) {
	    if (typeof args[args.length - 1] === 'function') fn.apply(this, args);
	    else {
	      return new Promise((resolve, reject) => {
	        args.push((err, res) => (err != null) ? reject(err) : resolve(res));
	        fn.apply(this, args);
	      })
	    }
	  }, 'name', { value: fn.name })
	};

	universalify.fromPromise = function (fn) {
	  return Object.defineProperty(function (...args) {
	    const cb = args[args.length - 1];
	    if (typeof cb !== 'function') return fn.apply(this, args)
	    else {
	      args.pop();
	      fn.apply(this, args).then(r => cb(null, r), cb);
	    }
	  }, 'name', { value: fn.name })
	};
	return universalify;
}

var polyfills;
var hasRequiredPolyfills;

function requirePolyfills () {
	if (hasRequiredPolyfills) return polyfills;
	hasRequiredPolyfills = 1;
	var define_process_env_default = {};
	var constants = require$$1$1;
	var origCwd = process.cwd;
	var cwd = null;
	var platform = define_process_env_default.GRACEFUL_FS_PLATFORM || process.platform;
	process.cwd = function() {
	  if (!cwd)
	    cwd = origCwd.call(process);
	  return cwd;
	};
	try {
	  process.cwd();
	} catch (er) {
	}
	if (typeof process.chdir === "function") {
	  var chdir = process.chdir;
	  process.chdir = function(d) {
	    cwd = null;
	    chdir.call(process, d);
	  };
	  if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
	}
	polyfills = patch;
	function patch(fs) {
	  if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
	    patchLchmod(fs);
	  }
	  if (!fs.lutimes) {
	    patchLutimes(fs);
	  }
	  fs.chown = chownFix(fs.chown);
	  fs.fchown = chownFix(fs.fchown);
	  fs.lchown = chownFix(fs.lchown);
	  fs.chmod = chmodFix(fs.chmod);
	  fs.fchmod = chmodFix(fs.fchmod);
	  fs.lchmod = chmodFix(fs.lchmod);
	  fs.chownSync = chownFixSync(fs.chownSync);
	  fs.fchownSync = chownFixSync(fs.fchownSync);
	  fs.lchownSync = chownFixSync(fs.lchownSync);
	  fs.chmodSync = chmodFixSync(fs.chmodSync);
	  fs.fchmodSync = chmodFixSync(fs.fchmodSync);
	  fs.lchmodSync = chmodFixSync(fs.lchmodSync);
	  fs.stat = statFix(fs.stat);
	  fs.fstat = statFix(fs.fstat);
	  fs.lstat = statFix(fs.lstat);
	  fs.statSync = statFixSync(fs.statSync);
	  fs.fstatSync = statFixSync(fs.fstatSync);
	  fs.lstatSync = statFixSync(fs.lstatSync);
	  if (fs.chmod && !fs.lchmod) {
	    fs.lchmod = function(path, mode, cb) {
	      if (cb) process.nextTick(cb);
	    };
	    fs.lchmodSync = function() {
	    };
	  }
	  if (fs.chown && !fs.lchown) {
	    fs.lchown = function(path, uid, gid, cb) {
	      if (cb) process.nextTick(cb);
	    };
	    fs.lchownSync = function() {
	    };
	  }
	  if (platform === "win32") {
	    fs.rename = typeof fs.rename !== "function" ? fs.rename : function(fs$rename) {
	      function rename(from, to, cb) {
	        var start = Date.now();
	        var backoff = 0;
	        fs$rename(from, to, function CB(er) {
	          if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
	            setTimeout(function() {
	              fs.stat(to, function(stater, st) {
	                if (stater && stater.code === "ENOENT")
	                  fs$rename(from, to, CB);
	                else
	                  cb(er);
	              });
	            }, backoff);
	            if (backoff < 100)
	              backoff += 10;
	            return;
	          }
	          if (cb) cb(er);
	        });
	      }
	      if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
	      return rename;
	    }(fs.rename);
	  }
	  fs.read = typeof fs.read !== "function" ? fs.read : function(fs$read) {
	    function read(fd, buffer, offset, length, position, callback_) {
	      var callback;
	      if (callback_ && typeof callback_ === "function") {
	        var eagCounter = 0;
	        callback = function(er, _, __) {
	          if (er && er.code === "EAGAIN" && eagCounter < 10) {
	            eagCounter++;
	            return fs$read.call(fs, fd, buffer, offset, length, position, callback);
	          }
	          callback_.apply(this, arguments);
	        };
	      }
	      return fs$read.call(fs, fd, buffer, offset, length, position, callback);
	    }
	    if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
	    return read;
	  }(fs.read);
	  fs.readSync = typeof fs.readSync !== "function" ? fs.readSync : /* @__PURE__ */ function(fs$readSync) {
	    return function(fd, buffer, offset, length, position) {
	      var eagCounter = 0;
	      while (true) {
	        try {
	          return fs$readSync.call(fs, fd, buffer, offset, length, position);
	        } catch (er) {
	          if (er.code === "EAGAIN" && eagCounter < 10) {
	            eagCounter++;
	            continue;
	          }
	          throw er;
	        }
	      }
	    };
	  }(fs.readSync);
	  function patchLchmod(fs2) {
	    fs2.lchmod = function(path, mode, callback) {
	      fs2.open(
	        path,
	        constants.O_WRONLY | constants.O_SYMLINK,
	        mode,
	        function(err, fd) {
	          if (err) {
	            if (callback) callback(err);
	            return;
	          }
	          fs2.fchmod(fd, mode, function(err2) {
	            fs2.close(fd, function(err22) {
	              if (callback) callback(err2 || err22);
	            });
	          });
	        }
	      );
	    };
	    fs2.lchmodSync = function(path, mode) {
	      var fd = fs2.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);
	      var threw = true;
	      var ret;
	      try {
	        ret = fs2.fchmodSync(fd, mode);
	        threw = false;
	      } finally {
	        if (threw) {
	          try {
	            fs2.closeSync(fd);
	          } catch (er) {
	          }
	        } else {
	          fs2.closeSync(fd);
	        }
	      }
	      return ret;
	    };
	  }
	  function patchLutimes(fs2) {
	    if (constants.hasOwnProperty("O_SYMLINK") && fs2.futimes) {
	      fs2.lutimes = function(path, at, mt, cb) {
	        fs2.open(path, constants.O_SYMLINK, function(er, fd) {
	          if (er) {
	            if (cb) cb(er);
	            return;
	          }
	          fs2.futimes(fd, at, mt, function(er2) {
	            fs2.close(fd, function(er22) {
	              if (cb) cb(er2 || er22);
	            });
	          });
	        });
	      };
	      fs2.lutimesSync = function(path, at, mt) {
	        var fd = fs2.openSync(path, constants.O_SYMLINK);
	        var ret;
	        var threw = true;
	        try {
	          ret = fs2.futimesSync(fd, at, mt);
	          threw = false;
	        } finally {
	          if (threw) {
	            try {
	              fs2.closeSync(fd);
	            } catch (er) {
	            }
	          } else {
	            fs2.closeSync(fd);
	          }
	        }
	        return ret;
	      };
	    } else if (fs2.futimes) {
	      fs2.lutimes = function(_a, _b, _c, cb) {
	        if (cb) process.nextTick(cb);
	      };
	      fs2.lutimesSync = function() {
	      };
	    }
	  }
	  function chmodFix(orig) {
	    if (!orig) return orig;
	    return function(target, mode, cb) {
	      return orig.call(fs, target, mode, function(er) {
	        if (chownErOk(er)) er = null;
	        if (cb) cb.apply(this, arguments);
	      });
	    };
	  }
	  function chmodFixSync(orig) {
	    if (!orig) return orig;
	    return function(target, mode) {
	      try {
	        return orig.call(fs, target, mode);
	      } catch (er) {
	        if (!chownErOk(er)) throw er;
	      }
	    };
	  }
	  function chownFix(orig) {
	    if (!orig) return orig;
	    return function(target, uid, gid, cb) {
	      return orig.call(fs, target, uid, gid, function(er) {
	        if (chownErOk(er)) er = null;
	        if (cb) cb.apply(this, arguments);
	      });
	    };
	  }
	  function chownFixSync(orig) {
	    if (!orig) return orig;
	    return function(target, uid, gid) {
	      try {
	        return orig.call(fs, target, uid, gid);
	      } catch (er) {
	        if (!chownErOk(er)) throw er;
	      }
	    };
	  }
	  function statFix(orig) {
	    if (!orig) return orig;
	    return function(target, options, cb) {
	      if (typeof options === "function") {
	        cb = options;
	        options = null;
	      }
	      function callback(er, stats) {
	        if (stats) {
	          if (stats.uid < 0) stats.uid += 4294967296;
	          if (stats.gid < 0) stats.gid += 4294967296;
	        }
	        if (cb) cb.apply(this, arguments);
	      }
	      return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
	    };
	  }
	  function statFixSync(orig) {
	    if (!orig) return orig;
	    return function(target, options) {
	      var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
	      if (stats) {
	        if (stats.uid < 0) stats.uid += 4294967296;
	        if (stats.gid < 0) stats.gid += 4294967296;
	      }
	      return stats;
	    };
	  }
	  function chownErOk(er) {
	    if (!er)
	      return true;
	    if (er.code === "ENOSYS")
	      return true;
	    var nonroot = !process.getuid || process.getuid() !== 0;
	    if (nonroot) {
	      if (er.code === "EINVAL" || er.code === "EPERM")
	        return true;
	    }
	    return false;
	  }
	}
	return polyfills;
}

var legacyStreams;
var hasRequiredLegacyStreams;

function requireLegacyStreams () {
	if (hasRequiredLegacyStreams) return legacyStreams;
	hasRequiredLegacyStreams = 1;
	var Stream = require$$1$1.Stream;

	legacyStreams = legacy;

	function legacy (fs) {
	  return {
	    ReadStream: ReadStream,
	    WriteStream: WriteStream
	  }

	  function ReadStream (path, options) {
	    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

	    Stream.call(this);

	    var self = this;

	    this.path = path;
	    this.fd = null;
	    this.readable = true;
	    this.paused = false;

	    this.flags = 'r';
	    this.mode = 438; /*=0666*/
	    this.bufferSize = 64 * 1024;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.encoding) this.setEncoding(this.encoding);

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.end === undefined) {
	        this.end = Infinity;
	      } else if ('number' !== typeof this.end) {
	        throw TypeError('end must be a Number');
	      }

	      if (this.start > this.end) {
	        throw new Error('start must be <= end');
	      }

	      this.pos = this.start;
	    }

	    if (this.fd !== null) {
	      process.nextTick(function() {
	        self._read();
	      });
	      return;
	    }

	    fs.open(this.path, this.flags, this.mode, function (err, fd) {
	      if (err) {
	        self.emit('error', err);
	        self.readable = false;
	        return;
	      }

	      self.fd = fd;
	      self.emit('open', fd);
	      self._read();
	    });
	  }

	  function WriteStream (path, options) {
	    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

	    Stream.call(this);

	    this.path = path;
	    this.fd = null;
	    this.writable = true;

	    this.flags = 'w';
	    this.encoding = 'binary';
	    this.mode = 438; /*=0666*/
	    this.bytesWritten = 0;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.start < 0) {
	        throw new Error('start must be >= zero');
	      }

	      this.pos = this.start;
	    }

	    this.busy = false;
	    this._queue = [];

	    if (this.fd === null) {
	      this._open = fs.open;
	      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
	      this.flush();
	    }
	  }
	}
	return legacyStreams;
}

var clone_1;
var hasRequiredClone;

function requireClone () {
	if (hasRequiredClone) return clone_1;
	hasRequiredClone = 1;

	clone_1 = clone;

	var getPrototypeOf = Object.getPrototypeOf || function (obj) {
	  return obj.__proto__
	};

	function clone (obj) {
	  if (obj === null || typeof obj !== 'object')
	    return obj

	  if (obj instanceof Object)
	    var copy = { __proto__: getPrototypeOf(obj) };
	  else
	    var copy = Object.create(null);

	  Object.getOwnPropertyNames(obj).forEach(function (key) {
	    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
	  });

	  return copy
	}
	return clone_1;
}

var gracefulFs;
var hasRequiredGracefulFs;

function requireGracefulFs () {
	if (hasRequiredGracefulFs) return gracefulFs;
	hasRequiredGracefulFs = 1;
	var define_process_env_default = {};
	var fs = require$$1$1;
	var polyfills = requirePolyfills();
	var legacy = requireLegacyStreams();
	var clone = requireClone();
	var util = require$$1$1;
	var gracefulQueue;
	var previousSymbol;
	if (typeof Symbol === "function" && typeof Symbol.for === "function") {
	  gracefulQueue = Symbol.for("graceful-fs.queue");
	  previousSymbol = Symbol.for("graceful-fs.previous");
	} else {
	  gracefulQueue = "___graceful-fs.queue";
	  previousSymbol = "___graceful-fs.previous";
	}
	function noop() {
	}
	function publishQueue(context, queue2) {
	  Object.defineProperty(context, gracefulQueue, {
	    get: function() {
	      return queue2;
	    }
	  });
	}
	var debug = noop;
	if (util.debuglog)
	  debug = util.debuglog("gfs4");
	else if (/\bgfs4\b/i.test(define_process_env_default.NODE_DEBUG || ""))
	  debug = function() {
	    var m = util.format.apply(util, arguments);
	    m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
	    console.error(m);
	  };
	if (!fs[gracefulQueue]) {
	  var queue = commonjsGlobal[gracefulQueue] || [];
	  publishQueue(fs, queue);
	  fs.close = function(fs$close) {
	    function close(fd, cb) {
	      return fs$close.call(fs, fd, function(err) {
	        if (!err) {
	          resetQueue();
	        }
	        if (typeof cb === "function")
	          cb.apply(this, arguments);
	      });
	    }
	    Object.defineProperty(close, previousSymbol, {
	      value: fs$close
	    });
	    return close;
	  }(fs.close);
	  fs.closeSync = function(fs$closeSync) {
	    function closeSync(fd) {
	      fs$closeSync.apply(fs, arguments);
	      resetQueue();
	    }
	    Object.defineProperty(closeSync, previousSymbol, {
	      value: fs$closeSync
	    });
	    return closeSync;
	  }(fs.closeSync);
	  if (/\bgfs4\b/i.test(define_process_env_default.NODE_DEBUG || "")) {
	    process.on("exit", function() {
	      debug(fs[gracefulQueue]);
	      require$$1$1.equal(fs[gracefulQueue].length, 0);
	    });
	  }
	}
	if (!commonjsGlobal[gracefulQueue]) {
	  publishQueue(commonjsGlobal, fs[gracefulQueue]);
	}
	gracefulFs = patch(clone(fs));
	if (define_process_env_default.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
	  gracefulFs = patch(fs);
	  fs.__patched = true;
	}
	function patch(fs2) {
	  polyfills(fs2);
	  fs2.gracefulify = patch;
	  fs2.createReadStream = createReadStream;
	  fs2.createWriteStream = createWriteStream;
	  var fs$readFile = fs2.readFile;
	  fs2.readFile = readFile;
	  function readFile(path, options, cb) {
	    if (typeof options === "function")
	      cb = options, options = null;
	    return go$readFile(path, options, cb);
	    function go$readFile(path2, options2, cb2, startTime) {
	      return fs$readFile(path2, options2, function(err) {
	        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
	          enqueue([go$readFile, [path2, options2, cb2], err, startTime || Date.now(), Date.now()]);
	        else {
	          if (typeof cb2 === "function")
	            cb2.apply(this, arguments);
	        }
	      });
	    }
	  }
	  var fs$writeFile = fs2.writeFile;
	  fs2.writeFile = writeFile;
	  function writeFile(path, data, options, cb) {
	    if (typeof options === "function")
	      cb = options, options = null;
	    return go$writeFile(path, data, options, cb);
	    function go$writeFile(path2, data2, options2, cb2, startTime) {
	      return fs$writeFile(path2, data2, options2, function(err) {
	        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
	          enqueue([go$writeFile, [path2, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
	        else {
	          if (typeof cb2 === "function")
	            cb2.apply(this, arguments);
	        }
	      });
	    }
	  }
	  var fs$appendFile = fs2.appendFile;
	  if (fs$appendFile)
	    fs2.appendFile = appendFile;
	  function appendFile(path, data, options, cb) {
	    if (typeof options === "function")
	      cb = options, options = null;
	    return go$appendFile(path, data, options, cb);
	    function go$appendFile(path2, data2, options2, cb2, startTime) {
	      return fs$appendFile(path2, data2, options2, function(err) {
	        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
	          enqueue([go$appendFile, [path2, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
	        else {
	          if (typeof cb2 === "function")
	            cb2.apply(this, arguments);
	        }
	      });
	    }
	  }
	  var fs$copyFile = fs2.copyFile;
	  if (fs$copyFile)
	    fs2.copyFile = copyFile;
	  function copyFile(src, dest, flags, cb) {
	    if (typeof flags === "function") {
	      cb = flags;
	      flags = 0;
	    }
	    return go$copyFile(src, dest, flags, cb);
	    function go$copyFile(src2, dest2, flags2, cb2, startTime) {
	      return fs$copyFile(src2, dest2, flags2, function(err) {
	        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
	          enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
	        else {
	          if (typeof cb2 === "function")
	            cb2.apply(this, arguments);
	        }
	      });
	    }
	  }
	  var fs$readdir = fs2.readdir;
	  fs2.readdir = readdir;
	  var noReaddirOptionVersions = /^v[0-5]\./;
	  function readdir(path, options, cb) {
	    if (typeof options === "function")
	      cb = options, options = null;
	    var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path2, options2, cb2, startTime) {
	      return fs$readdir(path2, fs$readdirCallback(
	        path2,
	        options2,
	        cb2,
	        startTime
	      ));
	    } : function go$readdir2(path2, options2, cb2, startTime) {
	      return fs$readdir(path2, options2, fs$readdirCallback(
	        path2,
	        options2,
	        cb2,
	        startTime
	      ));
	    };
	    return go$readdir(path, options, cb);
	    function fs$readdirCallback(path2, options2, cb2, startTime) {
	      return function(err, files) {
	        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
	          enqueue([
	            go$readdir,
	            [path2, options2, cb2],
	            err,
	            startTime || Date.now(),
	            Date.now()
	          ]);
	        else {
	          if (files && files.sort)
	            files.sort();
	          if (typeof cb2 === "function")
	            cb2.call(this, err, files);
	        }
	      };
	    }
	  }
	  if (process.version.substr(0, 4) === "v0.8") {
	    var legStreams = legacy(fs2);
	    ReadStream = legStreams.ReadStream;
	    WriteStream = legStreams.WriteStream;
	  }
	  var fs$ReadStream = fs2.ReadStream;
	  if (fs$ReadStream) {
	    ReadStream.prototype = Object.create(fs$ReadStream.prototype);
	    ReadStream.prototype.open = ReadStream$open;
	  }
	  var fs$WriteStream = fs2.WriteStream;
	  if (fs$WriteStream) {
	    WriteStream.prototype = Object.create(fs$WriteStream.prototype);
	    WriteStream.prototype.open = WriteStream$open;
	  }
	  Object.defineProperty(fs2, "ReadStream", {
	    get: function() {
	      return ReadStream;
	    },
	    set: function(val) {
	      ReadStream = val;
	    },
	    enumerable: true,
	    configurable: true
	  });
	  Object.defineProperty(fs2, "WriteStream", {
	    get: function() {
	      return WriteStream;
	    },
	    set: function(val) {
	      WriteStream = val;
	    },
	    enumerable: true,
	    configurable: true
	  });
	  var FileReadStream = ReadStream;
	  Object.defineProperty(fs2, "FileReadStream", {
	    get: function() {
	      return FileReadStream;
	    },
	    set: function(val) {
	      FileReadStream = val;
	    },
	    enumerable: true,
	    configurable: true
	  });
	  var FileWriteStream = WriteStream;
	  Object.defineProperty(fs2, "FileWriteStream", {
	    get: function() {
	      return FileWriteStream;
	    },
	    set: function(val) {
	      FileWriteStream = val;
	    },
	    enumerable: true,
	    configurable: true
	  });
	  function ReadStream(path, options) {
	    if (this instanceof ReadStream)
	      return fs$ReadStream.apply(this, arguments), this;
	    else
	      return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
	  }
	  function ReadStream$open() {
	    var that = this;
	    open(that.path, that.flags, that.mode, function(err, fd) {
	      if (err) {
	        if (that.autoClose)
	          that.destroy();
	        that.emit("error", err);
	      } else {
	        that.fd = fd;
	        that.emit("open", fd);
	        that.read();
	      }
	    });
	  }
	  function WriteStream(path, options) {
	    if (this instanceof WriteStream)
	      return fs$WriteStream.apply(this, arguments), this;
	    else
	      return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
	  }
	  function WriteStream$open() {
	    var that = this;
	    open(that.path, that.flags, that.mode, function(err, fd) {
	      if (err) {
	        that.destroy();
	        that.emit("error", err);
	      } else {
	        that.fd = fd;
	        that.emit("open", fd);
	      }
	    });
	  }
	  function createReadStream(path, options) {
	    return new fs2.ReadStream(path, options);
	  }
	  function createWriteStream(path, options) {
	    return new fs2.WriteStream(path, options);
	  }
	  var fs$open = fs2.open;
	  fs2.open = open;
	  function open(path, flags, mode, cb) {
	    if (typeof mode === "function")
	      cb = mode, mode = null;
	    return go$open(path, flags, mode, cb);
	    function go$open(path2, flags2, mode2, cb2, startTime) {
	      return fs$open(path2, flags2, mode2, function(err, fd) {
	        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
	          enqueue([go$open, [path2, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
	        else {
	          if (typeof cb2 === "function")
	            cb2.apply(this, arguments);
	        }
	      });
	    }
	  }
	  return fs2;
	}
	function enqueue(elem) {
	  debug("ENQUEUE", elem[0].name, elem[1]);
	  fs[gracefulQueue].push(elem);
	  retry();
	}
	var retryTimer;
	function resetQueue() {
	  var now = Date.now();
	  for (var i = 0; i < fs[gracefulQueue].length; ++i) {
	    if (fs[gracefulQueue][i].length > 2) {
	      fs[gracefulQueue][i][3] = now;
	      fs[gracefulQueue][i][4] = now;
	    }
	  }
	  retry();
	}
	function retry() {
	  clearTimeout(retryTimer);
	  retryTimer = void 0;
	  if (fs[gracefulQueue].length === 0)
	    return;
	  var elem = fs[gracefulQueue].shift();
	  var fn = elem[0];
	  var args = elem[1];
	  var err = elem[2];
	  var startTime = elem[3];
	  var lastTime = elem[4];
	  if (startTime === void 0) {
	    debug("RETRY", fn.name, args);
	    fn.apply(null, args);
	  } else if (Date.now() - startTime >= 6e4) {
	    debug("TIMEOUT", fn.name, args);
	    var cb = args.pop();
	    if (typeof cb === "function")
	      cb.call(null, err);
	  } else {
	    var sinceAttempt = Date.now() - lastTime;
	    var sinceStart = Math.max(lastTime - startTime, 1);
	    var desiredDelay = Math.min(sinceStart * 1.2, 100);
	    if (sinceAttempt >= desiredDelay) {
	      debug("RETRY", fn.name, args);
	      fn.apply(null, args.concat([startTime]));
	    } else {
	      fs[gracefulQueue].push(elem);
	    }
	  }
	  if (retryTimer === void 0) {
	    retryTimer = setTimeout(retry, 0);
	  }
	}
	return gracefulFs;
}

var hasRequiredFs$4;

function requireFs$4 () {
	if (hasRequiredFs$4) return fs$4;
	hasRequiredFs$4 = 1;
	(function (exports) {
		// This is adapted from https://github.com/normalize/mz
		// Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
		const u = requireUniversalify().fromCallback;
		const fs = requireGracefulFs();

		const api = [
		  'access',
		  'appendFile',
		  'chmod',
		  'chown',
		  'close',
		  'copyFile',
		  'cp',
		  'fchmod',
		  'fchown',
		  'fdatasync',
		  'fstat',
		  'fsync',
		  'ftruncate',
		  'futimes',
		  'glob',
		  'lchmod',
		  'lchown',
		  'lutimes',
		  'link',
		  'lstat',
		  'mkdir',
		  'mkdtemp',
		  'open',
		  'opendir',
		  'readdir',
		  'readFile',
		  'readlink',
		  'realpath',
		  'rename',
		  'rm',
		  'rmdir',
		  'stat',
		  'statfs',
		  'symlink',
		  'truncate',
		  'unlink',
		  'utimes',
		  'writeFile'
		].filter(key => {
		  // Some commands are not available on some systems. Ex:
		  // fs.cp was added in Node.js v16.7.0
		  // fs.statfs was added in Node v19.6.0, v18.15.0
		  // fs.glob was added in Node.js v22.0.0
		  // fs.lchown is not available on at least some Linux
		  return typeof fs[key] === 'function'
		});

		// Export cloned fs:
		Object.assign(exports, fs);

		// Universalify async methods:
		api.forEach(method => {
		  exports[method] = u(fs[method]);
		});

		// We differ from mz/fs in that we still ship the old, broken, fs.exists()
		// since we are a drop-in replacement for the native module
		exports.exists = function (filename, callback) {
		  if (typeof callback === 'function') {
		    return fs.exists(filename, callback)
		  }
		  return new Promise(resolve => {
		    return fs.exists(filename, resolve)
		  })
		};

		// fs.read(), fs.write(), fs.readv(), & fs.writev() need special treatment due to multiple callback args

		exports.read = function (fd, buffer, offset, length, position, callback) {
		  if (typeof callback === 'function') {
		    return fs.read(fd, buffer, offset, length, position, callback)
		  }
		  return new Promise((resolve, reject) => {
		    fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
		      if (err) return reject(err)
		      resolve({ bytesRead, buffer });
		    });
		  })
		};

		// Function signature can be
		// fs.write(fd, buffer[, offset[, length[, position]]], callback)
		// OR
		// fs.write(fd, string[, position[, encoding]], callback)
		// We need to handle both cases, so we use ...args
		exports.write = function (fd, buffer, ...args) {
		  if (typeof args[args.length - 1] === 'function') {
		    return fs.write(fd, buffer, ...args)
		  }

		  return new Promise((resolve, reject) => {
		    fs.write(fd, buffer, ...args, (err, bytesWritten, buffer) => {
		      if (err) return reject(err)
		      resolve({ bytesWritten, buffer });
		    });
		  })
		};

		// Function signature is
		// s.readv(fd, buffers[, position], callback)
		// We need to handle the optional arg, so we use ...args
		exports.readv = function (fd, buffers, ...args) {
		  if (typeof args[args.length - 1] === 'function') {
		    return fs.readv(fd, buffers, ...args)
		  }

		  return new Promise((resolve, reject) => {
		    fs.readv(fd, buffers, ...args, (err, bytesRead, buffers) => {
		      if (err) return reject(err)
		      resolve({ bytesRead, buffers });
		    });
		  })
		};

		// Function signature is
		// s.writev(fd, buffers[, position], callback)
		// We need to handle the optional arg, so we use ...args
		exports.writev = function (fd, buffers, ...args) {
		  if (typeof args[args.length - 1] === 'function') {
		    return fs.writev(fd, buffers, ...args)
		  }

		  return new Promise((resolve, reject) => {
		    fs.writev(fd, buffers, ...args, (err, bytesWritten, buffers) => {
		      if (err) return reject(err)
		      resolve({ bytesWritten, buffers });
		    });
		  })
		};

		// fs.realpath.native sometimes not available if fs is monkey-patched
		if (typeof fs.realpath.native === 'function') {
		  exports.realpath.native = u(fs.realpath.native);
		} else {
		  process.emitWarning(
		    'fs.realpath.native is not a function. Is fs being monkey-patched?',
		    'Warning', 'fs-extra-WARN0003'
		  );
		} 
	} (fs$4));
	return fs$4;
}

var makeDir = {};

var utils$5 = {};

var hasRequiredUtils$5;

function requireUtils$5 () {
	if (hasRequiredUtils$5) return utils$5;
	hasRequiredUtils$5 = 1;
	const path = require$$1$1;

	// https://github.com/nodejs/node/issues/8987
	// https://github.com/libuv/libuv/pull/1088
	utils$5.checkPath = function checkPath (pth) {
	  if (process.platform === 'win32') {
	    const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path.parse(pth).root, ''));

	    if (pathHasInvalidWinCharacters) {
	      const error = new Error(`Path contains invalid characters: ${pth}`);
	      error.code = 'EINVAL';
	      throw error
	    }
	  }
	};
	return utils$5;
}

var hasRequiredMakeDir;

function requireMakeDir () {
	if (hasRequiredMakeDir) return makeDir;
	hasRequiredMakeDir = 1;
	const fs = /*@__PURE__*/ requireFs$4();
	const { checkPath } = /*@__PURE__*/ requireUtils$5();

	const getMode = options => {
	  const defaults = { mode: 0o777 };
	  if (typeof options === 'number') return options
	  return ({ ...defaults, ...options }).mode
	};

	makeDir.makeDir = async (dir, options) => {
	  checkPath(dir);

	  return fs.mkdir(dir, {
	    mode: getMode(options),
	    recursive: true
	  })
	};

	makeDir.makeDirSync = (dir, options) => {
	  checkPath(dir);

	  return fs.mkdirSync(dir, {
	    mode: getMode(options),
	    recursive: true
	  })
	};
	return makeDir;
}

var mkdirs;
var hasRequiredMkdirs;

function requireMkdirs () {
	if (hasRequiredMkdirs) return mkdirs;
	hasRequiredMkdirs = 1;
	const u = requireUniversalify().fromPromise;
	const { makeDir: _makeDir, makeDirSync } = /*@__PURE__*/ requireMakeDir();
	const makeDir = u(_makeDir);

	mkdirs = {
	  mkdirs: makeDir,
	  mkdirsSync: makeDirSync,
	  // alias
	  mkdirp: makeDir,
	  mkdirpSync: makeDirSync,
	  ensureDir: makeDir,
	  ensureDirSync: makeDirSync
	};
	return mkdirs;
}

var pathExists_1;
var hasRequiredPathExists;

function requirePathExists () {
	if (hasRequiredPathExists) return pathExists_1;
	hasRequiredPathExists = 1;
	const u = requireUniversalify().fromPromise;
	const fs = /*@__PURE__*/ requireFs$4();

	function pathExists (path) {
	  return fs.access(path).then(() => true).catch(() => false)
	}

	pathExists_1 = {
	  pathExists: u(pathExists),
	  pathExistsSync: fs.existsSync
	};
	return pathExists_1;
}

var utimes;
var hasRequiredUtimes;

function requireUtimes () {
	if (hasRequiredUtimes) return utimes;
	hasRequiredUtimes = 1;

	const fs = /*@__PURE__*/ requireFs$4();
	const u = requireUniversalify().fromPromise;

	async function utimesMillis (path, atime, mtime) {
	  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
	  const fd = await fs.open(path, 'r+');

	  let closeErr = null;

	  try {
	    await fs.futimes(fd, atime, mtime);
	  } finally {
	    try {
	      await fs.close(fd);
	    } catch (e) {
	      closeErr = e;
	    }
	  }

	  if (closeErr) {
	    throw closeErr
	  }
	}

	function utimesMillisSync (path, atime, mtime) {
	  const fd = fs.openSync(path, 'r+');
	  fs.futimesSync(fd, atime, mtime);
	  return fs.closeSync(fd)
	}

	utimes = {
	  utimesMillis: u(utimesMillis),
	  utimesMillisSync
	};
	return utimes;
}

var stat;
var hasRequiredStat;

function requireStat () {
	if (hasRequiredStat) return stat;
	hasRequiredStat = 1;

	const fs = /*@__PURE__*/ requireFs$4();
	const path = require$$1$1;
	const u = requireUniversalify().fromPromise;

	function getStats (src, dest, opts) {
	  const statFunc = opts.dereference
	    ? (file) => fs.stat(file, { bigint: true })
	    : (file) => fs.lstat(file, { bigint: true });
	  return Promise.all([
	    statFunc(src),
	    statFunc(dest).catch(err => {
	      if (err.code === 'ENOENT') return null
	      throw err
	    })
	  ]).then(([srcStat, destStat]) => ({ srcStat, destStat }))
	}

	function getStatsSync (src, dest, opts) {
	  let destStat;
	  const statFunc = opts.dereference
	    ? (file) => fs.statSync(file, { bigint: true })
	    : (file) => fs.lstatSync(file, { bigint: true });
	  const srcStat = statFunc(src);
	  try {
	    destStat = statFunc(dest);
	  } catch (err) {
	    if (err.code === 'ENOENT') return { srcStat, destStat: null }
	    throw err
	  }
	  return { srcStat, destStat }
	}

	async function checkPaths (src, dest, funcName, opts) {
	  const { srcStat, destStat } = await getStats(src, dest, opts);
	  if (destStat) {
	    if (areIdentical(srcStat, destStat)) {
	      const srcBaseName = path.basename(src);
	      const destBaseName = path.basename(dest);
	      if (funcName === 'move' &&
	        srcBaseName !== destBaseName &&
	        srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
	        return { srcStat, destStat, isChangingCase: true }
	      }
	      throw new Error('Source and destination must not be the same.')
	    }
	    if (srcStat.isDirectory() && !destStat.isDirectory()) {
	      throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)
	    }
	    if (!srcStat.isDirectory() && destStat.isDirectory()) {
	      throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`)
	    }
	  }

	  if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
	    throw new Error(errMsg(src, dest, funcName))
	  }

	  return { srcStat, destStat }
	}

	function checkPathsSync (src, dest, funcName, opts) {
	  const { srcStat, destStat } = getStatsSync(src, dest, opts);

	  if (destStat) {
	    if (areIdentical(srcStat, destStat)) {
	      const srcBaseName = path.basename(src);
	      const destBaseName = path.basename(dest);
	      if (funcName === 'move' &&
	        srcBaseName !== destBaseName &&
	        srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
	        return { srcStat, destStat, isChangingCase: true }
	      }
	      throw new Error('Source and destination must not be the same.')
	    }
	    if (srcStat.isDirectory() && !destStat.isDirectory()) {
	      throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)
	    }
	    if (!srcStat.isDirectory() && destStat.isDirectory()) {
	      throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`)
	    }
	  }

	  if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
	    throw new Error(errMsg(src, dest, funcName))
	  }
	  return { srcStat, destStat }
	}

	// recursively check if dest parent is a subdirectory of src.
	// It works for all file types including symlinks since it
	// checks the src and dest inodes. It starts from the deepest
	// parent and stops once it reaches the src parent or the root path.
	async function checkParentPaths (src, srcStat, dest, funcName) {
	  const srcParent = path.resolve(path.dirname(src));
	  const destParent = path.resolve(path.dirname(dest));
	  if (destParent === srcParent || destParent === path.parse(destParent).root) return

	  let destStat;
	  try {
	    destStat = await fs.stat(destParent, { bigint: true });
	  } catch (err) {
	    if (err.code === 'ENOENT') return
	    throw err
	  }

	  if (areIdentical(srcStat, destStat)) {
	    throw new Error(errMsg(src, dest, funcName))
	  }

	  return checkParentPaths(src, srcStat, destParent, funcName)
	}

	function checkParentPathsSync (src, srcStat, dest, funcName) {
	  const srcParent = path.resolve(path.dirname(src));
	  const destParent = path.resolve(path.dirname(dest));
	  if (destParent === srcParent || destParent === path.parse(destParent).root) return
	  let destStat;
	  try {
	    destStat = fs.statSync(destParent, { bigint: true });
	  } catch (err) {
	    if (err.code === 'ENOENT') return
	    throw err
	  }
	  if (areIdentical(srcStat, destStat)) {
	    throw new Error(errMsg(src, dest, funcName))
	  }
	  return checkParentPathsSync(src, srcStat, destParent, funcName)
	}

	function areIdentical (srcStat, destStat) {
	  return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev
	}

	// return true if dest is a subdir of src, otherwise false.
	// It only checks the path strings.
	function isSrcSubdir (src, dest) {
	  const srcArr = path.resolve(src).split(path.sep).filter(i => i);
	  const destArr = path.resolve(dest).split(path.sep).filter(i => i);
	  return srcArr.every((cur, i) => destArr[i] === cur)
	}

	function errMsg (src, dest, funcName) {
	  return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`
	}

	stat = {
	  // checkPaths
	  checkPaths: u(checkPaths),
	  checkPathsSync,
	  // checkParent
	  checkParentPaths: u(checkParentPaths),
	  checkParentPathsSync,
	  // Misc
	  isSrcSubdir,
	  areIdentical
	};
	return stat;
}

var copy_1;
var hasRequiredCopy$1;

function requireCopy$1 () {
	if (hasRequiredCopy$1) return copy_1;
	hasRequiredCopy$1 = 1;

	const fs = /*@__PURE__*/ requireFs$4();
	const path = require$$1$1;
	const { mkdirs } = /*@__PURE__*/ requireMkdirs();
	const { pathExists } = /*@__PURE__*/ requirePathExists();
	const { utimesMillis } = /*@__PURE__*/ requireUtimes();
	const stat = /*@__PURE__*/ requireStat();

	async function copy (src, dest, opts = {}) {
	  if (typeof opts === 'function') {
	    opts = { filter: opts };
	  }

	  opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now
	  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber

	  // Warn about using preserveTimestamps on 32-bit node
	  if (opts.preserveTimestamps && process.arch === 'ia32') {
	    process.emitWarning(
	      'Using the preserveTimestamps option in 32-bit node is not recommended;\n\n' +
	      '\tsee https://github.com/jprichardson/node-fs-extra/issues/269',
	      'Warning', 'fs-extra-WARN0001'
	    );
	  }

	  const { srcStat, destStat } = await stat.checkPaths(src, dest, 'copy', opts);

	  await stat.checkParentPaths(src, srcStat, dest, 'copy');

	  const include = await runFilter(src, dest, opts);

	  if (!include) return

	  // check if the parent of dest exists, and create it if it doesn't exist
	  const destParent = path.dirname(dest);
	  const dirExists = await pathExists(destParent);
	  if (!dirExists) {
	    await mkdirs(destParent);
	  }

	  await getStatsAndPerformCopy(destStat, src, dest, opts);
	}

	async function runFilter (src, dest, opts) {
	  if (!opts.filter) return true
	  return opts.filter(src, dest)
	}

	async function getStatsAndPerformCopy (destStat, src, dest, opts) {
	  const statFn = opts.dereference ? fs.stat : fs.lstat;
	  const srcStat = await statFn(src);

	  if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts)

	  if (
	    srcStat.isFile() ||
	    srcStat.isCharacterDevice() ||
	    srcStat.isBlockDevice()
	  ) return onFile(srcStat, destStat, src, dest, opts)

	  if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts)
	  if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`)
	  if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`)
	  throw new Error(`Unknown file: ${src}`)
	}

	async function onFile (srcStat, destStat, src, dest, opts) {
	  if (!destStat) return copyFile(srcStat, src, dest, opts)

	  if (opts.overwrite) {
	    await fs.unlink(dest);
	    return copyFile(srcStat, src, dest, opts)
	  }
	  if (opts.errorOnExist) {
	    throw new Error(`'${dest}' already exists`)
	  }
	}

	async function copyFile (srcStat, src, dest, opts) {
	  await fs.copyFile(src, dest);
	  if (opts.preserveTimestamps) {
	    // Make sure the file is writable before setting the timestamp
	    // otherwise open fails with EPERM when invoked with 'r+'
	    // (through utimes call)
	    if (fileIsNotWritable(srcStat.mode)) {
	      await makeFileWritable(dest, srcStat.mode);
	    }

	    // Set timestamps and mode correspondingly

	    // Note that The initial srcStat.atime cannot be trusted
	    // because it is modified by the read(2) system call
	    // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
	    const updatedSrcStat = await fs.stat(src);
	    await utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
	  }

	  return fs.chmod(dest, srcStat.mode)
	}

	function fileIsNotWritable (srcMode) {
	  return (srcMode & 0o200) === 0
	}

	function makeFileWritable (dest, srcMode) {
	  return fs.chmod(dest, srcMode | 0o200)
	}

	async function onDir (srcStat, destStat, src, dest, opts) {
	  // the dest directory might not exist, create it
	  if (!destStat) {
	    await fs.mkdir(dest);
	  }

	  const promises = [];

	  // loop through the files in the current directory to copy everything
	  for await (const item of await fs.opendir(src)) {
	    const srcItem = path.join(src, item.name);
	    const destItem = path.join(dest, item.name);

	    promises.push(
	      runFilter(srcItem, destItem, opts).then(include => {
	        if (include) {
	          // only copy the item if it matches the filter function
	          return stat.checkPaths(srcItem, destItem, 'copy', opts).then(({ destStat }) => {
	            // If the item is a copyable file, `getStatsAndPerformCopy` will copy it
	            // If the item is a directory, `getStatsAndPerformCopy` will call `onDir` recursively
	            return getStatsAndPerformCopy(destStat, srcItem, destItem, opts)
	          })
	        }
	      })
	    );
	  }

	  await Promise.all(promises);

	  if (!destStat) {
	    await fs.chmod(dest, srcStat.mode);
	  }
	}

	async function onLink (destStat, src, dest, opts) {
	  let resolvedSrc = await fs.readlink(src);
	  if (opts.dereference) {
	    resolvedSrc = path.resolve(process.cwd(), resolvedSrc);
	  }
	  if (!destStat) {
	    return fs.symlink(resolvedSrc, dest)
	  }

	  let resolvedDest = null;
	  try {
	    resolvedDest = await fs.readlink(dest);
	  } catch (e) {
	    // dest exists and is a regular file or directory,
	    // Windows may throw UNKNOWN error. If dest already exists,
	    // fs throws error anyway, so no need to guard against it here.
	    if (e.code === 'EINVAL' || e.code === 'UNKNOWN') return fs.symlink(resolvedSrc, dest)
	    throw e
	  }
	  if (opts.dereference) {
	    resolvedDest = path.resolve(process.cwd(), resolvedDest);
	  }
	  if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
	    throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`)
	  }

	  // do not copy if src is a subdir of dest since unlinking
	  // dest in this case would result in removing src contents
	  // and therefore a broken symlink would be created.
	  if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
	    throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`)
	  }

	  // copy the link
	  await fs.unlink(dest);
	  return fs.symlink(resolvedSrc, dest)
	}

	copy_1 = copy;
	return copy_1;
}

var copySync_1;
var hasRequiredCopySync;

function requireCopySync () {
	if (hasRequiredCopySync) return copySync_1;
	hasRequiredCopySync = 1;

	const fs = requireGracefulFs();
	const path = require$$1$1;
	const mkdirsSync = /*@__PURE__*/ requireMkdirs().mkdirsSync;
	const utimesMillisSync = /*@__PURE__*/ requireUtimes().utimesMillisSync;
	const stat = /*@__PURE__*/ requireStat();

	function copySync (src, dest, opts) {
	  if (typeof opts === 'function') {
	    opts = { filter: opts };
	  }

	  opts = opts || {};
	  opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now
	  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber

	  // Warn about using preserveTimestamps on 32-bit node
	  if (opts.preserveTimestamps && process.arch === 'ia32') {
	    process.emitWarning(
	      'Using the preserveTimestamps option in 32-bit node is not recommended;\n\n' +
	      '\tsee https://github.com/jprichardson/node-fs-extra/issues/269',
	      'Warning', 'fs-extra-WARN0002'
	    );
	  }

	  const { srcStat, destStat } = stat.checkPathsSync(src, dest, 'copy', opts);
	  stat.checkParentPathsSync(src, srcStat, dest, 'copy');
	  if (opts.filter && !opts.filter(src, dest)) return
	  const destParent = path.dirname(dest);
	  if (!fs.existsSync(destParent)) mkdirsSync(destParent);
	  return getStats(destStat, src, dest, opts)
	}

	function getStats (destStat, src, dest, opts) {
	  const statSync = opts.dereference ? fs.statSync : fs.lstatSync;
	  const srcStat = statSync(src);

	  if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts)
	  else if (srcStat.isFile() ||
	           srcStat.isCharacterDevice() ||
	           srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts)
	  else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts)
	  else if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`)
	  else if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`)
	  throw new Error(`Unknown file: ${src}`)
	}

	function onFile (srcStat, destStat, src, dest, opts) {
	  if (!destStat) return copyFile(srcStat, src, dest, opts)
	  return mayCopyFile(srcStat, src, dest, opts)
	}

	function mayCopyFile (srcStat, src, dest, opts) {
	  if (opts.overwrite) {
	    fs.unlinkSync(dest);
	    return copyFile(srcStat, src, dest, opts)
	  } else if (opts.errorOnExist) {
	    throw new Error(`'${dest}' already exists`)
	  }
	}

	function copyFile (srcStat, src, dest, opts) {
	  fs.copyFileSync(src, dest);
	  if (opts.preserveTimestamps) handleTimestamps(srcStat.mode, src, dest);
	  return setDestMode(dest, srcStat.mode)
	}

	function handleTimestamps (srcMode, src, dest) {
	  // Make sure the file is writable before setting the timestamp
	  // otherwise open fails with EPERM when invoked with 'r+'
	  // (through utimes call)
	  if (fileIsNotWritable(srcMode)) makeFileWritable(dest, srcMode);
	  return setDestTimestamps(src, dest)
	}

	function fileIsNotWritable (srcMode) {
	  return (srcMode & 0o200) === 0
	}

	function makeFileWritable (dest, srcMode) {
	  return setDestMode(dest, srcMode | 0o200)
	}

	function setDestMode (dest, srcMode) {
	  return fs.chmodSync(dest, srcMode)
	}

	function setDestTimestamps (src, dest) {
	  // The initial srcStat.atime cannot be trusted
	  // because it is modified by the read(2) system call
	  // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
	  const updatedSrcStat = fs.statSync(src);
	  return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime)
	}

	function onDir (srcStat, destStat, src, dest, opts) {
	  if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts)
	  return copyDir(src, dest, opts)
	}

	function mkDirAndCopy (srcMode, src, dest, opts) {
	  fs.mkdirSync(dest);
	  copyDir(src, dest, opts);
	  return setDestMode(dest, srcMode)
	}

	function copyDir (src, dest, opts) {
	  const dir = fs.opendirSync(src);

	  try {
	    let dirent;

	    while ((dirent = dir.readSync()) !== null) {
	      copyDirItem(dirent.name, src, dest, opts);
	    }
	  } finally {
	    dir.closeSync();
	  }
	}

	function copyDirItem (item, src, dest, opts) {
	  const srcItem = path.join(src, item);
	  const destItem = path.join(dest, item);
	  if (opts.filter && !opts.filter(srcItem, destItem)) return
	  const { destStat } = stat.checkPathsSync(srcItem, destItem, 'copy', opts);
	  return getStats(destStat, srcItem, destItem, opts)
	}

	function onLink (destStat, src, dest, opts) {
	  let resolvedSrc = fs.readlinkSync(src);
	  if (opts.dereference) {
	    resolvedSrc = path.resolve(process.cwd(), resolvedSrc);
	  }

	  if (!destStat) {
	    return fs.symlinkSync(resolvedSrc, dest)
	  } else {
	    let resolvedDest;
	    try {
	      resolvedDest = fs.readlinkSync(dest);
	    } catch (err) {
	      // dest exists and is a regular file or directory,
	      // Windows may throw UNKNOWN error. If dest already exists,
	      // fs throws error anyway, so no need to guard against it here.
	      if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs.symlinkSync(resolvedSrc, dest)
	      throw err
	    }
	    if (opts.dereference) {
	      resolvedDest = path.resolve(process.cwd(), resolvedDest);
	    }
	    if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
	      throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`)
	    }

	    // prevent copy if src is a subdir of dest since unlinking
	    // dest in this case would result in removing src contents
	    // and therefore a broken symlink would be created.
	    if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
	      throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`)
	    }
	    return copyLink(resolvedSrc, dest)
	  }
	}

	function copyLink (resolvedSrc, dest) {
	  fs.unlinkSync(dest);
	  return fs.symlinkSync(resolvedSrc, dest)
	}

	copySync_1 = copySync;
	return copySync_1;
}

var copy;
var hasRequiredCopy;

function requireCopy () {
	if (hasRequiredCopy) return copy;
	hasRequiredCopy = 1;

	const u = requireUniversalify().fromPromise;
	copy = {
	  copy: u(/*@__PURE__*/ requireCopy$1()),
	  copySync: /*@__PURE__*/ requireCopySync()
	};
	return copy;
}

var remove_1;
var hasRequiredRemove;

function requireRemove () {
	if (hasRequiredRemove) return remove_1;
	hasRequiredRemove = 1;

	const fs = requireGracefulFs();
	const u = requireUniversalify().fromCallback;

	function remove (path, callback) {
	  fs.rm(path, { recursive: true, force: true }, callback);
	}

	function removeSync (path) {
	  fs.rmSync(path, { recursive: true, force: true });
	}

	remove_1 = {
	  remove: u(remove),
	  removeSync
	};
	return remove_1;
}

var empty;
var hasRequiredEmpty;

function requireEmpty () {
	if (hasRequiredEmpty) return empty;
	hasRequiredEmpty = 1;

	const u = requireUniversalify().fromPromise;
	const fs = /*@__PURE__*/ requireFs$4();
	const path = require$$1$1;
	const mkdir = /*@__PURE__*/ requireMkdirs();
	const remove = /*@__PURE__*/ requireRemove();

	const emptyDir = u(async function emptyDir (dir) {
	  let items;
	  try {
	    items = await fs.readdir(dir);
	  } catch {
	    return mkdir.mkdirs(dir)
	  }

	  return Promise.all(items.map(item => remove.remove(path.join(dir, item))))
	});

	function emptyDirSync (dir) {
	  let items;
	  try {
	    items = fs.readdirSync(dir);
	  } catch {
	    return mkdir.mkdirsSync(dir)
	  }

	  items.forEach(item => {
	    item = path.join(dir, item);
	    remove.removeSync(item);
	  });
	}

	empty = {
	  emptyDirSync,
	  emptydirSync: emptyDirSync,
	  emptyDir,
	  emptydir: emptyDir
	};
	return empty;
}

var file;
var hasRequiredFile;

function requireFile () {
	if (hasRequiredFile) return file;
	hasRequiredFile = 1;

	const u = requireUniversalify().fromPromise;
	const path = require$$1$1;
	const fs = /*@__PURE__*/ requireFs$4();
	const mkdir = /*@__PURE__*/ requireMkdirs();

	async function createFile (file) {
	  let stats;
	  try {
	    stats = await fs.stat(file);
	  } catch { }
	  if (stats && stats.isFile()) return

	  const dir = path.dirname(file);

	  let dirStats = null;
	  try {
	    dirStats = await fs.stat(dir);
	  } catch (err) {
	    // if the directory doesn't exist, make it
	    if (err.code === 'ENOENT') {
	      await mkdir.mkdirs(dir);
	      await fs.writeFile(file, '');
	      return
	    } else {
	      throw err
	    }
	  }

	  if (dirStats.isDirectory()) {
	    await fs.writeFile(file, '');
	  } else {
	    // parent is not a directory
	    // This is just to cause an internal ENOTDIR error to be thrown
	    await fs.readdir(dir);
	  }
	}

	function createFileSync (file) {
	  let stats;
	  try {
	    stats = fs.statSync(file);
	  } catch { }
	  if (stats && stats.isFile()) return

	  const dir = path.dirname(file);
	  try {
	    if (!fs.statSync(dir).isDirectory()) {
	      // parent is not a directory
	      // This is just to cause an internal ENOTDIR error to be thrown
	      fs.readdirSync(dir);
	    }
	  } catch (err) {
	    // If the stat call above failed because the directory doesn't exist, create it
	    if (err && err.code === 'ENOENT') mkdir.mkdirsSync(dir);
	    else throw err
	  }

	  fs.writeFileSync(file, '');
	}

	file = {
	  createFile: u(createFile),
	  createFileSync
	};
	return file;
}

var link;
var hasRequiredLink;

function requireLink () {
	if (hasRequiredLink) return link;
	hasRequiredLink = 1;

	const u = requireUniversalify().fromPromise;
	const path = require$$1$1;
	const fs = /*@__PURE__*/ requireFs$4();
	const mkdir = /*@__PURE__*/ requireMkdirs();
	const { pathExists } = /*@__PURE__*/ requirePathExists();
	const { areIdentical } = /*@__PURE__*/ requireStat();

	async function createLink (srcpath, dstpath) {
	  let dstStat;
	  try {
	    dstStat = await fs.lstat(dstpath);
	  } catch {
	    // ignore error
	  }

	  let srcStat;
	  try {
	    srcStat = await fs.lstat(srcpath);
	  } catch (err) {
	    err.message = err.message.replace('lstat', 'ensureLink');
	    throw err
	  }

	  if (dstStat && areIdentical(srcStat, dstStat)) return

	  const dir = path.dirname(dstpath);

	  const dirExists = await pathExists(dir);

	  if (!dirExists) {
	    await mkdir.mkdirs(dir);
	  }

	  await fs.link(srcpath, dstpath);
	}

	function createLinkSync (srcpath, dstpath) {
	  let dstStat;
	  try {
	    dstStat = fs.lstatSync(dstpath);
	  } catch {}

	  try {
	    const srcStat = fs.lstatSync(srcpath);
	    if (dstStat && areIdentical(srcStat, dstStat)) return
	  } catch (err) {
	    err.message = err.message.replace('lstat', 'ensureLink');
	    throw err
	  }

	  const dir = path.dirname(dstpath);
	  const dirExists = fs.existsSync(dir);
	  if (dirExists) return fs.linkSync(srcpath, dstpath)
	  mkdir.mkdirsSync(dir);

	  return fs.linkSync(srcpath, dstpath)
	}

	link = {
	  createLink: u(createLink),
	  createLinkSync
	};
	return link;
}

var symlinkPaths_1;
var hasRequiredSymlinkPaths;

function requireSymlinkPaths () {
	if (hasRequiredSymlinkPaths) return symlinkPaths_1;
	hasRequiredSymlinkPaths = 1;

	const path = require$$1$1;
	const fs = /*@__PURE__*/ requireFs$4();
	const { pathExists } = /*@__PURE__*/ requirePathExists();

	const u = requireUniversalify().fromPromise;

	/**
	 * Function that returns two types of paths, one relative to symlink, and one
	 * relative to the current working directory. Checks if path is absolute or
	 * relative. If the path is relative, this function checks if the path is
	 * relative to symlink or relative to current working directory. This is an
	 * initiative to find a smarter `srcpath` to supply when building symlinks.
	 * This allows you to determine which path to use out of one of three possible
	 * types of source paths. The first is an absolute path. This is detected by
	 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
	 * see if it exists. If it does it's used, if not an error is returned
	 * (callback)/ thrown (sync). The other two options for `srcpath` are a
	 * relative url. By default Node's `fs.symlink` works by creating a symlink
	 * using `dstpath` and expects the `srcpath` to be relative to the newly
	 * created symlink. If you provide a `srcpath` that does not exist on the file
	 * system it results in a broken symlink. To minimize this, the function
	 * checks to see if the 'relative to symlink' source file exists, and if it
	 * does it will use it. If it does not, it checks if there's a file that
	 * exists that is relative to the current working directory, if does its used.
	 * This preserves the expectations of the original fs.symlink spec and adds
	 * the ability to pass in `relative to current working direcotry` paths.
	 */

	async function symlinkPaths (srcpath, dstpath) {
	  if (path.isAbsolute(srcpath)) {
	    try {
	      await fs.lstat(srcpath);
	    } catch (err) {
	      err.message = err.message.replace('lstat', 'ensureSymlink');
	      throw err
	    }

	    return {
	      toCwd: srcpath,
	      toDst: srcpath
	    }
	  }

	  const dstdir = path.dirname(dstpath);
	  const relativeToDst = path.join(dstdir, srcpath);

	  const exists = await pathExists(relativeToDst);
	  if (exists) {
	    return {
	      toCwd: relativeToDst,
	      toDst: srcpath
	    }
	  }

	  try {
	    await fs.lstat(srcpath);
	  } catch (err) {
	    err.message = err.message.replace('lstat', 'ensureSymlink');
	    throw err
	  }

	  return {
	    toCwd: srcpath,
	    toDst: path.relative(dstdir, srcpath)
	  }
	}

	function symlinkPathsSync (srcpath, dstpath) {
	  if (path.isAbsolute(srcpath)) {
	    const exists = fs.existsSync(srcpath);
	    if (!exists) throw new Error('absolute srcpath does not exist')
	    return {
	      toCwd: srcpath,
	      toDst: srcpath
	    }
	  }

	  const dstdir = path.dirname(dstpath);
	  const relativeToDst = path.join(dstdir, srcpath);
	  const exists = fs.existsSync(relativeToDst);
	  if (exists) {
	    return {
	      toCwd: relativeToDst,
	      toDst: srcpath
	    }
	  }

	  const srcExists = fs.existsSync(srcpath);
	  if (!srcExists) throw new Error('relative srcpath does not exist')
	  return {
	    toCwd: srcpath,
	    toDst: path.relative(dstdir, srcpath)
	  }
	}

	symlinkPaths_1 = {
	  symlinkPaths: u(symlinkPaths),
	  symlinkPathsSync
	};
	return symlinkPaths_1;
}

var symlinkType_1;
var hasRequiredSymlinkType;

function requireSymlinkType () {
	if (hasRequiredSymlinkType) return symlinkType_1;
	hasRequiredSymlinkType = 1;

	const fs = /*@__PURE__*/ requireFs$4();
	const u = requireUniversalify().fromPromise;

	async function symlinkType (srcpath, type) {
	  if (type) return type

	  let stats;
	  try {
	    stats = await fs.lstat(srcpath);
	  } catch {
	    return 'file'
	  }

	  return (stats && stats.isDirectory()) ? 'dir' : 'file'
	}

	function symlinkTypeSync (srcpath, type) {
	  if (type) return type

	  let stats;
	  try {
	    stats = fs.lstatSync(srcpath);
	  } catch {
	    return 'file'
	  }
	  return (stats && stats.isDirectory()) ? 'dir' : 'file'
	}

	symlinkType_1 = {
	  symlinkType: u(symlinkType),
	  symlinkTypeSync
	};
	return symlinkType_1;
}

var symlink;
var hasRequiredSymlink;

function requireSymlink () {
	if (hasRequiredSymlink) return symlink;
	hasRequiredSymlink = 1;

	const u = requireUniversalify().fromPromise;
	const path = require$$1$1;
	const fs = /*@__PURE__*/ requireFs$4();

	const { mkdirs, mkdirsSync } = /*@__PURE__*/ requireMkdirs();

	const { symlinkPaths, symlinkPathsSync } = /*@__PURE__*/ requireSymlinkPaths();
	const { symlinkType, symlinkTypeSync } = /*@__PURE__*/ requireSymlinkType();

	const { pathExists } = /*@__PURE__*/ requirePathExists();

	const { areIdentical } = /*@__PURE__*/ requireStat();

	async function createSymlink (srcpath, dstpath, type) {
	  let stats;
	  try {
	    stats = await fs.lstat(dstpath);
	  } catch { }

	  if (stats && stats.isSymbolicLink()) {
	    const [srcStat, dstStat] = await Promise.all([
	      fs.stat(srcpath),
	      fs.stat(dstpath)
	    ]);

	    if (areIdentical(srcStat, dstStat)) return
	  }

	  const relative = await symlinkPaths(srcpath, dstpath);
	  srcpath = relative.toDst;
	  const toType = await symlinkType(relative.toCwd, type);
	  const dir = path.dirname(dstpath);

	  if (!(await pathExists(dir))) {
	    await mkdirs(dir);
	  }

	  return fs.symlink(srcpath, dstpath, toType)
	}

	function createSymlinkSync (srcpath, dstpath, type) {
	  let stats;
	  try {
	    stats = fs.lstatSync(dstpath);
	  } catch { }
	  if (stats && stats.isSymbolicLink()) {
	    const srcStat = fs.statSync(srcpath);
	    const dstStat = fs.statSync(dstpath);
	    if (areIdentical(srcStat, dstStat)) return
	  }

	  const relative = symlinkPathsSync(srcpath, dstpath);
	  srcpath = relative.toDst;
	  type = symlinkTypeSync(relative.toCwd, type);
	  const dir = path.dirname(dstpath);
	  const exists = fs.existsSync(dir);
	  if (exists) return fs.symlinkSync(srcpath, dstpath, type)
	  mkdirsSync(dir);
	  return fs.symlinkSync(srcpath, dstpath, type)
	}

	symlink = {
	  createSymlink: u(createSymlink),
	  createSymlinkSync
	};
	return symlink;
}

var ensure;
var hasRequiredEnsure;

function requireEnsure () {
	if (hasRequiredEnsure) return ensure;
	hasRequiredEnsure = 1;

	const { createFile, createFileSync } = /*@__PURE__*/ requireFile();
	const { createLink, createLinkSync } = /*@__PURE__*/ requireLink();
	const { createSymlink, createSymlinkSync } = /*@__PURE__*/ requireSymlink();

	ensure = {
	  // file
	  createFile,
	  createFileSync,
	  ensureFile: createFile,
	  ensureFileSync: createFileSync,
	  // link
	  createLink,
	  createLinkSync,
	  ensureLink: createLink,
	  ensureLinkSync: createLinkSync,
	  // symlink
	  createSymlink,
	  createSymlinkSync,
	  ensureSymlink: createSymlink,
	  ensureSymlinkSync: createSymlinkSync
	};
	return ensure;
}

var utils$4;
var hasRequiredUtils$4;

function requireUtils$4 () {
	if (hasRequiredUtils$4) return utils$4;
	hasRequiredUtils$4 = 1;
	function stringify (obj, { EOL = '\n', finalEOL = true, replacer = null, spaces } = {}) {
	  const EOF = finalEOL ? EOL : '';
	  const str = JSON.stringify(obj, replacer, spaces);

	  return str.replace(/\n/g, EOL) + EOF
	}

	function stripBom (content) {
	  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
	  if (Buffer.isBuffer(content)) content = content.toString('utf8');
	  return content.replace(/^\uFEFF/, '')
	}

	utils$4 = { stringify, stripBom };
	return utils$4;
}

var jsonfile_1;
var hasRequiredJsonfile$1;

function requireJsonfile$1 () {
	if (hasRequiredJsonfile$1) return jsonfile_1;
	hasRequiredJsonfile$1 = 1;
	let _fs;
	try {
	  _fs = requireGracefulFs();
	} catch (_) {
	  _fs = require$$1$1;
	}
	const universalify = requireUniversalify();
	const { stringify, stripBom } = requireUtils$4();

	async function _readFile (file, options = {}) {
	  if (typeof options === 'string') {
	    options = { encoding: options };
	  }

	  const fs = options.fs || _fs;

	  const shouldThrow = 'throws' in options ? options.throws : true;

	  let data = await universalify.fromCallback(fs.readFile)(file, options);

	  data = stripBom(data);

	  let obj;
	  try {
	    obj = JSON.parse(data, options ? options.reviver : null);
	  } catch (err) {
	    if (shouldThrow) {
	      err.message = `${file}: ${err.message}`;
	      throw err
	    } else {
	      return null
	    }
	  }

	  return obj
	}

	const readFile = universalify.fromPromise(_readFile);

	function readFileSync (file, options = {}) {
	  if (typeof options === 'string') {
	    options = { encoding: options };
	  }

	  const fs = options.fs || _fs;

	  const shouldThrow = 'throws' in options ? options.throws : true;

	  try {
	    let content = fs.readFileSync(file, options);
	    content = stripBom(content);
	    return JSON.parse(content, options.reviver)
	  } catch (err) {
	    if (shouldThrow) {
	      err.message = `${file}: ${err.message}`;
	      throw err
	    } else {
	      return null
	    }
	  }
	}

	async function _writeFile (file, obj, options = {}) {
	  const fs = options.fs || _fs;

	  const str = stringify(obj, options);

	  await universalify.fromCallback(fs.writeFile)(file, str, options);
	}

	const writeFile = universalify.fromPromise(_writeFile);

	function writeFileSync (file, obj, options = {}) {
	  const fs = options.fs || _fs;

	  const str = stringify(obj, options);
	  // not sure if fs.writeFileSync returns anything, but just in case
	  return fs.writeFileSync(file, str, options)
	}

	const jsonfile = {
	  readFile,
	  readFileSync,
	  writeFile,
	  writeFileSync
	};

	jsonfile_1 = jsonfile;
	return jsonfile_1;
}

var jsonfile;
var hasRequiredJsonfile;

function requireJsonfile () {
	if (hasRequiredJsonfile) return jsonfile;
	hasRequiredJsonfile = 1;

	const jsonFile = requireJsonfile$1();

	jsonfile = {
	  // jsonfile exports
	  readJson: jsonFile.readFile,
	  readJsonSync: jsonFile.readFileSync,
	  writeJson: jsonFile.writeFile,
	  writeJsonSync: jsonFile.writeFileSync
	};
	return jsonfile;
}

var outputFile_1;
var hasRequiredOutputFile;

function requireOutputFile () {
	if (hasRequiredOutputFile) return outputFile_1;
	hasRequiredOutputFile = 1;

	const u = requireUniversalify().fromPromise;
	const fs = /*@__PURE__*/ requireFs$4();
	const path = require$$1$1;
	const mkdir = /*@__PURE__*/ requireMkdirs();
	const pathExists = /*@__PURE__*/ requirePathExists().pathExists;

	async function outputFile (file, data, encoding = 'utf-8') {
	  const dir = path.dirname(file);

	  if (!(await pathExists(dir))) {
	    await mkdir.mkdirs(dir);
	  }

	  return fs.writeFile(file, data, encoding)
	}

	function outputFileSync (file, ...args) {
	  const dir = path.dirname(file);
	  if (!fs.existsSync(dir)) {
	    mkdir.mkdirsSync(dir);
	  }

	  fs.writeFileSync(file, ...args);
	}

	outputFile_1 = {
	  outputFile: u(outputFile),
	  outputFileSync
	};
	return outputFile_1;
}

var outputJson_1;
var hasRequiredOutputJson;

function requireOutputJson () {
	if (hasRequiredOutputJson) return outputJson_1;
	hasRequiredOutputJson = 1;

	const { stringify } = requireUtils$4();
	const { outputFile } = /*@__PURE__*/ requireOutputFile();

	async function outputJson (file, data, options = {}) {
	  const str = stringify(data, options);

	  await outputFile(file, str, options);
	}

	outputJson_1 = outputJson;
	return outputJson_1;
}

var outputJsonSync_1;
var hasRequiredOutputJsonSync;

function requireOutputJsonSync () {
	if (hasRequiredOutputJsonSync) return outputJsonSync_1;
	hasRequiredOutputJsonSync = 1;

	const { stringify } = requireUtils$4();
	const { outputFileSync } = /*@__PURE__*/ requireOutputFile();

	function outputJsonSync (file, data, options) {
	  const str = stringify(data, options);

	  outputFileSync(file, str, options);
	}

	outputJsonSync_1 = outputJsonSync;
	return outputJsonSync_1;
}

var json;
var hasRequiredJson;

function requireJson () {
	if (hasRequiredJson) return json;
	hasRequiredJson = 1;

	const u = requireUniversalify().fromPromise;
	const jsonFile = /*@__PURE__*/ requireJsonfile();

	jsonFile.outputJson = u(/*@__PURE__*/ requireOutputJson());
	jsonFile.outputJsonSync = /*@__PURE__*/ requireOutputJsonSync();
	// aliases
	jsonFile.outputJSON = jsonFile.outputJson;
	jsonFile.outputJSONSync = jsonFile.outputJsonSync;
	jsonFile.writeJSON = jsonFile.writeJson;
	jsonFile.writeJSONSync = jsonFile.writeJsonSync;
	jsonFile.readJSON = jsonFile.readJson;
	jsonFile.readJSONSync = jsonFile.readJsonSync;

	json = jsonFile;
	return json;
}

var move_1;
var hasRequiredMove$1;

function requireMove$1 () {
	if (hasRequiredMove$1) return move_1;
	hasRequiredMove$1 = 1;

	const fs = /*@__PURE__*/ requireFs$4();
	const path = require$$1$1;
	const { copy } = /*@__PURE__*/ requireCopy();
	const { remove } = /*@__PURE__*/ requireRemove();
	const { mkdirp } = /*@__PURE__*/ requireMkdirs();
	const { pathExists } = /*@__PURE__*/ requirePathExists();
	const stat = /*@__PURE__*/ requireStat();

	async function move (src, dest, opts = {}) {
	  const overwrite = opts.overwrite || opts.clobber || false;

	  const { srcStat, isChangingCase = false } = await stat.checkPaths(src, dest, 'move', opts);

	  await stat.checkParentPaths(src, srcStat, dest, 'move');

	  // If the parent of dest is not root, make sure it exists before proceeding
	  const destParent = path.dirname(dest);
	  const parsedParentPath = path.parse(destParent);
	  if (parsedParentPath.root !== destParent) {
	    await mkdirp(destParent);
	  }

	  return doRename(src, dest, overwrite, isChangingCase)
	}

	async function doRename (src, dest, overwrite, isChangingCase) {
	  if (!isChangingCase) {
	    if (overwrite) {
	      await remove(dest);
	    } else if (await pathExists(dest)) {
	      throw new Error('dest already exists.')
	    }
	  }

	  try {
	    // Try w/ rename first, and try copy + remove if EXDEV
	    await fs.rename(src, dest);
	  } catch (err) {
	    if (err.code !== 'EXDEV') {
	      throw err
	    }
	    await moveAcrossDevice(src, dest, overwrite);
	  }
	}

	async function moveAcrossDevice (src, dest, overwrite) {
	  const opts = {
	    overwrite,
	    errorOnExist: true,
	    preserveTimestamps: true
	  };

	  await copy(src, dest, opts);
	  return remove(src)
	}

	move_1 = move;
	return move_1;
}

var moveSync_1;
var hasRequiredMoveSync;

function requireMoveSync () {
	if (hasRequiredMoveSync) return moveSync_1;
	hasRequiredMoveSync = 1;

	const fs = requireGracefulFs();
	const path = require$$1$1;
	const copySync = /*@__PURE__*/ requireCopy().copySync;
	const removeSync = /*@__PURE__*/ requireRemove().removeSync;
	const mkdirpSync = /*@__PURE__*/ requireMkdirs().mkdirpSync;
	const stat = /*@__PURE__*/ requireStat();

	function moveSync (src, dest, opts) {
	  opts = opts || {};
	  const overwrite = opts.overwrite || opts.clobber || false;

	  const { srcStat, isChangingCase = false } = stat.checkPathsSync(src, dest, 'move', opts);
	  stat.checkParentPathsSync(src, srcStat, dest, 'move');
	  if (!isParentRoot(dest)) mkdirpSync(path.dirname(dest));
	  return doRename(src, dest, overwrite, isChangingCase)
	}

	function isParentRoot (dest) {
	  const parent = path.dirname(dest);
	  const parsedPath = path.parse(parent);
	  return parsedPath.root === parent
	}

	function doRename (src, dest, overwrite, isChangingCase) {
	  if (isChangingCase) return rename(src, dest, overwrite)
	  if (overwrite) {
	    removeSync(dest);
	    return rename(src, dest, overwrite)
	  }
	  if (fs.existsSync(dest)) throw new Error('dest already exists.')
	  return rename(src, dest, overwrite)
	}

	function rename (src, dest, overwrite) {
	  try {
	    fs.renameSync(src, dest);
	  } catch (err) {
	    if (err.code !== 'EXDEV') throw err
	    return moveAcrossDevice(src, dest, overwrite)
	  }
	}

	function moveAcrossDevice (src, dest, overwrite) {
	  const opts = {
	    overwrite,
	    errorOnExist: true,
	    preserveTimestamps: true
	  };
	  copySync(src, dest, opts);
	  return removeSync(src)
	}

	moveSync_1 = moveSync;
	return moveSync_1;
}

var move;
var hasRequiredMove;

function requireMove () {
	if (hasRequiredMove) return move;
	hasRequiredMove = 1;

	const u = requireUniversalify().fromPromise;
	move = {
	  move: u(/*@__PURE__*/ requireMove$1()),
	  moveSync: /*@__PURE__*/ requireMoveSync()
	};
	return move;
}

var lib;
var hasRequiredLib$1;

function requireLib$1 () {
	if (hasRequiredLib$1) return lib;
	hasRequiredLib$1 = 1;

	lib = {
	  // Export promiseified graceful-fs:
	  .../*@__PURE__*/ requireFs$4(),
	  // Export extra methods:
	  .../*@__PURE__*/ requireCopy(),
	  .../*@__PURE__*/ requireEmpty(),
	  .../*@__PURE__*/ requireEnsure(),
	  .../*@__PURE__*/ requireJson(),
	  .../*@__PURE__*/ requireMkdirs(),
	  .../*@__PURE__*/ requireMove(),
	  .../*@__PURE__*/ requireOutputFile(),
	  .../*@__PURE__*/ requirePathExists(),
	  .../*@__PURE__*/ requireRemove()
	};
	return lib;
}

var globby = {exports: {}};

var arrayUnion;
var hasRequiredArrayUnion;

function requireArrayUnion () {
	if (hasRequiredArrayUnion) return arrayUnion;
	hasRequiredArrayUnion = 1;

	arrayUnion = (...arguments_) => {
		return [...new Set([].concat(...arguments_))];
	};
	return arrayUnion;
}

var merge2_1;
var hasRequiredMerge2;

function requireMerge2 () {
	if (hasRequiredMerge2) return merge2_1;
	hasRequiredMerge2 = 1;
	/*
	 * merge2
	 * https://github.com/teambition/merge2
	 *
	 * Copyright (c) 2014-2020 Teambition
	 * Licensed under the MIT license.
	 */
	const Stream = require$$1$1;
	const PassThrough = Stream.PassThrough;
	const slice = Array.prototype.slice;

	merge2_1 = merge2;

	function merge2 () {
	  const streamsQueue = [];
	  const args = slice.call(arguments);
	  let merging = false;
	  let options = args[args.length - 1];

	  if (options && !Array.isArray(options) && options.pipe == null) {
	    args.pop();
	  } else {
	    options = {};
	  }

	  const doEnd = options.end !== false;
	  const doPipeError = options.pipeError === true;
	  if (options.objectMode == null) {
	    options.objectMode = true;
	  }
	  if (options.highWaterMark == null) {
	    options.highWaterMark = 64 * 1024;
	  }
	  const mergedStream = PassThrough(options);

	  function addStream () {
	    for (let i = 0, len = arguments.length; i < len; i++) {
	      streamsQueue.push(pauseStreams(arguments[i], options));
	    }
	    mergeStream();
	    return this
	  }

	  function mergeStream () {
	    if (merging) {
	      return
	    }
	    merging = true;

	    let streams = streamsQueue.shift();
	    if (!streams) {
	      process.nextTick(endStream);
	      return
	    }
	    if (!Array.isArray(streams)) {
	      streams = [streams];
	    }

	    let pipesCount = streams.length + 1;

	    function next () {
	      if (--pipesCount > 0) {
	        return
	      }
	      merging = false;
	      mergeStream();
	    }

	    function pipe (stream) {
	      function onend () {
	        stream.removeListener('merge2UnpipeEnd', onend);
	        stream.removeListener('end', onend);
	        if (doPipeError) {
	          stream.removeListener('error', onerror);
	        }
	        next();
	      }
	      function onerror (err) {
	        mergedStream.emit('error', err);
	      }
	      // skip ended stream
	      if (stream._readableState.endEmitted) {
	        return next()
	      }

	      stream.on('merge2UnpipeEnd', onend);
	      stream.on('end', onend);

	      if (doPipeError) {
	        stream.on('error', onerror);
	      }

	      stream.pipe(mergedStream, { end: false });
	      // compatible for old stream
	      stream.resume();
	    }

	    for (let i = 0; i < streams.length; i++) {
	      pipe(streams[i]);
	    }

	    next();
	  }

	  function endStream () {
	    merging = false;
	    // emit 'queueDrain' when all streams merged.
	    mergedStream.emit('queueDrain');
	    if (doEnd) {
	      mergedStream.end();
	    }
	  }

	  mergedStream.setMaxListeners(0);
	  mergedStream.add = addStream;
	  mergedStream.on('unpipe', function (stream) {
	    stream.emit('merge2UnpipeEnd');
	  });

	  if (args.length) {
	    addStream.apply(null, args);
	  }
	  return mergedStream
	}

	// check and pause streams for pipe.
	function pauseStreams (streams, options) {
	  if (!Array.isArray(streams)) {
	    // Backwards-compat with old-style streams
	    if (!streams._readableState && streams.pipe) {
	      streams = streams.pipe(PassThrough(options));
	    }
	    if (!streams._readableState || !streams.pause || !streams.pipe) {
	      throw new Error('Only readable stream can be merged.')
	    }
	    streams.pause();
	  } else {
	    for (let i = 0, len = streams.length; i < len; i++) {
	      streams[i] = pauseStreams(streams[i], options);
	    }
	  }
	  return streams
	}
	return merge2_1;
}

var tasks = {};

var utils$3 = {};

var array = {};

var hasRequiredArray;

function requireArray () {
	if (hasRequiredArray) return array;
	hasRequiredArray = 1;
	Object.defineProperty(array, "__esModule", { value: true });
	array.splitWhen = array.flatten = void 0;
	function flatten(items) {
	    return items.reduce((collection, item) => [].concat(collection, item), []);
	}
	array.flatten = flatten;
	function splitWhen(items, predicate) {
	    const result = [[]];
	    let groupIndex = 0;
	    for (const item of items) {
	        if (predicate(item)) {
	            groupIndex++;
	            result[groupIndex] = [];
	        }
	        else {
	            result[groupIndex].push(item);
	        }
	    }
	    return result;
	}
	array.splitWhen = splitWhen;
	return array;
}

var errno = {};

var hasRequiredErrno;

function requireErrno () {
	if (hasRequiredErrno) return errno;
	hasRequiredErrno = 1;
	Object.defineProperty(errno, "__esModule", { value: true });
	errno.isEnoentCodeError = void 0;
	function isEnoentCodeError(error) {
	    return error.code === 'ENOENT';
	}
	errno.isEnoentCodeError = isEnoentCodeError;
	return errno;
}

var fs$3 = {};

var hasRequiredFs$3;

function requireFs$3 () {
	if (hasRequiredFs$3) return fs$3;
	hasRequiredFs$3 = 1;
	Object.defineProperty(fs$3, "__esModule", { value: true });
	fs$3.createDirentFromStats = void 0;
	class DirentFromStats {
	    constructor(name, stats) {
	        this.name = name;
	        this.isBlockDevice = stats.isBlockDevice.bind(stats);
	        this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
	        this.isDirectory = stats.isDirectory.bind(stats);
	        this.isFIFO = stats.isFIFO.bind(stats);
	        this.isFile = stats.isFile.bind(stats);
	        this.isSocket = stats.isSocket.bind(stats);
	        this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
	    }
	}
	function createDirentFromStats(name, stats) {
	    return new DirentFromStats(name, stats);
	}
	fs$3.createDirentFromStats = createDirentFromStats;
	return fs$3;
}

var path = {};

var hasRequiredPath;

function requirePath () {
	if (hasRequiredPath) return path;
	hasRequiredPath = 1;
	Object.defineProperty(path, "__esModule", { value: true });
	path.convertPosixPathToPattern = path.convertWindowsPathToPattern = path.convertPathToPattern = path.escapePosixPath = path.escapeWindowsPath = path.escape = path.removeLeadingDotSegment = path.makeAbsolute = path.unixify = void 0;
	const os = require$$1$1;
	const path$1 = require$$1$1;
	const IS_WINDOWS_PLATFORM = os.platform() === 'win32';
	const LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2; // ./ or .\\
	/**
	 * All non-escaped special characters.
	 * Posix: ()*?[]{|}, !+@ before (, ! at the beginning, \\ before non-special characters.
	 * Windows: (){}[], !+@ before (, ! at the beginning.
	 */
	const POSIX_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\()|\\(?![!()*+?@[\]{|}]))/g;
	const WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()[\]{}]|^!|[!+@](?=\())/g;
	/**
	 * The device path (\\.\ or \\?\).
	 * https://learn.microsoft.com/en-us/dotnet/standard/io/file-path-formats#dos-device-paths
	 */
	const DOS_DEVICE_PATH_RE = /^\\\\([.?])/;
	/**
	 * All backslashes except those escaping special characters.
	 * Windows: !()+@{}
	 * https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file#naming-conventions
	 */
	const WINDOWS_BACKSLASHES_RE = /\\(?![!()+@[\]{}])/g;
	/**
	 * Designed to work only with simple paths: `dir\\file`.
	 */
	function unixify(filepath) {
	    return filepath.replace(/\\/g, '/');
	}
	path.unixify = unixify;
	function makeAbsolute(cwd, filepath) {
	    return path$1.resolve(cwd, filepath);
	}
	path.makeAbsolute = makeAbsolute;
	function removeLeadingDotSegment(entry) {
	    // We do not use `startsWith` because this is 10x slower than current implementation for some cases.
	    // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
	    if (entry.charAt(0) === '.') {
	        const secondCharactery = entry.charAt(1);
	        if (secondCharactery === '/' || secondCharactery === '\\') {
	            return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT);
	        }
	    }
	    return entry;
	}
	path.removeLeadingDotSegment = removeLeadingDotSegment;
	path.escape = IS_WINDOWS_PLATFORM ? escapeWindowsPath : escapePosixPath;
	function escapeWindowsPath(pattern) {
	    return pattern.replace(WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE, '\\$2');
	}
	path.escapeWindowsPath = escapeWindowsPath;
	function escapePosixPath(pattern) {
	    return pattern.replace(POSIX_UNESCAPED_GLOB_SYMBOLS_RE, '\\$2');
	}
	path.escapePosixPath = escapePosixPath;
	path.convertPathToPattern = IS_WINDOWS_PLATFORM ? convertWindowsPathToPattern : convertPosixPathToPattern;
	function convertWindowsPathToPattern(filepath) {
	    return escapeWindowsPath(filepath)
	        .replace(DOS_DEVICE_PATH_RE, '//$1')
	        .replace(WINDOWS_BACKSLASHES_RE, '/');
	}
	path.convertWindowsPathToPattern = convertWindowsPathToPattern;
	function convertPosixPathToPattern(filepath) {
	    return escapePosixPath(filepath);
	}
	path.convertPosixPathToPattern = convertPosixPathToPattern;
	return path;
}

var pattern = {};

/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var isExtglob;
var hasRequiredIsExtglob;

function requireIsExtglob () {
	if (hasRequiredIsExtglob) return isExtglob;
	hasRequiredIsExtglob = 1;
	isExtglob = function isExtglob(str) {
	  if (typeof str !== 'string' || str === '') {
	    return false;
	  }

	  var match;
	  while ((match = /(\\).|([@?!+*]\(.*\))/g.exec(str))) {
	    if (match[2]) return true;
	    str = str.slice(match.index + match[0].length);
	  }

	  return false;
	};
	return isExtglob;
}

/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isGlob;
var hasRequiredIsGlob;

function requireIsGlob () {
	if (hasRequiredIsGlob) return isGlob;
	hasRequiredIsGlob = 1;
	var isExtglob = requireIsExtglob();
	var chars = { '{': '}', '(': ')', '[': ']'};
	var strictCheck = function(str) {
	  if (str[0] === '!') {
	    return true;
	  }
	  var index = 0;
	  var pipeIndex = -2;
	  var closeSquareIndex = -2;
	  var closeCurlyIndex = -2;
	  var closeParenIndex = -2;
	  var backSlashIndex = -2;
	  while (index < str.length) {
	    if (str[index] === '*') {
	      return true;
	    }

	    if (str[index + 1] === '?' && /[\].+)]/.test(str[index])) {
	      return true;
	    }

	    if (closeSquareIndex !== -1 && str[index] === '[' && str[index + 1] !== ']') {
	      if (closeSquareIndex < index) {
	        closeSquareIndex = str.indexOf(']', index);
	      }
	      if (closeSquareIndex > index) {
	        if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
	          return true;
	        }
	        backSlashIndex = str.indexOf('\\', index);
	        if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
	          return true;
	        }
	      }
	    }

	    if (closeCurlyIndex !== -1 && str[index] === '{' && str[index + 1] !== '}') {
	      closeCurlyIndex = str.indexOf('}', index);
	      if (closeCurlyIndex > index) {
	        backSlashIndex = str.indexOf('\\', index);
	        if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
	          return true;
	        }
	      }
	    }

	    if (closeParenIndex !== -1 && str[index] === '(' && str[index + 1] === '?' && /[:!=]/.test(str[index + 2]) && str[index + 3] !== ')') {
	      closeParenIndex = str.indexOf(')', index);
	      if (closeParenIndex > index) {
	        backSlashIndex = str.indexOf('\\', index);
	        if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
	          return true;
	        }
	      }
	    }

	    if (pipeIndex !== -1 && str[index] === '(' && str[index + 1] !== '|') {
	      if (pipeIndex < index) {
	        pipeIndex = str.indexOf('|', index);
	      }
	      if (pipeIndex !== -1 && str[pipeIndex + 1] !== ')') {
	        closeParenIndex = str.indexOf(')', pipeIndex);
	        if (closeParenIndex > pipeIndex) {
	          backSlashIndex = str.indexOf('\\', pipeIndex);
	          if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
	            return true;
	          }
	        }
	      }
	    }

	    if (str[index] === '\\') {
	      var open = str[index + 1];
	      index += 2;
	      var close = chars[open];

	      if (close) {
	        var n = str.indexOf(close, index);
	        if (n !== -1) {
	          index = n + 1;
	        }
	      }

	      if (str[index] === '!') {
	        return true;
	      }
	    } else {
	      index++;
	    }
	  }
	  return false;
	};

	var relaxedCheck = function(str) {
	  if (str[0] === '!') {
	    return true;
	  }
	  var index = 0;
	  while (index < str.length) {
	    if (/[*?{}()[\]]/.test(str[index])) {
	      return true;
	    }

	    if (str[index] === '\\') {
	      var open = str[index + 1];
	      index += 2;
	      var close = chars[open];

	      if (close) {
	        var n = str.indexOf(close, index);
	        if (n !== -1) {
	          index = n + 1;
	        }
	      }

	      if (str[index] === '!') {
	        return true;
	      }
	    } else {
	      index++;
	    }
	  }
	  return false;
	};

	isGlob = function isGlob(str, options) {
	  if (typeof str !== 'string' || str === '') {
	    return false;
	  }

	  if (isExtglob(str)) {
	    return true;
	  }

	  var check = strictCheck;

	  // optionally relax check
	  if (options && options.strict === false) {
	    check = relaxedCheck;
	  }

	  return check(str);
	};
	return isGlob;
}

var globParent;
var hasRequiredGlobParent;

function requireGlobParent () {
	if (hasRequiredGlobParent) return globParent;
	hasRequiredGlobParent = 1;

	var isGlob = requireIsGlob();
	var pathPosixDirname = require$$1$1.posix.dirname;
	var isWin32 = require$$1$1.platform() === 'win32';

	var slash = '/';
	var backslash = /\\/g;
	var enclosure = /[\{\[].*[\}\]]$/;
	var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/;
	var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;

	/**
	 * @param {string} str
	 * @param {Object} opts
	 * @param {boolean} [opts.flipBackslashes=true]
	 * @returns {string}
	 */
	globParent = function globParent(str, opts) {
	  var options = Object.assign({ flipBackslashes: true }, opts);

	  // flip windows path separators
	  if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
	    str = str.replace(backslash, slash);
	  }

	  // special case for strings ending in enclosure containing path separator
	  if (enclosure.test(str)) {
	    str += slash;
	  }

	  // preserves full path in case of trailing path separator
	  str += 'a';

	  // remove path parts that are globby
	  do {
	    str = pathPosixDirname(str);
	  } while (isGlob(str) || globby.test(str));

	  // remove escape chars and return result
	  return str.replace(escaped, '$1');
	};
	return globParent;
}

var utils$2 = {};

var hasRequiredUtils$3;

function requireUtils$3 () {
	if (hasRequiredUtils$3) return utils$2;
	hasRequiredUtils$3 = 1;
	(function (exports) {

		exports.isInteger = num => {
		  if (typeof num === 'number') {
		    return Number.isInteger(num);
		  }
		  if (typeof num === 'string' && num.trim() !== '') {
		    return Number.isInteger(Number(num));
		  }
		  return false;
		};

		/**
		 * Find a node of the given type
		 */

		exports.find = (node, type) => node.nodes.find(node => node.type === type);

		/**
		 * Find a node of the given type
		 */

		exports.exceedsLimit = (min, max, step = 1, limit) => {
		  if (limit === false) return false;
		  if (!exports.isInteger(min) || !exports.isInteger(max)) return false;
		  return ((Number(max) - Number(min)) / Number(step)) >= limit;
		};

		/**
		 * Escape the given node with '\\' before node.value
		 */

		exports.escapeNode = (block, n = 0, type) => {
		  const node = block.nodes[n];
		  if (!node) return;

		  if ((type && node.type === type) || node.type === 'open' || node.type === 'close') {
		    if (node.escaped !== true) {
		      node.value = '\\' + node.value;
		      node.escaped = true;
		    }
		  }
		};

		/**
		 * Returns true if the given brace node should be enclosed in literal braces
		 */

		exports.encloseBrace = node => {
		  if (node.type !== 'brace') return false;
		  if ((node.commas >> 0 + node.ranges >> 0) === 0) {
		    node.invalid = true;
		    return true;
		  }
		  return false;
		};

		/**
		 * Returns true if a brace node is invalid.
		 */

		exports.isInvalidBrace = block => {
		  if (block.type !== 'brace') return false;
		  if (block.invalid === true || block.dollar) return true;
		  if ((block.commas >> 0 + block.ranges >> 0) === 0) {
		    block.invalid = true;
		    return true;
		  }
		  if (block.open !== true || block.close !== true) {
		    block.invalid = true;
		    return true;
		  }
		  return false;
		};

		/**
		 * Returns true if a node is an open or close node
		 */

		exports.isOpenOrClose = node => {
		  if (node.type === 'open' || node.type === 'close') {
		    return true;
		  }
		  return node.open === true || node.close === true;
		};

		/**
		 * Reduce an array of text nodes.
		 */

		exports.reduce = nodes => nodes.reduce((acc, node) => {
		  if (node.type === 'text') acc.push(node.value);
		  if (node.type === 'range') node.type = 'text';
		  return acc;
		}, []);

		/**
		 * Flatten an array
		 */

		exports.flatten = (...args) => {
		  const result = [];

		  const flat = arr => {
		    for (let i = 0; i < arr.length; i++) {
		      const ele = arr[i];

		      if (Array.isArray(ele)) {
		        flat(ele);
		        continue;
		      }

		      if (ele !== undefined) {
		        result.push(ele);
		      }
		    }
		    return result;
		  };

		  flat(args);
		  return result;
		}; 
	} (utils$2));
	return utils$2;
}

var stringify;
var hasRequiredStringify;

function requireStringify () {
	if (hasRequiredStringify) return stringify;
	hasRequiredStringify = 1;

	const utils = requireUtils$3();

	stringify = (ast, options = {}) => {
	  const stringify = (node, parent = {}) => {
	    const invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
	    const invalidNode = node.invalid === true && options.escapeInvalid === true;
	    let output = '';

	    if (node.value) {
	      if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
	        return '\\' + node.value;
	      }
	      return node.value;
	    }

	    if (node.value) {
	      return node.value;
	    }

	    if (node.nodes) {
	      for (const child of node.nodes) {
	        output += stringify(child);
	      }
	    }
	    return output;
	  };

	  return stringify(ast);
	};
	return stringify;
}

/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */

var isNumber;
var hasRequiredIsNumber;

function requireIsNumber () {
	if (hasRequiredIsNumber) return isNumber;
	hasRequiredIsNumber = 1;

	isNumber = function(num) {
	  if (typeof num === 'number') {
	    return num - num === 0;
	  }
	  if (typeof num === 'string' && num.trim() !== '') {
	    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
	  }
	  return false;
	};
	return isNumber;
}

/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */

var toRegexRange_1;
var hasRequiredToRegexRange;

function requireToRegexRange () {
	if (hasRequiredToRegexRange) return toRegexRange_1;
	hasRequiredToRegexRange = 1;

	const isNumber = requireIsNumber();

	const toRegexRange = (min, max, options) => {
	  if (isNumber(min) === false) {
	    throw new TypeError('toRegexRange: expected the first argument to be a number');
	  }

	  if (max === void 0 || min === max) {
	    return String(min);
	  }

	  if (isNumber(max) === false) {
	    throw new TypeError('toRegexRange: expected the second argument to be a number.');
	  }

	  let opts = { relaxZeros: true, ...options };
	  if (typeof opts.strictZeros === 'boolean') {
	    opts.relaxZeros = opts.strictZeros === false;
	  }

	  let relax = String(opts.relaxZeros);
	  let shorthand = String(opts.shorthand);
	  let capture = String(opts.capture);
	  let wrap = String(opts.wrap);
	  let cacheKey = min + ':' + max + '=' + relax + shorthand + capture + wrap;

	  if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
	    return toRegexRange.cache[cacheKey].result;
	  }

	  let a = Math.min(min, max);
	  let b = Math.max(min, max);

	  if (Math.abs(a - b) === 1) {
	    let result = min + '|' + max;
	    if (opts.capture) {
	      return `(${result})`;
	    }
	    if (opts.wrap === false) {
	      return result;
	    }
	    return `(?:${result})`;
	  }

	  let isPadded = hasPadding(min) || hasPadding(max);
	  let state = { min, max, a, b };
	  let positives = [];
	  let negatives = [];

	  if (isPadded) {
	    state.isPadded = isPadded;
	    state.maxLen = String(state.max).length;
	  }

	  if (a < 0) {
	    let newMin = b < 0 ? Math.abs(b) : 1;
	    negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
	    a = state.a = 0;
	  }

	  if (b >= 0) {
	    positives = splitToPatterns(a, b, state, opts);
	  }

	  state.negatives = negatives;
	  state.positives = positives;
	  state.result = collatePatterns(negatives, positives);

	  if (opts.capture === true) {
	    state.result = `(${state.result})`;
	  } else if (opts.wrap !== false && (positives.length + negatives.length) > 1) {
	    state.result = `(?:${state.result})`;
	  }

	  toRegexRange.cache[cacheKey] = state;
	  return state.result;
	};

	function collatePatterns(neg, pos, options) {
	  let onlyNegative = filterPatterns(neg, pos, '-', false) || [];
	  let onlyPositive = filterPatterns(pos, neg, '', false) || [];
	  let intersected = filterPatterns(neg, pos, '-?', true) || [];
	  let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
	  return subpatterns.join('|');
	}

	function splitToRanges(min, max) {
	  let nines = 1;
	  let zeros = 1;

	  let stop = countNines(min, nines);
	  let stops = new Set([max]);

	  while (min <= stop && stop <= max) {
	    stops.add(stop);
	    nines += 1;
	    stop = countNines(min, nines);
	  }

	  stop = countZeros(max + 1, zeros) - 1;

	  while (min < stop && stop <= max) {
	    stops.add(stop);
	    zeros += 1;
	    stop = countZeros(max + 1, zeros) - 1;
	  }

	  stops = [...stops];
	  stops.sort(compare);
	  return stops;
	}

	/**
	 * Convert a range to a regex pattern
	 * @param {Number} `start`
	 * @param {Number} `stop`
	 * @return {String}
	 */

	function rangeToPattern(start, stop, options) {
	  if (start === stop) {
	    return { pattern: start, count: [], digits: 0 };
	  }

	  let zipped = zip(start, stop);
	  let digits = zipped.length;
	  let pattern = '';
	  let count = 0;

	  for (let i = 0; i < digits; i++) {
	    let [startDigit, stopDigit] = zipped[i];

	    if (startDigit === stopDigit) {
	      pattern += startDigit;

	    } else if (startDigit !== '0' || stopDigit !== '9') {
	      pattern += toCharacterClass(startDigit, stopDigit);

	    } else {
	      count++;
	    }
	  }

	  if (count) {
	    pattern += options.shorthand === true ? '\\d' : '[0-9]';
	  }

	  return { pattern, count: [count], digits };
	}

	function splitToPatterns(min, max, tok, options) {
	  let ranges = splitToRanges(min, max);
	  let tokens = [];
	  let start = min;
	  let prev;

	  for (let i = 0; i < ranges.length; i++) {
	    let max = ranges[i];
	    let obj = rangeToPattern(String(start), String(max), options);
	    let zeros = '';

	    if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
	      if (prev.count.length > 1) {
	        prev.count.pop();
	      }

	      prev.count.push(obj.count[0]);
	      prev.string = prev.pattern + toQuantifier(prev.count);
	      start = max + 1;
	      continue;
	    }

	    if (tok.isPadded) {
	      zeros = padZeros(max, tok, options);
	    }

	    obj.string = zeros + obj.pattern + toQuantifier(obj.count);
	    tokens.push(obj);
	    start = max + 1;
	    prev = obj;
	  }

	  return tokens;
	}

	function filterPatterns(arr, comparison, prefix, intersection, options) {
	  let result = [];

	  for (let ele of arr) {
	    let { string } = ele;

	    // only push if _both_ are negative...
	    if (!intersection && !contains(comparison, 'string', string)) {
	      result.push(prefix + string);
	    }

	    // or _both_ are positive
	    if (intersection && contains(comparison, 'string', string)) {
	      result.push(prefix + string);
	    }
	  }
	  return result;
	}

	/**
	 * Zip strings
	 */

	function zip(a, b) {
	  let arr = [];
	  for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
	  return arr;
	}

	function compare(a, b) {
	  return a > b ? 1 : b > a ? -1 : 0;
	}

	function contains(arr, key, val) {
	  return arr.some(ele => ele[key] === val);
	}

	function countNines(min, len) {
	  return Number(String(min).slice(0, -len) + '9'.repeat(len));
	}

	function countZeros(integer, zeros) {
	  return integer - (integer % Math.pow(10, zeros));
	}

	function toQuantifier(digits) {
	  let [start = 0, stop = ''] = digits;
	  if (stop || start > 1) {
	    return `{${start + (stop ? ',' + stop : '')}}`;
	  }
	  return '';
	}

	function toCharacterClass(a, b, options) {
	  return `[${a}${(b - a === 1) ? '' : '-'}${b}]`;
	}

	function hasPadding(str) {
	  return /^-?(0+)\d/.test(str);
	}

	function padZeros(value, tok, options) {
	  if (!tok.isPadded) {
	    return value;
	  }

	  let diff = Math.abs(tok.maxLen - String(value).length);
	  let relax = options.relaxZeros !== false;

	  switch (diff) {
	    case 0:
	      return '';
	    case 1:
	      return relax ? '0?' : '0';
	    case 2:
	      return relax ? '0{0,2}' : '00';
	    default: {
	      return relax ? `0{0,${diff}}` : `0{${diff}}`;
	    }
	  }
	}

	/**
	 * Cache
	 */

	toRegexRange.cache = {};
	toRegexRange.clearCache = () => (toRegexRange.cache = {});

	/**
	 * Expose `toRegexRange`
	 */

	toRegexRange_1 = toRegexRange;
	return toRegexRange_1;
}

/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var fillRange;
var hasRequiredFillRange;

function requireFillRange () {
	if (hasRequiredFillRange) return fillRange;
	hasRequiredFillRange = 1;

	const util = require$$1$1;
	const toRegexRange = requireToRegexRange();

	const isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);

	const transform = toNumber => {
	  return value => toNumber === true ? Number(value) : String(value);
	};

	const isValidValue = value => {
	  return typeof value === 'number' || (typeof value === 'string' && value !== '');
	};

	const isNumber = num => Number.isInteger(+num);

	const zeros = input => {
	  let value = `${input}`;
	  let index = -1;
	  if (value[0] === '-') value = value.slice(1);
	  if (value === '0') return false;
	  while (value[++index] === '0');
	  return index > 0;
	};

	const stringify = (start, end, options) => {
	  if (typeof start === 'string' || typeof end === 'string') {
	    return true;
	  }
	  return options.stringify === true;
	};

	const pad = (input, maxLength, toNumber) => {
	  if (maxLength > 0) {
	    let dash = input[0] === '-' ? '-' : '';
	    if (dash) input = input.slice(1);
	    input = (dash + input.padStart(dash ? maxLength - 1 : maxLength, '0'));
	  }
	  if (toNumber === false) {
	    return String(input);
	  }
	  return input;
	};

	const toMaxLen = (input, maxLength) => {
	  let negative = input[0] === '-' ? '-' : '';
	  if (negative) {
	    input = input.slice(1);
	    maxLength--;
	  }
	  while (input.length < maxLength) input = '0' + input;
	  return negative ? ('-' + input) : input;
	};

	const toSequence = (parts, options, maxLen) => {
	  parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
	  parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);

	  let prefix = options.capture ? '' : '?:';
	  let positives = '';
	  let negatives = '';
	  let result;

	  if (parts.positives.length) {
	    positives = parts.positives.map(v => toMaxLen(String(v), maxLen)).join('|');
	  }

	  if (parts.negatives.length) {
	    negatives = `-(${prefix}${parts.negatives.map(v => toMaxLen(String(v), maxLen)).join('|')})`;
	  }

	  if (positives && negatives) {
	    result = `${positives}|${negatives}`;
	  } else {
	    result = positives || negatives;
	  }

	  if (options.wrap) {
	    return `(${prefix}${result})`;
	  }

	  return result;
	};

	const toRange = (a, b, isNumbers, options) => {
	  if (isNumbers) {
	    return toRegexRange(a, b, { wrap: false, ...options });
	  }

	  let start = String.fromCharCode(a);
	  if (a === b) return start;

	  let stop = String.fromCharCode(b);
	  return `[${start}-${stop}]`;
	};

	const toRegex = (start, end, options) => {
	  if (Array.isArray(start)) {
	    let wrap = options.wrap === true;
	    let prefix = options.capture ? '' : '?:';
	    return wrap ? `(${prefix}${start.join('|')})` : start.join('|');
	  }
	  return toRegexRange(start, end, options);
	};

	const rangeError = (...args) => {
	  return new RangeError('Invalid range arguments: ' + util.inspect(...args));
	};

	const invalidRange = (start, end, options) => {
	  if (options.strictRanges === true) throw rangeError([start, end]);
	  return [];
	};

	const invalidStep = (step, options) => {
	  if (options.strictRanges === true) {
	    throw new TypeError(`Expected step "${step}" to be a number`);
	  }
	  return [];
	};

	const fillNumbers = (start, end, step = 1, options = {}) => {
	  let a = Number(start);
	  let b = Number(end);

	  if (!Number.isInteger(a) || !Number.isInteger(b)) {
	    if (options.strictRanges === true) throw rangeError([start, end]);
	    return [];
	  }

	  // fix negative zero
	  if (a === 0) a = 0;
	  if (b === 0) b = 0;

	  let descending = a > b;
	  let startString = String(start);
	  let endString = String(end);
	  let stepString = String(step);
	  step = Math.max(Math.abs(step), 1);

	  let padded = zeros(startString) || zeros(endString) || zeros(stepString);
	  let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
	  let toNumber = padded === false && stringify(start, end, options) === false;
	  let format = options.transform || transform(toNumber);

	  if (options.toRegex && step === 1) {
	    return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
	  }

	  let parts = { negatives: [], positives: [] };
	  let push = num => parts[num < 0 ? 'negatives' : 'positives'].push(Math.abs(num));
	  let range = [];
	  let index = 0;

	  while (descending ? a >= b : a <= b) {
	    if (options.toRegex === true && step > 1) {
	      push(a);
	    } else {
	      range.push(pad(format(a, index), maxLen, toNumber));
	    }
	    a = descending ? a - step : a + step;
	    index++;
	  }

	  if (options.toRegex === true) {
	    return step > 1
	      ? toSequence(parts, options, maxLen)
	      : toRegex(range, null, { wrap: false, ...options });
	  }

	  return range;
	};

	const fillLetters = (start, end, step = 1, options = {}) => {
	  if ((!isNumber(start) && start.length > 1) || (!isNumber(end) && end.length > 1)) {
	    return invalidRange(start, end, options);
	  }

	  let format = options.transform || (val => String.fromCharCode(val));
	  let a = `${start}`.charCodeAt(0);
	  let b = `${end}`.charCodeAt(0);

	  let descending = a > b;
	  let min = Math.min(a, b);
	  let max = Math.max(a, b);

	  if (options.toRegex && step === 1) {
	    return toRange(min, max, false, options);
	  }

	  let range = [];
	  let index = 0;

	  while (descending ? a >= b : a <= b) {
	    range.push(format(a, index));
	    a = descending ? a - step : a + step;
	    index++;
	  }

	  if (options.toRegex === true) {
	    return toRegex(range, null, { wrap: false, options });
	  }

	  return range;
	};

	const fill = (start, end, step, options = {}) => {
	  if (end == null && isValidValue(start)) {
	    return [start];
	  }

	  if (!isValidValue(start) || !isValidValue(end)) {
	    return invalidRange(start, end, options);
	  }

	  if (typeof step === 'function') {
	    return fill(start, end, 1, { transform: step });
	  }

	  if (isObject(step)) {
	    return fill(start, end, 0, step);
	  }

	  let opts = { ...options };
	  if (opts.capture === true) opts.wrap = true;
	  step = step || opts.step || 1;

	  if (!isNumber(step)) {
	    if (step != null && !isObject(step)) return invalidStep(step, opts);
	    return fill(start, end, 1, step);
	  }

	  if (isNumber(start) && isNumber(end)) {
	    return fillNumbers(start, end, step, opts);
	  }

	  return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
	};

	fillRange = fill;
	return fillRange;
}

var compile_1;
var hasRequiredCompile;

function requireCompile () {
	if (hasRequiredCompile) return compile_1;
	hasRequiredCompile = 1;

	const fill = requireFillRange();
	const utils = requireUtils$3();

	const compile = (ast, options = {}) => {
	  const walk = (node, parent = {}) => {
	    const invalidBlock = utils.isInvalidBrace(parent);
	    const invalidNode = node.invalid === true && options.escapeInvalid === true;
	    const invalid = invalidBlock === true || invalidNode === true;
	    const prefix = options.escapeInvalid === true ? '\\' : '';
	    let output = '';

	    if (node.isOpen === true) {
	      return prefix + node.value;
	    }

	    if (node.isClose === true) {
	      console.log('node.isClose', prefix, node.value);
	      return prefix + node.value;
	    }

	    if (node.type === 'open') {
	      return invalid ? prefix + node.value : '(';
	    }

	    if (node.type === 'close') {
	      return invalid ? prefix + node.value : ')';
	    }

	    if (node.type === 'comma') {
	      return node.prev.type === 'comma' ? '' : invalid ? node.value : '|';
	    }

	    if (node.value) {
	      return node.value;
	    }

	    if (node.nodes && node.ranges > 0) {
	      const args = utils.reduce(node.nodes);
	      const range = fill(...args, { ...options, wrap: false, toRegex: true, strictZeros: true });

	      if (range.length !== 0) {
	        return args.length > 1 && range.length > 1 ? `(${range})` : range;
	      }
	    }

	    if (node.nodes) {
	      for (const child of node.nodes) {
	        output += walk(child, node);
	      }
	    }

	    return output;
	  };

	  return walk(ast);
	};

	compile_1 = compile;
	return compile_1;
}

var expand_1;
var hasRequiredExpand;

function requireExpand () {
	if (hasRequiredExpand) return expand_1;
	hasRequiredExpand = 1;

	const fill = requireFillRange();
	const stringify = requireStringify();
	const utils = requireUtils$3();

	const append = (queue = '', stash = '', enclose = false) => {
	  const result = [];

	  queue = [].concat(queue);
	  stash = [].concat(stash);

	  if (!stash.length) return queue;
	  if (!queue.length) {
	    return enclose ? utils.flatten(stash).map(ele => `{${ele}}`) : stash;
	  }

	  for (const item of queue) {
	    if (Array.isArray(item)) {
	      for (const value of item) {
	        result.push(append(value, stash, enclose));
	      }
	    } else {
	      for (let ele of stash) {
	        if (enclose === true && typeof ele === 'string') ele = `{${ele}}`;
	        result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
	      }
	    }
	  }
	  return utils.flatten(result);
	};

	const expand = (ast, options = {}) => {
	  const rangeLimit = options.rangeLimit === undefined ? 1000 : options.rangeLimit;

	  const walk = (node, parent = {}) => {
	    node.queue = [];

	    let p = parent;
	    let q = parent.queue;

	    while (p.type !== 'brace' && p.type !== 'root' && p.parent) {
	      p = p.parent;
	      q = p.queue;
	    }

	    if (node.invalid || node.dollar) {
	      q.push(append(q.pop(), stringify(node, options)));
	      return;
	    }

	    if (node.type === 'brace' && node.invalid !== true && node.nodes.length === 2) {
	      q.push(append(q.pop(), ['{}']));
	      return;
	    }

	    if (node.nodes && node.ranges > 0) {
	      const args = utils.reduce(node.nodes);

	      if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
	        throw new RangeError('expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.');
	      }

	      let range = fill(...args, options);
	      if (range.length === 0) {
	        range = stringify(node, options);
	      }

	      q.push(append(q.pop(), range));
	      node.nodes = [];
	      return;
	    }

	    const enclose = utils.encloseBrace(node);
	    let queue = node.queue;
	    let block = node;

	    while (block.type !== 'brace' && block.type !== 'root' && block.parent) {
	      block = block.parent;
	      queue = block.queue;
	    }

	    for (let i = 0; i < node.nodes.length; i++) {
	      const child = node.nodes[i];

	      if (child.type === 'comma' && node.type === 'brace') {
	        if (i === 1) queue.push('');
	        queue.push('');
	        continue;
	      }

	      if (child.type === 'close') {
	        q.push(append(q.pop(), queue, enclose));
	        continue;
	      }

	      if (child.value && child.type !== 'open') {
	        queue.push(append(queue.pop(), child.value));
	        continue;
	      }

	      if (child.nodes) {
	        walk(child, node);
	      }
	    }

	    return queue;
	  };

	  return utils.flatten(walk(ast));
	};

	expand_1 = expand;
	return expand_1;
}

var constants$2;
var hasRequiredConstants$2;

function requireConstants$2 () {
	if (hasRequiredConstants$2) return constants$2;
	hasRequiredConstants$2 = 1;

	constants$2 = {
	  MAX_LENGTH: 10000,

	  // Digits
	  CHAR_0: '0', /* 0 */
	  CHAR_9: '9', /* 9 */

	  // Alphabet chars.
	  CHAR_UPPERCASE_A: 'A', /* A */
	  CHAR_LOWERCASE_A: 'a', /* a */
	  CHAR_UPPERCASE_Z: 'Z', /* Z */
	  CHAR_LOWERCASE_Z: 'z', /* z */

	  CHAR_LEFT_PARENTHESES: '(', /* ( */
	  CHAR_RIGHT_PARENTHESES: ')', /* ) */

	  CHAR_ASTERISK: '*', /* * */

	  // Non-alphabetic chars.
	  CHAR_AMPERSAND: '&', /* & */
	  CHAR_AT: '@', /* @ */
	  CHAR_BACKSLASH: '\\', /* \ */
	  CHAR_BACKTICK: '`', /* ` */
	  CHAR_CARRIAGE_RETURN: '\r', /* \r */
	  CHAR_CIRCUMFLEX_ACCENT: '^', /* ^ */
	  CHAR_COLON: ':', /* : */
	  CHAR_COMMA: ',', /* , */
	  CHAR_DOLLAR: '$', /* . */
	  CHAR_DOT: '.', /* . */
	  CHAR_DOUBLE_QUOTE: '"', /* " */
	  CHAR_EQUAL: '=', /* = */
	  CHAR_EXCLAMATION_MARK: '!', /* ! */
	  CHAR_FORM_FEED: '\f', /* \f */
	  CHAR_FORWARD_SLASH: '/', /* / */
	  CHAR_HASH: '#', /* # */
	  CHAR_HYPHEN_MINUS: '-', /* - */
	  CHAR_LEFT_ANGLE_BRACKET: '<', /* < */
	  CHAR_LEFT_CURLY_BRACE: '{', /* { */
	  CHAR_LEFT_SQUARE_BRACKET: '[', /* [ */
	  CHAR_LINE_FEED: '\n', /* \n */
	  CHAR_NO_BREAK_SPACE: '\u00A0', /* \u00A0 */
	  CHAR_PERCENT: '%', /* % */
	  CHAR_PLUS: '+', /* + */
	  CHAR_QUESTION_MARK: '?', /* ? */
	  CHAR_RIGHT_ANGLE_BRACKET: '>', /* > */
	  CHAR_RIGHT_CURLY_BRACE: '}', /* } */
	  CHAR_RIGHT_SQUARE_BRACKET: ']', /* ] */
	  CHAR_SEMICOLON: ';', /* ; */
	  CHAR_SINGLE_QUOTE: '\'', /* ' */
	  CHAR_SPACE: ' ', /*   */
	  CHAR_TAB: '\t', /* \t */
	  CHAR_UNDERSCORE: '_', /* _ */
	  CHAR_VERTICAL_LINE: '|', /* | */
	  CHAR_ZERO_WIDTH_NOBREAK_SPACE: '\uFEFF' /* \uFEFF */
	};
	return constants$2;
}

var parse_1$1;
var hasRequiredParse$1;

function requireParse$1 () {
	if (hasRequiredParse$1) return parse_1$1;
	hasRequiredParse$1 = 1;

	const stringify = requireStringify();

	/**
	 * Constants
	 */

	const {
	  MAX_LENGTH,
	  CHAR_BACKSLASH, /* \ */
	  CHAR_BACKTICK, /* ` */
	  CHAR_COMMA, /* , */
	  CHAR_DOT, /* . */
	  CHAR_LEFT_PARENTHESES, /* ( */
	  CHAR_RIGHT_PARENTHESES, /* ) */
	  CHAR_LEFT_CURLY_BRACE, /* { */
	  CHAR_RIGHT_CURLY_BRACE, /* } */
	  CHAR_LEFT_SQUARE_BRACKET, /* [ */
	  CHAR_RIGHT_SQUARE_BRACKET, /* ] */
	  CHAR_DOUBLE_QUOTE, /* " */
	  CHAR_SINGLE_QUOTE, /* ' */
	  CHAR_NO_BREAK_SPACE,
	  CHAR_ZERO_WIDTH_NOBREAK_SPACE
	} = requireConstants$2();

	/**
	 * parse
	 */

	const parse = (input, options = {}) => {
	  if (typeof input !== 'string') {
	    throw new TypeError('Expected a string');
	  }

	  const opts = options || {};
	  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
	  if (input.length > max) {
	    throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
	  }

	  const ast = { type: 'root', input, nodes: [] };
	  const stack = [ast];
	  let block = ast;
	  let prev = ast;
	  let brackets = 0;
	  const length = input.length;
	  let index = 0;
	  let depth = 0;
	  let value;

	  /**
	   * Helpers
	   */

	  const advance = () => input[index++];
	  const push = node => {
	    if (node.type === 'text' && prev.type === 'dot') {
	      prev.type = 'text';
	    }

	    if (prev && prev.type === 'text' && node.type === 'text') {
	      prev.value += node.value;
	      return;
	    }

	    block.nodes.push(node);
	    node.parent = block;
	    node.prev = prev;
	    prev = node;
	    return node;
	  };

	  push({ type: 'bos' });

	  while (index < length) {
	    block = stack[stack.length - 1];
	    value = advance();

	    /**
	     * Invalid chars
	     */

	    if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
	      continue;
	    }

	    /**
	     * Escaped chars
	     */

	    if (value === CHAR_BACKSLASH) {
	      push({ type: 'text', value: (options.keepEscaping ? value : '') + advance() });
	      continue;
	    }

	    /**
	     * Right square bracket (literal): ']'
	     */

	    if (value === CHAR_RIGHT_SQUARE_BRACKET) {
	      push({ type: 'text', value: '\\' + value });
	      continue;
	    }

	    /**
	     * Left square bracket: '['
	     */

	    if (value === CHAR_LEFT_SQUARE_BRACKET) {
	      brackets++;

	      let next;

	      while (index < length && (next = advance())) {
	        value += next;

	        if (next === CHAR_LEFT_SQUARE_BRACKET) {
	          brackets++;
	          continue;
	        }

	        if (next === CHAR_BACKSLASH) {
	          value += advance();
	          continue;
	        }

	        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
	          brackets--;

	          if (brackets === 0) {
	            break;
	          }
	        }
	      }

	      push({ type: 'text', value });
	      continue;
	    }

	    /**
	     * Parentheses
	     */

	    if (value === CHAR_LEFT_PARENTHESES) {
	      block = push({ type: 'paren', nodes: [] });
	      stack.push(block);
	      push({ type: 'text', value });
	      continue;
	    }

	    if (value === CHAR_RIGHT_PARENTHESES) {
	      if (block.type !== 'paren') {
	        push({ type: 'text', value });
	        continue;
	      }
	      block = stack.pop();
	      push({ type: 'text', value });
	      block = stack[stack.length - 1];
	      continue;
	    }

	    /**
	     * Quotes: '|"|`
	     */

	    if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
	      const open = value;
	      let next;

	      if (options.keepQuotes !== true) {
	        value = '';
	      }

	      while (index < length && (next = advance())) {
	        if (next === CHAR_BACKSLASH) {
	          value += next + advance();
	          continue;
	        }

	        if (next === open) {
	          if (options.keepQuotes === true) value += next;
	          break;
	        }

	        value += next;
	      }

	      push({ type: 'text', value });
	      continue;
	    }

	    /**
	     * Left curly brace: '{'
	     */

	    if (value === CHAR_LEFT_CURLY_BRACE) {
	      depth++;

	      const dollar = prev.value && prev.value.slice(-1) === '$' || block.dollar === true;
	      const brace = {
	        type: 'brace',
	        open: true,
	        close: false,
	        dollar,
	        depth,
	        commas: 0,
	        ranges: 0,
	        nodes: []
	      };

	      block = push(brace);
	      stack.push(block);
	      push({ type: 'open', value });
	      continue;
	    }

	    /**
	     * Right curly brace: '}'
	     */

	    if (value === CHAR_RIGHT_CURLY_BRACE) {
	      if (block.type !== 'brace') {
	        push({ type: 'text', value });
	        continue;
	      }

	      const type = 'close';
	      block = stack.pop();
	      block.close = true;

	      push({ type, value });
	      depth--;

	      block = stack[stack.length - 1];
	      continue;
	    }

	    /**
	     * Comma: ','
	     */

	    if (value === CHAR_COMMA && depth > 0) {
	      if (block.ranges > 0) {
	        block.ranges = 0;
	        const open = block.nodes.shift();
	        block.nodes = [open, { type: 'text', value: stringify(block) }];
	      }

	      push({ type: 'comma', value });
	      block.commas++;
	      continue;
	    }

	    /**
	     * Dot: '.'
	     */

	    if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
	      const siblings = block.nodes;

	      if (depth === 0 || siblings.length === 0) {
	        push({ type: 'text', value });
	        continue;
	      }

	      if (prev.type === 'dot') {
	        block.range = [];
	        prev.value += value;
	        prev.type = 'range';

	        if (block.nodes.length !== 3 && block.nodes.length !== 5) {
	          block.invalid = true;
	          block.ranges = 0;
	          prev.type = 'text';
	          continue;
	        }

	        block.ranges++;
	        block.args = [];
	        continue;
	      }

	      if (prev.type === 'range') {
	        siblings.pop();

	        const before = siblings[siblings.length - 1];
	        before.value += prev.value + value;
	        prev = before;
	        block.ranges--;
	        continue;
	      }

	      push({ type: 'dot', value });
	      continue;
	    }

	    /**
	     * Text
	     */

	    push({ type: 'text', value });
	  }

	  // Mark imbalanced braces and brackets as invalid
	  do {
	    block = stack.pop();

	    if (block.type !== 'root') {
	      block.nodes.forEach(node => {
	        if (!node.nodes) {
	          if (node.type === 'open') node.isOpen = true;
	          if (node.type === 'close') node.isClose = true;
	          if (!node.nodes) node.type = 'text';
	          node.invalid = true;
	        }
	      });

	      // get the location of the block on parent.nodes (block's siblings)
	      const parent = stack[stack.length - 1];
	      const index = parent.nodes.indexOf(block);
	      // replace the (invalid) block with it's nodes
	      parent.nodes.splice(index, 1, ...block.nodes);
	    }
	  } while (stack.length > 0);

	  push({ type: 'eos' });
	  return ast;
	};

	parse_1$1 = parse;
	return parse_1$1;
}

var braces_1;
var hasRequiredBraces;

function requireBraces () {
	if (hasRequiredBraces) return braces_1;
	hasRequiredBraces = 1;

	const stringify = requireStringify();
	const compile = requireCompile();
	const expand = requireExpand();
	const parse = requireParse$1();

	/**
	 * Expand the given pattern or create a regex-compatible string.
	 *
	 * ```js
	 * const braces = require('braces');
	 * console.log(braces('{a,b,c}', { compile: true })); //=> ['(a|b|c)']
	 * console.log(braces('{a,b,c}')); //=> ['a', 'b', 'c']
	 * ```
	 * @param {String} `str`
	 * @param {Object} `options`
	 * @return {String}
	 * @api public
	 */

	const braces = (input, options = {}) => {
	  let output = [];

	  if (Array.isArray(input)) {
	    for (const pattern of input) {
	      const result = braces.create(pattern, options);
	      if (Array.isArray(result)) {
	        output.push(...result);
	      } else {
	        output.push(result);
	      }
	    }
	  } else {
	    output = [].concat(braces.create(input, options));
	  }

	  if (options && options.expand === true && options.nodupes === true) {
	    output = [...new Set(output)];
	  }
	  return output;
	};

	/**
	 * Parse the given `str` with the given `options`.
	 *
	 * ```js
	 * // braces.parse(pattern, [, options]);
	 * const ast = braces.parse('a/{b,c}/d');
	 * console.log(ast);
	 * ```
	 * @param {String} pattern Brace pattern to parse
	 * @param {Object} options
	 * @return {Object} Returns an AST
	 * @api public
	 */

	braces.parse = (input, options = {}) => parse(input, options);

	/**
	 * Creates a braces string from an AST, or an AST node.
	 *
	 * ```js
	 * const braces = require('braces');
	 * let ast = braces.parse('foo/{a,b}/bar');
	 * console.log(stringify(ast.nodes[2])); //=> '{a,b}'
	 * ```
	 * @param {String} `input` Brace pattern or AST.
	 * @param {Object} `options`
	 * @return {Array} Returns an array of expanded values.
	 * @api public
	 */

	braces.stringify = (input, options = {}) => {
	  if (typeof input === 'string') {
	    return stringify(braces.parse(input, options), options);
	  }
	  return stringify(input, options);
	};

	/**
	 * Compiles a brace pattern into a regex-compatible, optimized string.
	 * This method is called by the main [braces](#braces) function by default.
	 *
	 * ```js
	 * const braces = require('braces');
	 * console.log(braces.compile('a/{b,c}/d'));
	 * //=> ['a/(b|c)/d']
	 * ```
	 * @param {String} `input` Brace pattern or AST.
	 * @param {Object} `options`
	 * @return {Array} Returns an array of expanded values.
	 * @api public
	 */

	braces.compile = (input, options = {}) => {
	  if (typeof input === 'string') {
	    input = braces.parse(input, options);
	  }
	  return compile(input, options);
	};

	/**
	 * Expands a brace pattern into an array. This method is called by the
	 * main [braces](#braces) function when `options.expand` is true. Before
	 * using this method it's recommended that you read the [performance notes](#performance))
	 * and advantages of using [.compile](#compile) instead.
	 *
	 * ```js
	 * const braces = require('braces');
	 * console.log(braces.expand('a/{b,c}/d'));
	 * //=> ['a/b/d', 'a/c/d'];
	 * ```
	 * @param {String} `pattern` Brace pattern
	 * @param {Object} `options`
	 * @return {Array} Returns an array of expanded values.
	 * @api public
	 */

	braces.expand = (input, options = {}) => {
	  if (typeof input === 'string') {
	    input = braces.parse(input, options);
	  }

	  let result = expand(input, options);

	  // filter out empty strings if specified
	  if (options.noempty === true) {
	    result = result.filter(Boolean);
	  }

	  // filter out duplicates if specified
	  if (options.nodupes === true) {
	    result = [...new Set(result)];
	  }

	  return result;
	};

	/**
	 * Processes a brace pattern and returns either an expanded array
	 * (if `options.expand` is true), a highly optimized regex-compatible string.
	 * This method is called by the main [braces](#braces) function.
	 *
	 * ```js
	 * const braces = require('braces');
	 * console.log(braces.create('user-{200..300}/project-{a,b,c}-{1..10}'))
	 * //=> 'user-(20[0-9]|2[1-9][0-9]|300)/project-(a|b|c)-([1-9]|10)'
	 * ```
	 * @param {String} `pattern` Brace pattern
	 * @param {Object} `options`
	 * @return {Array} Returns an array of expanded values.
	 * @api public
	 */

	braces.create = (input, options = {}) => {
	  if (input === '' || input.length < 3) {
	    return [input];
	  }

	  return options.expand !== true
	    ? braces.compile(input, options)
	    : braces.expand(input, options);
	};

	/**
	 * Expose "braces"
	 */

	braces_1 = braces;
	return braces_1;
}

var utils$1 = {};

var constants$1;
var hasRequiredConstants$1;

function requireConstants$1 () {
	if (hasRequiredConstants$1) return constants$1;
	hasRequiredConstants$1 = 1;

	const path = require$$1$1;
	const WIN_SLASH = '\\\\/';
	const WIN_NO_SLASH = `[^${WIN_SLASH}]`;

	/**
	 * Posix glob regex
	 */

	const DOT_LITERAL = '\\.';
	const PLUS_LITERAL = '\\+';
	const QMARK_LITERAL = '\\?';
	const SLASH_LITERAL = '\\/';
	const ONE_CHAR = '(?=.)';
	const QMARK = '[^/]';
	const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
	const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
	const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
	const NO_DOT = `(?!${DOT_LITERAL})`;
	const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
	const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
	const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
	const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
	const STAR = `${QMARK}*?`;

	const POSIX_CHARS = {
	  DOT_LITERAL,
	  PLUS_LITERAL,
	  QMARK_LITERAL,
	  SLASH_LITERAL,
	  ONE_CHAR,
	  QMARK,
	  END_ANCHOR,
	  DOTS_SLASH,
	  NO_DOT,
	  NO_DOTS,
	  NO_DOT_SLASH,
	  NO_DOTS_SLASH,
	  QMARK_NO_DOT,
	  STAR,
	  START_ANCHOR
	};

	/**
	 * Windows glob regex
	 */

	const WINDOWS_CHARS = {
	  ...POSIX_CHARS,

	  SLASH_LITERAL: `[${WIN_SLASH}]`,
	  QMARK: WIN_NO_SLASH,
	  STAR: `${WIN_NO_SLASH}*?`,
	  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
	  NO_DOT: `(?!${DOT_LITERAL})`,
	  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
	  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
	  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
	  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
	  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
	  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
	};

	/**
	 * POSIX Bracket Regex
	 */

	const POSIX_REGEX_SOURCE = {
	  alnum: 'a-zA-Z0-9',
	  alpha: 'a-zA-Z',
	  ascii: '\\x00-\\x7F',
	  blank: ' \\t',
	  cntrl: '\\x00-\\x1F\\x7F',
	  digit: '0-9',
	  graph: '\\x21-\\x7E',
	  lower: 'a-z',
	  print: '\\x20-\\x7E ',
	  punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
	  space: ' \\t\\r\\n\\v\\f',
	  upper: 'A-Z',
	  word: 'A-Za-z0-9_',
	  xdigit: 'A-Fa-f0-9'
	};

	constants$1 = {
	  MAX_LENGTH: 1024 * 64,
	  POSIX_REGEX_SOURCE,

	  // regular expressions
	  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
	  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
	  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
	  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
	  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
	  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,

	  // Replace globs with equivalent patterns to reduce parsing time.
	  REPLACEMENTS: {
	    '***': '*',
	    '**/**': '**',
	    '**/**/**': '**'
	  },

	  // Digits
	  CHAR_0: 48, /* 0 */
	  CHAR_9: 57, /* 9 */

	  // Alphabet chars.
	  CHAR_UPPERCASE_A: 65, /* A */
	  CHAR_LOWERCASE_A: 97, /* a */
	  CHAR_UPPERCASE_Z: 90, /* Z */
	  CHAR_LOWERCASE_Z: 122, /* z */

	  CHAR_LEFT_PARENTHESES: 40, /* ( */
	  CHAR_RIGHT_PARENTHESES: 41, /* ) */

	  CHAR_ASTERISK: 42, /* * */

	  // Non-alphabetic chars.
	  CHAR_AMPERSAND: 38, /* & */
	  CHAR_AT: 64, /* @ */
	  CHAR_BACKWARD_SLASH: 92, /* \ */
	  CHAR_CARRIAGE_RETURN: 13, /* \r */
	  CHAR_CIRCUMFLEX_ACCENT: 94, /* ^ */
	  CHAR_COLON: 58, /* : */
	  CHAR_COMMA: 44, /* , */
	  CHAR_DOT: 46, /* . */
	  CHAR_DOUBLE_QUOTE: 34, /* " */
	  CHAR_EQUAL: 61, /* = */
	  CHAR_EXCLAMATION_MARK: 33, /* ! */
	  CHAR_FORM_FEED: 12, /* \f */
	  CHAR_FORWARD_SLASH: 47, /* / */
	  CHAR_GRAVE_ACCENT: 96, /* ` */
	  CHAR_HASH: 35, /* # */
	  CHAR_HYPHEN_MINUS: 45, /* - */
	  CHAR_LEFT_ANGLE_BRACKET: 60, /* < */
	  CHAR_LEFT_CURLY_BRACE: 123, /* { */
	  CHAR_LEFT_SQUARE_BRACKET: 91, /* [ */
	  CHAR_LINE_FEED: 10, /* \n */
	  CHAR_NO_BREAK_SPACE: 160, /* \u00A0 */
	  CHAR_PERCENT: 37, /* % */
	  CHAR_PLUS: 43, /* + */
	  CHAR_QUESTION_MARK: 63, /* ? */
	  CHAR_RIGHT_ANGLE_BRACKET: 62, /* > */
	  CHAR_RIGHT_CURLY_BRACE: 125, /* } */
	  CHAR_RIGHT_SQUARE_BRACKET: 93, /* ] */
	  CHAR_SEMICOLON: 59, /* ; */
	  CHAR_SINGLE_QUOTE: 39, /* ' */
	  CHAR_SPACE: 32, /*   */
	  CHAR_TAB: 9, /* \t */
	  CHAR_UNDERSCORE: 95, /* _ */
	  CHAR_VERTICAL_LINE: 124, /* | */
	  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, /* \uFEFF */

	  SEP: path.sep,

	  /**
	   * Create EXTGLOB_CHARS
	   */

	  extglobChars(chars) {
	    return {
	      '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
	      '?': { type: 'qmark', open: '(?:', close: ')?' },
	      '+': { type: 'plus', open: '(?:', close: ')+' },
	      '*': { type: 'star', open: '(?:', close: ')*' },
	      '@': { type: 'at', open: '(?:', close: ')' }
	    };
	  },

	  /**
	   * Create GLOB_CHARS
	   */

	  globChars(win32) {
	    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
	  }
	};
	return constants$1;
}

var hasRequiredUtils$2;

function requireUtils$2 () {
	if (hasRequiredUtils$2) return utils$1;
	hasRequiredUtils$2 = 1;
	(function (exports) {

		const path = require$$1$1;
		const win32 = process.platform === 'win32';
		const {
		  REGEX_BACKSLASH,
		  REGEX_REMOVE_BACKSLASH,
		  REGEX_SPECIAL_CHARS,
		  REGEX_SPECIAL_CHARS_GLOBAL
		} = requireConstants$1();

		exports.isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);
		exports.hasRegexChars = str => REGEX_SPECIAL_CHARS.test(str);
		exports.isRegexChar = str => str.length === 1 && exports.hasRegexChars(str);
		exports.escapeRegex = str => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
		exports.toPosixSlashes = str => str.replace(REGEX_BACKSLASH, '/');

		exports.removeBackslashes = str => {
		  return str.replace(REGEX_REMOVE_BACKSLASH, match => {
		    return match === '\\' ? '' : match;
		  });
		};

		exports.supportsLookbehinds = () => {
		  const segs = process.version.slice(1).split('.').map(Number);
		  if (segs.length === 3 && segs[0] >= 9 || (segs[0] === 8 && segs[1] >= 10)) {
		    return true;
		  }
		  return false;
		};

		exports.isWindows = options => {
		  if (options && typeof options.windows === 'boolean') {
		    return options.windows;
		  }
		  return win32 === true || path.sep === '\\';
		};

		exports.escapeLast = (input, char, lastIdx) => {
		  const idx = input.lastIndexOf(char, lastIdx);
		  if (idx === -1) return input;
		  if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1);
		  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
		};

		exports.removePrefix = (input, state = {}) => {
		  let output = input;
		  if (output.startsWith('./')) {
		    output = output.slice(2);
		    state.prefix = './';
		  }
		  return output;
		};

		exports.wrapOutput = (input, state = {}, options = {}) => {
		  const prepend = options.contains ? '' : '^';
		  const append = options.contains ? '' : '$';

		  let output = `${prepend}(?:${input})${append}`;
		  if (state.negated === true) {
		    output = `(?:^(?!${output}).*$)`;
		  }
		  return output;
		}; 
	} (utils$1));
	return utils$1;
}

var scan_1;
var hasRequiredScan;

function requireScan () {
	if (hasRequiredScan) return scan_1;
	hasRequiredScan = 1;

	const utils = requireUtils$2();
	const {
	  CHAR_ASTERISK,             /* * */
	  CHAR_AT,                   /* @ */
	  CHAR_BACKWARD_SLASH,       /* \ */
	  CHAR_COMMA,                /* , */
	  CHAR_DOT,                  /* . */
	  CHAR_EXCLAMATION_MARK,     /* ! */
	  CHAR_FORWARD_SLASH,        /* / */
	  CHAR_LEFT_CURLY_BRACE,     /* { */
	  CHAR_LEFT_PARENTHESES,     /* ( */
	  CHAR_LEFT_SQUARE_BRACKET,  /* [ */
	  CHAR_PLUS,                 /* + */
	  CHAR_QUESTION_MARK,        /* ? */
	  CHAR_RIGHT_CURLY_BRACE,    /* } */
	  CHAR_RIGHT_PARENTHESES,    /* ) */
	  CHAR_RIGHT_SQUARE_BRACKET  /* ] */
	} = requireConstants$1();

	const isPathSeparator = code => {
	  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
	};

	const depth = token => {
	  if (token.isPrefix !== true) {
	    token.depth = token.isGlobstar ? Infinity : 1;
	  }
	};

	/**
	 * Quickly scans a glob pattern and returns an object with a handful of
	 * useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
	 * `glob` (the actual pattern), `negated` (true if the path starts with `!` but not
	 * with `!(`) and `negatedExtglob` (true if the path starts with `!(`).
	 *
	 * ```js
	 * const pm = require('picomatch');
	 * console.log(pm.scan('foo/bar/*.js'));
	 * { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
	 * ```
	 * @param {String} `str`
	 * @param {Object} `options`
	 * @return {Object} Returns an object with tokens and regex source string.
	 * @api public
	 */

	const scan = (input, options) => {
	  const opts = options || {};

	  const length = input.length - 1;
	  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
	  const slashes = [];
	  const tokens = [];
	  const parts = [];

	  let str = input;
	  let index = -1;
	  let start = 0;
	  let lastIndex = 0;
	  let isBrace = false;
	  let isBracket = false;
	  let isGlob = false;
	  let isExtglob = false;
	  let isGlobstar = false;
	  let braceEscaped = false;
	  let backslashes = false;
	  let negated = false;
	  let negatedExtglob = false;
	  let finished = false;
	  let braces = 0;
	  let prev;
	  let code;
	  let token = { value: '', depth: 0, isGlob: false };

	  const eos = () => index >= length;
	  const peek = () => str.charCodeAt(index + 1);
	  const advance = () => {
	    prev = code;
	    return str.charCodeAt(++index);
	  };

	  while (index < length) {
	    code = advance();
	    let next;

	    if (code === CHAR_BACKWARD_SLASH) {
	      backslashes = token.backslashes = true;
	      code = advance();

	      if (code === CHAR_LEFT_CURLY_BRACE) {
	        braceEscaped = true;
	      }
	      continue;
	    }

	    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
	      braces++;

	      while (eos() !== true && (code = advance())) {
	        if (code === CHAR_BACKWARD_SLASH) {
	          backslashes = token.backslashes = true;
	          advance();
	          continue;
	        }

	        if (code === CHAR_LEFT_CURLY_BRACE) {
	          braces++;
	          continue;
	        }

	        if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
	          isBrace = token.isBrace = true;
	          isGlob = token.isGlob = true;
	          finished = true;

	          if (scanToEnd === true) {
	            continue;
	          }

	          break;
	        }

	        if (braceEscaped !== true && code === CHAR_COMMA) {
	          isBrace = token.isBrace = true;
	          isGlob = token.isGlob = true;
	          finished = true;

	          if (scanToEnd === true) {
	            continue;
	          }

	          break;
	        }

	        if (code === CHAR_RIGHT_CURLY_BRACE) {
	          braces--;

	          if (braces === 0) {
	            braceEscaped = false;
	            isBrace = token.isBrace = true;
	            finished = true;
	            break;
	          }
	        }
	      }

	      if (scanToEnd === true) {
	        continue;
	      }

	      break;
	    }

	    if (code === CHAR_FORWARD_SLASH) {
	      slashes.push(index);
	      tokens.push(token);
	      token = { value: '', depth: 0, isGlob: false };

	      if (finished === true) continue;
	      if (prev === CHAR_DOT && index === (start + 1)) {
	        start += 2;
	        continue;
	      }

	      lastIndex = index + 1;
	      continue;
	    }

	    if (opts.noext !== true) {
	      const isExtglobChar = code === CHAR_PLUS
	        || code === CHAR_AT
	        || code === CHAR_ASTERISK
	        || code === CHAR_QUESTION_MARK
	        || code === CHAR_EXCLAMATION_MARK;

	      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
	        isGlob = token.isGlob = true;
	        isExtglob = token.isExtglob = true;
	        finished = true;
	        if (code === CHAR_EXCLAMATION_MARK && index === start) {
	          negatedExtglob = true;
	        }

	        if (scanToEnd === true) {
	          while (eos() !== true && (code = advance())) {
	            if (code === CHAR_BACKWARD_SLASH) {
	              backslashes = token.backslashes = true;
	              code = advance();
	              continue;
	            }

	            if (code === CHAR_RIGHT_PARENTHESES) {
	              isGlob = token.isGlob = true;
	              finished = true;
	              break;
	            }
	          }
	          continue;
	        }
	        break;
	      }
	    }

	    if (code === CHAR_ASTERISK) {
	      if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
	      isGlob = token.isGlob = true;
	      finished = true;

	      if (scanToEnd === true) {
	        continue;
	      }
	      break;
	    }

	    if (code === CHAR_QUESTION_MARK) {
	      isGlob = token.isGlob = true;
	      finished = true;

	      if (scanToEnd === true) {
	        continue;
	      }
	      break;
	    }

	    if (code === CHAR_LEFT_SQUARE_BRACKET) {
	      while (eos() !== true && (next = advance())) {
	        if (next === CHAR_BACKWARD_SLASH) {
	          backslashes = token.backslashes = true;
	          advance();
	          continue;
	        }

	        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
	          isBracket = token.isBracket = true;
	          isGlob = token.isGlob = true;
	          finished = true;
	          break;
	        }
	      }

	      if (scanToEnd === true) {
	        continue;
	      }

	      break;
	    }

	    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
	      negated = token.negated = true;
	      start++;
	      continue;
	    }

	    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
	      isGlob = token.isGlob = true;

	      if (scanToEnd === true) {
	        while (eos() !== true && (code = advance())) {
	          if (code === CHAR_LEFT_PARENTHESES) {
	            backslashes = token.backslashes = true;
	            code = advance();
	            continue;
	          }

	          if (code === CHAR_RIGHT_PARENTHESES) {
	            finished = true;
	            break;
	          }
	        }
	        continue;
	      }
	      break;
	    }

	    if (isGlob === true) {
	      finished = true;

	      if (scanToEnd === true) {
	        continue;
	      }

	      break;
	    }
	  }

	  if (opts.noext === true) {
	    isExtglob = false;
	    isGlob = false;
	  }

	  let base = str;
	  let prefix = '';
	  let glob = '';

	  if (start > 0) {
	    prefix = str.slice(0, start);
	    str = str.slice(start);
	    lastIndex -= start;
	  }

	  if (base && isGlob === true && lastIndex > 0) {
	    base = str.slice(0, lastIndex);
	    glob = str.slice(lastIndex);
	  } else if (isGlob === true) {
	    base = '';
	    glob = str;
	  } else {
	    base = str;
	  }

	  if (base && base !== '' && base !== '/' && base !== str) {
	    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
	      base = base.slice(0, -1);
	    }
	  }

	  if (opts.unescape === true) {
	    if (glob) glob = utils.removeBackslashes(glob);

	    if (base && backslashes === true) {
	      base = utils.removeBackslashes(base);
	    }
	  }

	  const state = {
	    prefix,
	    input,
	    start,
	    base,
	    glob,
	    isBrace,
	    isBracket,
	    isGlob,
	    isExtglob,
	    isGlobstar,
	    negated,
	    negatedExtglob
	  };

	  if (opts.tokens === true) {
	    state.maxDepth = 0;
	    if (!isPathSeparator(code)) {
	      tokens.push(token);
	    }
	    state.tokens = tokens;
	  }

	  if (opts.parts === true || opts.tokens === true) {
	    let prevIndex;

	    for (let idx = 0; idx < slashes.length; idx++) {
	      const n = prevIndex ? prevIndex + 1 : start;
	      const i = slashes[idx];
	      const value = input.slice(n, i);
	      if (opts.tokens) {
	        if (idx === 0 && start !== 0) {
	          tokens[idx].isPrefix = true;
	          tokens[idx].value = prefix;
	        } else {
	          tokens[idx].value = value;
	        }
	        depth(tokens[idx]);
	        state.maxDepth += tokens[idx].depth;
	      }
	      if (idx !== 0 || value !== '') {
	        parts.push(value);
	      }
	      prevIndex = i;
	    }

	    if (prevIndex && prevIndex + 1 < input.length) {
	      const value = input.slice(prevIndex + 1);
	      parts.push(value);

	      if (opts.tokens) {
	        tokens[tokens.length - 1].value = value;
	        depth(tokens[tokens.length - 1]);
	        state.maxDepth += tokens[tokens.length - 1].depth;
	      }
	    }

	    state.slashes = slashes;
	    state.parts = parts;
	  }

	  return state;
	};

	scan_1 = scan;
	return scan_1;
}

var parse_1;
var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse_1;
	hasRequiredParse = 1;

	const constants = requireConstants$1();
	const utils = requireUtils$2();

	/**
	 * Constants
	 */

	const {
	  MAX_LENGTH,
	  POSIX_REGEX_SOURCE,
	  REGEX_NON_SPECIAL_CHARS,
	  REGEX_SPECIAL_CHARS_BACKREF,
	  REPLACEMENTS
	} = constants;

	/**
	 * Helpers
	 */

	const expandRange = (args, options) => {
	  if (typeof options.expandRange === 'function') {
	    return options.expandRange(...args, options);
	  }

	  args.sort();
	  const value = `[${args.join('-')}]`;

	  try {
	    /* eslint-disable-next-line no-new */
	    new RegExp(value);
	  } catch (ex) {
	    return args.map(v => utils.escapeRegex(v)).join('..');
	  }

	  return value;
	};

	/**
	 * Create the message for a syntax error
	 */

	const syntaxError = (type, char) => {
	  return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
	};

	/**
	 * Parse the given input string.
	 * @param {String} input
	 * @param {Object} options
	 * @return {Object}
	 */

	const parse = (input, options) => {
	  if (typeof input !== 'string') {
	    throw new TypeError('Expected a string');
	  }

	  input = REPLACEMENTS[input] || input;

	  const opts = { ...options };
	  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;

	  let len = input.length;
	  if (len > max) {
	    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
	  }

	  const bos = { type: 'bos', value: '', output: opts.prepend || '' };
	  const tokens = [bos];

	  const capture = opts.capture ? '' : '?:';
	  const win32 = utils.isWindows(options);

	  // create constants based on platform, for windows or posix
	  const PLATFORM_CHARS = constants.globChars(win32);
	  const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);

	  const {
	    DOT_LITERAL,
	    PLUS_LITERAL,
	    SLASH_LITERAL,
	    ONE_CHAR,
	    DOTS_SLASH,
	    NO_DOT,
	    NO_DOT_SLASH,
	    NO_DOTS_SLASH,
	    QMARK,
	    QMARK_NO_DOT,
	    STAR,
	    START_ANCHOR
	  } = PLATFORM_CHARS;

	  const globstar = opts => {
	    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
	  };

	  const nodot = opts.dot ? '' : NO_DOT;
	  const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
	  let star = opts.bash === true ? globstar(opts) : STAR;

	  if (opts.capture) {
	    star = `(${star})`;
	  }

	  // minimatch options support
	  if (typeof opts.noext === 'boolean') {
	    opts.noextglob = opts.noext;
	  }

	  const state = {
	    input,
	    index: -1,
	    start: 0,
	    dot: opts.dot === true,
	    consumed: '',
	    output: '',
	    prefix: '',
	    backtrack: false,
	    negated: false,
	    brackets: 0,
	    braces: 0,
	    parens: 0,
	    quotes: 0,
	    globstar: false,
	    tokens
	  };

	  input = utils.removePrefix(input, state);
	  len = input.length;

	  const extglobs = [];
	  const braces = [];
	  const stack = [];
	  let prev = bos;
	  let value;

	  /**
	   * Tokenizing helpers
	   */

	  const eos = () => state.index === len - 1;
	  const peek = state.peek = (n = 1) => input[state.index + n];
	  const advance = state.advance = () => input[++state.index] || '';
	  const remaining = () => input.slice(state.index + 1);
	  const consume = (value = '', num = 0) => {
	    state.consumed += value;
	    state.index += num;
	  };

	  const append = token => {
	    state.output += token.output != null ? token.output : token.value;
	    consume(token.value);
	  };

	  const negate = () => {
	    let count = 1;

	    while (peek() === '!' && (peek(2) !== '(' || peek(3) === '?')) {
	      advance();
	      state.start++;
	      count++;
	    }

	    if (count % 2 === 0) {
	      return false;
	    }

	    state.negated = true;
	    state.start++;
	    return true;
	  };

	  const increment = type => {
	    state[type]++;
	    stack.push(type);
	  };

	  const decrement = type => {
	    state[type]--;
	    stack.pop();
	  };

	  /**
	   * Push tokens onto the tokens array. This helper speeds up
	   * tokenizing by 1) helping us avoid backtracking as much as possible,
	   * and 2) helping us avoid creating extra tokens when consecutive
	   * characters are plain text. This improves performance and simplifies
	   * lookbehinds.
	   */

	  const push = tok => {
	    if (prev.type === 'globstar') {
	      const isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace');
	      const isExtglob = tok.extglob === true || (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'));

	      if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
	        state.output = state.output.slice(0, -prev.output.length);
	        prev.type = 'star';
	        prev.value = '*';
	        prev.output = star;
	        state.output += prev.output;
	      }
	    }

	    if (extglobs.length && tok.type !== 'paren') {
	      extglobs[extglobs.length - 1].inner += tok.value;
	    }

	    if (tok.value || tok.output) append(tok);
	    if (prev && prev.type === 'text' && tok.type === 'text') {
	      prev.value += tok.value;
	      prev.output = (prev.output || '') + tok.value;
	      return;
	    }

	    tok.prev = prev;
	    tokens.push(tok);
	    prev = tok;
	  };

	  const extglobOpen = (type, value) => {
	    const token = { ...EXTGLOB_CHARS[value], conditions: 1, inner: '' };

	    token.prev = prev;
	    token.parens = state.parens;
	    token.output = state.output;
	    const output = (opts.capture ? '(' : '') + token.open;

	    increment('parens');
	    push({ type, value, output: state.output ? '' : ONE_CHAR });
	    push({ type: 'paren', extglob: true, value: advance(), output });
	    extglobs.push(token);
	  };

	  const extglobClose = token => {
	    let output = token.close + (opts.capture ? ')' : '');
	    let rest;

	    if (token.type === 'negate') {
	      let extglobStar = star;

	      if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
	        extglobStar = globstar(opts);
	      }

	      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
	        output = token.close = `)$))${extglobStar}`;
	      }

	      if (token.inner.includes('*') && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
	        // Any non-magical string (`.ts`) or even nested expression (`.{ts,tsx}`) can follow after the closing parenthesis.
	        // In this case, we need to parse the string and use it in the output of the original pattern.
	        // Suitable patterns: `/!(*.d).ts`, `/!(*.d).{ts,tsx}`, `**/!(*-dbg).@(js)`.
	        //
	        // Disabling the `fastpaths` option due to a problem with parsing strings as `.ts` in the pattern like `**/!(*.d).ts`.
	        const expression = parse(rest, { ...options, fastpaths: false }).output;

	        output = token.close = `)${expression})${extglobStar})`;
	      }

	      if (token.prev.type === 'bos') {
	        state.negatedExtglob = true;
	      }
	    }

	    push({ type: 'paren', extglob: true, value, output });
	    decrement('parens');
	  };

	  /**
	   * Fast paths
	   */

	  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
	    let backslashes = false;

	    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
	      if (first === '\\') {
	        backslashes = true;
	        return m;
	      }

	      if (first === '?') {
	        if (esc) {
	          return esc + first + (rest ? QMARK.repeat(rest.length) : '');
	        }
	        if (index === 0) {
	          return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '');
	        }
	        return QMARK.repeat(chars.length);
	      }

	      if (first === '.') {
	        return DOT_LITERAL.repeat(chars.length);
	      }

	      if (first === '*') {
	        if (esc) {
	          return esc + first + (rest ? star : '');
	        }
	        return star;
	      }
	      return esc ? m : `\\${m}`;
	    });

	    if (backslashes === true) {
	      if (opts.unescape === true) {
	        output = output.replace(/\\/g, '');
	      } else {
	        output = output.replace(/\\+/g, m => {
	          return m.length % 2 === 0 ? '\\\\' : (m ? '\\' : '');
	        });
	      }
	    }

	    if (output === input && opts.contains === true) {
	      state.output = input;
	      return state;
	    }

	    state.output = utils.wrapOutput(output, state, options);
	    return state;
	  }

	  /**
	   * Tokenize input until we reach end-of-string
	   */

	  while (!eos()) {
	    value = advance();

	    if (value === '\u0000') {
	      continue;
	    }

	    /**
	     * Escaped characters
	     */

	    if (value === '\\') {
	      const next = peek();

	      if (next === '/' && opts.bash !== true) {
	        continue;
	      }

	      if (next === '.' || next === ';') {
	        continue;
	      }

	      if (!next) {
	        value += '\\';
	        push({ type: 'text', value });
	        continue;
	      }

	      // collapse slashes to reduce potential for exploits
	      const match = /^\\+/.exec(remaining());
	      let slashes = 0;

	      if (match && match[0].length > 2) {
	        slashes = match[0].length;
	        state.index += slashes;
	        if (slashes % 2 !== 0) {
	          value += '\\';
	        }
	      }

	      if (opts.unescape === true) {
	        value = advance();
	      } else {
	        value += advance();
	      }

	      if (state.brackets === 0) {
	        push({ type: 'text', value });
	        continue;
	      }
	    }

	    /**
	     * If we're inside a regex character class, continue
	     * until we reach the closing bracket.
	     */

	    if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
	      if (opts.posix !== false && value === ':') {
	        const inner = prev.value.slice(1);
	        if (inner.includes('[')) {
	          prev.posix = true;

	          if (inner.includes(':')) {
	            const idx = prev.value.lastIndexOf('[');
	            const pre = prev.value.slice(0, idx);
	            const rest = prev.value.slice(idx + 2);
	            const posix = POSIX_REGEX_SOURCE[rest];
	            if (posix) {
	              prev.value = pre + posix;
	              state.backtrack = true;
	              advance();

	              if (!bos.output && tokens.indexOf(prev) === 1) {
	                bos.output = ONE_CHAR;
	              }
	              continue;
	            }
	          }
	        }
	      }

	      if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
	        value = `\\${value}`;
	      }

	      if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
	        value = `\\${value}`;
	      }

	      if (opts.posix === true && value === '!' && prev.value === '[') {
	        value = '^';
	      }

	      prev.value += value;
	      append({ value });
	      continue;
	    }

	    /**
	     * If we're inside a quoted string, continue
	     * until we reach the closing double quote.
	     */

	    if (state.quotes === 1 && value !== '"') {
	      value = utils.escapeRegex(value);
	      prev.value += value;
	      append({ value });
	      continue;
	    }

	    /**
	     * Double quotes
	     */

	    if (value === '"') {
	      state.quotes = state.quotes === 1 ? 0 : 1;
	      if (opts.keepQuotes === true) {
	        push({ type: 'text', value });
	      }
	      continue;
	    }

	    /**
	     * Parentheses
	     */

	    if (value === '(') {
	      increment('parens');
	      push({ type: 'paren', value });
	      continue;
	    }

	    if (value === ')') {
	      if (state.parens === 0 && opts.strictBrackets === true) {
	        throw new SyntaxError(syntaxError('opening', '('));
	      }

	      const extglob = extglobs[extglobs.length - 1];
	      if (extglob && state.parens === extglob.parens + 1) {
	        extglobClose(extglobs.pop());
	        continue;
	      }

	      push({ type: 'paren', value, output: state.parens ? ')' : '\\)' });
	      decrement('parens');
	      continue;
	    }

	    /**
	     * Square brackets
	     */

	    if (value === '[') {
	      if (opts.nobracket === true || !remaining().includes(']')) {
	        if (opts.nobracket !== true && opts.strictBrackets === true) {
	          throw new SyntaxError(syntaxError('closing', ']'));
	        }

	        value = `\\${value}`;
	      } else {
	        increment('brackets');
	      }

	      push({ type: 'bracket', value });
	      continue;
	    }

	    if (value === ']') {
	      if (opts.nobracket === true || (prev && prev.type === 'bracket' && prev.value.length === 1)) {
	        push({ type: 'text', value, output: `\\${value}` });
	        continue;
	      }

	      if (state.brackets === 0) {
	        if (opts.strictBrackets === true) {
	          throw new SyntaxError(syntaxError('opening', '['));
	        }

	        push({ type: 'text', value, output: `\\${value}` });
	        continue;
	      }

	      decrement('brackets');

	      const prevValue = prev.value.slice(1);
	      if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
	        value = `/${value}`;
	      }

	      prev.value += value;
	      append({ value });

	      // when literal brackets are explicitly disabled
	      // assume we should match with a regex character class
	      if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
	        continue;
	      }

	      const escaped = utils.escapeRegex(prev.value);
	      state.output = state.output.slice(0, -prev.value.length);

	      // when literal brackets are explicitly enabled
	      // assume we should escape the brackets to match literal characters
	      if (opts.literalBrackets === true) {
	        state.output += escaped;
	        prev.value = escaped;
	        continue;
	      }

	      // when the user specifies nothing, try to match both
	      prev.value = `(${capture}${escaped}|${prev.value})`;
	      state.output += prev.value;
	      continue;
	    }

	    /**
	     * Braces
	     */

	    if (value === '{' && opts.nobrace !== true) {
	      increment('braces');

	      const open = {
	        type: 'brace',
	        value,
	        output: '(',
	        outputIndex: state.output.length,
	        tokensIndex: state.tokens.length
	      };

	      braces.push(open);
	      push(open);
	      continue;
	    }

	    if (value === '}') {
	      const brace = braces[braces.length - 1];

	      if (opts.nobrace === true || !brace) {
	        push({ type: 'text', value, output: value });
	        continue;
	      }

	      let output = ')';

	      if (brace.dots === true) {
	        const arr = tokens.slice();
	        const range = [];

	        for (let i = arr.length - 1; i >= 0; i--) {
	          tokens.pop();
	          if (arr[i].type === 'brace') {
	            break;
	          }
	          if (arr[i].type !== 'dots') {
	            range.unshift(arr[i].value);
	          }
	        }

	        output = expandRange(range, opts);
	        state.backtrack = true;
	      }

	      if (brace.comma !== true && brace.dots !== true) {
	        const out = state.output.slice(0, brace.outputIndex);
	        const toks = state.tokens.slice(brace.tokensIndex);
	        brace.value = brace.output = '\\{';
	        value = output = '\\}';
	        state.output = out;
	        for (const t of toks) {
	          state.output += (t.output || t.value);
	        }
	      }

	      push({ type: 'brace', value, output });
	      decrement('braces');
	      braces.pop();
	      continue;
	    }

	    /**
	     * Pipes
	     */

	    if (value === '|') {
	      if (extglobs.length > 0) {
	        extglobs[extglobs.length - 1].conditions++;
	      }
	      push({ type: 'text', value });
	      continue;
	    }

	    /**
	     * Commas
	     */

	    if (value === ',') {
	      let output = value;

	      const brace = braces[braces.length - 1];
	      if (brace && stack[stack.length - 1] === 'braces') {
	        brace.comma = true;
	        output = '|';
	      }

	      push({ type: 'comma', value, output });
	      continue;
	    }

	    /**
	     * Slashes
	     */

	    if (value === '/') {
	      // if the beginning of the glob is "./", advance the start
	      // to the current index, and don't add the "./" characters
	      // to the state. This greatly simplifies lookbehinds when
	      // checking for BOS characters like "!" and "." (not "./")
	      if (prev.type === 'dot' && state.index === state.start + 1) {
	        state.start = state.index + 1;
	        state.consumed = '';
	        state.output = '';
	        tokens.pop();
	        prev = bos; // reset "prev" to the first token
	        continue;
	      }

	      push({ type: 'slash', value, output: SLASH_LITERAL });
	      continue;
	    }

	    /**
	     * Dots
	     */

	    if (value === '.') {
	      if (state.braces > 0 && prev.type === 'dot') {
	        if (prev.value === '.') prev.output = DOT_LITERAL;
	        const brace = braces[braces.length - 1];
	        prev.type = 'dots';
	        prev.output += value;
	        prev.value += value;
	        brace.dots = true;
	        continue;
	      }

	      if ((state.braces + state.parens) === 0 && prev.type !== 'bos' && prev.type !== 'slash') {
	        push({ type: 'text', value, output: DOT_LITERAL });
	        continue;
	      }

	      push({ type: 'dot', value, output: DOT_LITERAL });
	      continue;
	    }

	    /**
	     * Question marks
	     */

	    if (value === '?') {
	      const isGroup = prev && prev.value === '(';
	      if (!isGroup && opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
	        extglobOpen('qmark', value);
	        continue;
	      }

	      if (prev && prev.type === 'paren') {
	        const next = peek();
	        let output = value;

	        if (next === '<' && !utils.supportsLookbehinds()) {
	          throw new Error('Node.js v10 or higher is required for regex lookbehinds');
	        }

	        if ((prev.value === '(' && !/[!=<:]/.test(next)) || (next === '<' && !/<([!=]|\w+>)/.test(remaining()))) {
	          output = `\\${value}`;
	        }

	        push({ type: 'text', value, output });
	        continue;
	      }

	      if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
	        push({ type: 'qmark', value, output: QMARK_NO_DOT });
	        continue;
	      }

	      push({ type: 'qmark', value, output: QMARK });
	      continue;
	    }

	    /**
	     * Exclamation
	     */

	    if (value === '!') {
	      if (opts.noextglob !== true && peek() === '(') {
	        if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
	          extglobOpen('negate', value);
	          continue;
	        }
	      }

	      if (opts.nonegate !== true && state.index === 0) {
	        negate();
	        continue;
	      }
	    }

	    /**
	     * Plus
	     */

	    if (value === '+') {
	      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
	        extglobOpen('plus', value);
	        continue;
	      }

	      if ((prev && prev.value === '(') || opts.regex === false) {
	        push({ type: 'plus', value, output: PLUS_LITERAL });
	        continue;
	      }

	      if ((prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) || state.parens > 0) {
	        push({ type: 'plus', value });
	        continue;
	      }

	      push({ type: 'plus', value: PLUS_LITERAL });
	      continue;
	    }

	    /**
	     * Plain text
	     */

	    if (value === '@') {
	      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
	        push({ type: 'at', extglob: true, value, output: '' });
	        continue;
	      }

	      push({ type: 'text', value });
	      continue;
	    }

	    /**
	     * Plain text
	     */

	    if (value !== '*') {
	      if (value === '$' || value === '^') {
	        value = `\\${value}`;
	      }

	      const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
	      if (match) {
	        value += match[0];
	        state.index += match[0].length;
	      }

	      push({ type: 'text', value });
	      continue;
	    }

	    /**
	     * Stars
	     */

	    if (prev && (prev.type === 'globstar' || prev.star === true)) {
	      prev.type = 'star';
	      prev.star = true;
	      prev.value += value;
	      prev.output = star;
	      state.backtrack = true;
	      state.globstar = true;
	      consume(value);
	      continue;
	    }

	    let rest = remaining();
	    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
	      extglobOpen('star', value);
	      continue;
	    }

	    if (prev.type === 'star') {
	      if (opts.noglobstar === true) {
	        consume(value);
	        continue;
	      }

	      const prior = prev.prev;
	      const before = prior.prev;
	      const isStart = prior.type === 'slash' || prior.type === 'bos';
	      const afterStar = before && (before.type === 'star' || before.type === 'globstar');

	      if (opts.bash === true && (!isStart || (rest[0] && rest[0] !== '/'))) {
	        push({ type: 'star', value, output: '' });
	        continue;
	      }

	      const isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace');
	      const isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren');
	      if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
	        push({ type: 'star', value, output: '' });
	        continue;
	      }

	      // strip consecutive `/**/`
	      while (rest.slice(0, 3) === '/**') {
	        const after = input[state.index + 4];
	        if (after && after !== '/') {
	          break;
	        }
	        rest = rest.slice(3);
	        consume('/**', 3);
	      }

	      if (prior.type === 'bos' && eos()) {
	        prev.type = 'globstar';
	        prev.value += value;
	        prev.output = globstar(opts);
	        state.output = prev.output;
	        state.globstar = true;
	        consume(value);
	        continue;
	      }

	      if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
	        state.output = state.output.slice(0, -(prior.output + prev.output).length);
	        prior.output = `(?:${prior.output}`;

	        prev.type = 'globstar';
	        prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)');
	        prev.value += value;
	        state.globstar = true;
	        state.output += prior.output + prev.output;
	        consume(value);
	        continue;
	      }

	      if (prior.type === 'slash' && prior.prev.type !== 'bos' && rest[0] === '/') {
	        const end = rest[1] !== void 0 ? '|$' : '';

	        state.output = state.output.slice(0, -(prior.output + prev.output).length);
	        prior.output = `(?:${prior.output}`;

	        prev.type = 'globstar';
	        prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
	        prev.value += value;

	        state.output += prior.output + prev.output;
	        state.globstar = true;

	        consume(value + advance());

	        push({ type: 'slash', value: '/', output: '' });
	        continue;
	      }

	      if (prior.type === 'bos' && rest[0] === '/') {
	        prev.type = 'globstar';
	        prev.value += value;
	        prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
	        state.output = prev.output;
	        state.globstar = true;
	        consume(value + advance());
	        push({ type: 'slash', value: '/', output: '' });
	        continue;
	      }

	      // remove single star from output
	      state.output = state.output.slice(0, -prev.output.length);

	      // reset previous token to globstar
	      prev.type = 'globstar';
	      prev.output = globstar(opts);
	      prev.value += value;

	      // reset output with globstar
	      state.output += prev.output;
	      state.globstar = true;
	      consume(value);
	      continue;
	    }

	    const token = { type: 'star', value, output: star };

	    if (opts.bash === true) {
	      token.output = '.*?';
	      if (prev.type === 'bos' || prev.type === 'slash') {
	        token.output = nodot + token.output;
	      }
	      push(token);
	      continue;
	    }

	    if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
	      token.output = value;
	      push(token);
	      continue;
	    }

	    if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
	      if (prev.type === 'dot') {
	        state.output += NO_DOT_SLASH;
	        prev.output += NO_DOT_SLASH;

	      } else if (opts.dot === true) {
	        state.output += NO_DOTS_SLASH;
	        prev.output += NO_DOTS_SLASH;

	      } else {
	        state.output += nodot;
	        prev.output += nodot;
	      }

	      if (peek() !== '*') {
	        state.output += ONE_CHAR;
	        prev.output += ONE_CHAR;
	      }
	    }

	    push(token);
	  }

	  while (state.brackets > 0) {
	    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'));
	    state.output = utils.escapeLast(state.output, '[');
	    decrement('brackets');
	  }

	  while (state.parens > 0) {
	    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'));
	    state.output = utils.escapeLast(state.output, '(');
	    decrement('parens');
	  }

	  while (state.braces > 0) {
	    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'));
	    state.output = utils.escapeLast(state.output, '{');
	    decrement('braces');
	  }

	  if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
	    push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` });
	  }

	  // rebuild the output if we had to backtrack at any point
	  if (state.backtrack === true) {
	    state.output = '';

	    for (const token of state.tokens) {
	      state.output += token.output != null ? token.output : token.value;

	      if (token.suffix) {
	        state.output += token.suffix;
	      }
	    }
	  }

	  return state;
	};

	/**
	 * Fast paths for creating regular expressions for common glob patterns.
	 * This can significantly speed up processing and has very little downside
	 * impact when none of the fast paths match.
	 */

	parse.fastpaths = (input, options) => {
	  const opts = { ...options };
	  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
	  const len = input.length;
	  if (len > max) {
	    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
	  }

	  input = REPLACEMENTS[input] || input;
	  const win32 = utils.isWindows(options);

	  // create constants based on platform, for windows or posix
	  const {
	    DOT_LITERAL,
	    SLASH_LITERAL,
	    ONE_CHAR,
	    DOTS_SLASH,
	    NO_DOT,
	    NO_DOTS,
	    NO_DOTS_SLASH,
	    STAR,
	    START_ANCHOR
	  } = constants.globChars(win32);

	  const nodot = opts.dot ? NO_DOTS : NO_DOT;
	  const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
	  const capture = opts.capture ? '' : '?:';
	  const state = { negated: false, prefix: '' };
	  let star = opts.bash === true ? '.*?' : STAR;

	  if (opts.capture) {
	    star = `(${star})`;
	  }

	  const globstar = opts => {
	    if (opts.noglobstar === true) return star;
	    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
	  };

	  const create = str => {
	    switch (str) {
	      case '*':
	        return `${nodot}${ONE_CHAR}${star}`;

	      case '.*':
	        return `${DOT_LITERAL}${ONE_CHAR}${star}`;

	      case '*.*':
	        return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

	      case '*/*':
	        return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;

	      case '**':
	        return nodot + globstar(opts);

	      case '**/*':
	        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;

	      case '**/*.*':
	        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

	      case '**/.*':
	        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;

	      default: {
	        const match = /^(.*?)\.(\w+)$/.exec(str);
	        if (!match) return;

	        const source = create(match[1]);
	        if (!source) return;

	        return source + DOT_LITERAL + match[2];
	      }
	    }
	  };

	  const output = utils.removePrefix(input, state);
	  let source = create(output);

	  if (source && opts.strictSlashes !== true) {
	    source += `${SLASH_LITERAL}?`;
	  }

	  return source;
	};

	parse_1 = parse;
	return parse_1;
}

var picomatch_1;
var hasRequiredPicomatch$1;

function requirePicomatch$1 () {
	if (hasRequiredPicomatch$1) return picomatch_1;
	hasRequiredPicomatch$1 = 1;

	const path = require$$1$1;
	const scan = requireScan();
	const parse = requireParse();
	const utils = requireUtils$2();
	const constants = requireConstants$1();
	const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

	/**
	 * Creates a matcher function from one or more glob patterns. The
	 * returned function takes a string to match as its first argument,
	 * and returns true if the string is a match. The returned matcher
	 * function also takes a boolean as the second argument that, when true,
	 * returns an object with additional information.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch(glob[, options]);
	 *
	 * const isMatch = picomatch('*.!(*a)');
	 * console.log(isMatch('a.a')); //=> false
	 * console.log(isMatch('a.b')); //=> true
	 * ```
	 * @name picomatch
	 * @param {String|Array} `globs` One or more glob patterns.
	 * @param {Object=} `options`
	 * @return {Function=} Returns a matcher function.
	 * @api public
	 */

	const picomatch = (glob, options, returnState = false) => {
	  if (Array.isArray(glob)) {
	    const fns = glob.map(input => picomatch(input, options, returnState));
	    const arrayMatcher = str => {
	      for (const isMatch of fns) {
	        const state = isMatch(str);
	        if (state) return state;
	      }
	      return false;
	    };
	    return arrayMatcher;
	  }

	  const isState = isObject(glob) && glob.tokens && glob.input;

	  if (glob === '' || (typeof glob !== 'string' && !isState)) {
	    throw new TypeError('Expected pattern to be a non-empty string');
	  }

	  const opts = options || {};
	  const posix = utils.isWindows(options);
	  const regex = isState
	    ? picomatch.compileRe(glob, options)
	    : picomatch.makeRe(glob, options, false, true);

	  const state = regex.state;
	  delete regex.state;

	  let isIgnored = () => false;
	  if (opts.ignore) {
	    const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
	    isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
	  }

	  const matcher = (input, returnObject = false) => {
	    const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
	    const result = { glob, state, regex, posix, input, output, match, isMatch };

	    if (typeof opts.onResult === 'function') {
	      opts.onResult(result);
	    }

	    if (isMatch === false) {
	      result.isMatch = false;
	      return returnObject ? result : false;
	    }

	    if (isIgnored(input)) {
	      if (typeof opts.onIgnore === 'function') {
	        opts.onIgnore(result);
	      }
	      result.isMatch = false;
	      return returnObject ? result : false;
	    }

	    if (typeof opts.onMatch === 'function') {
	      opts.onMatch(result);
	    }
	    return returnObject ? result : true;
	  };

	  if (returnState) {
	    matcher.state = state;
	  }

	  return matcher;
	};

	/**
	 * Test `input` with the given `regex`. This is used by the main
	 * `picomatch()` function to test the input string.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.test(input, regex[, options]);
	 *
	 * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
	 * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
	 * ```
	 * @param {String} `input` String to test.
	 * @param {RegExp} `regex`
	 * @return {Object} Returns an object with matching info.
	 * @api public
	 */

	picomatch.test = (input, regex, options, { glob, posix } = {}) => {
	  if (typeof input !== 'string') {
	    throw new TypeError('Expected input to be a string');
	  }

	  if (input === '') {
	    return { isMatch: false, output: '' };
	  }

	  const opts = options || {};
	  const format = opts.format || (posix ? utils.toPosixSlashes : null);
	  let match = input === glob;
	  let output = (match && format) ? format(input) : input;

	  if (match === false) {
	    output = format ? format(input) : input;
	    match = output === glob;
	  }

	  if (match === false || opts.capture === true) {
	    if (opts.matchBase === true || opts.basename === true) {
	      match = picomatch.matchBase(input, regex, options, posix);
	    } else {
	      match = regex.exec(output);
	    }
	  }

	  return { isMatch: Boolean(match), match, output };
	};

	/**
	 * Match the basename of a filepath.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.matchBase(input, glob[, options]);
	 * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
	 * ```
	 * @param {String} `input` String to test.
	 * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
	 * @return {Boolean}
	 * @api public
	 */

	picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
	  const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
	  return regex.test(path.basename(input));
	};

	/**
	 * Returns true if **any** of the given glob `patterns` match the specified `string`.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.isMatch(string, patterns[, options]);
	 *
	 * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
	 * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
	 * ```
	 * @param {String|Array} str The string to test.
	 * @param {String|Array} patterns One or more glob patterns to use for matching.
	 * @param {Object} [options] See available [options](#options).
	 * @return {Boolean} Returns true if any patterns match `str`
	 * @api public
	 */

	picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);

	/**
	 * Parse a glob pattern to create the source string for a regular
	 * expression.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * const result = picomatch.parse(pattern[, options]);
	 * ```
	 * @param {String} `pattern`
	 * @param {Object} `options`
	 * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
	 * @api public
	 */

	picomatch.parse = (pattern, options) => {
	  if (Array.isArray(pattern)) return pattern.map(p => picomatch.parse(p, options));
	  return parse(pattern, { ...options, fastpaths: false });
	};

	/**
	 * Scan a glob pattern to separate the pattern into segments.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.scan(input[, options]);
	 *
	 * const result = picomatch.scan('!./foo/*.js');
	 * console.log(result);
	 * { prefix: '!./',
	 *   input: '!./foo/*.js',
	 *   start: 3,
	 *   base: 'foo',
	 *   glob: '*.js',
	 *   isBrace: false,
	 *   isBracket: false,
	 *   isGlob: true,
	 *   isExtglob: false,
	 *   isGlobstar: false,
	 *   negated: true }
	 * ```
	 * @param {String} `input` Glob pattern to scan.
	 * @param {Object} `options`
	 * @return {Object} Returns an object with
	 * @api public
	 */

	picomatch.scan = (input, options) => scan(input, options);

	/**
	 * Compile a regular expression from the `state` object returned by the
	 * [parse()](#parse) method.
	 *
	 * @param {Object} `state`
	 * @param {Object} `options`
	 * @param {Boolean} `returnOutput` Intended for implementors, this argument allows you to return the raw output from the parser.
	 * @param {Boolean} `returnState` Adds the state to a `state` property on the returned regex. Useful for implementors and debugging.
	 * @return {RegExp}
	 * @api public
	 */

	picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
	  if (returnOutput === true) {
	    return state.output;
	  }

	  const opts = options || {};
	  const prepend = opts.contains ? '' : '^';
	  const append = opts.contains ? '' : '$';

	  let source = `${prepend}(?:${state.output})${append}`;
	  if (state && state.negated === true) {
	    source = `^(?!${source}).*$`;
	  }

	  const regex = picomatch.toRegex(source, options);
	  if (returnState === true) {
	    regex.state = state;
	  }

	  return regex;
	};

	/**
	 * Create a regular expression from a parsed glob pattern.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * const state = picomatch.parse('*.js');
	 * // picomatch.compileRe(state[, options]);
	 *
	 * console.log(picomatch.compileRe(state));
	 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	 * ```
	 * @param {String} `state` The object returned from the `.parse` method.
	 * @param {Object} `options`
	 * @param {Boolean} `returnOutput` Implementors may use this argument to return the compiled output, instead of a regular expression. This is not exposed on the options to prevent end-users from mutating the result.
	 * @param {Boolean} `returnState` Implementors may use this argument to return the state from the parsed glob with the returned regular expression.
	 * @return {RegExp} Returns a regex created from the given pattern.
	 * @api public
	 */

	picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
	  if (!input || typeof input !== 'string') {
	    throw new TypeError('Expected a non-empty string');
	  }

	  let parsed = { negated: false, fastpaths: true };

	  if (options.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
	    parsed.output = parse.fastpaths(input, options);
	  }

	  if (!parsed.output) {
	    parsed = parse(input, options);
	  }

	  return picomatch.compileRe(parsed, options, returnOutput, returnState);
	};

	/**
	 * Create a regular expression from the given regex source string.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.toRegex(source[, options]);
	 *
	 * const { output } = picomatch.parse('*.js');
	 * console.log(picomatch.toRegex(output));
	 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	 * ```
	 * @param {String} `source` Regular expression source string.
	 * @param {Object} `options`
	 * @return {RegExp}
	 * @api public
	 */

	picomatch.toRegex = (source, options) => {
	  try {
	    const opts = options || {};
	    return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''));
	  } catch (err) {
	    if (options && options.debug === true) throw err;
	    return /$^/;
	  }
	};

	/**
	 * Picomatch constants.
	 * @return {Object}
	 */

	picomatch.constants = constants;

	/**
	 * Expose "picomatch"
	 */

	picomatch_1 = picomatch;
	return picomatch_1;
}

var picomatch;
var hasRequiredPicomatch;

function requirePicomatch () {
	if (hasRequiredPicomatch) return picomatch;
	hasRequiredPicomatch = 1;

	picomatch = requirePicomatch$1();
	return picomatch;
}

var micromatch_1;
var hasRequiredMicromatch;

function requireMicromatch () {
	if (hasRequiredMicromatch) return micromatch_1;
	hasRequiredMicromatch = 1;

	const util = require$$1$1;
	const braces = requireBraces();
	const picomatch = requirePicomatch();
	const utils = requireUtils$2();

	const isEmptyString = v => v === '' || v === './';
	const hasBraces = v => {
	  const index = v.indexOf('{');
	  return index > -1 && v.indexOf('}', index) > -1;
	};

	/**
	 * Returns an array of strings that match one or more glob patterns.
	 *
	 * ```js
	 * const mm = require('micromatch');
	 * // mm(list, patterns[, options]);
	 *
	 * console.log(mm(['a.js', 'a.txt'], ['*.js']));
	 * //=> [ 'a.js' ]
	 * ```
	 * @param {String|Array<string>} `list` List of strings to match.
	 * @param {String|Array<string>} `patterns` One or more glob patterns to use for matching.
	 * @param {Object} `options` See available [options](#options)
	 * @return {Array} Returns an array of matches
	 * @summary false
	 * @api public
	 */

	const micromatch = (list, patterns, options) => {
	  patterns = [].concat(patterns);
	  list = [].concat(list);

	  let omit = new Set();
	  let keep = new Set();
	  let items = new Set();
	  let negatives = 0;

	  let onResult = state => {
	    items.add(state.output);
	    if (options && options.onResult) {
	      options.onResult(state);
	    }
	  };

	  for (let i = 0; i < patterns.length; i++) {
	    let isMatch = picomatch(String(patterns[i]), { ...options, onResult }, true);
	    let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
	    if (negated) negatives++;

	    for (let item of list) {
	      let matched = isMatch(item, true);

	      let match = negated ? !matched.isMatch : matched.isMatch;
	      if (!match) continue;

	      if (negated) {
	        omit.add(matched.output);
	      } else {
	        omit.delete(matched.output);
	        keep.add(matched.output);
	      }
	    }
	  }

	  let result = negatives === patterns.length ? [...items] : [...keep];
	  let matches = result.filter(item => !omit.has(item));

	  if (options && matches.length === 0) {
	    if (options.failglob === true) {
	      throw new Error(`No matches found for "${patterns.join(', ')}"`);
	    }

	    if (options.nonull === true || options.nullglob === true) {
	      return options.unescape ? patterns.map(p => p.replace(/\\/g, '')) : patterns;
	    }
	  }

	  return matches;
	};

	/**
	 * Backwards compatibility
	 */

	micromatch.match = micromatch;

	/**
	 * Returns a matcher function from the given glob `pattern` and `options`.
	 * The returned function takes a string to match as its only argument and returns
	 * true if the string is a match.
	 *
	 * ```js
	 * const mm = require('micromatch');
	 * // mm.matcher(pattern[, options]);
	 *
	 * const isMatch = mm.matcher('*.!(*a)');
	 * console.log(isMatch('a.a')); //=> false
	 * console.log(isMatch('a.b')); //=> true
	 * ```
	 * @param {String} `pattern` Glob pattern
	 * @param {Object} `options`
	 * @return {Function} Returns a matcher function.
	 * @api public
	 */

	micromatch.matcher = (pattern, options) => picomatch(pattern, options);

	/**
	 * Returns true if **any** of the given glob `patterns` match the specified `string`.
	 *
	 * ```js
	 * const mm = require('micromatch');
	 * // mm.isMatch(string, patterns[, options]);
	 *
	 * console.log(mm.isMatch('a.a', ['b.*', '*.a'])); //=> true
	 * console.log(mm.isMatch('a.a', 'b.*')); //=> false
	 * ```
	 * @param {String} `str` The string to test.
	 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
	 * @param {Object} `[options]` See available [options](#options).
	 * @return {Boolean} Returns true if any patterns match `str`
	 * @api public
	 */

	micromatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);

	/**
	 * Backwards compatibility
	 */

	micromatch.any = micromatch.isMatch;

	/**
	 * Returns a list of strings that _**do not match any**_ of the given `patterns`.
	 *
	 * ```js
	 * const mm = require('micromatch');
	 * // mm.not(list, patterns[, options]);
	 *
	 * console.log(mm.not(['a.a', 'b.b', 'c.c'], '*.a'));
	 * //=> ['b.b', 'c.c']
	 * ```
	 * @param {Array} `list` Array of strings to match.
	 * @param {String|Array} `patterns` One or more glob pattern to use for matching.
	 * @param {Object} `options` See available [options](#options) for changing how matches are performed
	 * @return {Array} Returns an array of strings that **do not match** the given patterns.
	 * @api public
	 */

	micromatch.not = (list, patterns, options = {}) => {
	  patterns = [].concat(patterns).map(String);
	  let result = new Set();
	  let items = [];

	  let onResult = state => {
	    if (options.onResult) options.onResult(state);
	    items.push(state.output);
	  };

	  let matches = new Set(micromatch(list, patterns, { ...options, onResult }));

	  for (let item of items) {
	    if (!matches.has(item)) {
	      result.add(item);
	    }
	  }
	  return [...result];
	};

	/**
	 * Returns true if the given `string` contains the given pattern. Similar
	 * to [.isMatch](#isMatch) but the pattern can match any part of the string.
	 *
	 * ```js
	 * var mm = require('micromatch');
	 * // mm.contains(string, pattern[, options]);
	 *
	 * console.log(mm.contains('aa/bb/cc', '*b'));
	 * //=> true
	 * console.log(mm.contains('aa/bb/cc', '*d'));
	 * //=> false
	 * ```
	 * @param {String} `str` The string to match.
	 * @param {String|Array} `patterns` Glob pattern to use for matching.
	 * @param {Object} `options` See available [options](#options) for changing how matches are performed
	 * @return {Boolean} Returns true if any of the patterns matches any part of `str`.
	 * @api public
	 */

	micromatch.contains = (str, pattern, options) => {
	  if (typeof str !== 'string') {
	    throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
	  }

	  if (Array.isArray(pattern)) {
	    return pattern.some(p => micromatch.contains(str, p, options));
	  }

	  if (typeof pattern === 'string') {
	    if (isEmptyString(str) || isEmptyString(pattern)) {
	      return false;
	    }

	    if (str.includes(pattern) || (str.startsWith('./') && str.slice(2).includes(pattern))) {
	      return true;
	    }
	  }

	  return micromatch.isMatch(str, pattern, { ...options, contains: true });
	};

	/**
	 * Filter the keys of the given object with the given `glob` pattern
	 * and `options`. Does not attempt to match nested keys. If you need this feature,
	 * use [glob-object][] instead.
	 *
	 * ```js
	 * const mm = require('micromatch');
	 * // mm.matchKeys(object, patterns[, options]);
	 *
	 * const obj = { aa: 'a', ab: 'b', ac: 'c' };
	 * console.log(mm.matchKeys(obj, '*b'));
	 * //=> { ab: 'b' }
	 * ```
	 * @param {Object} `object` The object with keys to filter.
	 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
	 * @param {Object} `options` See available [options](#options) for changing how matches are performed
	 * @return {Object} Returns an object with only keys that match the given patterns.
	 * @api public
	 */

	micromatch.matchKeys = (obj, patterns, options) => {
	  if (!utils.isObject(obj)) {
	    throw new TypeError('Expected the first argument to be an object');
	  }
	  let keys = micromatch(Object.keys(obj), patterns, options);
	  let res = {};
	  for (let key of keys) res[key] = obj[key];
	  return res;
	};

	/**
	 * Returns true if some of the strings in the given `list` match any of the given glob `patterns`.
	 *
	 * ```js
	 * const mm = require('micromatch');
	 * // mm.some(list, patterns[, options]);
	 *
	 * console.log(mm.some(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
	 * // true
	 * console.log(mm.some(['foo.js'], ['*.js', '!foo.js']));
	 * // false
	 * ```
	 * @param {String|Array} `list` The string or array of strings to test. Returns as soon as the first match is found.
	 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
	 * @param {Object} `options` See available [options](#options) for changing how matches are performed
	 * @return {Boolean} Returns true if any `patterns` matches any of the strings in `list`
	 * @api public
	 */

	micromatch.some = (list, patterns, options) => {
	  let items = [].concat(list);

	  for (let pattern of [].concat(patterns)) {
	    let isMatch = picomatch(String(pattern), options);
	    if (items.some(item => isMatch(item))) {
	      return true;
	    }
	  }
	  return false;
	};

	/**
	 * Returns true if every string in the given `list` matches
	 * any of the given glob `patterns`.
	 *
	 * ```js
	 * const mm = require('micromatch');
	 * // mm.every(list, patterns[, options]);
	 *
	 * console.log(mm.every('foo.js', ['foo.js']));
	 * // true
	 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js']));
	 * // true
	 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
	 * // false
	 * console.log(mm.every(['foo.js'], ['*.js', '!foo.js']));
	 * // false
	 * ```
	 * @param {String|Array} `list` The string or array of strings to test.
	 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
	 * @param {Object} `options` See available [options](#options) for changing how matches are performed
	 * @return {Boolean} Returns true if all `patterns` matches all of the strings in `list`
	 * @api public
	 */

	micromatch.every = (list, patterns, options) => {
	  let items = [].concat(list);

	  for (let pattern of [].concat(patterns)) {
	    let isMatch = picomatch(String(pattern), options);
	    if (!items.every(item => isMatch(item))) {
	      return false;
	    }
	  }
	  return true;
	};

	/**
	 * Returns true if **all** of the given `patterns` match
	 * the specified string.
	 *
	 * ```js
	 * const mm = require('micromatch');
	 * // mm.all(string, patterns[, options]);
	 *
	 * console.log(mm.all('foo.js', ['foo.js']));
	 * // true
	 *
	 * console.log(mm.all('foo.js', ['*.js', '!foo.js']));
	 * // false
	 *
	 * console.log(mm.all('foo.js', ['*.js', 'foo.js']));
	 * // true
	 *
	 * console.log(mm.all('foo.js', ['*.js', 'f*', '*o*', '*o.js']));
	 * // true
	 * ```
	 * @param {String|Array} `str` The string to test.
	 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
	 * @param {Object} `options` See available [options](#options) for changing how matches are performed
	 * @return {Boolean} Returns true if any patterns match `str`
	 * @api public
	 */

	micromatch.all = (str, patterns, options) => {
	  if (typeof str !== 'string') {
	    throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
	  }

	  return [].concat(patterns).every(p => picomatch(p, options)(str));
	};

	/**
	 * Returns an array of matches captured by `pattern` in `string, or `null` if the pattern did not match.
	 *
	 * ```js
	 * const mm = require('micromatch');
	 * // mm.capture(pattern, string[, options]);
	 *
	 * console.log(mm.capture('test/*.js', 'test/foo.js'));
	 * //=> ['foo']
	 * console.log(mm.capture('test/*.js', 'foo/bar.css'));
	 * //=> null
	 * ```
	 * @param {String} `glob` Glob pattern to use for matching.
	 * @param {String} `input` String to match
	 * @param {Object} `options` See available [options](#options) for changing how matches are performed
	 * @return {Array|null} Returns an array of captures if the input matches the glob pattern, otherwise `null`.
	 * @api public
	 */

	micromatch.capture = (glob, input, options) => {
	  let posix = utils.isWindows(options);
	  let regex = picomatch.makeRe(String(glob), { ...options, capture: true });
	  let match = regex.exec(posix ? utils.toPosixSlashes(input) : input);

	  if (match) {
	    return match.slice(1).map(v => v === void 0 ? '' : v);
	  }
	};

	/**
	 * Create a regular expression from the given glob `pattern`.
	 *
	 * ```js
	 * const mm = require('micromatch');
	 * // mm.makeRe(pattern[, options]);
	 *
	 * console.log(mm.makeRe('*.js'));
	 * //=> /^(?:(\.[\\\/])?(?!\.)(?=.)[^\/]*?\.js)$/
	 * ```
	 * @param {String} `pattern` A glob pattern to convert to regex.
	 * @param {Object} `options`
	 * @return {RegExp} Returns a regex created from the given pattern.
	 * @api public
	 */

	micromatch.makeRe = (...args) => picomatch.makeRe(...args);

	/**
	 * Scan a glob pattern to separate the pattern into segments. Used
	 * by the [split](#split) method.
	 *
	 * ```js
	 * const mm = require('micromatch');
	 * const state = mm.scan(pattern[, options]);
	 * ```
	 * @param {String} `pattern`
	 * @param {Object} `options`
	 * @return {Object} Returns an object with
	 * @api public
	 */

	micromatch.scan = (...args) => picomatch.scan(...args);

	/**
	 * Parse a glob pattern to create the source string for a regular
	 * expression.
	 *
	 * ```js
	 * const mm = require('micromatch');
	 * const state = mm.parse(pattern[, options]);
	 * ```
	 * @param {String} `glob`
	 * @param {Object} `options`
	 * @return {Object} Returns an object with useful properties and output to be used as regex source string.
	 * @api public
	 */

	micromatch.parse = (patterns, options) => {
	  let res = [];
	  for (let pattern of [].concat(patterns || [])) {
	    for (let str of braces(String(pattern), options)) {
	      res.push(picomatch.parse(str, options));
	    }
	  }
	  return res;
	};

	/**
	 * Process the given brace `pattern`.
	 *
	 * ```js
	 * const { braces } = require('micromatch');
	 * console.log(braces('foo/{a,b,c}/bar'));
	 * //=> [ 'foo/(a|b|c)/bar' ]
	 *
	 * console.log(braces('foo/{a,b,c}/bar', { expand: true }));
	 * //=> [ 'foo/a/bar', 'foo/b/bar', 'foo/c/bar' ]
	 * ```
	 * @param {String} `pattern` String with brace pattern to process.
	 * @param {Object} `options` Any [options](#options) to change how expansion is performed. See the [braces][] library for all available options.
	 * @return {Array}
	 * @api public
	 */

	micromatch.braces = (pattern, options) => {
	  if (typeof pattern !== 'string') throw new TypeError('Expected a string');
	  if ((options && options.nobrace === true) || !hasBraces(pattern)) {
	    return [pattern];
	  }
	  return braces(pattern, options);
	};

	/**
	 * Expand braces
	 */

	micromatch.braceExpand = (pattern, options) => {
	  if (typeof pattern !== 'string') throw new TypeError('Expected a string');
	  return micromatch.braces(pattern, { ...options, expand: true });
	};

	/**
	 * Expose micromatch
	 */

	// exposed for tests
	micromatch.hasBraces = hasBraces;
	micromatch_1 = micromatch;
	return micromatch_1;
}

var hasRequiredPattern;

function requirePattern () {
	if (hasRequiredPattern) return pattern;
	hasRequiredPattern = 1;
	Object.defineProperty(pattern, "__esModule", { value: true });
	pattern.isAbsolute = pattern.partitionAbsoluteAndRelative = pattern.removeDuplicateSlashes = pattern.matchAny = pattern.convertPatternsToRe = pattern.makeRe = pattern.getPatternParts = pattern.expandBraceExpansion = pattern.expandPatternsWithBraceExpansion = pattern.isAffectDepthOfReadingPattern = pattern.endsWithSlashGlobStar = pattern.hasGlobStar = pattern.getBaseDirectory = pattern.isPatternRelatedToParentDirectory = pattern.getPatternsOutsideCurrentDirectory = pattern.getPatternsInsideCurrentDirectory = pattern.getPositivePatterns = pattern.getNegativePatterns = pattern.isPositivePattern = pattern.isNegativePattern = pattern.convertToNegativePattern = pattern.convertToPositivePattern = pattern.isDynamicPattern = pattern.isStaticPattern = void 0;
	const path = require$$1$1;
	const globParent = requireGlobParent();
	const micromatch = requireMicromatch();
	const GLOBSTAR = '**';
	const ESCAPE_SYMBOL = '\\';
	const COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/;
	const REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[[^[]*]/;
	const REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\([^(]*\|[^|]*\)/;
	const GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\([^(]*\)/;
	const BRACE_EXPANSION_SEPARATORS_RE = /,|\.\./;
	/**
	 * Matches a sequence of two or more consecutive slashes, excluding the first two slashes at the beginning of the string.
	 * The latter is due to the presence of the device path at the beginning of the UNC path.
	 */
	const DOUBLE_SLASH_RE = /(?!^)\/{2,}/g;
	function isStaticPattern(pattern, options = {}) {
	    return !isDynamicPattern(pattern, options);
	}
	pattern.isStaticPattern = isStaticPattern;
	function isDynamicPattern(pattern, options = {}) {
	    /**
	     * A special case with an empty string is necessary for matching patterns that start with a forward slash.
	     * An empty string cannot be a dynamic pattern.
	     * For example, the pattern `/lib/*` will be spread into parts: '', 'lib', '*'.
	     */
	    if (pattern === '') {
	        return false;
	    }
	    /**
	     * When the `caseSensitiveMatch` option is disabled, all patterns must be marked as dynamic, because we cannot check
	     * filepath directly (without read directory).
	     */
	    if (options.caseSensitiveMatch === false || pattern.includes(ESCAPE_SYMBOL)) {
	        return true;
	    }
	    if (COMMON_GLOB_SYMBOLS_RE.test(pattern) || REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) || REGEX_GROUP_SYMBOLS_RE.test(pattern)) {
	        return true;
	    }
	    if (options.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern)) {
	        return true;
	    }
	    if (options.braceExpansion !== false && hasBraceExpansion(pattern)) {
	        return true;
	    }
	    return false;
	}
	pattern.isDynamicPattern = isDynamicPattern;
	function hasBraceExpansion(pattern) {
	    const openingBraceIndex = pattern.indexOf('{');
	    if (openingBraceIndex === -1) {
	        return false;
	    }
	    const closingBraceIndex = pattern.indexOf('}', openingBraceIndex + 1);
	    if (closingBraceIndex === -1) {
	        return false;
	    }
	    const braceContent = pattern.slice(openingBraceIndex, closingBraceIndex);
	    return BRACE_EXPANSION_SEPARATORS_RE.test(braceContent);
	}
	function convertToPositivePattern(pattern) {
	    return isNegativePattern(pattern) ? pattern.slice(1) : pattern;
	}
	pattern.convertToPositivePattern = convertToPositivePattern;
	function convertToNegativePattern(pattern) {
	    return '!' + pattern;
	}
	pattern.convertToNegativePattern = convertToNegativePattern;
	function isNegativePattern(pattern) {
	    return pattern.startsWith('!') && pattern[1] !== '(';
	}
	pattern.isNegativePattern = isNegativePattern;
	function isPositivePattern(pattern) {
	    return !isNegativePattern(pattern);
	}
	pattern.isPositivePattern = isPositivePattern;
	function getNegativePatterns(patterns) {
	    return patterns.filter(isNegativePattern);
	}
	pattern.getNegativePatterns = getNegativePatterns;
	function getPositivePatterns(patterns) {
	    return patterns.filter(isPositivePattern);
	}
	pattern.getPositivePatterns = getPositivePatterns;
	/**
	 * Returns patterns that can be applied inside the current directory.
	 *
	 * @example
	 * // ['./*', '*', 'a/*']
	 * getPatternsInsideCurrentDirectory(['./*', '*', 'a/*', '../*', './../*'])
	 */
	function getPatternsInsideCurrentDirectory(patterns) {
	    return patterns.filter((pattern) => !isPatternRelatedToParentDirectory(pattern));
	}
	pattern.getPatternsInsideCurrentDirectory = getPatternsInsideCurrentDirectory;
	/**
	 * Returns patterns to be expanded relative to (outside) the current directory.
	 *
	 * @example
	 * // ['../*', './../*']
	 * getPatternsInsideCurrentDirectory(['./*', '*', 'a/*', '../*', './../*'])
	 */
	function getPatternsOutsideCurrentDirectory(patterns) {
	    return patterns.filter(isPatternRelatedToParentDirectory);
	}
	pattern.getPatternsOutsideCurrentDirectory = getPatternsOutsideCurrentDirectory;
	function isPatternRelatedToParentDirectory(pattern) {
	    return pattern.startsWith('..') || pattern.startsWith('./..');
	}
	pattern.isPatternRelatedToParentDirectory = isPatternRelatedToParentDirectory;
	function getBaseDirectory(pattern) {
	    return globParent(pattern, { flipBackslashes: false });
	}
	pattern.getBaseDirectory = getBaseDirectory;
	function hasGlobStar(pattern) {
	    return pattern.includes(GLOBSTAR);
	}
	pattern.hasGlobStar = hasGlobStar;
	function endsWithSlashGlobStar(pattern) {
	    return pattern.endsWith('/' + GLOBSTAR);
	}
	pattern.endsWithSlashGlobStar = endsWithSlashGlobStar;
	function isAffectDepthOfReadingPattern(pattern) {
	    const basename = path.basename(pattern);
	    return endsWithSlashGlobStar(pattern) || isStaticPattern(basename);
	}
	pattern.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern;
	function expandPatternsWithBraceExpansion(patterns) {
	    return patterns.reduce((collection, pattern) => {
	        return collection.concat(expandBraceExpansion(pattern));
	    }, []);
	}
	pattern.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion;
	function expandBraceExpansion(pattern) {
	    const patterns = micromatch.braces(pattern, { expand: true, nodupes: true, keepEscaping: true });
	    /**
	     * Sort the patterns by length so that the same depth patterns are processed side by side.
	     * `a/{b,}/{c,}/*` – `['a///*', 'a/b//*', 'a//c/*', 'a/b/c/*']`
	     */
	    patterns.sort((a, b) => a.length - b.length);
	    /**
	     * Micromatch can return an empty string in the case of patterns like `{a,}`.
	     */
	    return patterns.filter((pattern) => pattern !== '');
	}
	pattern.expandBraceExpansion = expandBraceExpansion;
	function getPatternParts(pattern, options) {
	    let { parts } = micromatch.scan(pattern, Object.assign(Object.assign({}, options), { parts: true }));
	    /**
	     * The scan method returns an empty array in some cases.
	     * See micromatch/picomatch#58 for more details.
	     */
	    if (parts.length === 0) {
	        parts = [pattern];
	    }
	    /**
	     * The scan method does not return an empty part for the pattern with a forward slash.
	     * This is another part of micromatch/picomatch#58.
	     */
	    if (parts[0].startsWith('/')) {
	        parts[0] = parts[0].slice(1);
	        parts.unshift('');
	    }
	    return parts;
	}
	pattern.getPatternParts = getPatternParts;
	function makeRe(pattern, options) {
	    return micromatch.makeRe(pattern, options);
	}
	pattern.makeRe = makeRe;
	function convertPatternsToRe(patterns, options) {
	    return patterns.map((pattern) => makeRe(pattern, options));
	}
	pattern.convertPatternsToRe = convertPatternsToRe;
	function matchAny(entry, patternsRe) {
	    return patternsRe.some((patternRe) => patternRe.test(entry));
	}
	pattern.matchAny = matchAny;
	/**
	 * This package only works with forward slashes as a path separator.
	 * Because of this, we cannot use the standard `path.normalize` method, because on Windows platform it will use of backslashes.
	 */
	function removeDuplicateSlashes(pattern) {
	    return pattern.replace(DOUBLE_SLASH_RE, '/');
	}
	pattern.removeDuplicateSlashes = removeDuplicateSlashes;
	function partitionAbsoluteAndRelative(patterns) {
	    const absolute = [];
	    const relative = [];
	    for (const pattern of patterns) {
	        if (isAbsolute(pattern)) {
	            absolute.push(pattern);
	        }
	        else {
	            relative.push(pattern);
	        }
	    }
	    return [absolute, relative];
	}
	pattern.partitionAbsoluteAndRelative = partitionAbsoluteAndRelative;
	function isAbsolute(pattern) {
	    return path.isAbsolute(pattern);
	}
	pattern.isAbsolute = isAbsolute;
	return pattern;
}

var stream$3 = {};

var hasRequiredStream$3;

function requireStream$3 () {
	if (hasRequiredStream$3) return stream$3;
	hasRequiredStream$3 = 1;
	Object.defineProperty(stream$3, "__esModule", { value: true });
	stream$3.merge = void 0;
	const merge2 = requireMerge2();
	function merge(streams) {
	    const mergedStream = merge2(streams);
	    streams.forEach((stream) => {
	        stream.once('error', (error) => mergedStream.emit('error', error));
	    });
	    mergedStream.once('close', () => propagateCloseEventToSources(streams));
	    mergedStream.once('end', () => propagateCloseEventToSources(streams));
	    return mergedStream;
	}
	stream$3.merge = merge;
	function propagateCloseEventToSources(streams) {
	    streams.forEach((stream) => stream.emit('close'));
	}
	return stream$3;
}

var string = {};

var hasRequiredString;

function requireString () {
	if (hasRequiredString) return string;
	hasRequiredString = 1;
	Object.defineProperty(string, "__esModule", { value: true });
	string.isEmpty = string.isString = void 0;
	function isString(input) {
	    return typeof input === 'string';
	}
	string.isString = isString;
	function isEmpty(input) {
	    return input === '';
	}
	string.isEmpty = isEmpty;
	return string;
}

var hasRequiredUtils$1;

function requireUtils$1 () {
	if (hasRequiredUtils$1) return utils$3;
	hasRequiredUtils$1 = 1;
	Object.defineProperty(utils$3, "__esModule", { value: true });
	utils$3.string = utils$3.stream = utils$3.pattern = utils$3.path = utils$3.fs = utils$3.errno = utils$3.array = void 0;
	const array = requireArray();
	utils$3.array = array;
	const errno = requireErrno();
	utils$3.errno = errno;
	const fs = requireFs$3();
	utils$3.fs = fs;
	const path = requirePath();
	utils$3.path = path;
	const pattern = requirePattern();
	utils$3.pattern = pattern;
	const stream = requireStream$3();
	utils$3.stream = stream;
	const string = requireString();
	utils$3.string = string;
	return utils$3;
}

var hasRequiredTasks;

function requireTasks () {
	if (hasRequiredTasks) return tasks;
	hasRequiredTasks = 1;
	Object.defineProperty(tasks, "__esModule", { value: true });
	tasks.convertPatternGroupToTask = tasks.convertPatternGroupsToTasks = tasks.groupPatternsByBaseDirectory = tasks.getNegativePatternsAsPositive = tasks.getPositivePatterns = tasks.convertPatternsToTasks = tasks.generate = void 0;
	const utils = requireUtils$1();
	function generate(input, settings) {
	    const patterns = processPatterns(input, settings);
	    const ignore = processPatterns(settings.ignore, settings);
	    const positivePatterns = getPositivePatterns(patterns);
	    const negativePatterns = getNegativePatternsAsPositive(patterns, ignore);
	    const staticPatterns = positivePatterns.filter((pattern) => utils.pattern.isStaticPattern(pattern, settings));
	    const dynamicPatterns = positivePatterns.filter((pattern) => utils.pattern.isDynamicPattern(pattern, settings));
	    const staticTasks = convertPatternsToTasks(staticPatterns, negativePatterns, /* dynamic */ false);
	    const dynamicTasks = convertPatternsToTasks(dynamicPatterns, negativePatterns, /* dynamic */ true);
	    return staticTasks.concat(dynamicTasks);
	}
	tasks.generate = generate;
	function processPatterns(input, settings) {
	    let patterns = input;
	    /**
	     * The original pattern like `{,*,**,a/*}` can lead to problems checking the depth when matching entry
	     * and some problems with the micromatch package (see fast-glob issues: #365, #394).
	     *
	     * To solve this problem, we expand all patterns containing brace expansion. This can lead to a slight slowdown
	     * in matching in the case of a large set of patterns after expansion.
	     */
	    if (settings.braceExpansion) {
	        patterns = utils.pattern.expandPatternsWithBraceExpansion(patterns);
	    }
	    /**
	     * If the `baseNameMatch` option is enabled, we must add globstar to patterns, so that they can be used
	     * at any nesting level.
	     *
	     * We do this here, because otherwise we have to complicate the filtering logic. For example, we need to change
	     * the pattern in the filter before creating a regular expression. There is no need to change the patterns
	     * in the application. Only on the input.
	     */
	    if (settings.baseNameMatch) {
	        patterns = patterns.map((pattern) => pattern.includes('/') ? pattern : `**/${pattern}`);
	    }
	    /**
	     * This method also removes duplicate slashes that may have been in the pattern or formed as a result of expansion.
	     */
	    return patterns.map((pattern) => utils.pattern.removeDuplicateSlashes(pattern));
	}
	/**
	 * Returns tasks grouped by basic pattern directories.
	 *
	 * Patterns that can be found inside (`./`) and outside (`../`) the current directory are handled separately.
	 * This is necessary because directory traversal starts at the base directory and goes deeper.
	 */
	function convertPatternsToTasks(positive, negative, dynamic) {
	    const tasks = [];
	    const patternsOutsideCurrentDirectory = utils.pattern.getPatternsOutsideCurrentDirectory(positive);
	    const patternsInsideCurrentDirectory = utils.pattern.getPatternsInsideCurrentDirectory(positive);
	    const outsideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsOutsideCurrentDirectory);
	    const insideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsInsideCurrentDirectory);
	    tasks.push(...convertPatternGroupsToTasks(outsideCurrentDirectoryGroup, negative, dynamic));
	    /*
	     * For the sake of reducing future accesses to the file system, we merge all tasks within the current directory
	     * into a global task, if at least one pattern refers to the root (`.`). In this case, the global task covers the rest.
	     */
	    if ('.' in insideCurrentDirectoryGroup) {
	        tasks.push(convertPatternGroupToTask('.', patternsInsideCurrentDirectory, negative, dynamic));
	    }
	    else {
	        tasks.push(...convertPatternGroupsToTasks(insideCurrentDirectoryGroup, negative, dynamic));
	    }
	    return tasks;
	}
	tasks.convertPatternsToTasks = convertPatternsToTasks;
	function getPositivePatterns(patterns) {
	    return utils.pattern.getPositivePatterns(patterns);
	}
	tasks.getPositivePatterns = getPositivePatterns;
	function getNegativePatternsAsPositive(patterns, ignore) {
	    const negative = utils.pattern.getNegativePatterns(patterns).concat(ignore);
	    const positive = negative.map(utils.pattern.convertToPositivePattern);
	    return positive;
	}
	tasks.getNegativePatternsAsPositive = getNegativePatternsAsPositive;
	function groupPatternsByBaseDirectory(patterns) {
	    const group = {};
	    return patterns.reduce((collection, pattern) => {
	        const base = utils.pattern.getBaseDirectory(pattern);
	        if (base in collection) {
	            collection[base].push(pattern);
	        }
	        else {
	            collection[base] = [pattern];
	        }
	        return collection;
	    }, group);
	}
	tasks.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory;
	function convertPatternGroupsToTasks(positive, negative, dynamic) {
	    return Object.keys(positive).map((base) => {
	        return convertPatternGroupToTask(base, positive[base], negative, dynamic);
	    });
	}
	tasks.convertPatternGroupsToTasks = convertPatternGroupsToTasks;
	function convertPatternGroupToTask(base, positive, negative, dynamic) {
	    return {
	        dynamic,
	        positive,
	        negative,
	        base,
	        patterns: [].concat(positive, negative.map(utils.pattern.convertToNegativePattern))
	    };
	}
	tasks.convertPatternGroupToTask = convertPatternGroupToTask;
	return tasks;
}

var async$6 = {};

var async$5 = {};

var out$3 = {};

var async$4 = {};

var async$3 = {};

var out$2 = {};

var async$2 = {};

var out$1 = {};

var async$1 = {};

var hasRequiredAsync$5;

function requireAsync$5 () {
	if (hasRequiredAsync$5) return async$1;
	hasRequiredAsync$5 = 1;
	Object.defineProperty(async$1, "__esModule", { value: true });
	async$1.read = void 0;
	function read(path, settings, callback) {
	    settings.fs.lstat(path, (lstatError, lstat) => {
	        if (lstatError !== null) {
	            callFailureCallback(callback, lstatError);
	            return;
	        }
	        if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
	            callSuccessCallback(callback, lstat);
	            return;
	        }
	        settings.fs.stat(path, (statError, stat) => {
	            if (statError !== null) {
	                if (settings.throwErrorOnBrokenSymbolicLink) {
	                    callFailureCallback(callback, statError);
	                    return;
	                }
	                callSuccessCallback(callback, lstat);
	                return;
	            }
	            if (settings.markSymbolicLink) {
	                stat.isSymbolicLink = () => true;
	            }
	            callSuccessCallback(callback, stat);
	        });
	    });
	}
	async$1.read = read;
	function callFailureCallback(callback, error) {
	    callback(error);
	}
	function callSuccessCallback(callback, result) {
	    callback(null, result);
	}
	return async$1;
}

var sync$5 = {};

var hasRequiredSync$5;

function requireSync$5 () {
	if (hasRequiredSync$5) return sync$5;
	hasRequiredSync$5 = 1;
	Object.defineProperty(sync$5, "__esModule", { value: true });
	sync$5.read = void 0;
	function read(path, settings) {
	    const lstat = settings.fs.lstatSync(path);
	    if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
	        return lstat;
	    }
	    try {
	        const stat = settings.fs.statSync(path);
	        if (settings.markSymbolicLink) {
	            stat.isSymbolicLink = () => true;
	        }
	        return stat;
	    }
	    catch (error) {
	        if (!settings.throwErrorOnBrokenSymbolicLink) {
	            return lstat;
	        }
	        throw error;
	    }
	}
	sync$5.read = read;
	return sync$5;
}

var settings$3 = {};

var fs$2 = {};

var hasRequiredFs$2;

function requireFs$2 () {
	if (hasRequiredFs$2) return fs$2;
	hasRequiredFs$2 = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
		const fs = require$$1$1;
		exports.FILE_SYSTEM_ADAPTER = {
		    lstat: fs.lstat,
		    stat: fs.stat,
		    lstatSync: fs.lstatSync,
		    statSync: fs.statSync
		};
		function createFileSystemAdapter(fsMethods) {
		    if (fsMethods === undefined) {
		        return exports.FILE_SYSTEM_ADAPTER;
		    }
		    return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
		}
		exports.createFileSystemAdapter = createFileSystemAdapter; 
	} (fs$2));
	return fs$2;
}

var hasRequiredSettings$3;

function requireSettings$3 () {
	if (hasRequiredSettings$3) return settings$3;
	hasRequiredSettings$3 = 1;
	Object.defineProperty(settings$3, "__esModule", { value: true });
	const fs = requireFs$2();
	class Settings {
	    constructor(_options = {}) {
	        this._options = _options;
	        this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, true);
	        this.fs = fs.createFileSystemAdapter(this._options.fs);
	        this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, false);
	        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
	    }
	    _getValue(option, value) {
	        return option !== null && option !== void 0 ? option : value;
	    }
	}
	settings$3.default = Settings;
	return settings$3;
}

var hasRequiredOut$3;

function requireOut$3 () {
	if (hasRequiredOut$3) return out$1;
	hasRequiredOut$3 = 1;
	Object.defineProperty(out$1, "__esModule", { value: true });
	out$1.statSync = out$1.stat = out$1.Settings = void 0;
	const async = requireAsync$5();
	const sync = requireSync$5();
	const settings_1 = requireSettings$3();
	out$1.Settings = settings_1.default;
	function stat(path, optionsOrSettingsOrCallback, callback) {
	    if (typeof optionsOrSettingsOrCallback === 'function') {
	        async.read(path, getSettings(), optionsOrSettingsOrCallback);
	        return;
	    }
	    async.read(path, getSettings(optionsOrSettingsOrCallback), callback);
	}
	out$1.stat = stat;
	function statSync(path, optionsOrSettings) {
	    const settings = getSettings(optionsOrSettings);
	    return sync.read(path, settings);
	}
	out$1.statSync = statSync;
	function getSettings(settingsOrOptions = {}) {
	    if (settingsOrOptions instanceof settings_1.default) {
	        return settingsOrOptions;
	    }
	    return new settings_1.default(settingsOrOptions);
	}
	return out$1;
}

/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

var queueMicrotask_1;
var hasRequiredQueueMicrotask;

function requireQueueMicrotask () {
	if (hasRequiredQueueMicrotask) return queueMicrotask_1;
	hasRequiredQueueMicrotask = 1;
	let promise;

	queueMicrotask_1 = typeof queueMicrotask === 'function'
	  ? queueMicrotask.bind(typeof window !== 'undefined' ? window : commonjsGlobal)
	  // reuse resolved promise, and allocate it lazily
	  : cb => (promise || (promise = Promise.resolve()))
	    .then(cb)
	    .catch(err => setTimeout(() => { throw err }, 0));
	return queueMicrotask_1;
}

/*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

var runParallel_1;
var hasRequiredRunParallel;

function requireRunParallel () {
	if (hasRequiredRunParallel) return runParallel_1;
	hasRequiredRunParallel = 1;
	runParallel_1 = runParallel;

	const queueMicrotask = requireQueueMicrotask();

	function runParallel (tasks, cb) {
	  let results, pending, keys;
	  let isSync = true;

	  if (Array.isArray(tasks)) {
	    results = [];
	    pending = tasks.length;
	  } else {
	    keys = Object.keys(tasks);
	    results = {};
	    pending = keys.length;
	  }

	  function done (err) {
	    function end () {
	      if (cb) cb(err, results);
	      cb = null;
	    }
	    if (isSync) queueMicrotask(end);
	    else end();
	  }

	  function each (i, err, result) {
	    results[i] = result;
	    if (--pending === 0 || err) {
	      done(err);
	    }
	  }

	  if (!pending) {
	    // empty
	    done(null);
	  } else if (keys) {
	    // object
	    keys.forEach(function (key) {
	      tasks[key](function (err, result) { each(key, err, result); });
	    });
	  } else {
	    // array
	    tasks.forEach(function (task, i) {
	      task(function (err, result) { each(i, err, result); });
	    });
	  }

	  isSync = false;
	}
	return runParallel_1;
}

var constants = {};

var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;
	Object.defineProperty(constants, "__esModule", { value: true });
	constants.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0;
	const NODE_PROCESS_VERSION_PARTS = process.versions.node.split('.');
	if (NODE_PROCESS_VERSION_PARTS[0] === undefined || NODE_PROCESS_VERSION_PARTS[1] === undefined) {
	    throw new Error(`Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`);
	}
	const MAJOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[0], 10);
	const MINOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[1], 10);
	const SUPPORTED_MAJOR_VERSION = 10;
	const SUPPORTED_MINOR_VERSION = 10;
	const IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION;
	const IS_MATCHED_BY_MAJOR_AND_MINOR = MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= SUPPORTED_MINOR_VERSION;
	/**
	 * IS `true` for Node.js 10.10 and greater.
	 */
	constants.IS_SUPPORT_READDIR_WITH_FILE_TYPES = IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR;
	return constants;
}

var utils = {};

var fs$1 = {};

var hasRequiredFs$1;

function requireFs$1 () {
	if (hasRequiredFs$1) return fs$1;
	hasRequiredFs$1 = 1;
	Object.defineProperty(fs$1, "__esModule", { value: true });
	fs$1.createDirentFromStats = void 0;
	class DirentFromStats {
	    constructor(name, stats) {
	        this.name = name;
	        this.isBlockDevice = stats.isBlockDevice.bind(stats);
	        this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
	        this.isDirectory = stats.isDirectory.bind(stats);
	        this.isFIFO = stats.isFIFO.bind(stats);
	        this.isFile = stats.isFile.bind(stats);
	        this.isSocket = stats.isSocket.bind(stats);
	        this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
	    }
	}
	function createDirentFromStats(name, stats) {
	    return new DirentFromStats(name, stats);
	}
	fs$1.createDirentFromStats = createDirentFromStats;
	return fs$1;
}

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	Object.defineProperty(utils, "__esModule", { value: true });
	utils.fs = void 0;
	const fs = requireFs$1();
	utils.fs = fs;
	return utils;
}

var common$1 = {};

var hasRequiredCommon$1;

function requireCommon$1 () {
	if (hasRequiredCommon$1) return common$1;
	hasRequiredCommon$1 = 1;
	Object.defineProperty(common$1, "__esModule", { value: true });
	common$1.joinPathSegments = void 0;
	function joinPathSegments(a, b, separator) {
	    /**
	     * The correct handling of cases when the first segment is a root (`/`, `C:/`) or UNC path (`//?/C:/`).
	     */
	    if (a.endsWith(separator)) {
	        return a + b;
	    }
	    return a + separator + b;
	}
	common$1.joinPathSegments = joinPathSegments;
	return common$1;
}

var hasRequiredAsync$4;

function requireAsync$4 () {
	if (hasRequiredAsync$4) return async$2;
	hasRequiredAsync$4 = 1;
	Object.defineProperty(async$2, "__esModule", { value: true });
	async$2.readdir = async$2.readdirWithFileTypes = async$2.read = void 0;
	const fsStat = requireOut$3();
	const rpl = requireRunParallel();
	const constants_1 = requireConstants();
	const utils = requireUtils();
	const common = requireCommon$1();
	function read(directory, settings, callback) {
	    if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
	        readdirWithFileTypes(directory, settings, callback);
	        return;
	    }
	    readdir(directory, settings, callback);
	}
	async$2.read = read;
	function readdirWithFileTypes(directory, settings, callback) {
	    settings.fs.readdir(directory, { withFileTypes: true }, (readdirError, dirents) => {
	        if (readdirError !== null) {
	            callFailureCallback(callback, readdirError);
	            return;
	        }
	        const entries = dirents.map((dirent) => ({
	            dirent,
	            name: dirent.name,
	            path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
	        }));
	        if (!settings.followSymbolicLinks) {
	            callSuccessCallback(callback, entries);
	            return;
	        }
	        const tasks = entries.map((entry) => makeRplTaskEntry(entry, settings));
	        rpl(tasks, (rplError, rplEntries) => {
	            if (rplError !== null) {
	                callFailureCallback(callback, rplError);
	                return;
	            }
	            callSuccessCallback(callback, rplEntries);
	        });
	    });
	}
	async$2.readdirWithFileTypes = readdirWithFileTypes;
	function makeRplTaskEntry(entry, settings) {
	    return (done) => {
	        if (!entry.dirent.isSymbolicLink()) {
	            done(null, entry);
	            return;
	        }
	        settings.fs.stat(entry.path, (statError, stats) => {
	            if (statError !== null) {
	                if (settings.throwErrorOnBrokenSymbolicLink) {
	                    done(statError);
	                    return;
	                }
	                done(null, entry);
	                return;
	            }
	            entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
	            done(null, entry);
	        });
	    };
	}
	function readdir(directory, settings, callback) {
	    settings.fs.readdir(directory, (readdirError, names) => {
	        if (readdirError !== null) {
	            callFailureCallback(callback, readdirError);
	            return;
	        }
	        const tasks = names.map((name) => {
	            const path = common.joinPathSegments(directory, name, settings.pathSegmentSeparator);
	            return (done) => {
	                fsStat.stat(path, settings.fsStatSettings, (error, stats) => {
	                    if (error !== null) {
	                        done(error);
	                        return;
	                    }
	                    const entry = {
	                        name,
	                        path,
	                        dirent: utils.fs.createDirentFromStats(name, stats)
	                    };
	                    if (settings.stats) {
	                        entry.stats = stats;
	                    }
	                    done(null, entry);
	                });
	            };
	        });
	        rpl(tasks, (rplError, entries) => {
	            if (rplError !== null) {
	                callFailureCallback(callback, rplError);
	                return;
	            }
	            callSuccessCallback(callback, entries);
	        });
	    });
	}
	async$2.readdir = readdir;
	function callFailureCallback(callback, error) {
	    callback(error);
	}
	function callSuccessCallback(callback, result) {
	    callback(null, result);
	}
	return async$2;
}

var sync$4 = {};

var hasRequiredSync$4;

function requireSync$4 () {
	if (hasRequiredSync$4) return sync$4;
	hasRequiredSync$4 = 1;
	Object.defineProperty(sync$4, "__esModule", { value: true });
	sync$4.readdir = sync$4.readdirWithFileTypes = sync$4.read = void 0;
	const fsStat = requireOut$3();
	const constants_1 = requireConstants();
	const utils = requireUtils();
	const common = requireCommon$1();
	function read(directory, settings) {
	    if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
	        return readdirWithFileTypes(directory, settings);
	    }
	    return readdir(directory, settings);
	}
	sync$4.read = read;
	function readdirWithFileTypes(directory, settings) {
	    const dirents = settings.fs.readdirSync(directory, { withFileTypes: true });
	    return dirents.map((dirent) => {
	        const entry = {
	            dirent,
	            name: dirent.name,
	            path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
	        };
	        if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) {
	            try {
	                const stats = settings.fs.statSync(entry.path);
	                entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
	            }
	            catch (error) {
	                if (settings.throwErrorOnBrokenSymbolicLink) {
	                    throw error;
	                }
	            }
	        }
	        return entry;
	    });
	}
	sync$4.readdirWithFileTypes = readdirWithFileTypes;
	function readdir(directory, settings) {
	    const names = settings.fs.readdirSync(directory);
	    return names.map((name) => {
	        const entryPath = common.joinPathSegments(directory, name, settings.pathSegmentSeparator);
	        const stats = fsStat.statSync(entryPath, settings.fsStatSettings);
	        const entry = {
	            name,
	            path: entryPath,
	            dirent: utils.fs.createDirentFromStats(name, stats)
	        };
	        if (settings.stats) {
	            entry.stats = stats;
	        }
	        return entry;
	    });
	}
	sync$4.readdir = readdir;
	return sync$4;
}

var settings$2 = {};

var fs = {};

var hasRequiredFs;

function requireFs () {
	if (hasRequiredFs) return fs;
	hasRequiredFs = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
		const fs = require$$1$1;
		exports.FILE_SYSTEM_ADAPTER = {
		    lstat: fs.lstat,
		    stat: fs.stat,
		    lstatSync: fs.lstatSync,
		    statSync: fs.statSync,
		    readdir: fs.readdir,
		    readdirSync: fs.readdirSync
		};
		function createFileSystemAdapter(fsMethods) {
		    if (fsMethods === undefined) {
		        return exports.FILE_SYSTEM_ADAPTER;
		    }
		    return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
		}
		exports.createFileSystemAdapter = createFileSystemAdapter; 
	} (fs));
	return fs;
}

var hasRequiredSettings$2;

function requireSettings$2 () {
	if (hasRequiredSettings$2) return settings$2;
	hasRequiredSettings$2 = 1;
	Object.defineProperty(settings$2, "__esModule", { value: true });
	const path = require$$1$1;
	const fsStat = requireOut$3();
	const fs = requireFs();
	class Settings {
	    constructor(_options = {}) {
	        this._options = _options;
	        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, false);
	        this.fs = fs.createFileSystemAdapter(this._options.fs);
	        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep);
	        this.stats = this._getValue(this._options.stats, false);
	        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
	        this.fsStatSettings = new fsStat.Settings({
	            followSymbolicLink: this.followSymbolicLinks,
	            fs: this.fs,
	            throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink
	        });
	    }
	    _getValue(option, value) {
	        return option !== null && option !== void 0 ? option : value;
	    }
	}
	settings$2.default = Settings;
	return settings$2;
}

var hasRequiredOut$2;

function requireOut$2 () {
	if (hasRequiredOut$2) return out$2;
	hasRequiredOut$2 = 1;
	Object.defineProperty(out$2, "__esModule", { value: true });
	out$2.Settings = out$2.scandirSync = out$2.scandir = void 0;
	const async = requireAsync$4();
	const sync = requireSync$4();
	const settings_1 = requireSettings$2();
	out$2.Settings = settings_1.default;
	function scandir(path, optionsOrSettingsOrCallback, callback) {
	    if (typeof optionsOrSettingsOrCallback === 'function') {
	        async.read(path, getSettings(), optionsOrSettingsOrCallback);
	        return;
	    }
	    async.read(path, getSettings(optionsOrSettingsOrCallback), callback);
	}
	out$2.scandir = scandir;
	function scandirSync(path, optionsOrSettings) {
	    const settings = getSettings(optionsOrSettings);
	    return sync.read(path, settings);
	}
	out$2.scandirSync = scandirSync;
	function getSettings(settingsOrOptions = {}) {
	    if (settingsOrOptions instanceof settings_1.default) {
	        return settingsOrOptions;
	    }
	    return new settings_1.default(settingsOrOptions);
	}
	return out$2;
}

var queue$2 = {exports: {}};

var reusify_1;
var hasRequiredReusify;

function requireReusify () {
	if (hasRequiredReusify) return reusify_1;
	hasRequiredReusify = 1;

	function reusify (Constructor) {
	  var head = new Constructor();
	  var tail = head;

	  function get () {
	    var current = head;

	    if (current.next) {
	      head = current.next;
	    } else {
	      head = new Constructor();
	      tail = head;
	    }

	    current.next = null;

	    return current
	  }

	  function release (obj) {
	    tail.next = obj;
	    tail = obj;
	  }

	  return {
	    get: get,
	    release: release
	  }
	}

	reusify_1 = reusify;
	return reusify_1;
}

var hasRequiredQueue;

function requireQueue () {
	if (hasRequiredQueue) return queue$2.exports;
	hasRequiredQueue = 1;

	/* eslint-disable no-var */

	var reusify = requireReusify();

	function fastqueue (context, worker, _concurrency) {
	  if (typeof context === 'function') {
	    _concurrency = worker;
	    worker = context;
	    context = null;
	  }

	  if (!(_concurrency >= 1)) {
	    throw new Error('fastqueue concurrency must be equal to or greater than 1')
	  }

	  var cache = reusify(Task);
	  var queueHead = null;
	  var queueTail = null;
	  var _running = 0;
	  var errorHandler = null;

	  var self = {
	    push: push,
	    drain: noop,
	    saturated: noop,
	    pause: pause,
	    paused: false,

	    get concurrency () {
	      return _concurrency
	    },
	    set concurrency (value) {
	      if (!(value >= 1)) {
	        throw new Error('fastqueue concurrency must be equal to or greater than 1')
	      }
	      _concurrency = value;

	      if (self.paused) return
	      for (; queueHead && _running < _concurrency;) {
	        _running++;
	        release();
	      }
	    },

	    running: running,
	    resume: resume,
	    idle: idle,
	    length: length,
	    getQueue: getQueue,
	    unshift: unshift,
	    empty: noop,
	    kill: kill,
	    killAndDrain: killAndDrain,
	    error: error
	  };

	  return self

	  function running () {
	    return _running
	  }

	  function pause () {
	    self.paused = true;
	  }

	  function length () {
	    var current = queueHead;
	    var counter = 0;

	    while (current) {
	      current = current.next;
	      counter++;
	    }

	    return counter
	  }

	  function getQueue () {
	    var current = queueHead;
	    var tasks = [];

	    while (current) {
	      tasks.push(current.value);
	      current = current.next;
	    }

	    return tasks
	  }

	  function resume () {
	    if (!self.paused) return
	    self.paused = false;
	    if (queueHead === null) {
	      _running++;
	      release();
	      return
	    }
	    for (; queueHead && _running < _concurrency;) {
	      _running++;
	      release();
	    }
	  }

	  function idle () {
	    return _running === 0 && self.length() === 0
	  }

	  function push (value, done) {
	    var current = cache.get();

	    current.context = context;
	    current.release = release;
	    current.value = value;
	    current.callback = done || noop;
	    current.errorHandler = errorHandler;

	    if (_running >= _concurrency || self.paused) {
	      if (queueTail) {
	        queueTail.next = current;
	        queueTail = current;
	      } else {
	        queueHead = current;
	        queueTail = current;
	        self.saturated();
	      }
	    } else {
	      _running++;
	      worker.call(context, current.value, current.worked);
	    }
	  }

	  function unshift (value, done) {
	    var current = cache.get();

	    current.context = context;
	    current.release = release;
	    current.value = value;
	    current.callback = done || noop;
	    current.errorHandler = errorHandler;

	    if (_running >= _concurrency || self.paused) {
	      if (queueHead) {
	        current.next = queueHead;
	        queueHead = current;
	      } else {
	        queueHead = current;
	        queueTail = current;
	        self.saturated();
	      }
	    } else {
	      _running++;
	      worker.call(context, current.value, current.worked);
	    }
	  }

	  function release (holder) {
	    if (holder) {
	      cache.release(holder);
	    }
	    var next = queueHead;
	    if (next && _running <= _concurrency) {
	      if (!self.paused) {
	        if (queueTail === queueHead) {
	          queueTail = null;
	        }
	        queueHead = next.next;
	        next.next = null;
	        worker.call(context, next.value, next.worked);
	        if (queueTail === null) {
	          self.empty();
	        }
	      } else {
	        _running--;
	      }
	    } else if (--_running === 0) {
	      self.drain();
	    }
	  }

	  function kill () {
	    queueHead = null;
	    queueTail = null;
	    self.drain = noop;
	  }

	  function killAndDrain () {
	    queueHead = null;
	    queueTail = null;
	    self.drain();
	    self.drain = noop;
	  }

	  function error (handler) {
	    errorHandler = handler;
	  }
	}

	function noop () {}

	function Task () {
	  this.value = null;
	  this.callback = noop;
	  this.next = null;
	  this.release = noop;
	  this.context = null;
	  this.errorHandler = null;

	  var self = this;

	  this.worked = function worked (err, result) {
	    var callback = self.callback;
	    var errorHandler = self.errorHandler;
	    var val = self.value;
	    self.value = null;
	    self.callback = noop;
	    if (self.errorHandler) {
	      errorHandler(err, val);
	    }
	    callback.call(self.context, err, result);
	    self.release(self);
	  };
	}

	function queueAsPromised (context, worker, _concurrency) {
	  if (typeof context === 'function') {
	    _concurrency = worker;
	    worker = context;
	    context = null;
	  }

	  function asyncWrapper (arg, cb) {
	    worker.call(this, arg)
	      .then(function (res) {
	        cb(null, res);
	      }, cb);
	  }

	  var queue = fastqueue(context, asyncWrapper, _concurrency);

	  var pushCb = queue.push;
	  var unshiftCb = queue.unshift;

	  queue.push = push;
	  queue.unshift = unshift;
	  queue.drained = drained;

	  return queue

	  function push (value) {
	    var p = new Promise(function (resolve, reject) {
	      pushCb(value, function (err, result) {
	        if (err) {
	          reject(err);
	          return
	        }
	        resolve(result);
	      });
	    });

	    // Let's fork the promise chain to
	    // make the error bubble up to the user but
	    // not lead to a unhandledRejection
	    p.catch(noop);

	    return p
	  }

	  function unshift (value) {
	    var p = new Promise(function (resolve, reject) {
	      unshiftCb(value, function (err, result) {
	        if (err) {
	          reject(err);
	          return
	        }
	        resolve(result);
	      });
	    });

	    // Let's fork the promise chain to
	    // make the error bubble up to the user but
	    // not lead to a unhandledRejection
	    p.catch(noop);

	    return p
	  }

	  function drained () {
	    var p = new Promise(function (resolve) {
	      process.nextTick(function () {
	        if (queue.idle()) {
	          resolve();
	        } else {
	          var previousDrain = queue.drain;
	          queue.drain = function () {
	            if (typeof previousDrain === 'function') previousDrain();
	            resolve();
	            queue.drain = previousDrain;
	          };
	        }
	      });
	    });

	    return p
	  }
	}

	queue$2.exports = fastqueue;
	queue$2.exports.promise = queueAsPromised;
	return queue$2.exports;
}

var common = {};

var hasRequiredCommon;

function requireCommon () {
	if (hasRequiredCommon) return common;
	hasRequiredCommon = 1;
	Object.defineProperty(common, "__esModule", { value: true });
	common.joinPathSegments = common.replacePathSegmentSeparator = common.isAppliedFilter = common.isFatalError = void 0;
	function isFatalError(settings, error) {
	    if (settings.errorFilter === null) {
	        return true;
	    }
	    return !settings.errorFilter(error);
	}
	common.isFatalError = isFatalError;
	function isAppliedFilter(filter, value) {
	    return filter === null || filter(value);
	}
	common.isAppliedFilter = isAppliedFilter;
	function replacePathSegmentSeparator(filepath, separator) {
	    return filepath.split(/[/\\]/).join(separator);
	}
	common.replacePathSegmentSeparator = replacePathSegmentSeparator;
	function joinPathSegments(a, b, separator) {
	    if (a === '') {
	        return b;
	    }
	    /**
	     * The correct handling of cases when the first segment is a root (`/`, `C:/`) or UNC path (`//?/C:/`).
	     */
	    if (a.endsWith(separator)) {
	        return a + b;
	    }
	    return a + separator + b;
	}
	common.joinPathSegments = joinPathSegments;
	return common;
}

var reader$1 = {};

var hasRequiredReader$1;

function requireReader$1 () {
	if (hasRequiredReader$1) return reader$1;
	hasRequiredReader$1 = 1;
	Object.defineProperty(reader$1, "__esModule", { value: true });
	const common = requireCommon();
	class Reader {
	    constructor(_root, _settings) {
	        this._root = _root;
	        this._settings = _settings;
	        this._root = common.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator);
	    }
	}
	reader$1.default = Reader;
	return reader$1;
}

var hasRequiredAsync$3;

function requireAsync$3 () {
	if (hasRequiredAsync$3) return async$3;
	hasRequiredAsync$3 = 1;
	Object.defineProperty(async$3, "__esModule", { value: true });
	const events_1 = require$$1$1;
	const fsScandir = requireOut$2();
	const fastq = requireQueue();
	const common = requireCommon();
	const reader_1 = requireReader$1();
	class AsyncReader extends reader_1.default {
	    constructor(_root, _settings) {
	        super(_root, _settings);
	        this._settings = _settings;
	        this._scandir = fsScandir.scandir;
	        this._emitter = new events_1.EventEmitter();
	        this._queue = fastq(this._worker.bind(this), this._settings.concurrency);
	        this._isFatalError = false;
	        this._isDestroyed = false;
	        this._queue.drain = () => {
	            if (!this._isFatalError) {
	                this._emitter.emit('end');
	            }
	        };
	    }
	    read() {
	        this._isFatalError = false;
	        this._isDestroyed = false;
	        setImmediate(() => {
	            this._pushToQueue(this._root, this._settings.basePath);
	        });
	        return this._emitter;
	    }
	    get isDestroyed() {
	        return this._isDestroyed;
	    }
	    destroy() {
	        if (this._isDestroyed) {
	            throw new Error('The reader is already destroyed');
	        }
	        this._isDestroyed = true;
	        this._queue.killAndDrain();
	    }
	    onEntry(callback) {
	        this._emitter.on('entry', callback);
	    }
	    onError(callback) {
	        this._emitter.once('error', callback);
	    }
	    onEnd(callback) {
	        this._emitter.once('end', callback);
	    }
	    _pushToQueue(directory, base) {
	        const queueItem = { directory, base };
	        this._queue.push(queueItem, (error) => {
	            if (error !== null) {
	                this._handleError(error);
	            }
	        });
	    }
	    _worker(item, done) {
	        this._scandir(item.directory, this._settings.fsScandirSettings, (error, entries) => {
	            if (error !== null) {
	                done(error, undefined);
	                return;
	            }
	            for (const entry of entries) {
	                this._handleEntry(entry, item.base);
	            }
	            done(null, undefined);
	        });
	    }
	    _handleError(error) {
	        if (this._isDestroyed || !common.isFatalError(this._settings, error)) {
	            return;
	        }
	        this._isFatalError = true;
	        this._isDestroyed = true;
	        this._emitter.emit('error', error);
	    }
	    _handleEntry(entry, base) {
	        if (this._isDestroyed || this._isFatalError) {
	            return;
	        }
	        const fullpath = entry.path;
	        if (base !== undefined) {
	            entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
	        }
	        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
	            this._emitEntry(entry);
	        }
	        if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
	            this._pushToQueue(fullpath, base === undefined ? undefined : entry.path);
	        }
	    }
	    _emitEntry(entry) {
	        this._emitter.emit('entry', entry);
	    }
	}
	async$3.default = AsyncReader;
	return async$3;
}

var hasRequiredAsync$2;

function requireAsync$2 () {
	if (hasRequiredAsync$2) return async$4;
	hasRequiredAsync$2 = 1;
	Object.defineProperty(async$4, "__esModule", { value: true });
	const async_1 = requireAsync$3();
	class AsyncProvider {
	    constructor(_root, _settings) {
	        this._root = _root;
	        this._settings = _settings;
	        this._reader = new async_1.default(this._root, this._settings);
	        this._storage = [];
	    }
	    read(callback) {
	        this._reader.onError((error) => {
	            callFailureCallback(callback, error);
	        });
	        this._reader.onEntry((entry) => {
	            this._storage.push(entry);
	        });
	        this._reader.onEnd(() => {
	            callSuccessCallback(callback, this._storage);
	        });
	        this._reader.read();
	    }
	}
	async$4.default = AsyncProvider;
	function callFailureCallback(callback, error) {
	    callback(error);
	}
	function callSuccessCallback(callback, entries) {
	    callback(null, entries);
	}
	return async$4;
}

var stream$2 = {};

var hasRequiredStream$2;

function requireStream$2 () {
	if (hasRequiredStream$2) return stream$2;
	hasRequiredStream$2 = 1;
	Object.defineProperty(stream$2, "__esModule", { value: true });
	const stream_1 = require$$1$1;
	const async_1 = requireAsync$3();
	class StreamProvider {
	    constructor(_root, _settings) {
	        this._root = _root;
	        this._settings = _settings;
	        this._reader = new async_1.default(this._root, this._settings);
	        this._stream = new stream_1.Readable({
	            objectMode: true,
	            read: () => { },
	            destroy: () => {
	                if (!this._reader.isDestroyed) {
	                    this._reader.destroy();
	                }
	            }
	        });
	    }
	    read() {
	        this._reader.onError((error) => {
	            this._stream.emit('error', error);
	        });
	        this._reader.onEntry((entry) => {
	            this._stream.push(entry);
	        });
	        this._reader.onEnd(() => {
	            this._stream.push(null);
	        });
	        this._reader.read();
	        return this._stream;
	    }
	}
	stream$2.default = StreamProvider;
	return stream$2;
}

var sync$3 = {};

var sync$2 = {};

var hasRequiredSync$3;

function requireSync$3 () {
	if (hasRequiredSync$3) return sync$2;
	hasRequiredSync$3 = 1;
	Object.defineProperty(sync$2, "__esModule", { value: true });
	const fsScandir = requireOut$2();
	const common = requireCommon();
	const reader_1 = requireReader$1();
	class SyncReader extends reader_1.default {
	    constructor() {
	        super(...arguments);
	        this._scandir = fsScandir.scandirSync;
	        this._storage = [];
	        this._queue = new Set();
	    }
	    read() {
	        this._pushToQueue(this._root, this._settings.basePath);
	        this._handleQueue();
	        return this._storage;
	    }
	    _pushToQueue(directory, base) {
	        this._queue.add({ directory, base });
	    }
	    _handleQueue() {
	        for (const item of this._queue.values()) {
	            this._handleDirectory(item.directory, item.base);
	        }
	    }
	    _handleDirectory(directory, base) {
	        try {
	            const entries = this._scandir(directory, this._settings.fsScandirSettings);
	            for (const entry of entries) {
	                this._handleEntry(entry, base);
	            }
	        }
	        catch (error) {
	            this._handleError(error);
	        }
	    }
	    _handleError(error) {
	        if (!common.isFatalError(this._settings, error)) {
	            return;
	        }
	        throw error;
	    }
	    _handleEntry(entry, base) {
	        const fullpath = entry.path;
	        if (base !== undefined) {
	            entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
	        }
	        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
	            this._pushToStorage(entry);
	        }
	        if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
	            this._pushToQueue(fullpath, base === undefined ? undefined : entry.path);
	        }
	    }
	    _pushToStorage(entry) {
	        this._storage.push(entry);
	    }
	}
	sync$2.default = SyncReader;
	return sync$2;
}

var hasRequiredSync$2;

function requireSync$2 () {
	if (hasRequiredSync$2) return sync$3;
	hasRequiredSync$2 = 1;
	Object.defineProperty(sync$3, "__esModule", { value: true });
	const sync_1 = requireSync$3();
	class SyncProvider {
	    constructor(_root, _settings) {
	        this._root = _root;
	        this._settings = _settings;
	        this._reader = new sync_1.default(this._root, this._settings);
	    }
	    read() {
	        return this._reader.read();
	    }
	}
	sync$3.default = SyncProvider;
	return sync$3;
}

var settings$1 = {};

var hasRequiredSettings$1;

function requireSettings$1 () {
	if (hasRequiredSettings$1) return settings$1;
	hasRequiredSettings$1 = 1;
	Object.defineProperty(settings$1, "__esModule", { value: true });
	const path = require$$1$1;
	const fsScandir = requireOut$2();
	class Settings {
	    constructor(_options = {}) {
	        this._options = _options;
	        this.basePath = this._getValue(this._options.basePath, undefined);
	        this.concurrency = this._getValue(this._options.concurrency, Number.POSITIVE_INFINITY);
	        this.deepFilter = this._getValue(this._options.deepFilter, null);
	        this.entryFilter = this._getValue(this._options.entryFilter, null);
	        this.errorFilter = this._getValue(this._options.errorFilter, null);
	        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep);
	        this.fsScandirSettings = new fsScandir.Settings({
	            followSymbolicLinks: this._options.followSymbolicLinks,
	            fs: this._options.fs,
	            pathSegmentSeparator: this._options.pathSegmentSeparator,
	            stats: this._options.stats,
	            throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink
	        });
	    }
	    _getValue(option, value) {
	        return option !== null && option !== void 0 ? option : value;
	    }
	}
	settings$1.default = Settings;
	return settings$1;
}

var hasRequiredOut$1;

function requireOut$1 () {
	if (hasRequiredOut$1) return out$3;
	hasRequiredOut$1 = 1;
	Object.defineProperty(out$3, "__esModule", { value: true });
	out$3.Settings = out$3.walkStream = out$3.walkSync = out$3.walk = void 0;
	const async_1 = requireAsync$2();
	const stream_1 = requireStream$2();
	const sync_1 = requireSync$2();
	const settings_1 = requireSettings$1();
	out$3.Settings = settings_1.default;
	function walk(directory, optionsOrSettingsOrCallback, callback) {
	    if (typeof optionsOrSettingsOrCallback === 'function') {
	        new async_1.default(directory, getSettings()).read(optionsOrSettingsOrCallback);
	        return;
	    }
	    new async_1.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback);
	}
	out$3.walk = walk;
	function walkSync(directory, optionsOrSettings) {
	    const settings = getSettings(optionsOrSettings);
	    const provider = new sync_1.default(directory, settings);
	    return provider.read();
	}
	out$3.walkSync = walkSync;
	function walkStream(directory, optionsOrSettings) {
	    const settings = getSettings(optionsOrSettings);
	    const provider = new stream_1.default(directory, settings);
	    return provider.read();
	}
	out$3.walkStream = walkStream;
	function getSettings(settingsOrOptions = {}) {
	    if (settingsOrOptions instanceof settings_1.default) {
	        return settingsOrOptions;
	    }
	    return new settings_1.default(settingsOrOptions);
	}
	return out$3;
}

var reader = {};

var hasRequiredReader;

function requireReader () {
	if (hasRequiredReader) return reader;
	hasRequiredReader = 1;
	Object.defineProperty(reader, "__esModule", { value: true });
	const path = require$$1$1;
	const fsStat = requireOut$3();
	const utils = requireUtils$1();
	class Reader {
	    constructor(_settings) {
	        this._settings = _settings;
	        this._fsStatSettings = new fsStat.Settings({
	            followSymbolicLink: this._settings.followSymbolicLinks,
	            fs: this._settings.fs,
	            throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks
	        });
	    }
	    _getFullEntryPath(filepath) {
	        return path.resolve(this._settings.cwd, filepath);
	    }
	    _makeEntry(stats, pattern) {
	        const entry = {
	            name: pattern,
	            path: pattern,
	            dirent: utils.fs.createDirentFromStats(pattern, stats)
	        };
	        if (this._settings.stats) {
	            entry.stats = stats;
	        }
	        return entry;
	    }
	    _isFatalError(error) {
	        return !utils.errno.isEnoentCodeError(error) && !this._settings.suppressErrors;
	    }
	}
	reader.default = Reader;
	return reader;
}

var stream$1 = {};

var hasRequiredStream$1;

function requireStream$1 () {
	if (hasRequiredStream$1) return stream$1;
	hasRequiredStream$1 = 1;
	Object.defineProperty(stream$1, "__esModule", { value: true });
	const stream_1 = require$$1$1;
	const fsStat = requireOut$3();
	const fsWalk = requireOut$1();
	const reader_1 = requireReader();
	class ReaderStream extends reader_1.default {
	    constructor() {
	        super(...arguments);
	        this._walkStream = fsWalk.walkStream;
	        this._stat = fsStat.stat;
	    }
	    dynamic(root, options) {
	        return this._walkStream(root, options);
	    }
	    static(patterns, options) {
	        const filepaths = patterns.map(this._getFullEntryPath, this);
	        const stream = new stream_1.PassThrough({ objectMode: true });
	        stream._write = (index, _enc, done) => {
	            return this._getEntry(filepaths[index], patterns[index], options)
	                .then((entry) => {
	                if (entry !== null && options.entryFilter(entry)) {
	                    stream.push(entry);
	                }
	                if (index === filepaths.length - 1) {
	                    stream.end();
	                }
	                done();
	            })
	                .catch(done);
	        };
	        for (let i = 0; i < filepaths.length; i++) {
	            stream.write(i);
	        }
	        return stream;
	    }
	    _getEntry(filepath, pattern, options) {
	        return this._getStat(filepath)
	            .then((stats) => this._makeEntry(stats, pattern))
	            .catch((error) => {
	            if (options.errorFilter(error)) {
	                return null;
	            }
	            throw error;
	        });
	    }
	    _getStat(filepath) {
	        return new Promise((resolve, reject) => {
	            this._stat(filepath, this._fsStatSettings, (error, stats) => {
	                return error === null ? resolve(stats) : reject(error);
	            });
	        });
	    }
	}
	stream$1.default = ReaderStream;
	return stream$1;
}

var hasRequiredAsync$1;

function requireAsync$1 () {
	if (hasRequiredAsync$1) return async$5;
	hasRequiredAsync$1 = 1;
	Object.defineProperty(async$5, "__esModule", { value: true });
	const fsWalk = requireOut$1();
	const reader_1 = requireReader();
	const stream_1 = requireStream$1();
	class ReaderAsync extends reader_1.default {
	    constructor() {
	        super(...arguments);
	        this._walkAsync = fsWalk.walk;
	        this._readerStream = new stream_1.default(this._settings);
	    }
	    dynamic(root, options) {
	        return new Promise((resolve, reject) => {
	            this._walkAsync(root, options, (error, entries) => {
	                if (error === null) {
	                    resolve(entries);
	                }
	                else {
	                    reject(error);
	                }
	            });
	        });
	    }
	    async static(patterns, options) {
	        const entries = [];
	        const stream = this._readerStream.static(patterns, options);
	        // After #235, replace it with an asynchronous iterator.
	        return new Promise((resolve, reject) => {
	            stream.once('error', reject);
	            stream.on('data', (entry) => entries.push(entry));
	            stream.once('end', () => resolve(entries));
	        });
	    }
	}
	async$5.default = ReaderAsync;
	return async$5;
}

var provider = {};

var deep = {};

var partial = {};

var matcher = {};

var hasRequiredMatcher;

function requireMatcher () {
	if (hasRequiredMatcher) return matcher;
	hasRequiredMatcher = 1;
	Object.defineProperty(matcher, "__esModule", { value: true });
	const utils = requireUtils$1();
	class Matcher {
	    constructor(_patterns, _settings, _micromatchOptions) {
	        this._patterns = _patterns;
	        this._settings = _settings;
	        this._micromatchOptions = _micromatchOptions;
	        this._storage = [];
	        this._fillStorage();
	    }
	    _fillStorage() {
	        for (const pattern of this._patterns) {
	            const segments = this._getPatternSegments(pattern);
	            const sections = this._splitSegmentsIntoSections(segments);
	            this._storage.push({
	                complete: sections.length <= 1,
	                pattern,
	                segments,
	                sections
	            });
	        }
	    }
	    _getPatternSegments(pattern) {
	        const parts = utils.pattern.getPatternParts(pattern, this._micromatchOptions);
	        return parts.map((part) => {
	            const dynamic = utils.pattern.isDynamicPattern(part, this._settings);
	            if (!dynamic) {
	                return {
	                    dynamic: false,
	                    pattern: part
	                };
	            }
	            return {
	                dynamic: true,
	                pattern: part,
	                patternRe: utils.pattern.makeRe(part, this._micromatchOptions)
	            };
	        });
	    }
	    _splitSegmentsIntoSections(segments) {
	        return utils.array.splitWhen(segments, (segment) => segment.dynamic && utils.pattern.hasGlobStar(segment.pattern));
	    }
	}
	matcher.default = Matcher;
	return matcher;
}

var hasRequiredPartial;

function requirePartial () {
	if (hasRequiredPartial) return partial;
	hasRequiredPartial = 1;
	Object.defineProperty(partial, "__esModule", { value: true });
	const matcher_1 = requireMatcher();
	class PartialMatcher extends matcher_1.default {
	    match(filepath) {
	        const parts = filepath.split('/');
	        const levels = parts.length;
	        const patterns = this._storage.filter((info) => !info.complete || info.segments.length > levels);
	        for (const pattern of patterns) {
	            const section = pattern.sections[0];
	            /**
	             * In this case, the pattern has a globstar and we must read all directories unconditionally,
	             * but only if the level has reached the end of the first group.
	             *
	             * fixtures/{a,b}/**
	             *  ^ true/false  ^ always true
	            */
	            if (!pattern.complete && levels > section.length) {
	                return true;
	            }
	            const match = parts.every((part, index) => {
	                const segment = pattern.segments[index];
	                if (segment.dynamic && segment.patternRe.test(part)) {
	                    return true;
	                }
	                if (!segment.dynamic && segment.pattern === part) {
	                    return true;
	                }
	                return false;
	            });
	            if (match) {
	                return true;
	            }
	        }
	        return false;
	    }
	}
	partial.default = PartialMatcher;
	return partial;
}

var hasRequiredDeep;

function requireDeep () {
	if (hasRequiredDeep) return deep;
	hasRequiredDeep = 1;
	Object.defineProperty(deep, "__esModule", { value: true });
	const utils = requireUtils$1();
	const partial_1 = requirePartial();
	class DeepFilter {
	    constructor(_settings, _micromatchOptions) {
	        this._settings = _settings;
	        this._micromatchOptions = _micromatchOptions;
	    }
	    getFilter(basePath, positive, negative) {
	        const matcher = this._getMatcher(positive);
	        const negativeRe = this._getNegativePatternsRe(negative);
	        return (entry) => this._filter(basePath, entry, matcher, negativeRe);
	    }
	    _getMatcher(patterns) {
	        return new partial_1.default(patterns, this._settings, this._micromatchOptions);
	    }
	    _getNegativePatternsRe(patterns) {
	        const affectDepthOfReadingPatterns = patterns.filter(utils.pattern.isAffectDepthOfReadingPattern);
	        return utils.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this._micromatchOptions);
	    }
	    _filter(basePath, entry, matcher, negativeRe) {
	        if (this._isSkippedByDeep(basePath, entry.path)) {
	            return false;
	        }
	        if (this._isSkippedSymbolicLink(entry)) {
	            return false;
	        }
	        const filepath = utils.path.removeLeadingDotSegment(entry.path);
	        if (this._isSkippedByPositivePatterns(filepath, matcher)) {
	            return false;
	        }
	        return this._isSkippedByNegativePatterns(filepath, negativeRe);
	    }
	    _isSkippedByDeep(basePath, entryPath) {
	        /**
	         * Avoid unnecessary depth calculations when it doesn't matter.
	         */
	        if (this._settings.deep === Infinity) {
	            return false;
	        }
	        return this._getEntryLevel(basePath, entryPath) >= this._settings.deep;
	    }
	    _getEntryLevel(basePath, entryPath) {
	        const entryPathDepth = entryPath.split('/').length;
	        if (basePath === '') {
	            return entryPathDepth;
	        }
	        const basePathDepth = basePath.split('/').length;
	        return entryPathDepth - basePathDepth;
	    }
	    _isSkippedSymbolicLink(entry) {
	        return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink();
	    }
	    _isSkippedByPositivePatterns(entryPath, matcher) {
	        return !this._settings.baseNameMatch && !matcher.match(entryPath);
	    }
	    _isSkippedByNegativePatterns(entryPath, patternsRe) {
	        return !utils.pattern.matchAny(entryPath, patternsRe);
	    }
	}
	deep.default = DeepFilter;
	return deep;
}

var entry$1 = {};

var hasRequiredEntry$1;

function requireEntry$1 () {
	if (hasRequiredEntry$1) return entry$1;
	hasRequiredEntry$1 = 1;
	Object.defineProperty(entry$1, "__esModule", { value: true });
	const utils = requireUtils$1();
	class EntryFilter {
	    constructor(_settings, _micromatchOptions) {
	        this._settings = _settings;
	        this._micromatchOptions = _micromatchOptions;
	        this.index = new Map();
	    }
	    getFilter(positive, negative) {
	        const [absoluteNegative, relativeNegative] = utils.pattern.partitionAbsoluteAndRelative(negative);
	        const patterns = {
	            positive: {
	                all: utils.pattern.convertPatternsToRe(positive, this._micromatchOptions)
	            },
	            negative: {
	                absolute: utils.pattern.convertPatternsToRe(absoluteNegative, Object.assign(Object.assign({}, this._micromatchOptions), { dot: true })),
	                relative: utils.pattern.convertPatternsToRe(relativeNegative, Object.assign(Object.assign({}, this._micromatchOptions), { dot: true }))
	            }
	        };
	        return (entry) => this._filter(entry, patterns);
	    }
	    _filter(entry, patterns) {
	        const filepath = utils.path.removeLeadingDotSegment(entry.path);
	        if (this._settings.unique && this._isDuplicateEntry(filepath)) {
	            return false;
	        }
	        if (this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry)) {
	            return false;
	        }
	        const isMatched = this._isMatchToPatternsSet(filepath, patterns, entry.dirent.isDirectory());
	        if (this._settings.unique && isMatched) {
	            this._createIndexRecord(filepath);
	        }
	        return isMatched;
	    }
	    _isDuplicateEntry(filepath) {
	        return this.index.has(filepath);
	    }
	    _createIndexRecord(filepath) {
	        this.index.set(filepath, undefined);
	    }
	    _onlyFileFilter(entry) {
	        return this._settings.onlyFiles && !entry.dirent.isFile();
	    }
	    _onlyDirectoryFilter(entry) {
	        return this._settings.onlyDirectories && !entry.dirent.isDirectory();
	    }
	    _isMatchToPatternsSet(filepath, patterns, isDirectory) {
	        const isMatched = this._isMatchToPatterns(filepath, patterns.positive.all, isDirectory);
	        if (!isMatched) {
	            return false;
	        }
	        const isMatchedByRelativeNegative = this._isMatchToPatterns(filepath, patterns.negative.relative, isDirectory);
	        if (isMatchedByRelativeNegative) {
	            return false;
	        }
	        const isMatchedByAbsoluteNegative = this._isMatchToAbsoluteNegative(filepath, patterns.negative.absolute, isDirectory);
	        if (isMatchedByAbsoluteNegative) {
	            return false;
	        }
	        return true;
	    }
	    _isMatchToAbsoluteNegative(filepath, patternsRe, isDirectory) {
	        if (patternsRe.length === 0) {
	            return false;
	        }
	        const fullpath = utils.path.makeAbsolute(this._settings.cwd, filepath);
	        return this._isMatchToPatterns(fullpath, patternsRe, isDirectory);
	    }
	    _isMatchToPatterns(filepath, patternsRe, isDirectory) {
	        if (patternsRe.length === 0) {
	            return false;
	        }
	        // Trying to match files and directories by patterns.
	        const isMatched = utils.pattern.matchAny(filepath, patternsRe);
	        // A pattern with a trailling slash can be used for directory matching.
	        // To apply such pattern, we need to add a tralling slash to the path.
	        if (!isMatched && isDirectory) {
	            return utils.pattern.matchAny(filepath + '/', patternsRe);
	        }
	        return isMatched;
	    }
	}
	entry$1.default = EntryFilter;
	return entry$1;
}

var error = {};

var hasRequiredError;

function requireError () {
	if (hasRequiredError) return error;
	hasRequiredError = 1;
	Object.defineProperty(error, "__esModule", { value: true });
	const utils = requireUtils$1();
	class ErrorFilter {
	    constructor(_settings) {
	        this._settings = _settings;
	    }
	    getFilter() {
	        return (error) => this._isNonFatalError(error);
	    }
	    _isNonFatalError(error) {
	        return utils.errno.isEnoentCodeError(error) || this._settings.suppressErrors;
	    }
	}
	error.default = ErrorFilter;
	return error;
}

var entry = {};

var hasRequiredEntry;

function requireEntry () {
	if (hasRequiredEntry) return entry;
	hasRequiredEntry = 1;
	Object.defineProperty(entry, "__esModule", { value: true });
	const utils = requireUtils$1();
	class EntryTransformer {
	    constructor(_settings) {
	        this._settings = _settings;
	    }
	    getTransformer() {
	        return (entry) => this._transform(entry);
	    }
	    _transform(entry) {
	        let filepath = entry.path;
	        if (this._settings.absolute) {
	            filepath = utils.path.makeAbsolute(this._settings.cwd, filepath);
	            filepath = utils.path.unixify(filepath);
	        }
	        if (this._settings.markDirectories && entry.dirent.isDirectory()) {
	            filepath += '/';
	        }
	        if (!this._settings.objectMode) {
	            return filepath;
	        }
	        return Object.assign(Object.assign({}, entry), { path: filepath });
	    }
	}
	entry.default = EntryTransformer;
	return entry;
}

var hasRequiredProvider;

function requireProvider () {
	if (hasRequiredProvider) return provider;
	hasRequiredProvider = 1;
	Object.defineProperty(provider, "__esModule", { value: true });
	const path = require$$1$1;
	const deep_1 = requireDeep();
	const entry_1 = requireEntry$1();
	const error_1 = requireError();
	const entry_2 = requireEntry();
	class Provider {
	    constructor(_settings) {
	        this._settings = _settings;
	        this.errorFilter = new error_1.default(this._settings);
	        this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions());
	        this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions());
	        this.entryTransformer = new entry_2.default(this._settings);
	    }
	    _getRootDirectory(task) {
	        return path.resolve(this._settings.cwd, task.base);
	    }
	    _getReaderOptions(task) {
	        const basePath = task.base === '.' ? '' : task.base;
	        return {
	            basePath,
	            pathSegmentSeparator: '/',
	            concurrency: this._settings.concurrency,
	            deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
	            entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
	            errorFilter: this.errorFilter.getFilter(),
	            followSymbolicLinks: this._settings.followSymbolicLinks,
	            fs: this._settings.fs,
	            stats: this._settings.stats,
	            throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
	            transform: this.entryTransformer.getTransformer()
	        };
	    }
	    _getMicromatchOptions() {
	        return {
	            dot: this._settings.dot,
	            matchBase: this._settings.baseNameMatch,
	            nobrace: !this._settings.braceExpansion,
	            nocase: !this._settings.caseSensitiveMatch,
	            noext: !this._settings.extglob,
	            noglobstar: !this._settings.globstar,
	            posix: true,
	            strictSlashes: false
	        };
	    }
	}
	provider.default = Provider;
	return provider;
}

var hasRequiredAsync;

function requireAsync () {
	if (hasRequiredAsync) return async$6;
	hasRequiredAsync = 1;
	Object.defineProperty(async$6, "__esModule", { value: true });
	const async_1 = requireAsync$1();
	const provider_1 = requireProvider();
	class ProviderAsync extends provider_1.default {
	    constructor() {
	        super(...arguments);
	        this._reader = new async_1.default(this._settings);
	    }
	    async read(task) {
	        const root = this._getRootDirectory(task);
	        const options = this._getReaderOptions(task);
	        const entries = await this.api(root, task, options);
	        return entries.map((entry) => options.transform(entry));
	    }
	    api(root, task, options) {
	        if (task.dynamic) {
	            return this._reader.dynamic(root, options);
	        }
	        return this._reader.static(task.patterns, options);
	    }
	}
	async$6.default = ProviderAsync;
	return async$6;
}

var stream = {};

var hasRequiredStream;

function requireStream () {
	if (hasRequiredStream) return stream;
	hasRequiredStream = 1;
	Object.defineProperty(stream, "__esModule", { value: true });
	const stream_1 = require$$1$1;
	const stream_2 = requireStream$1();
	const provider_1 = requireProvider();
	class ProviderStream extends provider_1.default {
	    constructor() {
	        super(...arguments);
	        this._reader = new stream_2.default(this._settings);
	    }
	    read(task) {
	        const root = this._getRootDirectory(task);
	        const options = this._getReaderOptions(task);
	        const source = this.api(root, task, options);
	        const destination = new stream_1.Readable({ objectMode: true, read: () => { } });
	        source
	            .once('error', (error) => destination.emit('error', error))
	            .on('data', (entry) => destination.emit('data', options.transform(entry)))
	            .once('end', () => destination.emit('end'));
	        destination
	            .once('close', () => source.destroy());
	        return destination;
	    }
	    api(root, task, options) {
	        if (task.dynamic) {
	            return this._reader.dynamic(root, options);
	        }
	        return this._reader.static(task.patterns, options);
	    }
	}
	stream.default = ProviderStream;
	return stream;
}

var sync$1 = {};

var sync = {};

var hasRequiredSync$1;

function requireSync$1 () {
	if (hasRequiredSync$1) return sync;
	hasRequiredSync$1 = 1;
	Object.defineProperty(sync, "__esModule", { value: true });
	const fsStat = requireOut$3();
	const fsWalk = requireOut$1();
	const reader_1 = requireReader();
	class ReaderSync extends reader_1.default {
	    constructor() {
	        super(...arguments);
	        this._walkSync = fsWalk.walkSync;
	        this._statSync = fsStat.statSync;
	    }
	    dynamic(root, options) {
	        return this._walkSync(root, options);
	    }
	    static(patterns, options) {
	        const entries = [];
	        for (const pattern of patterns) {
	            const filepath = this._getFullEntryPath(pattern);
	            const entry = this._getEntry(filepath, pattern, options);
	            if (entry === null || !options.entryFilter(entry)) {
	                continue;
	            }
	            entries.push(entry);
	        }
	        return entries;
	    }
	    _getEntry(filepath, pattern, options) {
	        try {
	            const stats = this._getStat(filepath);
	            return this._makeEntry(stats, pattern);
	        }
	        catch (error) {
	            if (options.errorFilter(error)) {
	                return null;
	            }
	            throw error;
	        }
	    }
	    _getStat(filepath) {
	        return this._statSync(filepath, this._fsStatSettings);
	    }
	}
	sync.default = ReaderSync;
	return sync;
}

var hasRequiredSync;

function requireSync () {
	if (hasRequiredSync) return sync$1;
	hasRequiredSync = 1;
	Object.defineProperty(sync$1, "__esModule", { value: true });
	const sync_1 = requireSync$1();
	const provider_1 = requireProvider();
	class ProviderSync extends provider_1.default {
	    constructor() {
	        super(...arguments);
	        this._reader = new sync_1.default(this._settings);
	    }
	    read(task) {
	        const root = this._getRootDirectory(task);
	        const options = this._getReaderOptions(task);
	        const entries = this.api(root, task, options);
	        return entries.map(options.transform);
	    }
	    api(root, task, options) {
	        if (task.dynamic) {
	            return this._reader.dynamic(root, options);
	        }
	        return this._reader.static(task.patterns, options);
	    }
	}
	sync$1.default = ProviderSync;
	return sync$1;
}

var settings = {};

var hasRequiredSettings;

function requireSettings () {
	if (hasRequiredSettings) return settings;
	hasRequiredSettings = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.DEFAULT_FILE_SYSTEM_ADAPTER = void 0;
		const fs = require$$1$1;
		const os = require$$1$1;
		/**
		 * The `os.cpus` method can return zero. We expect the number of cores to be greater than zero.
		 * https://github.com/nodejs/node/blob/7faeddf23a98c53896f8b574a6e66589e8fb1eb8/lib/os.js#L106-L107
		 */
		const CPU_COUNT = Math.max(os.cpus().length, 1);
		exports.DEFAULT_FILE_SYSTEM_ADAPTER = {
		    lstat: fs.lstat,
		    lstatSync: fs.lstatSync,
		    stat: fs.stat,
		    statSync: fs.statSync,
		    readdir: fs.readdir,
		    readdirSync: fs.readdirSync
		};
		class Settings {
		    constructor(_options = {}) {
		        this._options = _options;
		        this.absolute = this._getValue(this._options.absolute, false);
		        this.baseNameMatch = this._getValue(this._options.baseNameMatch, false);
		        this.braceExpansion = this._getValue(this._options.braceExpansion, true);
		        this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, true);
		        this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT);
		        this.cwd = this._getValue(this._options.cwd, process.cwd());
		        this.deep = this._getValue(this._options.deep, Infinity);
		        this.dot = this._getValue(this._options.dot, false);
		        this.extglob = this._getValue(this._options.extglob, true);
		        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, true);
		        this.fs = this._getFileSystemMethods(this._options.fs);
		        this.globstar = this._getValue(this._options.globstar, true);
		        this.ignore = this._getValue(this._options.ignore, []);
		        this.markDirectories = this._getValue(this._options.markDirectories, false);
		        this.objectMode = this._getValue(this._options.objectMode, false);
		        this.onlyDirectories = this._getValue(this._options.onlyDirectories, false);
		        this.onlyFiles = this._getValue(this._options.onlyFiles, true);
		        this.stats = this._getValue(this._options.stats, false);
		        this.suppressErrors = this._getValue(this._options.suppressErrors, false);
		        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, false);
		        this.unique = this._getValue(this._options.unique, true);
		        if (this.onlyDirectories) {
		            this.onlyFiles = false;
		        }
		        if (this.stats) {
		            this.objectMode = true;
		        }
		        // Remove the cast to the array in the next major (#404).
		        this.ignore = [].concat(this.ignore);
		    }
		    _getValue(option, value) {
		        return option === undefined ? value : option;
		    }
		    _getFileSystemMethods(methods = {}) {
		        return Object.assign(Object.assign({}, exports.DEFAULT_FILE_SYSTEM_ADAPTER), methods);
		    }
		}
		exports.default = Settings; 
	} (settings));
	return settings;
}

var out;
var hasRequiredOut;

function requireOut () {
	if (hasRequiredOut) return out;
	hasRequiredOut = 1;
	const taskManager = requireTasks();
	const async_1 = requireAsync();
	const stream_1 = requireStream();
	const sync_1 = requireSync();
	const settings_1 = requireSettings();
	const utils = requireUtils$1();
	async function FastGlob(source, options) {
	    assertPatternsInput(source);
	    const works = getWorks(source, async_1.default, options);
	    const result = await Promise.all(works);
	    return utils.array.flatten(result);
	}
	// https://github.com/typescript-eslint/typescript-eslint/issues/60
	// eslint-disable-next-line no-redeclare
	(function (FastGlob) {
	    FastGlob.glob = FastGlob;
	    FastGlob.globSync = sync;
	    FastGlob.globStream = stream;
	    FastGlob.async = FastGlob;
	    function sync(source, options) {
	        assertPatternsInput(source);
	        const works = getWorks(source, sync_1.default, options);
	        return utils.array.flatten(works);
	    }
	    FastGlob.sync = sync;
	    function stream(source, options) {
	        assertPatternsInput(source);
	        const works = getWorks(source, stream_1.default, options);
	        /**
	         * The stream returned by the provider cannot work with an asynchronous iterator.
	         * To support asynchronous iterators, regardless of the number of tasks, we always multiplex streams.
	         * This affects performance (+25%). I don't see best solution right now.
	         */
	        return utils.stream.merge(works);
	    }
	    FastGlob.stream = stream;
	    function generateTasks(source, options) {
	        assertPatternsInput(source);
	        const patterns = [].concat(source);
	        const settings = new settings_1.default(options);
	        return taskManager.generate(patterns, settings);
	    }
	    FastGlob.generateTasks = generateTasks;
	    function isDynamicPattern(source, options) {
	        assertPatternsInput(source);
	        const settings = new settings_1.default(options);
	        return utils.pattern.isDynamicPattern(source, settings);
	    }
	    FastGlob.isDynamicPattern = isDynamicPattern;
	    function escapePath(source) {
	        assertPatternsInput(source);
	        return utils.path.escape(source);
	    }
	    FastGlob.escapePath = escapePath;
	    function convertPathToPattern(source) {
	        assertPatternsInput(source);
	        return utils.path.convertPathToPattern(source);
	    }
	    FastGlob.convertPathToPattern = convertPathToPattern;
	    (function (posix) {
	        function escapePath(source) {
	            assertPatternsInput(source);
	            return utils.path.escapePosixPath(source);
	        }
	        posix.escapePath = escapePath;
	        function convertPathToPattern(source) {
	            assertPatternsInput(source);
	            return utils.path.convertPosixPathToPattern(source);
	        }
	        posix.convertPathToPattern = convertPathToPattern;
	    })(FastGlob.posix || (FastGlob.posix = {}));
	    (function (win32) {
	        function escapePath(source) {
	            assertPatternsInput(source);
	            return utils.path.escapeWindowsPath(source);
	        }
	        win32.escapePath = escapePath;
	        function convertPathToPattern(source) {
	            assertPatternsInput(source);
	            return utils.path.convertWindowsPathToPattern(source);
	        }
	        win32.convertPathToPattern = convertPathToPattern;
	    })(FastGlob.win32 || (FastGlob.win32 = {}));
	})(FastGlob || (FastGlob = {}));
	function getWorks(source, _Provider, options) {
	    const patterns = [].concat(source);
	    const settings = new settings_1.default(options);
	    const tasks = taskManager.generate(patterns, settings);
	    const provider = new _Provider(settings);
	    return tasks.map(provider.read, provider);
	}
	function assertPatternsInput(input) {
	    const source = [].concat(input);
	    const isValidSource = source.every((item) => utils.string.isString(item) && !utils.string.isEmpty(item));
	    if (!isValidSource) {
	        throw new TypeError('Patterns must be a string (non empty) or an array of strings');
	    }
	}
	out = FastGlob;
	return out;
}

var dirGlob = {exports: {}};

var pathType = {};

var hasRequiredPathType;

function requirePathType () {
	if (hasRequiredPathType) return pathType;
	hasRequiredPathType = 1;
	const {promisify} = require$$1$1;
	const fs = require$$1$1;

	async function isType(fsStatType, statsMethodName, filePath) {
		if (typeof filePath !== 'string') {
			throw new TypeError(`Expected a string, got ${typeof filePath}`);
		}

		try {
			const stats = await promisify(fs[fsStatType])(filePath);
			return stats[statsMethodName]();
		} catch (error) {
			if (error.code === 'ENOENT') {
				return false;
			}

			throw error;
		}
	}

	function isTypeSync(fsStatType, statsMethodName, filePath) {
		if (typeof filePath !== 'string') {
			throw new TypeError(`Expected a string, got ${typeof filePath}`);
		}

		try {
			return fs[fsStatType](filePath)[statsMethodName]();
		} catch (error) {
			if (error.code === 'ENOENT') {
				return false;
			}

			throw error;
		}
	}

	pathType.isFile = isType.bind(null, 'stat', 'isFile');
	pathType.isDirectory = isType.bind(null, 'stat', 'isDirectory');
	pathType.isSymlink = isType.bind(null, 'lstat', 'isSymbolicLink');
	pathType.isFileSync = isTypeSync.bind(null, 'statSync', 'isFile');
	pathType.isDirectorySync = isTypeSync.bind(null, 'statSync', 'isDirectory');
	pathType.isSymlinkSync = isTypeSync.bind(null, 'lstatSync', 'isSymbolicLink');
	return pathType;
}

var hasRequiredDirGlob;

function requireDirGlob () {
	if (hasRequiredDirGlob) return dirGlob.exports;
	hasRequiredDirGlob = 1;
	const path = require$$1$1;
	const pathType = requirePathType();

	const getExtensions = extensions => extensions.length > 1 ? `{${extensions.join(',')}}` : extensions[0];

	const getPath = (filepath, cwd) => {
		const pth = filepath[0] === '!' ? filepath.slice(1) : filepath;
		return path.isAbsolute(pth) ? pth : path.join(cwd, pth);
	};

	const addExtensions = (file, extensions) => {
		if (path.extname(file)) {
			return `**/${file}`;
		}

		return `**/${file}.${getExtensions(extensions)}`;
	};

	const getGlob = (directory, options) => {
		if (options.files && !Array.isArray(options.files)) {
			throw new TypeError(`Expected \`files\` to be of type \`Array\` but received type \`${typeof options.files}\``);
		}

		if (options.extensions && !Array.isArray(options.extensions)) {
			throw new TypeError(`Expected \`extensions\` to be of type \`Array\` but received type \`${typeof options.extensions}\``);
		}

		if (options.files && options.extensions) {
			return options.files.map(x => path.posix.join(directory, addExtensions(x, options.extensions)));
		}

		if (options.files) {
			return options.files.map(x => path.posix.join(directory, `**/${x}`));
		}

		if (options.extensions) {
			return [path.posix.join(directory, `**/*.${getExtensions(options.extensions)}`)];
		}

		return [path.posix.join(directory, '**')];
	};

	dirGlob.exports = async (input, options) => {
		options = {
			cwd: process.cwd(),
			...options
		};

		if (typeof options.cwd !== 'string') {
			throw new TypeError(`Expected \`cwd\` to be of type \`string\` but received type \`${typeof options.cwd}\``);
		}

		const globs = await Promise.all([].concat(input).map(async x => {
			const isDirectory = await pathType.isDirectory(getPath(x, options.cwd));
			return isDirectory ? getGlob(x, options) : x;
		}));

		return [].concat.apply([], globs); // eslint-disable-line prefer-spread
	};

	dirGlob.exports.sync = (input, options) => {
		options = {
			cwd: process.cwd(),
			...options
		};

		if (typeof options.cwd !== 'string') {
			throw new TypeError(`Expected \`cwd\` to be of type \`string\` but received type \`${typeof options.cwd}\``);
		}

		const globs = [].concat(input).map(x => pathType.isDirectorySync(getPath(x, options.cwd)) ? getGlob(x, options) : x);

		return [].concat.apply([], globs); // eslint-disable-line prefer-spread
	};
	return dirGlob.exports;
}

var gitignore = {exports: {}};

var ignore;
var hasRequiredIgnore;

function requireIgnore () {
	if (hasRequiredIgnore) return ignore;
	hasRequiredIgnore = 1;
	var define_process_env_default = {};
	function makeArray(subject) {
	  return Array.isArray(subject) ? subject : [subject];
	}
	const EMPTY = "";
	const SPACE = " ";
	const ESCAPE = "\\";
	const REGEX_TEST_BLANK_LINE = /^\s+$/;
	const REGEX_INVALID_TRAILING_BACKSLASH = /(?:[^\\]|^)\\$/;
	const REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/;
	const REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/;
	const REGEX_SPLITALL_CRLF = /\r?\n/g;
	const REGEX_TEST_INVALID_PATH = /^\.*\/|^\.+$/;
	const SLASH = "/";
	let TMP_KEY_IGNORE = "node-ignore";
	if (typeof Symbol !== "undefined") {
	  TMP_KEY_IGNORE = Symbol.for("node-ignore");
	}
	const KEY_IGNORE = TMP_KEY_IGNORE;
	const define = (object, key, value) => Object.defineProperty(object, key, { value });
	const REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g;
	const RETURN_FALSE = () => false;
	const sanitizeRange = (range) => range.replace(
	  REGEX_REGEXP_RANGE,
	  (match, from, to) => from.charCodeAt(0) <= to.charCodeAt(0) ? match : EMPTY
	);
	const cleanRangeBackSlash = (slashes) => {
	  const { length } = slashes;
	  return slashes.slice(0, length - length % 2);
	};
	const REPLACERS = [
	  [
	    // remove BOM
	    // TODO:
	    // Other similar zero-width characters?
	    /^\uFEFF/,
	    () => EMPTY
	  ],
	  // > Trailing spaces are ignored unless they are quoted with backslash ("\")
	  [
	    // (a\ ) -> (a )
	    // (a  ) -> (a)
	    // (a ) -> (a)
	    // (a \ ) -> (a  )
	    /((?:\\\\)*?)(\\?\s+)$/,
	    (_, m1, m2) => m1 + (m2.indexOf("\\") === 0 ? SPACE : EMPTY)
	  ],
	  // replace (\ ) with ' '
	  // (\ ) -> ' '
	  // (\\ ) -> '\\ '
	  // (\\\ ) -> '\\ '
	  [
	    /(\\+?)\s/g,
	    (_, m1) => {
	      const { length } = m1;
	      return m1.slice(0, length - length % 2) + SPACE;
	    }
	  ],
	  // Escape metacharacters
	  // which is written down by users but means special for regular expressions.
	  // > There are 12 characters with special meanings:
	  // > - the backslash \,
	  // > - the caret ^,
	  // > - the dollar sign $,
	  // > - the period or dot .,
	  // > - the vertical bar or pipe symbol |,
	  // > - the question mark ?,
	  // > - the asterisk or star *,
	  // > - the plus sign +,
	  // > - the opening parenthesis (,
	  // > - the closing parenthesis ),
	  // > - and the opening square bracket [,
	  // > - the opening curly brace {,
	  // > These special characters are often called "metacharacters".
	  [
	    /[\\$.|*+(){^]/g,
	    (match) => `\\${match}`
	  ],
	  [
	    // > a question mark (?) matches a single character
	    /(?!\\)\?/g,
	    () => "[^/]"
	  ],
	  // leading slash
	  [
	    // > A leading slash matches the beginning of the pathname.
	    // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
	    // A leading slash matches the beginning of the pathname
	    /^\//,
	    () => "^"
	  ],
	  // replace special metacharacter slash after the leading slash
	  [
	    /\//g,
	    () => "\\/"
	  ],
	  [
	    // > A leading "**" followed by a slash means match in all directories.
	    // > For example, "**/foo" matches file or directory "foo" anywhere,
	    // > the same as pattern "foo".
	    // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
	    // >   under directory "foo".
	    // Notice that the '*'s have been replaced as '\\*'
	    /^\^*\\\*\\\*\\\//,
	    // '**/foo' <-> 'foo'
	    () => "^(?:.*\\/)?"
	  ],
	  // starting
	  [
	    // there will be no leading '/'
	    //   (which has been replaced by section "leading slash")
	    // If starts with '**', adding a '^' to the regular expression also works
	    /^(?=[^^])/,
	    function startingReplacer() {
	      return !/\/(?!$)/.test(this) ? "(?:^|\\/)" : "^";
	    }
	  ],
	  // two globstars
	  [
	    // Use lookahead assertions so that we could match more than one `'/**'`
	    /\\\/\\\*\\\*(?=\\\/|$)/g,
	    // Zero, one or several directories
	    // should not use '*', or it will be replaced by the next replacer
	    // Check if it is not the last `'/**'`
	    (_, index, str) => index + 6 < str.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
	  ],
	  // normal intermediate wildcards
	  [
	    // Never replace escaped '*'
	    // ignore rule '\*' will match the path '*'
	    // 'abc.*/' -> go
	    // 'abc.*'  -> skip this rule,
	    //    coz trailing single wildcard will be handed by [trailing wildcard]
	    /(^|[^\\]+)(\\\*)+(?=.+)/g,
	    // '*.js' matches '.js'
	    // '*.js' doesn't match 'abc'
	    (_, p1, p2) => {
	      const unescaped = p2.replace(/\\\*/g, "[^\\/]*");
	      return p1 + unescaped;
	    }
	  ],
	  [
	    // unescape, revert step 3 except for back slash
	    // For example, if a user escape a '\\*',
	    // after step 3, the result will be '\\\\\\*'
	    /\\\\\\(?=[$.|*+(){^])/g,
	    () => ESCAPE
	  ],
	  [
	    // '\\\\' -> '\\'
	    /\\\\/g,
	    () => ESCAPE
	  ],
	  [
	    // > The range notation, e.g. [a-zA-Z],
	    // > can be used to match one of the characters in a range.
	    // `\` is escaped by step 3
	    /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
	    (match, leadEscape, range, endEscape, close) => leadEscape === ESCAPE ? `\\[${range}${cleanRangeBackSlash(endEscape)}${close}` : close === "]" ? endEscape.length % 2 === 0 ? `[${sanitizeRange(range)}${endEscape}]` : "[]" : "[]"
	  ],
	  // ending
	  [
	    // 'js' will not match 'js.'
	    // 'ab' will not match 'abc'
	    /(?:[^*])$/,
	    // WTF!
	    // https://git-scm.com/docs/gitignore
	    // changes in [2.22.1](https://git-scm.com/docs/gitignore/2.22.1)
	    // which re-fixes #24, #38
	    // > If there is a separator at the end of the pattern then the pattern
	    // > will only match directories, otherwise the pattern can match both
	    // > files and directories.
	    // 'js*' will not match 'a.js'
	    // 'js/' will not match 'a.js'
	    // 'js' will match 'a.js' and 'a.js/'
	    (match) => /\/$/.test(match) ? `${match}$` : `${match}(?=$|\\/$)`
	  ],
	  // trailing wildcard
	  [
	    /(\^|\\\/)?\\\*$/,
	    (_, p1) => {
	      const prefix = p1 ? `${p1}[^/]+` : "[^/]*";
	      return `${prefix}(?=$|\\/$)`;
	    }
	  ]
	];
	const regexCache = /* @__PURE__ */ Object.create(null);
	const makeRegex = (pattern, ignoreCase) => {
	  let source = regexCache[pattern];
	  if (!source) {
	    source = REPLACERS.reduce(
	      (prev, [matcher, replacer]) => prev.replace(matcher, replacer.bind(pattern)),
	      pattern
	    );
	    regexCache[pattern] = source;
	  }
	  return ignoreCase ? new RegExp(source, "i") : new RegExp(source);
	};
	const isString = (subject) => typeof subject === "string";
	const checkPattern = (pattern) => pattern && isString(pattern) && !REGEX_TEST_BLANK_LINE.test(pattern) && !REGEX_INVALID_TRAILING_BACKSLASH.test(pattern) && pattern.indexOf("#") !== 0;
	const splitPattern = (pattern) => pattern.split(REGEX_SPLITALL_CRLF);
	class IgnoreRule {
	  constructor(origin, pattern, negative, regex) {
	    this.origin = origin;
	    this.pattern = pattern;
	    this.negative = negative;
	    this.regex = regex;
	  }
	}
	const createRule = (pattern, ignoreCase) => {
	  const origin = pattern;
	  let negative = false;
	  if (pattern.indexOf("!") === 0) {
	    negative = true;
	    pattern = pattern.substr(1);
	  }
	  pattern = pattern.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
	  const regex = makeRegex(pattern, ignoreCase);
	  return new IgnoreRule(
	    origin,
	    pattern,
	    negative,
	    regex
	  );
	};
	const throwError = (message, Ctor) => {
	  throw new Ctor(message);
	};
	const checkPath = (path, originalPath, doThrow) => {
	  if (!isString(path)) {
	    return doThrow(
	      `path must be a string, but got \`${originalPath}\``,
	      TypeError
	    );
	  }
	  if (!path) {
	    return doThrow(`path must not be empty`, TypeError);
	  }
	  if (checkPath.isNotRelative(path)) {
	    const r = "`path.relative()`d";
	    return doThrow(
	      `path should be a ${r} string, but got "${originalPath}"`,
	      RangeError
	    );
	  }
	  return true;
	};
	const isNotRelative = (path) => REGEX_TEST_INVALID_PATH.test(path);
	checkPath.isNotRelative = isNotRelative;
	checkPath.convert = (p) => p;
	class Ignore {
	  constructor({
	    ignorecase = true,
	    ignoreCase = ignorecase,
	    allowRelativePaths = false
	  } = {}) {
	    define(this, KEY_IGNORE, true);
	    this._rules = [];
	    this._ignoreCase = ignoreCase;
	    this._allowRelativePaths = allowRelativePaths;
	    this._initCache();
	  }
	  _initCache() {
	    this._ignoreCache = /* @__PURE__ */ Object.create(null);
	    this._testCache = /* @__PURE__ */ Object.create(null);
	  }
	  _addPattern(pattern) {
	    if (pattern && pattern[KEY_IGNORE]) {
	      this._rules = this._rules.concat(pattern._rules);
	      this._added = true;
	      return;
	    }
	    if (checkPattern(pattern)) {
	      const rule = createRule(pattern, this._ignoreCase);
	      this._added = true;
	      this._rules.push(rule);
	    }
	  }
	  // @param {Array<string> | string | Ignore} pattern
	  add(pattern) {
	    this._added = false;
	    makeArray(
	      isString(pattern) ? splitPattern(pattern) : pattern
	    ).forEach(this._addPattern, this);
	    if (this._added) {
	      this._initCache();
	    }
	    return this;
	  }
	  // legacy
	  addPattern(pattern) {
	    return this.add(pattern);
	  }
	  //          |           ignored : unignored
	  // negative |   0:0   |   0:1   |   1:0   |   1:1
	  // -------- | ------- | ------- | ------- | --------
	  //     0    |  TEST   |  TEST   |  SKIP   |    X
	  //     1    |  TESTIF |  SKIP   |  TEST   |    X
	  // - SKIP: always skip
	  // - TEST: always test
	  // - TESTIF: only test if checkUnignored
	  // - X: that never happen
	  // @param {boolean} whether should check if the path is unignored,
	  //   setting `checkUnignored` to `false` could reduce additional
	  //   path matching.
	  // @returns {TestResult} true if a file is ignored
	  _testOne(path, checkUnignored) {
	    let ignored = false;
	    let unignored = false;
	    this._rules.forEach((rule) => {
	      const { negative } = rule;
	      if (unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored) {
	        return;
	      }
	      const matched = rule.regex.test(path);
	      if (matched) {
	        ignored = !negative;
	        unignored = negative;
	      }
	    });
	    return {
	      ignored,
	      unignored
	    };
	  }
	  // @returns {TestResult}
	  _test(originalPath, cache, checkUnignored, slices) {
	    const path = originalPath && checkPath.convert(originalPath);
	    checkPath(
	      path,
	      originalPath,
	      this._allowRelativePaths ? RETURN_FALSE : throwError
	    );
	    return this._t(path, cache, checkUnignored, slices);
	  }
	  _t(path, cache, checkUnignored, slices) {
	    if (path in cache) {
	      return cache[path];
	    }
	    if (!slices) {
	      slices = path.split(SLASH);
	    }
	    slices.pop();
	    if (!slices.length) {
	      return cache[path] = this._testOne(path, checkUnignored);
	    }
	    const parent = this._t(
	      slices.join(SLASH) + SLASH,
	      cache,
	      checkUnignored,
	      slices
	    );
	    return cache[path] = parent.ignored ? parent : this._testOne(path, checkUnignored);
	  }
	  ignores(path) {
	    return this._test(path, this._ignoreCache, false).ignored;
	  }
	  createFilter() {
	    return (path) => !this.ignores(path);
	  }
	  filter(paths) {
	    return makeArray(paths).filter(this.createFilter());
	  }
	  // @returns {TestResult}
	  test(path) {
	    return this._test(path, this._testCache, true);
	  }
	}
	const factory = (options) => new Ignore(options);
	const isPathValid = (path) => checkPath(path && checkPath.convert(path), path, RETURN_FALSE);
	factory.isPathValid = isPathValid;
	factory.default = factory;
	ignore = factory;
	if (
	  // Detect `process` so that it can run in browsers.
	  typeof process !== "undefined" && (define_process_env_default && define_process_env_default.IGNORE_TEST_WIN32 || process.platform === "win32")
	) {
	  const makePosix = (str) => /^\\\\\?\\/.test(str) || /["<>|\u0000-\u001F]+/u.test(str) ? str : str.replace(/\\/g, "/");
	  checkPath.convert = makePosix;
	  const REGIX_IS_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
	  checkPath.isNotRelative = (path) => REGIX_IS_WINDOWS_PATH_ABSOLUTE.test(path) || isNotRelative(path);
	}
	return ignore;
}

var slash;
var hasRequiredSlash;

function requireSlash () {
	if (hasRequiredSlash) return slash;
	hasRequiredSlash = 1;
	slash = path => {
		const isExtendedLengthPath = /^\\\\\?\\/.test(path);
		const hasNonAscii = /[^\u0000-\u0080]+/.test(path); // eslint-disable-line no-control-regex

		if (isExtendedLengthPath || hasNonAscii) {
			return path;
		}

		return path.replace(/\\/g, '/');
	};
	return slash;
}

var hasRequiredGitignore;

function requireGitignore () {
	if (hasRequiredGitignore) return gitignore.exports;
	hasRequiredGitignore = 1;
	const {promisify} = require$$1$1;
	const fs = require$$1$1;
	const path = require$$1$1;
	const fastGlob = requireOut();
	const gitIgnore = requireIgnore();
	const slash = requireSlash();

	const DEFAULT_IGNORE = [
		'**/node_modules/**',
		'**/flow-typed/**',
		'**/coverage/**',
		'**/.git'
	];

	const readFileP = promisify(fs.readFile);

	const mapGitIgnorePatternTo = base => ignore => {
		if (ignore.startsWith('!')) {
			return '!' + path.posix.join(base, ignore.slice(1));
		}

		return path.posix.join(base, ignore);
	};

	const parseGitIgnore = (content, options) => {
		const base = slash(path.relative(options.cwd, path.dirname(options.fileName)));

		return content
			.split(/\r?\n/)
			.filter(Boolean)
			.filter(line => !line.startsWith('#'))
			.map(mapGitIgnorePatternTo(base));
	};

	const reduceIgnore = files => {
		const ignores = gitIgnore();
		for (const file of files) {
			ignores.add(parseGitIgnore(file.content, {
				cwd: file.cwd,
				fileName: file.filePath
			}));
		}

		return ignores;
	};

	const ensureAbsolutePathForCwd = (cwd, p) => {
		cwd = slash(cwd);
		if (path.isAbsolute(p)) {
			if (slash(p).startsWith(cwd)) {
				return p;
			}

			throw new Error(`Path ${p} is not in cwd ${cwd}`);
		}

		return path.join(cwd, p);
	};

	const getIsIgnoredPredecate = (ignores, cwd) => {
		return p => ignores.ignores(slash(path.relative(cwd, ensureAbsolutePathForCwd(cwd, p.path || p))));
	};

	const getFile = async (file, cwd) => {
		const filePath = path.join(cwd, file);
		const content = await readFileP(filePath, 'utf8');

		return {
			cwd,
			filePath,
			content
		};
	};

	const getFileSync = (file, cwd) => {
		const filePath = path.join(cwd, file);
		const content = fs.readFileSync(filePath, 'utf8');

		return {
			cwd,
			filePath,
			content
		};
	};

	const normalizeOptions = ({
		ignore = [],
		cwd = slash(process.cwd())
	} = {}) => {
		return {ignore, cwd};
	};

	gitignore.exports = async options => {
		options = normalizeOptions(options);

		const paths = await fastGlob('**/.gitignore', {
			ignore: DEFAULT_IGNORE.concat(options.ignore),
			cwd: options.cwd
		});

		const files = await Promise.all(paths.map(file => getFile(file, options.cwd)));
		const ignores = reduceIgnore(files);

		return getIsIgnoredPredecate(ignores, options.cwd);
	};

	gitignore.exports.sync = options => {
		options = normalizeOptions(options);

		const paths = fastGlob.sync('**/.gitignore', {
			ignore: DEFAULT_IGNORE.concat(options.ignore),
			cwd: options.cwd
		});

		const files = paths.map(file => getFileSync(file, options.cwd));
		const ignores = reduceIgnore(files);

		return getIsIgnoredPredecate(ignores, options.cwd);
	};
	return gitignore.exports;
}

var streamUtils;
var hasRequiredStreamUtils;

function requireStreamUtils () {
	if (hasRequiredStreamUtils) return streamUtils;
	hasRequiredStreamUtils = 1;
	const {Transform} = require$$1$1;

	class ObjectTransform extends Transform {
		constructor() {
			super({
				objectMode: true
			});
		}
	}

	class FilterStream extends ObjectTransform {
		constructor(filter) {
			super();
			this._filter = filter;
		}

		_transform(data, encoding, callback) {
			if (this._filter(data)) {
				this.push(data);
			}

			callback();
		}
	}

	class UniqueStream extends ObjectTransform {
		constructor() {
			super();
			this._pushed = new Set();
		}

		_transform(data, encoding, callback) {
			if (!this._pushed.has(data)) {
				this.push(data);
				this._pushed.add(data);
			}

			callback();
		}
	}

	streamUtils = {
		FilterStream,
		UniqueStream
	};
	return streamUtils;
}

var hasRequiredGlobby;

function requireGlobby () {
	if (hasRequiredGlobby) return globby.exports;
	hasRequiredGlobby = 1;
	const fs = require$$1$1;
	const arrayUnion = requireArrayUnion();
	const merge2 = requireMerge2();
	const fastGlob = requireOut();
	const dirGlob = requireDirGlob();
	const gitignore = requireGitignore();
	const {FilterStream, UniqueStream} = requireStreamUtils();

	const DEFAULT_FILTER = () => false;

	const isNegative = pattern => pattern[0] === '!';

	const assertPatternsInput = patterns => {
		if (!patterns.every(pattern => typeof pattern === 'string')) {
			throw new TypeError('Patterns must be a string or an array of strings');
		}
	};

	const checkCwdOption = (options = {}) => {
		if (!options.cwd) {
			return;
		}

		let stat;
		try {
			stat = fs.statSync(options.cwd);
		} catch {
			return;
		}

		if (!stat.isDirectory()) {
			throw new Error('The `cwd` option must be a path to a directory');
		}
	};

	const getPathString = p => p.stats instanceof fs.Stats ? p.path : p;

	const generateGlobTasks = (patterns, taskOptions) => {
		patterns = arrayUnion([].concat(patterns));
		assertPatternsInput(patterns);
		checkCwdOption(taskOptions);

		const globTasks = [];

		taskOptions = {
			ignore: [],
			expandDirectories: true,
			...taskOptions
		};

		for (const [index, pattern] of patterns.entries()) {
			if (isNegative(pattern)) {
				continue;
			}

			const ignore = patterns
				.slice(index)
				.filter(pattern => isNegative(pattern))
				.map(pattern => pattern.slice(1));

			const options = {
				...taskOptions,
				ignore: taskOptions.ignore.concat(ignore)
			};

			globTasks.push({pattern, options});
		}

		return globTasks;
	};

	const globDirs = (task, fn) => {
		let options = {};
		if (task.options.cwd) {
			options.cwd = task.options.cwd;
		}

		if (Array.isArray(task.options.expandDirectories)) {
			options = {
				...options,
				files: task.options.expandDirectories
			};
		} else if (typeof task.options.expandDirectories === 'object') {
			options = {
				...options,
				...task.options.expandDirectories
			};
		}

		return fn(task.pattern, options);
	};

	const getPattern = (task, fn) => task.options.expandDirectories ? globDirs(task, fn) : [task.pattern];

	const getFilterSync = options => {
		return options && options.gitignore ?
			gitignore.sync({cwd: options.cwd, ignore: options.ignore}) :
			DEFAULT_FILTER;
	};

	const globToTask = task => glob => {
		const {options} = task;
		if (options.ignore && Array.isArray(options.ignore) && options.expandDirectories) {
			options.ignore = dirGlob.sync(options.ignore);
		}

		return {
			pattern: glob,
			options
		};
	};

	globby.exports = async (patterns, options) => {
		const globTasks = generateGlobTasks(patterns, options);

		const getFilter = async () => {
			return options && options.gitignore ?
				gitignore({cwd: options.cwd, ignore: options.ignore}) :
				DEFAULT_FILTER;
		};

		const getTasks = async () => {
			const tasks = await Promise.all(globTasks.map(async task => {
				const globs = await getPattern(task, dirGlob);
				return Promise.all(globs.map(globToTask(task)));
			}));

			return arrayUnion(...tasks);
		};

		const [filter, tasks] = await Promise.all([getFilter(), getTasks()]);
		const paths = await Promise.all(tasks.map(task => fastGlob(task.pattern, task.options)));

		return arrayUnion(...paths).filter(path_ => !filter(getPathString(path_)));
	};

	globby.exports.sync = (patterns, options) => {
		const globTasks = generateGlobTasks(patterns, options);

		const tasks = [];
		for (const task of globTasks) {
			const newTask = getPattern(task, dirGlob.sync).map(globToTask(task));
			tasks.push(...newTask);
		}

		const filter = getFilterSync(options);

		let matches = [];
		for (const task of tasks) {
			matches = arrayUnion(matches, fastGlob.sync(task.pattern, task.options));
		}

		return matches.filter(path_ => !filter(path_));
	};

	globby.exports.stream = (patterns, options) => {
		const globTasks = generateGlobTasks(patterns, options);

		const tasks = [];
		for (const task of globTasks) {
			const newTask = getPattern(task, dirGlob.sync).map(globToTask(task));
			tasks.push(...newTask);
		}

		const filter = getFilterSync(options);
		const filterStream = new FilterStream(p => !filter(p));
		const uniqueStream = new UniqueStream();

		return merge2(tasks.map(task => fastGlob.stream(task.pattern, task.options)))
			.pipe(filterStream)
			.pipe(uniqueStream);
	};

	globby.exports.generateGlobTasks = generateGlobTasks;

	globby.exports.hasMagic = (patterns, options) => []
		.concat(patterns)
		.some(pattern => fastGlob.isDynamicPattern(pattern, options));

	globby.exports.gitignore = gitignore;
	return globby.exports;
}

var git;
var hasRequiredGit;

function requireGit () {
	if (hasRequiredGit) return git;
	hasRequiredGit = 1;
	const cp = require$$1$1;
	const path = require$$1$1;
	const util = require$$1$1;
	const fs = /*@__PURE__*/ requireLib$1();

	/**
	 * @function Object() { [native code] }
	 * @param {number} code Error code.
	 * @param {string} message Error message.
	 */
	function ProcessError(code, message) {
	  const callee = arguments.callee;
	  Error.apply(this, [message]);
	  Error.captureStackTrace(this, callee);
	  this.code = code;
	  this.message = message;
	  this.name = callee.name;
	}
	util.inherits(ProcessError, Error);

	/**
	 * Util function for handling spawned processes as promises.
	 * @param {string} exe Executable.
	 * @param {Array<string>} args Arguments.
	 * @param {string} cwd Working directory.
	 * @return {Promise} A promise.
	 */
	function spawn(exe, args, cwd) {
	  return new Promise((resolve, reject) => {
	    const child = cp.spawn(exe, args, {cwd: cwd || process.cwd()});
	    const buffer = [];
	    child.stderr.on('data', (chunk) => {
	      buffer.push(chunk.toString());
	    });
	    child.stdout.on('data', (chunk) => {
	      buffer.push(chunk.toString());
	    });
	    child.on('close', (code) => {
	      const output = buffer.join('');
	      if (code) {
	        const msg = output || 'Process failed: ' + code;
	        reject(new ProcessError(code, msg));
	      } else {
	        resolve(output);
	      }
	    });
	  });
	}

	/**
	 * Create an object for executing git commands.
	 * @param {string} cwd Repository directory.
	 * @param {string} cmd Git executable (full path if not already on path).
	 * @function Object() { [native code] }
	 */
	function Git(cwd, cmd) {
	  this.cwd = cwd;
	  this.cmd = cmd || 'git';
	  this.output = '';
	}

	/**
	 * Execute an arbitrary git command.
	 * @param {Array<string>} args Arguments (e.g. ['remote', 'update']).
	 * @return {Promise} A promise.  The promise will be resolved with this instance
	 *     or rejected with an error.
	 */
	Git.prototype.exec = function (...args) {
	  return spawn(this.cmd, [...args], this.cwd).then((output) => {
	    this.output = output;
	    return this;
	  });
	};

	/**
	 * Initialize repository.
	 * @return {Promise} A promise.
	 */
	Git.prototype.init = function () {
	  return this.exec('init');
	};

	/**
	 * Clean up unversioned files.
	 * @return {Promise} A promise.
	 */
	Git.prototype.clean = function () {
	  return this.exec('clean', '-f', '-d');
	};

	/**
	 * Hard reset to remote/branch
	 * @param {string} remote Remote alias.
	 * @param {string} branch Branch name.
	 * @return {Promise} A promise.
	 */
	Git.prototype.reset = function (remote, branch) {
	  return this.exec('reset', '--hard', remote + '/' + branch);
	};

	/**
	 * Fetch from a remote.
	 * @param {string} remote Remote alias.
	 * @return {Promise} A promise.
	 */
	Git.prototype.fetch = function (remote) {
	  return this.exec('fetch', remote);
	};

	/**
	 * Checkout a branch (create an orphan if it doesn't exist on the remote).
	 * @param {string} remote Remote alias.
	 * @param {string} branch Branch name.
	 * @return {Promise} A promise.
	 */
	Git.prototype.checkout = function (remote, branch) {
	  const treeish = remote + '/' + branch;
	  return this.exec('ls-remote', '--exit-code', '.', treeish).then(
	    () => {
	      // branch exists on remote, hard reset
	      return this.exec('checkout', branch)
	        .then(() => this.clean())
	        .then(() => this.reset(remote, branch));
	    },
	    (error) => {
	      if (error instanceof ProcessError && error.code === 2) {
	        // branch doesn't exist, create an orphan
	        return this.exec('checkout', '--orphan', branch);
	      } else {
	        // unhandled error
	        throw error;
	      }
	    },
	  );
	};

	/**
	 * Remove all unversioned files.
	 * @param {string | Array<string>} files Files argument.
	 * @return {Promise} A promise.
	 */
	Git.prototype.rm = function (files) {
	  if (!Array.isArray(files)) {
	    files = [files];
	  }
	  return this.exec('rm', '--ignore-unmatch', '-r', '-f', '--', ...files);
	};

	/**
	 * Add files.
	 * @param {string | Array<string>} files Files argument.
	 * @return {Promise} A promise.
	 */
	Git.prototype.add = function (files) {
	  if (!Array.isArray(files)) {
	    files = [files];
	  }
	  return this.exec('add', ...files);
	};

	/**
	 * Commit (if there are any changes).
	 * @param {string} message Commit message.
	 * @return {Promise} A promise.
	 */
	Git.prototype.commit = function (message) {
	  return this.exec('diff-index', '--quiet', 'HEAD').catch(() =>
	    this.exec('commit', '-m', message),
	  );
	};

	/**
	 * Add tag
	 * @param {string} name Name of tag.
	 * @return {Promise} A promise.
	 */
	Git.prototype.tag = function (name) {
	  return this.exec('tag', name);
	};

	/**
	 * Push a branch.
	 * @param {string} remote Remote alias.
	 * @param {string} branch Branch name.
	 * @param {boolean} force Force push.
	 * @return {Promise} A promise.
	 */
	Git.prototype.push = function (remote, branch, force) {
	  const args = ['push', '--tags', remote, branch];
	  if (force) {
	    args.push('--force');
	  }
	  return this.exec.apply(this, args);
	};

	/**
	 * Get the URL for a remote.
	 * @param {string} remote Remote alias.
	 * @return {Promise<string>} A promise for the remote URL.
	 */
	Git.prototype.getRemoteUrl = function (remote) {
	  return this.exec('config', '--get', 'remote.' + remote + '.url')
	    .then((git) => {
	      const repo = git.output && git.output.split(/[\n\r]/).shift();
	      if (repo) {
	        return repo;
	      } else {
	        throw new Error(
	          'Failed to get repo URL from options or current directory.',
	        );
	      }
	    })
	    .catch((err) => {
	      throw new Error(
	        'Failed to get remote.' +
	          remote +
	          '.url (task must either be ' +
	          'run in a git repository with a configured ' +
	          remote +
	          ' remote ' +
	          'or must be configured with the "repo" option).',
	      );
	    });
	};

	/**
	 * Delete ref to remove branch history
	 * @param {string} branch The branch name.
	 * @return {Promise} A promise.  The promise will be resolved with this instance
	 *     or rejected with an error.
	 */
	Git.prototype.deleteRef = function (branch) {
	  return this.exec('update-ref', '-d', 'refs/heads/' + branch);
	};

	/**
	 * Clone a repo into the given dir if it doesn't already exist.
	 * @param {string} repo Repository URL.
	 * @param {string} dir Target directory.
	 * @param {string} branch Branch name.
	 * @param {options} options All options.
	 * @return {Promise<Git>} A promise.
	 */
	Git.clone = function clone(repo, dir, branch, options) {
	  return fs.exists(dir).then((exists) => {
	    if (exists) {
	      return Promise.resolve(new Git(dir, options.git));
	    } else {
	      return fs.mkdirp(path.dirname(path.resolve(dir))).then(() => {
	        const args = [
	          'clone',
	          repo,
	          dir,
	          '--branch',
	          branch,
	          '--single-branch',
	          '--origin',
	          options.remote,
	          '--depth',
	          options.depth,
	        ];
	        return spawn(options.git, args)
	          .catch((err) => {
	            // try again without branch or depth options
	            return spawn(options.git, [
	              'clone',
	              repo,
	              dir,
	              '--origin',
	              options.remote,
	            ]);
	          })
	          .then(() => new Git(dir, options.git));
	      });
	    }
	  });
	};

	git = Git;
	return git;
}

var util = {};

/**
 * Creates a continuation function with some arguments already applied.
 *
 * Useful as a shorthand when combined with other control flow functions. Any
 * arguments passed to the returned function are added to the arguments
 * originally passed to apply.
 *
 * @name apply
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {Function} fn - The function you want to eventually apply all
 * arguments to. Invokes with (arguments...).
 * @param {...*} arguments... - Any number of arguments to automatically apply
 * when the continuation is called.
 * @returns {Function} the partially-applied function
 * @example
 *
 * // using apply
 * async.parallel([
 *     async.apply(fs.writeFile, 'testfile1', 'test1'),
 *     async.apply(fs.writeFile, 'testfile2', 'test2')
 * ]);
 *
 *
 * // the same process without using apply
 * async.parallel([
 *     function(callback) {
 *         fs.writeFile('testfile1', 'test1', callback);
 *     },
 *     function(callback) {
 *         fs.writeFile('testfile2', 'test2', callback);
 *     }
 * ]);
 *
 * // It's possible to pass any number of additional arguments when calling the
 * // continuation:
 *
 * node> var fn = async.apply(sys.puts, 'one');
 * node> fn('two', 'three');
 * one
 * two
 * three
 */
function apply(fn, ...args) {
    return (...callArgs) => fn(...args,...callArgs);
}

function initialParams (fn) {
    return function (...args/*, callback*/) {
        var callback = args.pop();
        return fn.call(this, args, callback);
    };
}

/* istanbul ignore file */

var hasQueueMicrotask = typeof queueMicrotask === 'function' && queueMicrotask;
var hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
var hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';

function fallback(fn) {
    setTimeout(fn, 0);
}

function wrap(defer) {
    return (fn, ...args) => defer(() => fn(...args));
}

var _defer$1;

if (hasQueueMicrotask) {
    _defer$1 = queueMicrotask;
} else if (hasSetImmediate) {
    _defer$1 = setImmediate;
} else if (hasNextTick) {
    _defer$1 = process.nextTick;
} else {
    _defer$1 = fallback;
}

var setImmediate$1 = wrap(_defer$1);

/**
 * Take a sync function and make it async, passing its return value to a
 * callback. This is useful for plugging sync functions into a waterfall,
 * series, or other async functions. Any arguments passed to the generated
 * function will be passed to the wrapped function (except for the final
 * callback argument). Errors thrown will be passed to the callback.
 *
 * If the function passed to `asyncify` returns a Promise, that promises's
 * resolved/rejected state will be used to call the callback, rather than simply
 * the synchronous return value.
 *
 * This also means you can asyncify ES2017 `async` functions.
 *
 * @name asyncify
 * @static
 * @memberOf module:Utils
 * @method
 * @alias wrapSync
 * @category Util
 * @param {Function} func - The synchronous function, or Promise-returning
 * function to convert to an {@link AsyncFunction}.
 * @returns {AsyncFunction} An asynchronous wrapper of the `func`. To be
 * invoked with `(args..., callback)`.
 * @example
 *
 * // passing a regular synchronous function
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(JSON.parse),
 *     function (data, next) {
 *         // data is the result of parsing the text.
 *         // If there was a parsing error, it would have been caught.
 *     }
 * ], callback);
 *
 * // passing a function returning a promise
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(function (contents) {
 *         return db.model.create(contents);
 *     }),
 *     function (model, next) {
 *         // `model` is the instantiated model object.
 *         // If there was an error, this function would be skipped.
 *     }
 * ], callback);
 *
 * // es2017 example, though `asyncify` is not needed if your JS environment
 * // supports async functions out of the box
 * var q = async.queue(async.asyncify(async function(file) {
 *     var intermediateStep = await processFile(file);
 *     return await somePromise(intermediateStep)
 * }));
 *
 * q.push(files);
 */
function asyncify(func) {
    if (isAsync(func)) {
        return function (...args/*, callback*/) {
            const callback = args.pop();
            const promise = func.apply(this, args);
            return handlePromise(promise, callback)
        }
    }

    return initialParams(function (args, callback) {
        var result;
        try {
            result = func.apply(this, args);
        } catch (e) {
            return callback(e);
        }
        // if result is Promise object
        if (result && typeof result.then === 'function') {
            return handlePromise(result, callback)
        } else {
            callback(null, result);
        }
    });
}

function handlePromise(promise, callback) {
    return promise.then(value => {
        invokeCallback(callback, null, value);
    }, err => {
        invokeCallback(callback, err && (err instanceof Error || err.message) ? err : new Error(err));
    });
}

function invokeCallback(callback, error, value) {
    try {
        callback(error, value);
    } catch (err) {
        setImmediate$1(e => { throw e }, err);
    }
}

function isAsync(fn) {
    return fn[Symbol.toStringTag] === 'AsyncFunction';
}

function isAsyncGenerator(fn) {
    return fn[Symbol.toStringTag] === 'AsyncGenerator';
}

function isAsyncIterable(obj) {
    return typeof obj[Symbol.asyncIterator] === 'function';
}

function wrapAsync(asyncFn) {
    if (typeof asyncFn !== 'function') throw new Error('expected a function')
    return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
}

// conditionally promisify a function.
// only return a promise if a callback is omitted
function awaitify (asyncFn, arity) {
    if (!arity) arity = asyncFn.length;
    if (!arity) throw new Error('arity is undefined')
    function awaitable (...args) {
        if (typeof args[arity - 1] === 'function') {
            return asyncFn.apply(this, args)
        }

        return new Promise((resolve, reject) => {
            args[arity - 1] = (err, ...cbArgs) => {
                if (err) return reject(err)
                resolve(cbArgs.length > 1 ? cbArgs : cbArgs[0]);
            };
            asyncFn.apply(this, args);
        })
    }

    return awaitable
}

function applyEach$1 (eachfn) {
    return function applyEach(fns, ...callArgs) {
        const go = awaitify(function (callback) {
            var that = this;
            return eachfn(fns, (fn, cb) => {
                wrapAsync(fn).apply(that, callArgs.concat(cb));
            }, callback);
        });
        return go;
    };
}

function _asyncMap(eachfn, arr, iteratee, callback) {
    arr = arr || [];
    var results = [];
    var counter = 0;
    var _iteratee = wrapAsync(iteratee);

    return eachfn(arr, (value, _, iterCb) => {
        var index = counter++;
        _iteratee(value, (err, v) => {
            results[index] = v;
            iterCb(err);
        });
    }, err => {
        callback(err, results);
    });
}

function isArrayLike(value) {
    return value &&
        typeof value.length === 'number' &&
        value.length >= 0 &&
        value.length % 1 === 0;
}

// A temporary value used to identify if the loop should be broken.
// See #1064, #1293
const breakLoop = {};

function once(fn) {
    function wrapper (...args) {
        if (fn === null) return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, args);
    }
    Object.assign(wrapper, fn);
    return wrapper
}

function getIterator (coll) {
    return coll[Symbol.iterator] && coll[Symbol.iterator]();
}

function createArrayIterator(coll) {
    var i = -1;
    var len = coll.length;
    return function next() {
        return ++i < len ? {value: coll[i], key: i} : null;
    }
}

function createES2015Iterator(iterator) {
    var i = -1;
    return function next() {
        var item = iterator.next();
        if (item.done)
            return null;
        i++;
        return {value: item.value, key: i};
    }
}

function createObjectIterator(obj) {
    var okeys = obj ? Object.keys(obj) : [];
    var i = -1;
    var len = okeys.length;
    return function next() {
        var key = okeys[++i];
        if (key === '__proto__') {
            return next();
        }
        return i < len ? {value: obj[key], key} : null;
    };
}

function createIterator(coll) {
    if (isArrayLike(coll)) {
        return createArrayIterator(coll);
    }

    var iterator = getIterator(coll);
    return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
}

function onlyOnce(fn) {
    return function (...args) {
        if (fn === null) throw new Error("Callback was already called.");
        var callFn = fn;
        fn = null;
        callFn.apply(this, args);
    };
}

// for async generators
function asyncEachOfLimit(generator, limit, iteratee, callback) {
    let done = false;
    let canceled = false;
    let awaiting = false;
    let running = 0;
    let idx = 0;

    function replenish() {
        //console.log('replenish')
        if (running >= limit || awaiting || done) return
        //console.log('replenish awaiting')
        awaiting = true;
        generator.next().then(({value, done: iterDone}) => {
            //console.log('got value', value)
            if (canceled || done) return
            awaiting = false;
            if (iterDone) {
                done = true;
                if (running <= 0) {
                    //console.log('done nextCb')
                    callback(null);
                }
                return;
            }
            running++;
            iteratee(value, idx, iterateeCallback);
            idx++;
            replenish();
        }).catch(handleError);
    }

    function iterateeCallback(err, result) {
        //console.log('iterateeCallback')
        running -= 1;
        if (canceled) return
        if (err) return handleError(err)

        if (err === false) {
            done = true;
            canceled = true;
            return
        }

        if (result === breakLoop || (done && running <= 0)) {
            done = true;
            //console.log('done iterCb')
            return callback(null);
        }
        replenish();
    }

    function handleError(err) {
        if (canceled) return
        awaiting = false;
        done = true;
        callback(err);
    }

    replenish();
}

var eachOfLimit$2 = (limit) => {
    return (obj, iteratee, callback) => {
        callback = once(callback);
        if (limit <= 0) {
            throw new RangeError('concurrency limit cannot be less than 1')
        }
        if (!obj) {
            return callback(null);
        }
        if (isAsyncGenerator(obj)) {
            return asyncEachOfLimit(obj, limit, iteratee, callback)
        }
        if (isAsyncIterable(obj)) {
            return asyncEachOfLimit(obj[Symbol.asyncIterator](), limit, iteratee, callback)
        }
        var nextElem = createIterator(obj);
        var done = false;
        var canceled = false;
        var running = 0;
        var looping = false;

        function iterateeCallback(err, value) {
            if (canceled) return
            running -= 1;
            if (err) {
                done = true;
                callback(err);
            }
            else if (err === false) {
                done = true;
                canceled = true;
            }
            else if (value === breakLoop || (done && running <= 0)) {
                done = true;
                return callback(null);
            }
            else if (!looping) {
                replenish();
            }
        }

        function replenish () {
            looping = true;
            while (running < limit && !done) {
                var elem = nextElem();
                if (elem === null) {
                    done = true;
                    if (running <= 0) {
                        callback(null);
                    }
                    return;
                }
                running += 1;
                iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
            }
            looping = false;
        }

        replenish();
    };
};

/**
 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name eachOfLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.eachOf]{@link module:Collections.eachOf}
 * @alias forEachOfLimit
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each
 * item in `coll`. The `key` is the item's key, or index in the case of an
 * array.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 */
function eachOfLimit(coll, limit, iteratee, callback) {
    return eachOfLimit$2(limit)(coll, wrapAsync(iteratee), callback);
}

var eachOfLimit$1 = awaitify(eachOfLimit, 4);

// eachOf implementation optimized for array-likes
function eachOfArrayLike(coll, iteratee, callback) {
    callback = once(callback);
    var index = 0,
        completed = 0,
        {length} = coll,
        canceled = false;
    if (length === 0) {
        callback(null);
    }

    function iteratorCallback(err, value) {
        if (err === false) {
            canceled = true;
        }
        if (canceled === true) return
        if (err) {
            callback(err);
        } else if ((++completed === length) || value === breakLoop) {
            callback(null);
        }
    }

    for (; index < length; index++) {
        iteratee(coll[index], index, onlyOnce(iteratorCallback));
    }
}

// a generic version of eachOf which can handle array, object, and iterator cases.
function eachOfGeneric (coll, iteratee, callback) {
    return eachOfLimit$1(coll, Infinity, iteratee, callback);
}

/**
 * Like [`each`]{@link module:Collections.each}, except that it passes the key (or index) as the second argument
 * to the iteratee.
 *
 * @name eachOf
 * @static
 * @memberOf module:Collections
 * @method
 * @alias forEachOf
 * @category Collection
 * @see [async.each]{@link module:Collections.each}
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each
 * item in `coll`.
 * The `key` is the item's key, or index in the case of an array.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 * @example
 *
 * // dev.json is a file containing a valid json object config for dev environment
 * // dev.json is a file containing a valid json object config for test environment
 * // prod.json is a file containing a valid json object config for prod environment
 * // invalid.json is a file with a malformed json object
 *
 * let configs = {}; //global variable
 * let validConfigFileMap = {dev: 'dev.json', test: 'test.json', prod: 'prod.json'};
 * let invalidConfigFileMap = {dev: 'dev.json', test: 'test.json', invalid: 'invalid.json'};
 *
 * // asynchronous function that reads a json file and parses the contents as json object
 * function parseFile(file, key, callback) {
 *     fs.readFile(file, "utf8", function(err, data) {
 *         if (err) return calback(err);
 *         try {
 *             configs[key] = JSON.parse(data);
 *         } catch (e) {
 *             return callback(e);
 *         }
 *         callback();
 *     });
 * }
 *
 * // Using callbacks
 * async.forEachOf(validConfigFileMap, parseFile, function (err) {
 *     if (err) {
 *         console.error(err);
 *     } else {
 *         console.log(configs);
 *         // configs is now a map of JSON data, e.g.
 *         // { dev: //parsed dev.json, test: //parsed test.json, prod: //parsed prod.json}
 *     }
 * });
 *
 * //Error handing
 * async.forEachOf(invalidConfigFileMap, parseFile, function (err) {
 *     if (err) {
 *         console.error(err);
 *         // JSON parse error exception
 *     } else {
 *         console.log(configs);
 *     }
 * });
 *
 * // Using Promises
 * async.forEachOf(validConfigFileMap, parseFile)
 * .then( () => {
 *     console.log(configs);
 *     // configs is now a map of JSON data, e.g.
 *     // { dev: //parsed dev.json, test: //parsed test.json, prod: //parsed prod.json}
 * }).catch( err => {
 *     console.error(err);
 * });
 *
 * //Error handing
 * async.forEachOf(invalidConfigFileMap, parseFile)
 * .then( () => {
 *     console.log(configs);
 * }).catch( err => {
 *     console.error(err);
 *     // JSON parse error exception
 * });
 *
 * // Using async/await
 * async () => {
 *     try {
 *         let result = await async.forEachOf(validConfigFileMap, parseFile);
 *         console.log(configs);
 *         // configs is now a map of JSON data, e.g.
 *         // { dev: //parsed dev.json, test: //parsed test.json, prod: //parsed prod.json}
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 * //Error handing
 * async () => {
 *     try {
 *         let result = await async.forEachOf(invalidConfigFileMap, parseFile);
 *         console.log(configs);
 *     }
 *     catch (err) {
 *         console.log(err);
 *         // JSON parse error exception
 *     }
 * }
 *
 */
function eachOf(coll, iteratee, callback) {
    var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
    return eachOfImplementation(coll, wrapAsync(iteratee), callback);
}

var eachOf$1 = awaitify(eachOf, 3);

/**
 * Produces a new collection of values by mapping each value in `coll` through
 * the `iteratee` function. The `iteratee` is called with an item from `coll`
 * and a callback for when it has finished processing. Each of these callbacks
 * takes 2 arguments: an `error`, and the transformed item from `coll`. If
 * `iteratee` passes an error to its callback, the main `callback` (for the
 * `map` function) is immediately called with the error.
 *
 * Note, that since this function applies the `iteratee` to each item in
 * parallel, there is no guarantee that the `iteratee` functions will complete
 * in order. However, the results array will be in the same order as the
 * original `coll`.
 *
 * If `map` is passed an Object, the results will be an Array.  The results
 * will roughly be in the order of the original Objects' keys (but this can
 * vary across JavaScript engines).
 *
 * @name map
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with the transformed item.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Results is an Array of the
 * transformed items from the `coll`. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback is passed
 * @example
 *
 * // file1.txt is a file that is 1000 bytes in size
 * // file2.txt is a file that is 2000 bytes in size
 * // file3.txt is a file that is 3000 bytes in size
 * // file4.txt does not exist
 *
 * const fileList = ['file1.txt','file2.txt','file3.txt'];
 * const withMissingFileList = ['file1.txt','file2.txt','file4.txt'];
 *
 * // asynchronous function that returns the file size in bytes
 * function getFileSizeInBytes(file, callback) {
 *     fs.stat(file, function(err, stat) {
 *         if (err) {
 *             return callback(err);
 *         }
 *         callback(null, stat.size);
 *     });
 * }
 *
 * // Using callbacks
 * async.map(fileList, getFileSizeInBytes, function(err, results) {
 *     if (err) {
 *         console.log(err);
 *     } else {
 *         console.log(results);
 *         // results is now an array of the file size in bytes for each file, e.g.
 *         // [ 1000, 2000, 3000]
 *     }
 * });
 *
 * // Error Handling
 * async.map(withMissingFileList, getFileSizeInBytes, function(err, results) {
 *     if (err) {
 *         console.log(err);
 *         // [ Error: ENOENT: no such file or directory ]
 *     } else {
 *         console.log(results);
 *     }
 * });
 *
 * // Using Promises
 * async.map(fileList, getFileSizeInBytes)
 * .then( results => {
 *     console.log(results);
 *     // results is now an array of the file size in bytes for each file, e.g.
 *     // [ 1000, 2000, 3000]
 * }).catch( err => {
 *     console.log(err);
 * });
 *
 * // Error Handling
 * async.map(withMissingFileList, getFileSizeInBytes)
 * .then( results => {
 *     console.log(results);
 * }).catch( err => {
 *     console.log(err);
 *     // [ Error: ENOENT: no such file or directory ]
 * });
 *
 * // Using async/await
 * async () => {
 *     try {
 *         let results = await async.map(fileList, getFileSizeInBytes);
 *         console.log(results);
 *         // results is now an array of the file size in bytes for each file, e.g.
 *         // [ 1000, 2000, 3000]
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 * // Error Handling
 * async () => {
 *     try {
 *         let results = await async.map(withMissingFileList, getFileSizeInBytes);
 *         console.log(results);
 *     }
 *     catch (err) {
 *         console.log(err);
 *         // [ Error: ENOENT: no such file or directory ]
 *     }
 * }
 *
 */
function map (coll, iteratee, callback) {
    return _asyncMap(eachOf$1, coll, iteratee, callback)
}
var map$1 = awaitify(map, 3);

/**
 * Applies the provided arguments to each function in the array, calling
 * `callback` after all functions have completed. If you only provide the first
 * argument, `fns`, then it will return a function which lets you pass in the
 * arguments as if it were a single function call. If more arguments are
 * provided, `callback` is required while `args` is still optional. The results
 * for each of the applied async functions are passed to the final callback
 * as an array.
 *
 * @name applyEach
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|AsyncIterable|Object} fns - A collection of {@link AsyncFunction}s
 * to all call with the same arguments
 * @param {...*} [args] - any number of separate arguments to pass to the
 * function.
 * @param {Function} [callback] - the final argument should be the callback,
 * called when all functions have completed processing.
 * @returns {AsyncFunction} - Returns a function that takes no args other than
 * an optional callback, that is the result of applying the `args` to each
 * of the functions.
 * @example
 *
 * const appliedFn = async.applyEach([enableSearch, updateSchema], 'bucket')
 *
 * appliedFn((err, results) => {
 *     // results[0] is the results for `enableSearch`
 *     // results[1] is the results for `updateSchema`
 * });
 *
 * // partial application example:
 * async.each(
 *     buckets,
 *     async (bucket) => async.applyEach([enableSearch, updateSchema], bucket)(),
 *     callback
 * );
 */
var applyEach = applyEach$1(map$1);

/**
 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs only a single async operation at a time.
 *
 * @name eachOfSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.eachOf]{@link module:Collections.eachOf}
 * @alias forEachOfSeries
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 */
function eachOfSeries(coll, iteratee, callback) {
    return eachOfLimit$1(coll, 1, iteratee, callback)
}
var eachOfSeries$1 = awaitify(eachOfSeries, 3);

/**
 * The same as [`map`]{@link module:Collections.map} but runs only a single async operation at a time.
 *
 * @name mapSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.map]{@link module:Collections.map}
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with the transformed item.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Results is an array of the
 * transformed items from the `coll`. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback is passed
 */
function mapSeries (coll, iteratee, callback) {
    return _asyncMap(eachOfSeries$1, coll, iteratee, callback)
}
var mapSeries$1 = awaitify(mapSeries, 3);

/**
 * The same as [`applyEach`]{@link module:ControlFlow.applyEach} but runs only a single async operation at a time.
 *
 * @name applyEachSeries
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.applyEach]{@link module:ControlFlow.applyEach}
 * @category Control Flow
 * @param {Array|Iterable|AsyncIterable|Object} fns - A collection of {@link AsyncFunction}s to all
 * call with the same arguments
 * @param {...*} [args] - any number of separate arguments to pass to the
 * function.
 * @param {Function} [callback] - the final argument should be the callback,
 * called when all functions have completed processing.
 * @returns {AsyncFunction} - A function, that when called, is the result of
 * appling the `args` to the list of functions.  It takes no args, other than
 * a callback.
 */
var applyEachSeries = applyEach$1(mapSeries$1);

const PROMISE_SYMBOL = Symbol('promiseCallback');

function promiseCallback () {
    let resolve, reject;
    function callback (err, ...args) {
        if (err) return reject(err)
        resolve(args.length > 1 ? args : args[0]);
    }

    callback[PROMISE_SYMBOL] = new Promise((res, rej) => {
        resolve = res,
        reject = rej;
    });

    return callback
}

/**
 * Determines the best order for running the {@link AsyncFunction}s in `tasks`, based on
 * their requirements. Each function can optionally depend on other functions
 * being completed first, and each function is run as soon as its requirements
 * are satisfied.
 *
 * If any of the {@link AsyncFunction}s pass an error to their callback, the `auto` sequence
 * will stop. Further tasks will not execute (so any other functions depending
 * on it will not run), and the main `callback` is immediately called with the
 * error.
 *
 * {@link AsyncFunction}s also receive an object containing the results of functions which
 * have completed so far as the first argument, if they have dependencies. If a
 * task function has no dependencies, it will only be passed a callback.
 *
 * @name auto
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Object} tasks - An object. Each of its properties is either a
 * function or an array of requirements, with the {@link AsyncFunction} itself the last item
 * in the array. The object's key of a property serves as the name of the task
 * defined by that property, i.e. can be used when specifying requirements for
 * other tasks. The function receives one or two arguments:
 * * a `results` object, containing the results of the previously executed
 *   functions, only passed if the task has any dependencies,
 * * a `callback(err, result)` function, which must be called when finished,
 *   passing an `error` (which can be `null`) and the result of the function's
 *   execution.
 * @param {number} [concurrency=Infinity] - An optional `integer` for
 * determining the maximum number of tasks that can be run in parallel. By
 * default, as many as possible.
 * @param {Function} [callback] - An optional callback which is called when all
 * the tasks have been completed. It receives the `err` argument if any `tasks`
 * pass an error to their callback. Results are always returned; however, if an
 * error occurs, no further `tasks` will be performed, and the results object
 * will only contain partial results. Invoked with (err, results).
 * @returns {Promise} a promise, if a callback is not passed
 * @example
 *
 * //Using Callbacks
 * async.auto({
 *     get_data: function(callback) {
 *         // async code to get some data
 *         callback(null, 'data', 'converted to array');
 *     },
 *     make_folder: function(callback) {
 *         // async code to create a directory to store a file in
 *         // this is run at the same time as getting the data
 *         callback(null, 'folder');
 *     },
 *     write_file: ['get_data', 'make_folder', function(results, callback) {
 *         // once there is some data and the directory exists,
 *         // write the data to a file in the directory
 *         callback(null, 'filename');
 *     }],
 *     email_link: ['write_file', function(results, callback) {
 *         // once the file is written let's email a link to it...
 *         callback(null, {'file':results.write_file, 'email':'user@example.com'});
 *     }]
 * }, function(err, results) {
 *     if (err) {
 *         console.log('err = ', err);
 *     }
 *     console.log('results = ', results);
 *     // results = {
 *     //     get_data: ['data', 'converted to array']
 *     //     make_folder; 'folder',
 *     //     write_file: 'filename'
 *     //     email_link: { file: 'filename', email: 'user@example.com' }
 *     // }
 * });
 *
 * //Using Promises
 * async.auto({
 *     get_data: function(callback) {
 *         console.log('in get_data');
 *         // async code to get some data
 *         callback(null, 'data', 'converted to array');
 *     },
 *     make_folder: function(callback) {
 *         console.log('in make_folder');
 *         // async code to create a directory to store a file in
 *         // this is run at the same time as getting the data
 *         callback(null, 'folder');
 *     },
 *     write_file: ['get_data', 'make_folder', function(results, callback) {
 *         // once there is some data and the directory exists,
 *         // write the data to a file in the directory
 *         callback(null, 'filename');
 *     }],
 *     email_link: ['write_file', function(results, callback) {
 *         // once the file is written let's email a link to it...
 *         callback(null, {'file':results.write_file, 'email':'user@example.com'});
 *     }]
 * }).then(results => {
 *     console.log('results = ', results);
 *     // results = {
 *     //     get_data: ['data', 'converted to array']
 *     //     make_folder; 'folder',
 *     //     write_file: 'filename'
 *     //     email_link: { file: 'filename', email: 'user@example.com' }
 *     // }
 * }).catch(err => {
 *     console.log('err = ', err);
 * });
 *
 * //Using async/await
 * async () => {
 *     try {
 *         let results = await async.auto({
 *             get_data: function(callback) {
 *                 // async code to get some data
 *                 callback(null, 'data', 'converted to array');
 *             },
 *             make_folder: function(callback) {
 *                 // async code to create a directory to store a file in
 *                 // this is run at the same time as getting the data
 *                 callback(null, 'folder');
 *             },
 *             write_file: ['get_data', 'make_folder', function(results, callback) {
 *                 // once there is some data and the directory exists,
 *                 // write the data to a file in the directory
 *                 callback(null, 'filename');
 *             }],
 *             email_link: ['write_file', function(results, callback) {
 *                 // once the file is written let's email a link to it...
 *                 callback(null, {'file':results.write_file, 'email':'user@example.com'});
 *             }]
 *         });
 *         console.log('results = ', results);
 *         // results = {
 *         //     get_data: ['data', 'converted to array']
 *         //     make_folder; 'folder',
 *         //     write_file: 'filename'
 *         //     email_link: { file: 'filename', email: 'user@example.com' }
 *         // }
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 */
function auto(tasks, concurrency, callback) {
    if (typeof concurrency !== 'number') {
        // concurrency is optional, shift the args.
        callback = concurrency;
        concurrency = null;
    }
    callback = once(callback || promiseCallback());
    var numTasks = Object.keys(tasks).length;
    if (!numTasks) {
        return callback(null);
    }
    if (!concurrency) {
        concurrency = numTasks;
    }

    var results = {};
    var runningTasks = 0;
    var canceled = false;
    var hasError = false;

    var listeners = Object.create(null);

    var readyTasks = [];

    // for cycle detection:
    var readyToCheck = []; // tasks that have been identified as reachable
    // without the possibility of returning to an ancestor task
    var uncheckedDependencies = {};

    Object.keys(tasks).forEach(key => {
        var task = tasks[key];
        if (!Array.isArray(task)) {
            // no dependencies
            enqueueTask(key, [task]);
            readyToCheck.push(key);
            return;
        }

        var dependencies = task.slice(0, task.length - 1);
        var remainingDependencies = dependencies.length;
        if (remainingDependencies === 0) {
            enqueueTask(key, task);
            readyToCheck.push(key);
            return;
        }
        uncheckedDependencies[key] = remainingDependencies;

        dependencies.forEach(dependencyName => {
            if (!tasks[dependencyName]) {
                throw new Error('async.auto task `' + key +
                    '` has a non-existent dependency `' +
                    dependencyName + '` in ' +
                    dependencies.join(', '));
            }
            addListener(dependencyName, () => {
                remainingDependencies--;
                if (remainingDependencies === 0) {
                    enqueueTask(key, task);
                }
            });
        });
    });

    checkForDeadlocks();
    processQueue();

    function enqueueTask(key, task) {
        readyTasks.push(() => runTask(key, task));
    }

    function processQueue() {
        if (canceled) return
        if (readyTasks.length === 0 && runningTasks === 0) {
            return callback(null, results);
        }
        while(readyTasks.length && runningTasks < concurrency) {
            var run = readyTasks.shift();
            run();
        }

    }

    function addListener(taskName, fn) {
        var taskListeners = listeners[taskName];
        if (!taskListeners) {
            taskListeners = listeners[taskName] = [];
        }

        taskListeners.push(fn);
    }

    function taskComplete(taskName) {
        var taskListeners = listeners[taskName] || [];
        taskListeners.forEach(fn => fn());
        processQueue();
    }


    function runTask(key, task) {
        if (hasError) return;

        var taskCallback = onlyOnce((err, ...result) => {
            runningTasks--;
            if (err === false) {
                canceled = true;
                return
            }
            if (result.length < 2) {
                [result] = result;
            }
            if (err) {
                var safeResults = {};
                Object.keys(results).forEach(rkey => {
                    safeResults[rkey] = results[rkey];
                });
                safeResults[key] = result;
                hasError = true;
                listeners = Object.create(null);
                if (canceled) return
                callback(err, safeResults);
            } else {
                results[key] = result;
                taskComplete(key);
            }
        });

        runningTasks++;
        var taskFn = wrapAsync(task[task.length - 1]);
        if (task.length > 1) {
            taskFn(results, taskCallback);
        } else {
            taskFn(taskCallback);
        }
    }

    function checkForDeadlocks() {
        // Kahn's algorithm
        // https://en.wikipedia.org/wiki/Topological_sorting#Kahn.27s_algorithm
        // http://connalle.blogspot.com/2013/10/topological-sortingkahn-algorithm.html
        var currentTask;
        var counter = 0;
        while (readyToCheck.length) {
            currentTask = readyToCheck.pop();
            counter++;
            getDependents(currentTask).forEach(dependent => {
                if (--uncheckedDependencies[dependent] === 0) {
                    readyToCheck.push(dependent);
                }
            });
        }

        if (counter !== numTasks) {
            throw new Error(
                'async.auto cannot execute tasks due to a recursive dependency'
            );
        }
    }

    function getDependents(taskName) {
        var result = [];
        Object.keys(tasks).forEach(key => {
            const task = tasks[key];
            if (Array.isArray(task) && task.indexOf(taskName) >= 0) {
                result.push(key);
            }
        });
        return result;
    }

    return callback[PROMISE_SYMBOL]
}

var FN_ARGS = /^(?:async\s)?(?:function)?\s*(?:\w+\s*)?\(([^)]+)\)(?:\s*{)/;
var ARROW_FN_ARGS = /^(?:async\s)?\s*(?:\(\s*)?((?:[^)=\s]\s*)*)(?:\)\s*)?=>/;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /(=.+)?(\s*)$/;

function stripComments(string) {
    let stripped = '';
    let index = 0;
    let endBlockComment = string.indexOf('*/');
    while (index < string.length) {
        if (string[index] === '/' && string[index+1] === '/') {
            // inline comment
            let endIndex = string.indexOf('\n', index);
            index = (endIndex === -1) ? string.length : endIndex;
        } else if ((endBlockComment !== -1) && (string[index] === '/') && (string[index+1] === '*')) {
            // block comment
            let endIndex = string.indexOf('*/', index);
            if (endIndex !== -1) {
                index = endIndex + 2;
                endBlockComment = string.indexOf('*/', index);
            } else {
                stripped += string[index];
                index++;
            }
        } else {
            stripped += string[index];
            index++;
        }
    }
    return stripped;
}

function parseParams(func) {
    const src = stripComments(func.toString());
    let match = src.match(FN_ARGS);
    if (!match) {
        match = src.match(ARROW_FN_ARGS);
    }
    if (!match) throw new Error('could not parse args in autoInject\nSource:\n' + src)
    let [, args] = match;
    return args
        .replace(/\s/g, '')
        .split(FN_ARG_SPLIT)
        .map((arg) => arg.replace(FN_ARG, '').trim());
}

/**
 * A dependency-injected version of the [async.auto]{@link module:ControlFlow.auto} function. Dependent
 * tasks are specified as parameters to the function, after the usual callback
 * parameter, with the parameter names matching the names of the tasks it
 * depends on. This can provide even more readable task graphs which can be
 * easier to maintain.
 *
 * If a final callback is specified, the task results are similarly injected,
 * specified as named parameters after the initial error parameter.
 *
 * The autoInject function is purely syntactic sugar and its semantics are
 * otherwise equivalent to [async.auto]{@link module:ControlFlow.auto}.
 *
 * @name autoInject
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.auto]{@link module:ControlFlow.auto}
 * @category Control Flow
 * @param {Object} tasks - An object, each of whose properties is an {@link AsyncFunction} of
 * the form 'func([dependencies...], callback). The object's key of a property
 * serves as the name of the task defined by that property, i.e. can be used
 * when specifying requirements for other tasks.
 * * The `callback` parameter is a `callback(err, result)` which must be called
 *   when finished, passing an `error` (which can be `null`) and the result of
 *   the function's execution. The remaining parameters name other tasks on
 *   which the task is dependent, and the results from those tasks are the
 *   arguments of those parameters.
 * @param {Function} [callback] - An optional callback which is called when all
 * the tasks have been completed. It receives the `err` argument if any `tasks`
 * pass an error to their callback, and a `results` object with any completed
 * task results, similar to `auto`.
 * @returns {Promise} a promise, if no callback is passed
 * @example
 *
 * //  The example from `auto` can be rewritten as follows:
 * async.autoInject({
 *     get_data: function(callback) {
 *         // async code to get some data
 *         callback(null, 'data', 'converted to array');
 *     },
 *     make_folder: function(callback) {
 *         // async code to create a directory to store a file in
 *         // this is run at the same time as getting the data
 *         callback(null, 'folder');
 *     },
 *     write_file: function(get_data, make_folder, callback) {
 *         // once there is some data and the directory exists,
 *         // write the data to a file in the directory
 *         callback(null, 'filename');
 *     },
 *     email_link: function(write_file, callback) {
 *         // once the file is written let's email a link to it...
 *         // write_file contains the filename returned by write_file.
 *         callback(null, {'file':write_file, 'email':'user@example.com'});
 *     }
 * }, function(err, results) {
 *     console.log('err = ', err);
 *     console.log('email_link = ', results.email_link);
 * });
 *
 * // If you are using a JS minifier that mangles parameter names, `autoInject`
 * // will not work with plain functions, since the parameter names will be
 * // collapsed to a single letter identifier.  To work around this, you can
 * // explicitly specify the names of the parameters your task function needs
 * // in an array, similar to Angular.js dependency injection.
 *
 * // This still has an advantage over plain `auto`, since the results a task
 * // depends on are still spread into arguments.
 * async.autoInject({
 *     //...
 *     write_file: ['get_data', 'make_folder', function(get_data, make_folder, callback) {
 *         callback(null, 'filename');
 *     }],
 *     email_link: ['write_file', function(write_file, callback) {
 *         callback(null, {'file':write_file, 'email':'user@example.com'});
 *     }]
 *     //...
 * }, function(err, results) {
 *     console.log('err = ', err);
 *     console.log('email_link = ', results.email_link);
 * });
 */
function autoInject(tasks, callback) {
    var newTasks = {};

    Object.keys(tasks).forEach(key => {
        var taskFn = tasks[key];
        var params;
        var fnIsAsync = isAsync(taskFn);
        var hasNoDeps =
            (!fnIsAsync && taskFn.length === 1) ||
            (fnIsAsync && taskFn.length === 0);

        if (Array.isArray(taskFn)) {
            params = [...taskFn];
            taskFn = params.pop();

            newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
        } else if (hasNoDeps) {
            // no dependencies, use the function as-is
            newTasks[key] = taskFn;
        } else {
            params = parseParams(taskFn);
            if ((taskFn.length === 0 && !fnIsAsync) && params.length === 0) {
                throw new Error("autoInject task functions require explicit parameters.");
            }

            // remove callback param
            if (!fnIsAsync) params.pop();

            newTasks[key] = params.concat(newTask);
        }

        function newTask(results, taskCb) {
            var newArgs = params.map(name => results[name]);
            newArgs.push(taskCb);
            wrapAsync(taskFn)(...newArgs);
        }
    });

    return auto(newTasks, callback);
}

// Simple doubly linked list (https://en.wikipedia.org/wiki/Doubly_linked_list) implementation
// used for queues. This implementation assumes that the node provided by the user can be modified
// to adjust the next and last properties. We implement only the minimal functionality
// for queue support.
class DLL {
    constructor() {
        this.head = this.tail = null;
        this.length = 0;
    }

    removeLink(node) {
        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;
        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev;

        node.prev = node.next = null;
        this.length -= 1;
        return node;
    }

    empty () {
        while(this.head) this.shift();
        return this;
    }

    insertAfter(node, newNode) {
        newNode.prev = node;
        newNode.next = node.next;
        if (node.next) node.next.prev = newNode;
        else this.tail = newNode;
        node.next = newNode;
        this.length += 1;
    }

    insertBefore(node, newNode) {
        newNode.prev = node.prev;
        newNode.next = node;
        if (node.prev) node.prev.next = newNode;
        else this.head = newNode;
        node.prev = newNode;
        this.length += 1;
    }

    unshift(node) {
        if (this.head) this.insertBefore(this.head, node);
        else setInitial(this, node);
    }

    push(node) {
        if (this.tail) this.insertAfter(this.tail, node);
        else setInitial(this, node);
    }

    shift() {
        return this.head && this.removeLink(this.head);
    }

    pop() {
        return this.tail && this.removeLink(this.tail);
    }

    toArray() {
        return [...this]
    }

    *[Symbol.iterator] () {
        var cur = this.head;
        while (cur) {
            yield cur.data;
            cur = cur.next;
        }
    }

    remove (testFn) {
        var curr = this.head;
        while(curr) {
            var {next} = curr;
            if (testFn(curr)) {
                this.removeLink(curr);
            }
            curr = next;
        }
        return this;
    }
}

function setInitial(dll, node) {
    dll.length = 1;
    dll.head = dll.tail = node;
}

function queue$1(worker, concurrency, payload) {
    if (concurrency == null) {
        concurrency = 1;
    }
    else if(concurrency === 0) {
        throw new RangeError('Concurrency must not be zero');
    }

    var _worker = wrapAsync(worker);
    var numRunning = 0;
    var workersList = [];
    const events = {
        error: [],
        drain: [],
        saturated: [],
        unsaturated: [],
        empty: []
    };

    function on (event, handler) {
        events[event].push(handler);
    }

    function once (event, handler) {
        const handleAndRemove = (...args) => {
            off(event, handleAndRemove);
            handler(...args);
        };
        events[event].push(handleAndRemove);
    }

    function off (event, handler) {
        if (!event) return Object.keys(events).forEach(ev => events[ev] = [])
        if (!handler) return events[event] = []
        events[event] = events[event].filter(ev => ev !== handler);
    }

    function trigger (event, ...args) {
        events[event].forEach(handler => handler(...args));
    }

    var processingScheduled = false;
    function _insert(data, insertAtFront, rejectOnError, callback) {
        if (callback != null && typeof callback !== 'function') {
            throw new Error('task callback must be a function');
        }
        q.started = true;

        var res, rej;
        function promiseCallback (err, ...args) {
            // we don't care about the error, let the global error handler
            // deal with it
            if (err) return rejectOnError ? rej(err) : res()
            if (args.length <= 1) return res(args[0])
            res(args);
        }

        var item = q._createTaskItem(
            data,
            rejectOnError ? promiseCallback :
                (callback || promiseCallback)
        );

        if (insertAtFront) {
            q._tasks.unshift(item);
        } else {
            q._tasks.push(item);
        }

        if (!processingScheduled) {
            processingScheduled = true;
            setImmediate$1(() => {
                processingScheduled = false;
                q.process();
            });
        }

        if (rejectOnError || !callback) {
            return new Promise((resolve, reject) => {
                res = resolve;
                rej = reject;
            })
        }
    }

    function _createCB(tasks) {
        return function (err, ...args) {
            numRunning -= 1;

            for (var i = 0, l = tasks.length; i < l; i++) {
                var task = tasks[i];

                var index = workersList.indexOf(task);
                if (index === 0) {
                    workersList.shift();
                } else if (index > 0) {
                    workersList.splice(index, 1);
                }

                task.callback(err, ...args);

                if (err != null) {
                    trigger('error', err, task.data);
                }
            }

            if (numRunning <= (q.concurrency - q.buffer) ) {
                trigger('unsaturated');
            }

            if (q.idle()) {
                trigger('drain');
            }
            q.process();
        };
    }

    function _maybeDrain(data) {
        if (data.length === 0 && q.idle()) {
            // call drain immediately if there are no tasks
            setImmediate$1(() => trigger('drain'));
            return true
        }
        return false
    }

    const eventMethod = (name) => (handler) => {
        if (!handler) {
            return new Promise((resolve, reject) => {
                once(name, (err, data) => {
                    if (err) return reject(err)
                    resolve(data);
                });
            })
        }
        off(name);
        on(name, handler);

    };

    var isProcessing = false;
    var q = {
        _tasks: new DLL(),
        _createTaskItem (data, callback) {
            return {
                data,
                callback
            };
        },
        *[Symbol.iterator] () {
            yield* q._tasks[Symbol.iterator]();
        },
        concurrency,
        payload,
        buffer: concurrency / 4,
        started: false,
        paused: false,
        push (data, callback) {
            if (Array.isArray(data)) {
                if (_maybeDrain(data)) return
                return data.map(datum => _insert(datum, false, false, callback))
            }
            return _insert(data, false, false, callback);
        },
        pushAsync (data, callback) {
            if (Array.isArray(data)) {
                if (_maybeDrain(data)) return
                return data.map(datum => _insert(datum, false, true, callback))
            }
            return _insert(data, false, true, callback);
        },
        kill () {
            off();
            q._tasks.empty();
        },
        unshift (data, callback) {
            if (Array.isArray(data)) {
                if (_maybeDrain(data)) return
                return data.map(datum => _insert(datum, true, false, callback))
            }
            return _insert(data, true, false, callback);
        },
        unshiftAsync (data, callback) {
            if (Array.isArray(data)) {
                if (_maybeDrain(data)) return
                return data.map(datum => _insert(datum, true, true, callback))
            }
            return _insert(data, true, true, callback);
        },
        remove (testFn) {
            q._tasks.remove(testFn);
        },
        process () {
            // Avoid trying to start too many processing operations. This can occur
            // when callbacks resolve synchronously (#1267).
            if (isProcessing) {
                return;
            }
            isProcessing = true;
            while(!q.paused && numRunning < q.concurrency && q._tasks.length){
                var tasks = [], data = [];
                var l = q._tasks.length;
                if (q.payload) l = Math.min(l, q.payload);
                for (var i = 0; i < l; i++) {
                    var node = q._tasks.shift();
                    tasks.push(node);
                    workersList.push(node);
                    data.push(node.data);
                }

                numRunning += 1;

                if (q._tasks.length === 0) {
                    trigger('empty');
                }

                if (numRunning === q.concurrency) {
                    trigger('saturated');
                }

                var cb = onlyOnce(_createCB(tasks));
                _worker(data, cb);
            }
            isProcessing = false;
        },
        length () {
            return q._tasks.length;
        },
        running () {
            return numRunning;
        },
        workersList () {
            return workersList;
        },
        idle() {
            return q._tasks.length + numRunning === 0;
        },
        pause () {
            q.paused = true;
        },
        resume () {
            if (q.paused === false) { return; }
            q.paused = false;
            setImmediate$1(q.process);
        }
    };
    // define these as fixed properties, so people get useful errors when updating
    Object.defineProperties(q, {
        saturated: {
            writable: false,
            value: eventMethod('saturated')
        },
        unsaturated: {
            writable: false,
            value: eventMethod('unsaturated')
        },
        empty: {
            writable: false,
            value: eventMethod('empty')
        },
        drain: {
            writable: false,
            value: eventMethod('drain')
        },
        error: {
            writable: false,
            value: eventMethod('error')
        },
    });
    return q;
}

/**
 * Creates a `cargo` object with the specified payload. Tasks added to the
 * cargo will be processed altogether (up to the `payload` limit). If the
 * `worker` is in progress, the task is queued until it becomes available. Once
 * the `worker` has completed some tasks, each callback of those tasks is
 * called. Check out [these](https://camo.githubusercontent.com/6bbd36f4cf5b35a0f11a96dcd2e97711ffc2fb37/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130382f62626330636662302d356632392d313165322d393734662d3333393763363464633835382e676966) [animations](https://camo.githubusercontent.com/f4810e00e1c5f5f8addbe3e9f49064fd5d102699/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130312f38346339323036362d356632392d313165322d383134662d3964336430323431336266642e676966)
 * for how `cargo` and `queue` work.
 *
 * While [`queue`]{@link module:ControlFlow.queue} passes only one task to one of a group of workers
 * at a time, cargo passes an array of tasks to a single worker, repeating
 * when the worker is finished.
 *
 * @name cargo
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.queue]{@link module:ControlFlow.queue}
 * @category Control Flow
 * @param {AsyncFunction} worker - An asynchronous function for processing an array
 * of queued tasks. Invoked with `(tasks, callback)`.
 * @param {number} [payload=Infinity] - An optional `integer` for determining
 * how many tasks should be processed per round; if omitted, the default is
 * unlimited.
 * @returns {module:ControlFlow.QueueObject} A cargo object to manage the tasks. Callbacks can
 * attached as certain properties to listen for specific events during the
 * lifecycle of the cargo and inner queue.
 * @example
 *
 * // create a cargo object with payload 2
 * var cargo = async.cargo(function(tasks, callback) {
 *     for (var i=0; i<tasks.length; i++) {
 *         console.log('hello ' + tasks[i].name);
 *     }
 *     callback();
 * }, 2);
 *
 * // add some items
 * cargo.push({name: 'foo'}, function(err) {
 *     console.log('finished processing foo');
 * });
 * cargo.push({name: 'bar'}, function(err) {
 *     console.log('finished processing bar');
 * });
 * await cargo.push({name: 'baz'});
 * console.log('finished processing baz');
 */
function cargo$1(worker, payload) {
    return queue$1(worker, 1, payload);
}

/**
 * Creates a `cargoQueue` object with the specified payload. Tasks added to the
 * cargoQueue will be processed together (up to the `payload` limit) in `concurrency` parallel workers.
 * If the all `workers` are in progress, the task is queued until one becomes available. Once
 * a `worker` has completed some tasks, each callback of those tasks is
 * called. Check out [these](https://camo.githubusercontent.com/6bbd36f4cf5b35a0f11a96dcd2e97711ffc2fb37/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130382f62626330636662302d356632392d313165322d393734662d3333393763363464633835382e676966) [animations](https://camo.githubusercontent.com/f4810e00e1c5f5f8addbe3e9f49064fd5d102699/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130312f38346339323036362d356632392d313165322d383134662d3964336430323431336266642e676966)
 * for how `cargo` and `queue` work.
 *
 * While [`queue`]{@link module:ControlFlow.queue} passes only one task to one of a group of workers
 * at a time, and [`cargo`]{@link module:ControlFlow.cargo} passes an array of tasks to a single worker,
 * the cargoQueue passes an array of tasks to multiple parallel workers.
 *
 * @name cargoQueue
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.queue]{@link module:ControlFlow.queue}
 * @see [async.cargo]{@link module:ControlFLow.cargo}
 * @category Control Flow
 * @param {AsyncFunction} worker - An asynchronous function for processing an array
 * of queued tasks. Invoked with `(tasks, callback)`.
 * @param {number} [concurrency=1] - An `integer` for determining how many
 * `worker` functions should be run in parallel.  If omitted, the concurrency
 * defaults to `1`.  If the concurrency is `0`, an error is thrown.
 * @param {number} [payload=Infinity] - An optional `integer` for determining
 * how many tasks should be processed per round; if omitted, the default is
 * unlimited.
 * @returns {module:ControlFlow.QueueObject} A cargoQueue object to manage the tasks. Callbacks can
 * attached as certain properties to listen for specific events during the
 * lifecycle of the cargoQueue and inner queue.
 * @example
 *
 * // create a cargoQueue object with payload 2 and concurrency 2
 * var cargoQueue = async.cargoQueue(function(tasks, callback) {
 *     for (var i=0; i<tasks.length; i++) {
 *         console.log('hello ' + tasks[i].name);
 *     }
 *     callback();
 * }, 2, 2);
 *
 * // add some items
 * cargoQueue.push({name: 'foo'}, function(err) {
 *     console.log('finished processing foo');
 * });
 * cargoQueue.push({name: 'bar'}, function(err) {
 *     console.log('finished processing bar');
 * });
 * cargoQueue.push({name: 'baz'}, function(err) {
 *     console.log('finished processing baz');
 * });
 * cargoQueue.push({name: 'boo'}, function(err) {
 *     console.log('finished processing boo');
 * });
 */
function cargo(worker, concurrency, payload) {
    return queue$1(worker, concurrency, payload);
}

/**
 * Reduces `coll` into a single value using an async `iteratee` to return each
 * successive step. `memo` is the initial state of the reduction. This function
 * only operates in series.
 *
 * For performance reasons, it may make sense to split a call to this function
 * into a parallel map, and then use the normal `Array.prototype.reduce` on the
 * results. This function is for situations where each step in the reduction
 * needs to be async; if you can get the data before reducing it, then it's
 * probably a good idea to do so.
 *
 * @name reduce
 * @static
 * @memberOf module:Collections
 * @method
 * @alias inject
 * @alias foldl
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {*} memo - The initial state of the reduction.
 * @param {AsyncFunction} iteratee - A function applied to each item in the
 * array to produce the next step in the reduction.
 * The `iteratee` should complete with the next state of the reduction.
 * If the iteratee completes with an error, the reduction is stopped and the
 * main `callback` is immediately called with the error.
 * Invoked with (memo, item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result is the reduced value. Invoked with
 * (err, result).
 * @returns {Promise} a promise, if no callback is passed
 * @example
 *
 * // file1.txt is a file that is 1000 bytes in size
 * // file2.txt is a file that is 2000 bytes in size
 * // file3.txt is a file that is 3000 bytes in size
 * // file4.txt does not exist
 *
 * const fileList = ['file1.txt','file2.txt','file3.txt'];
 * const withMissingFileList = ['file1.txt','file2.txt','file3.txt', 'file4.txt'];
 *
 * // asynchronous function that computes the file size in bytes
 * // file size is added to the memoized value, then returned
 * function getFileSizeInBytes(memo, file, callback) {
 *     fs.stat(file, function(err, stat) {
 *         if (err) {
 *             return callback(err);
 *         }
 *         callback(null, memo + stat.size);
 *     });
 * }
 *
 * // Using callbacks
 * async.reduce(fileList, 0, getFileSizeInBytes, function(err, result) {
 *     if (err) {
 *         console.log(err);
 *     } else {
 *         console.log(result);
 *         // 6000
 *         // which is the sum of the file sizes of the three files
 *     }
 * });
 *
 * // Error Handling
 * async.reduce(withMissingFileList, 0, getFileSizeInBytes, function(err, result) {
 *     if (err) {
 *         console.log(err);
 *         // [ Error: ENOENT: no such file or directory ]
 *     } else {
 *         console.log(result);
 *     }
 * });
 *
 * // Using Promises
 * async.reduce(fileList, 0, getFileSizeInBytes)
 * .then( result => {
 *     console.log(result);
 *     // 6000
 *     // which is the sum of the file sizes of the three files
 * }).catch( err => {
 *     console.log(err);
 * });
 *
 * // Error Handling
 * async.reduce(withMissingFileList, 0, getFileSizeInBytes)
 * .then( result => {
 *     console.log(result);
 * }).catch( err => {
 *     console.log(err);
 *     // [ Error: ENOENT: no such file or directory ]
 * });
 *
 * // Using async/await
 * async () => {
 *     try {
 *         let result = await async.reduce(fileList, 0, getFileSizeInBytes);
 *         console.log(result);
 *         // 6000
 *         // which is the sum of the file sizes of the three files
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 * // Error Handling
 * async () => {
 *     try {
 *         let result = await async.reduce(withMissingFileList, 0, getFileSizeInBytes);
 *         console.log(result);
 *     }
 *     catch (err) {
 *         console.log(err);
 *         // [ Error: ENOENT: no such file or directory ]
 *     }
 * }
 *
 */
function reduce(coll, memo, iteratee, callback) {
    callback = once(callback);
    var _iteratee = wrapAsync(iteratee);
    return eachOfSeries$1(coll, (x, i, iterCb) => {
        _iteratee(memo, x, (err, v) => {
            memo = v;
            iterCb(err);
        });
    }, err => callback(err, memo));
}
var reduce$1 = awaitify(reduce, 4);

/**
 * Version of the compose function that is more natural to read. Each function
 * consumes the return value of the previous function. It is the equivalent of
 * [compose]{@link module:ControlFlow.compose} with the arguments reversed.
 *
 * Each function is executed with the `this` binding of the composed function.
 *
 * @name seq
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.compose]{@link module:ControlFlow.compose}
 * @category Control Flow
 * @param {...AsyncFunction} functions - the asynchronous functions to compose
 * @returns {Function} a function that composes the `functions` in order
 * @example
 *
 * // Requires lodash (or underscore), express3 and dresende's orm2.
 * // Part of an app, that fetches cats of the logged user.
 * // This example uses `seq` function to avoid overnesting and error
 * // handling clutter.
 * app.get('/cats', function(request, response) {
 *     var User = request.models.User;
 *     async.seq(
 *         User.get.bind(User),  // 'User.get' has signature (id, callback(err, data))
 *         function(user, fn) {
 *             user.getCats(fn);      // 'getCats' has signature (callback(err, data))
 *         }
 *     )(req.session.user_id, function (err, cats) {
 *         if (err) {
 *             console.error(err);
 *             response.json({ status: 'error', message: err.message });
 *         } else {
 *             response.json({ status: 'ok', message: 'Cats found', data: cats });
 *         }
 *     });
 * });
 */
function seq(...functions) {
    var _functions = functions.map(wrapAsync);
    return function (...args) {
        var that = this;

        var cb = args[args.length - 1];
        if (typeof cb == 'function') {
            args.pop();
        } else {
            cb = promiseCallback();
        }

        reduce$1(_functions, args, (newargs, fn, iterCb) => {
            fn.apply(that, newargs.concat((err, ...nextargs) => {
                iterCb(err, nextargs);
            }));
        },
        (err, results) => cb(err, ...results));

        return cb[PROMISE_SYMBOL]
    };
}

/**
 * Creates a function which is a composition of the passed asynchronous
 * functions. Each function consumes the return value of the function that
 * follows. Composing functions `f()`, `g()`, and `h()` would produce the result
 * of `f(g(h()))`, only this version uses callbacks to obtain the return values.
 *
 * If the last argument to the composed function is not a function, a promise
 * is returned when you call it.
 *
 * Each function is executed with the `this` binding of the composed function.
 *
 * @name compose
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {...AsyncFunction} functions - the asynchronous functions to compose
 * @returns {Function} an asynchronous function that is the composed
 * asynchronous `functions`
 * @example
 *
 * function add1(n, callback) {
 *     setTimeout(function () {
 *         callback(null, n + 1);
 *     }, 10);
 * }
 *
 * function mul3(n, callback) {
 *     setTimeout(function () {
 *         callback(null, n * 3);
 *     }, 10);
 * }
 *
 * var add1mul3 = async.compose(mul3, add1);
 * add1mul3(4, function (err, result) {
 *     // result now equals 15
 * });
 */
function compose(...args) {
    return seq(...args.reverse());
}

/**
 * The same as [`map`]{@link module:Collections.map} but runs a maximum of `limit` async operations at a time.
 *
 * @name mapLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.map]{@link module:Collections.map}
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with the transformed item.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Results is an array of the
 * transformed items from the `coll`. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback is passed
 */
function mapLimit (coll, limit, iteratee, callback) {
    return _asyncMap(eachOfLimit$2(limit), coll, iteratee, callback)
}
var mapLimit$1 = awaitify(mapLimit, 4);

/**
 * The same as [`concat`]{@link module:Collections.concat} but runs a maximum of `limit` async operations at a time.
 *
 * @name concatLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.concat]{@link module:Collections.concat}
 * @category Collection
 * @alias flatMapLimit
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`,
 * which should use an array as its result. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is an array
 * containing the concatenated results of the `iteratee` function. Invoked with
 * (err, results).
 * @returns A Promise, if no callback is passed
 */
function concatLimit(coll, limit, iteratee, callback) {
    var _iteratee = wrapAsync(iteratee);
    return mapLimit$1(coll, limit, (val, iterCb) => {
        _iteratee(val, (err, ...args) => {
            if (err) return iterCb(err);
            return iterCb(err, args);
        });
    }, (err, mapResults) => {
        var result = [];
        for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
                result = result.concat(...mapResults[i]);
            }
        }

        return callback(err, result);
    });
}
var concatLimit$1 = awaitify(concatLimit, 4);

/**
 * Applies `iteratee` to each item in `coll`, concatenating the results. Returns
 * the concatenated list. The `iteratee`s are called in parallel, and the
 * results are concatenated as they return. The results array will be returned in
 * the original order of `coll` passed to the `iteratee` function.
 *
 * @name concat
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @alias flatMap
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`,
 * which should use an array as its result. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is an array
 * containing the concatenated results of the `iteratee` function. Invoked with
 * (err, results).
 * @returns A Promise, if no callback is passed
 * @example
 *
 * // dir1 is a directory that contains file1.txt, file2.txt
 * // dir2 is a directory that contains file3.txt, file4.txt
 * // dir3 is a directory that contains file5.txt
 * // dir4 does not exist
 *
 * let directoryList = ['dir1','dir2','dir3'];
 * let withMissingDirectoryList = ['dir1','dir2','dir3', 'dir4'];
 *
 * // Using callbacks
 * async.concat(directoryList, fs.readdir, function(err, results) {
 *    if (err) {
 *        console.log(err);
 *    } else {
 *        console.log(results);
 *        // [ 'file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', file5.txt ]
 *    }
 * });
 *
 * // Error Handling
 * async.concat(withMissingDirectoryList, fs.readdir, function(err, results) {
 *    if (err) {
 *        console.log(err);
 *        // [ Error: ENOENT: no such file or directory ]
 *        // since dir4 does not exist
 *    } else {
 *        console.log(results);
 *    }
 * });
 *
 * // Using Promises
 * async.concat(directoryList, fs.readdir)
 * .then(results => {
 *     console.log(results);
 *     // [ 'file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', file5.txt ]
 * }).catch(err => {
 *      console.log(err);
 * });
 *
 * // Error Handling
 * async.concat(withMissingDirectoryList, fs.readdir)
 * .then(results => {
 *     console.log(results);
 * }).catch(err => {
 *     console.log(err);
 *     // [ Error: ENOENT: no such file or directory ]
 *     // since dir4 does not exist
 * });
 *
 * // Using async/await
 * async () => {
 *     try {
 *         let results = await async.concat(directoryList, fs.readdir);
 *         console.log(results);
 *         // [ 'file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', file5.txt ]
 *     } catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 * // Error Handling
 * async () => {
 *     try {
 *         let results = await async.concat(withMissingDirectoryList, fs.readdir);
 *         console.log(results);
 *     } catch (err) {
 *         console.log(err);
 *         // [ Error: ENOENT: no such file or directory ]
 *         // since dir4 does not exist
 *     }
 * }
 *
 */
function concat(coll, iteratee, callback) {
    return concatLimit$1(coll, Infinity, iteratee, callback)
}
var concat$1 = awaitify(concat, 3);

/**
 * The same as [`concat`]{@link module:Collections.concat} but runs only a single async operation at a time.
 *
 * @name concatSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.concat]{@link module:Collections.concat}
 * @category Collection
 * @alias flatMapSeries
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`.
 * The iteratee should complete with an array an array of results.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is an array
 * containing the concatenated results of the `iteratee` function. Invoked with
 * (err, results).
 * @returns A Promise, if no callback is passed
 */
function concatSeries(coll, iteratee, callback) {
    return concatLimit$1(coll, 1, iteratee, callback)
}
var concatSeries$1 = awaitify(concatSeries, 3);

/**
 * Returns a function that when called, calls-back with the values provided.
 * Useful as the first function in a [`waterfall`]{@link module:ControlFlow.waterfall}, or for plugging values in to
 * [`auto`]{@link module:ControlFlow.auto}.
 *
 * @name constant
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {...*} arguments... - Any number of arguments to automatically invoke
 * callback with.
 * @returns {AsyncFunction} Returns a function that when invoked, automatically
 * invokes the callback with the previous given arguments.
 * @example
 *
 * async.waterfall([
 *     async.constant(42),
 *     function (value, next) {
 *         // value === 42
 *     },
 *     //...
 * ], callback);
 *
 * async.waterfall([
 *     async.constant(filename, "utf8"),
 *     fs.readFile,
 *     function (fileData, next) {
 *         //...
 *     }
 *     //...
 * ], callback);
 *
 * async.auto({
 *     hostname: async.constant("https://server.net/"),
 *     port: findFreePort,
 *     launchServer: ["hostname", "port", function (options, cb) {
 *         startServer(options, cb);
 *     }],
 *     //...
 * }, callback);
 */
function constant$1(...args) {
    return function (...ignoredArgs/*, callback*/) {
        var callback = ignoredArgs.pop();
        return callback(null, ...args);
    };
}

function _createTester(check, getResult) {
    return (eachfn, arr, _iteratee, cb) => {
        var testPassed = false;
        var testResult;
        const iteratee = wrapAsync(_iteratee);
        eachfn(arr, (value, _, callback) => {
            iteratee(value, (err, result) => {
                if (err || err === false) return callback(err);

                if (check(result) && !testResult) {
                    testPassed = true;
                    testResult = getResult(true, value);
                    return callback(null, breakLoop);
                }
                callback();
            });
        }, err => {
            if (err) return cb(err);
            cb(null, testPassed ? testResult : getResult(false));
        });
    };
}

/**
 * Returns the first value in `coll` that passes an async truth test. The
 * `iteratee` is applied in parallel, meaning the first iteratee to return
 * `true` will fire the detect `callback` with that result. That means the
 * result might not be the first item in the original `coll` (in terms of order)
 * that passes the test.

 * If order within the original `coll` is important, then look at
 * [`detectSeries`]{@link module:Collections.detectSeries}.
 *
 * @name detect
 * @static
 * @memberOf module:Collections
 * @method
 * @alias find
 * @category Collections
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
 * The iteratee must complete with a boolean value as its result.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the `iteratee` functions have finished.
 * Result will be the first item in the array that passes the truth test
 * (iteratee) or the value `undefined` if none passed. Invoked with
 * (err, result).
 * @returns {Promise} a promise, if a callback is omitted
 * @example
 *
 * // dir1 is a directory that contains file1.txt, file2.txt
 * // dir2 is a directory that contains file3.txt, file4.txt
 * // dir3 is a directory that contains file5.txt
 *
 * // asynchronous function that checks if a file exists
 * function fileExists(file, callback) {
 *    fs.access(file, fs.constants.F_OK, (err) => {
 *        callback(null, !err);
 *    });
 * }
 *
 * async.detect(['file3.txt','file2.txt','dir1/file1.txt'], fileExists,
 *    function(err, result) {
 *        console.log(result);
 *        // dir1/file1.txt
 *        // result now equals the first file in the list that exists
 *    }
 *);
 *
 * // Using Promises
 * async.detect(['file3.txt','file2.txt','dir1/file1.txt'], fileExists)
 * .then(result => {
 *     console.log(result);
 *     // dir1/file1.txt
 *     // result now equals the first file in the list that exists
 * }).catch(err => {
 *     console.log(err);
 * });
 *
 * // Using async/await
 * async () => {
 *     try {
 *         let result = await async.detect(['file3.txt','file2.txt','dir1/file1.txt'], fileExists);
 *         console.log(result);
 *         // dir1/file1.txt
 *         // result now equals the file in the list that exists
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 */
function detect(coll, iteratee, callback) {
    return _createTester(bool => bool, (res, item) => item)(eachOf$1, coll, iteratee, callback)
}
var detect$1 = awaitify(detect, 3);

/**
 * The same as [`detect`]{@link module:Collections.detect} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name detectLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.detect]{@link module:Collections.detect}
 * @alias findLimit
 * @category Collections
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
 * The iteratee must complete with a boolean value as its result.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the `iteratee` functions have finished.
 * Result will be the first item in the array that passes the truth test
 * (iteratee) or the value `undefined` if none passed. Invoked with
 * (err, result).
 * @returns {Promise} a promise, if a callback is omitted
 */
function detectLimit(coll, limit, iteratee, callback) {
    return _createTester(bool => bool, (res, item) => item)(eachOfLimit$2(limit), coll, iteratee, callback)
}
var detectLimit$1 = awaitify(detectLimit, 4);

/**
 * The same as [`detect`]{@link module:Collections.detect} but runs only a single async operation at a time.
 *
 * @name detectSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.detect]{@link module:Collections.detect}
 * @alias findSeries
 * @category Collections
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
 * The iteratee must complete with a boolean value as its result.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the `iteratee` functions have finished.
 * Result will be the first item in the array that passes the truth test
 * (iteratee) or the value `undefined` if none passed. Invoked with
 * (err, result).
 * @returns {Promise} a promise, if a callback is omitted
 */
function detectSeries(coll, iteratee, callback) {
    return _createTester(bool => bool, (res, item) => item)(eachOfLimit$2(1), coll, iteratee, callback)
}

var detectSeries$1 = awaitify(detectSeries, 3);

function consoleFunc(name) {
    return (fn, ...args) => wrapAsync(fn)(...args, (err, ...resultArgs) => {
        /* istanbul ignore else */
        if (typeof console === 'object') {
            /* istanbul ignore else */
            if (err) {
                /* istanbul ignore else */
                if (console.error) {
                    console.error(err);
                }
            } else if (console[name]) { /* istanbul ignore else */
                resultArgs.forEach(x => console[name](x));
            }
        }
    })
}

/**
 * Logs the result of an [`async` function]{@link AsyncFunction} to the
 * `console` using `console.dir` to display the properties of the resulting object.
 * Only works in Node.js or in browsers that support `console.dir` and
 * `console.error` (such as FF and Chrome).
 * If multiple arguments are returned from the async function,
 * `console.dir` is called on each argument in order.
 *
 * @name dir
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} function - The function you want to eventually apply
 * all arguments to.
 * @param {...*} arguments... - Any number of arguments to apply to the function.
 * @example
 *
 * // in a module
 * var hello = function(name, callback) {
 *     setTimeout(function() {
 *         callback(null, {hello: name});
 *     }, 1000);
 * };
 *
 * // in the node repl
 * node> async.dir(hello, 'world');
 * {hello: 'world'}
 */
var dir = consoleFunc('dir');

/**
 * The post-check version of [`whilst`]{@link module:ControlFlow.whilst}. To reflect the difference in
 * the order of operations, the arguments `test` and `iteratee` are switched.
 *
 * `doWhilst` is to `whilst` as `do while` is to `while` in plain JavaScript.
 *
 * @name doWhilst
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.whilst]{@link module:ControlFlow.whilst}
 * @category Control Flow
 * @param {AsyncFunction} iteratee - A function which is called each time `test`
 * passes. Invoked with (callback).
 * @param {AsyncFunction} test - asynchronous truth test to perform after each
 * execution of `iteratee`. Invoked with (...args, callback), where `...args` are the
 * non-error args from the previous callback of `iteratee`.
 * @param {Function} [callback] - A callback which is called after the test
 * function has failed and repeated execution of `iteratee` has stopped.
 * `callback` will be passed an error and any arguments passed to the final
 * `iteratee`'s callback. Invoked with (err, [results]);
 * @returns {Promise} a promise, if no callback is passed
 */
function doWhilst(iteratee, test, callback) {
    callback = onlyOnce(callback);
    var _fn = wrapAsync(iteratee);
    var _test = wrapAsync(test);
    var results;

    function next(err, ...args) {
        if (err) return callback(err);
        if (err === false) return;
        results = args;
        _test(...args, check);
    }

    function check(err, truth) {
        if (err) return callback(err);
        if (err === false) return;
        if (!truth) return callback(null, ...results);
        _fn(next);
    }

    return check(null, true);
}

var doWhilst$1 = awaitify(doWhilst, 3);

/**
 * Like ['doWhilst']{@link module:ControlFlow.doWhilst}, except the `test` is inverted. Note the
 * argument ordering differs from `until`.
 *
 * @name doUntil
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.doWhilst]{@link module:ControlFlow.doWhilst}
 * @category Control Flow
 * @param {AsyncFunction} iteratee - An async function which is called each time
 * `test` fails. Invoked with (callback).
 * @param {AsyncFunction} test - asynchronous truth test to perform after each
 * execution of `iteratee`. Invoked with (...args, callback), where `...args` are the
 * non-error args from the previous callback of `iteratee`
 * @param {Function} [callback] - A callback which is called after the test
 * function has passed and repeated execution of `iteratee` has stopped. `callback`
 * will be passed an error and any arguments passed to the final `iteratee`'s
 * callback. Invoked with (err, [results]);
 * @returns {Promise} a promise, if no callback is passed
 */
function doUntil(iteratee, test, callback) {
    const _test = wrapAsync(test);
    return doWhilst$1(iteratee, (...args) => {
        const cb = args.pop();
        _test(...args, (err, truth) => cb (err, !truth));
    }, callback);
}

function _withoutIndex(iteratee) {
    return (value, index, callback) => iteratee(value, callback);
}

/**
 * Applies the function `iteratee` to each item in `coll`, in parallel.
 * The `iteratee` is called with an item from the list, and a callback for when
 * it has finished. If the `iteratee` passes an error to its `callback`, the
 * main `callback` (for the `each` function) is immediately called with the
 * error.
 *
 * Note, that since this function applies `iteratee` to each item in parallel,
 * there is no guarantee that the iteratee functions will complete in order.
 *
 * @name each
 * @static
 * @memberOf module:Collections
 * @method
 * @alias forEach
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to
 * each item in `coll`. Invoked with (item, callback).
 * The array index is not passed to the iteratee.
 * If you need the index, use `eachOf`.
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 * @example
 *
 * // dir1 is a directory that contains file1.txt, file2.txt
 * // dir2 is a directory that contains file3.txt, file4.txt
 * // dir3 is a directory that contains file5.txt
 * // dir4 does not exist
 *
 * const fileList = [ 'dir1/file2.txt', 'dir2/file3.txt', 'dir/file5.txt'];
 * const withMissingFileList = ['dir1/file1.txt', 'dir4/file2.txt'];
 *
 * // asynchronous function that deletes a file
 * const deleteFile = function(file, callback) {
 *     fs.unlink(file, callback);
 * };
 *
 * // Using callbacks
 * async.each(fileList, deleteFile, function(err) {
 *     if( err ) {
 *         console.log(err);
 *     } else {
 *         console.log('All files have been deleted successfully');
 *     }
 * });
 *
 * // Error Handling
 * async.each(withMissingFileList, deleteFile, function(err){
 *     console.log(err);
 *     // [ Error: ENOENT: no such file or directory ]
 *     // since dir4/file2.txt does not exist
 *     // dir1/file1.txt could have been deleted
 * });
 *
 * // Using Promises
 * async.each(fileList, deleteFile)
 * .then( () => {
 *     console.log('All files have been deleted successfully');
 * }).catch( err => {
 *     console.log(err);
 * });
 *
 * // Error Handling
 * async.each(fileList, deleteFile)
 * .then( () => {
 *     console.log('All files have been deleted successfully');
 * }).catch( err => {
 *     console.log(err);
 *     // [ Error: ENOENT: no such file or directory ]
 *     // since dir4/file2.txt does not exist
 *     // dir1/file1.txt could have been deleted
 * });
 *
 * // Using async/await
 * async () => {
 *     try {
 *         await async.each(files, deleteFile);
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 * // Error Handling
 * async () => {
 *     try {
 *         await async.each(withMissingFileList, deleteFile);
 *     }
 *     catch (err) {
 *         console.log(err);
 *         // [ Error: ENOENT: no such file or directory ]
 *         // since dir4/file2.txt does not exist
 *         // dir1/file1.txt could have been deleted
 *     }
 * }
 *
 */
function eachLimit$2(coll, iteratee, callback) {
    return eachOf$1(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}

var each = awaitify(eachLimit$2, 3);

/**
 * The same as [`each`]{@link module:Collections.each} but runs a maximum of `limit` async operations at a time.
 *
 * @name eachLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.each]{@link module:Collections.each}
 * @alias forEachLimit
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The array index is not passed to the iteratee.
 * If you need the index, use `eachOfLimit`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 */
function eachLimit(coll, limit, iteratee, callback) {
    return eachOfLimit$2(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}
var eachLimit$1 = awaitify(eachLimit, 4);

/**
 * The same as [`each`]{@link module:Collections.each} but runs only a single async operation at a time.
 *
 * Note, that unlike [`each`]{@link module:Collections.each}, this function applies iteratee to each item
 * in series and therefore the iteratee functions will complete in order.

 * @name eachSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.each]{@link module:Collections.each}
 * @alias forEachSeries
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each
 * item in `coll`.
 * The array index is not passed to the iteratee.
 * If you need the index, use `eachOfSeries`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 */
function eachSeries(coll, iteratee, callback) {
    return eachLimit$1(coll, 1, iteratee, callback)
}
var eachSeries$1 = awaitify(eachSeries, 3);

/**
 * Wrap an async function and ensure it calls its callback on a later tick of
 * the event loop.  If the function already calls its callback on a next tick,
 * no extra deferral is added. This is useful for preventing stack overflows
 * (`RangeError: Maximum call stack size exceeded`) and generally keeping
 * [Zalgo](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony)
 * contained. ES2017 `async` functions are returned as-is -- they are immune
 * to Zalgo's corrupting influences, as they always resolve on a later tick.
 *
 * @name ensureAsync
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} fn - an async function, one that expects a node-style
 * callback as its last argument.
 * @returns {AsyncFunction} Returns a wrapped function with the exact same call
 * signature as the function passed in.
 * @example
 *
 * function sometimesAsync(arg, callback) {
 *     if (cache[arg]) {
 *         return callback(null, cache[arg]); // this would be synchronous!!
 *     } else {
 *         doSomeIO(arg, callback); // this IO would be asynchronous
 *     }
 * }
 *
 * // this has a risk of stack overflows if many results are cached in a row
 * async.mapSeries(args, sometimesAsync, done);
 *
 * // this will defer sometimesAsync's callback if necessary,
 * // preventing stack overflows
 * async.mapSeries(args, async.ensureAsync(sometimesAsync), done);
 */
function ensureAsync(fn) {
    if (isAsync(fn)) return fn;
    return function (...args/*, callback*/) {
        var callback = args.pop();
        var sync = true;
        args.push((...innerArgs) => {
            if (sync) {
                setImmediate$1(() => callback(...innerArgs));
            } else {
                callback(...innerArgs);
            }
        });
        fn.apply(this, args);
        sync = false;
    };
}

/**
 * Returns `true` if every element in `coll` satisfies an async test. If any
 * iteratee call returns `false`, the main `callback` is immediately called.
 *
 * @name every
 * @static
 * @memberOf module:Collections
 * @method
 * @alias all
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collection in parallel.
 * The iteratee must complete with a boolean result value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result will be either `true` or `false`
 * depending on the values of the async tests. Invoked with (err, result).
 * @returns {Promise} a promise, if no callback provided
 * @example
 *
 * // dir1 is a directory that contains file1.txt, file2.txt
 * // dir2 is a directory that contains file3.txt, file4.txt
 * // dir3 is a directory that contains file5.txt
 * // dir4 does not exist
 *
 * const fileList = ['dir1/file1.txt','dir2/file3.txt','dir3/file5.txt'];
 * const withMissingFileList = ['file1.txt','file2.txt','file4.txt'];
 *
 * // asynchronous function that checks if a file exists
 * function fileExists(file, callback) {
 *    fs.access(file, fs.constants.F_OK, (err) => {
 *        callback(null, !err);
 *    });
 * }
 *
 * // Using callbacks
 * async.every(fileList, fileExists, function(err, result) {
 *     console.log(result);
 *     // true
 *     // result is true since every file exists
 * });
 *
 * async.every(withMissingFileList, fileExists, function(err, result) {
 *     console.log(result);
 *     // false
 *     // result is false since NOT every file exists
 * });
 *
 * // Using Promises
 * async.every(fileList, fileExists)
 * .then( result => {
 *     console.log(result);
 *     // true
 *     // result is true since every file exists
 * }).catch( err => {
 *     console.log(err);
 * });
 *
 * async.every(withMissingFileList, fileExists)
 * .then( result => {
 *     console.log(result);
 *     // false
 *     // result is false since NOT every file exists
 * }).catch( err => {
 *     console.log(err);
 * });
 *
 * // Using async/await
 * async () => {
 *     try {
 *         let result = await async.every(fileList, fileExists);
 *         console.log(result);
 *         // true
 *         // result is true since every file exists
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 * async () => {
 *     try {
 *         let result = await async.every(withMissingFileList, fileExists);
 *         console.log(result);
 *         // false
 *         // result is false since NOT every file exists
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 */
function every(coll, iteratee, callback) {
    return _createTester(bool => !bool, res => !res)(eachOf$1, coll, iteratee, callback)
}
var every$1 = awaitify(every, 3);

/**
 * The same as [`every`]{@link module:Collections.every} but runs a maximum of `limit` async operations at a time.
 *
 * @name everyLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.every]{@link module:Collections.every}
 * @alias allLimit
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collection in parallel.
 * The iteratee must complete with a boolean result value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result will be either `true` or `false`
 * depending on the values of the async tests. Invoked with (err, result).
 * @returns {Promise} a promise, if no callback provided
 */
function everyLimit(coll, limit, iteratee, callback) {
    return _createTester(bool => !bool, res => !res)(eachOfLimit$2(limit), coll, iteratee, callback)
}
var everyLimit$1 = awaitify(everyLimit, 4);

/**
 * The same as [`every`]{@link module:Collections.every} but runs only a single async operation at a time.
 *
 * @name everySeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.every]{@link module:Collections.every}
 * @alias allSeries
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collection in series.
 * The iteratee must complete with a boolean result value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result will be either `true` or `false`
 * depending on the values of the async tests. Invoked with (err, result).
 * @returns {Promise} a promise, if no callback provided
 */
function everySeries(coll, iteratee, callback) {
    return _createTester(bool => !bool, res => !res)(eachOfSeries$1, coll, iteratee, callback)
}
var everySeries$1 = awaitify(everySeries, 3);

function filterArray(eachfn, arr, iteratee, callback) {
    var truthValues = new Array(arr.length);
    eachfn(arr, (x, index, iterCb) => {
        iteratee(x, (err, v) => {
            truthValues[index] = !!v;
            iterCb(err);
        });
    }, err => {
        if (err) return callback(err);
        var results = [];
        for (var i = 0; i < arr.length; i++) {
            if (truthValues[i]) results.push(arr[i]);
        }
        callback(null, results);
    });
}

function filterGeneric(eachfn, coll, iteratee, callback) {
    var results = [];
    eachfn(coll, (x, index, iterCb) => {
        iteratee(x, (err, v) => {
            if (err) return iterCb(err);
            if (v) {
                results.push({index, value: x});
            }
            iterCb(err);
        });
    }, err => {
        if (err) return callback(err);
        callback(null, results
            .sort((a, b) => a.index - b.index)
            .map(v => v.value));
    });
}

function _filter(eachfn, coll, iteratee, callback) {
    var filter = isArrayLike(coll) ? filterArray : filterGeneric;
    return filter(eachfn, coll, wrapAsync(iteratee), callback);
}

/**
 * Returns a new array of all the values in `coll` which pass an async truth
 * test. This operation is performed in parallel, but the results array will be
 * in the same order as the original.
 *
 * @name filter
 * @static
 * @memberOf module:Collections
 * @method
 * @alias select
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
 * with a boolean argument once it has completed. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback provided
 * @example
 *
 * // dir1 is a directory that contains file1.txt, file2.txt
 * // dir2 is a directory that contains file3.txt, file4.txt
 * // dir3 is a directory that contains file5.txt
 *
 * const files = ['dir1/file1.txt','dir2/file3.txt','dir3/file6.txt'];
 *
 * // asynchronous function that checks if a file exists
 * function fileExists(file, callback) {
 *    fs.access(file, fs.constants.F_OK, (err) => {
 *        callback(null, !err);
 *    });
 * }
 *
 * // Using callbacks
 * async.filter(files, fileExists, function(err, results) {
 *    if(err) {
 *        console.log(err);
 *    } else {
 *        console.log(results);
 *        // [ 'dir1/file1.txt', 'dir2/file3.txt' ]
 *        // results is now an array of the existing files
 *    }
 * });
 *
 * // Using Promises
 * async.filter(files, fileExists)
 * .then(results => {
 *     console.log(results);
 *     // [ 'dir1/file1.txt', 'dir2/file3.txt' ]
 *     // results is now an array of the existing files
 * }).catch(err => {
 *     console.log(err);
 * });
 *
 * // Using async/await
 * async () => {
 *     try {
 *         let results = await async.filter(files, fileExists);
 *         console.log(results);
 *         // [ 'dir1/file1.txt', 'dir2/file3.txt' ]
 *         // results is now an array of the existing files
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 */
function filter (coll, iteratee, callback) {
    return _filter(eachOf$1, coll, iteratee, callback)
}
var filter$1 = awaitify(filter, 3);

/**
 * The same as [`filter`]{@link module:Collections.filter} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name filterLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.filter]{@link module:Collections.filter}
 * @alias selectLimit
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
 * with a boolean argument once it has completed. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback provided
 */
function filterLimit (coll, limit, iteratee, callback) {
    return _filter(eachOfLimit$2(limit), coll, iteratee, callback)
}
var filterLimit$1 = awaitify(filterLimit, 4);

/**
 * The same as [`filter`]{@link module:Collections.filter} but runs only a single async operation at a time.
 *
 * @name filterSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.filter]{@link module:Collections.filter}
 * @alias selectSeries
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
 * with a boolean argument once it has completed. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results)
 * @returns {Promise} a promise, if no callback provided
 */
function filterSeries (coll, iteratee, callback) {
    return _filter(eachOfSeries$1, coll, iteratee, callback)
}
var filterSeries$1 = awaitify(filterSeries, 3);

/**
 * Calls the asynchronous function `fn` with a callback parameter that allows it
 * to call itself again, in series, indefinitely.

 * If an error is passed to the callback then `errback` is called with the
 * error, and execution stops, otherwise it will never be called.
 *
 * @name forever
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {AsyncFunction} fn - an async function to call repeatedly.
 * Invoked with (next).
 * @param {Function} [errback] - when `fn` passes an error to it's callback,
 * this function will be called, and execution stops. Invoked with (err).
 * @returns {Promise} a promise that rejects if an error occurs and an errback
 * is not passed
 * @example
 *
 * async.forever(
 *     function(next) {
 *         // next is suitable for passing to things that need a callback(err [, whatever]);
 *         // it will result in this function being called again.
 *     },
 *     function(err) {
 *         // if next is called with a value in its first parameter, it will appear
 *         // in here as 'err', and execution will stop.
 *     }
 * );
 */
function forever(fn, errback) {
    var done = onlyOnce(errback);
    var task = wrapAsync(ensureAsync(fn));

    function next(err) {
        if (err) return done(err);
        if (err === false) return;
        task(next);
    }
    return next();
}
var forever$1 = awaitify(forever, 2);

/**
 * The same as [`groupBy`]{@link module:Collections.groupBy} but runs a maximum of `limit` async operations at a time.
 *
 * @name groupByLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.groupBy]{@link module:Collections.groupBy}
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a `key` to group the value under.
 * Invoked with (value, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Result is an `Object` whoses
 * properties are arrays of values which returned the corresponding key.
 * @returns {Promise} a promise, if no callback is passed
 */
function groupByLimit(coll, limit, iteratee, callback) {
    var _iteratee = wrapAsync(iteratee);
    return mapLimit$1(coll, limit, (val, iterCb) => {
        _iteratee(val, (err, key) => {
            if (err) return iterCb(err);
            return iterCb(err, {key, val});
        });
    }, (err, mapResults) => {
        var result = {};
        // from MDN, handle object having an `hasOwnProperty` prop
        var {hasOwnProperty} = Object.prototype;

        for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
                var {key} = mapResults[i];
                var {val} = mapResults[i];

                if (hasOwnProperty.call(result, key)) {
                    result[key].push(val);
                } else {
                    result[key] = [val];
                }
            }
        }

        return callback(err, result);
    });
}

var groupByLimit$1 = awaitify(groupByLimit, 4);

/**
 * Returns a new object, where each value corresponds to an array of items, from
 * `coll`, that returned the corresponding key. That is, the keys of the object
 * correspond to the values passed to the `iteratee` callback.
 *
 * Note: Since this function applies the `iteratee` to each item in parallel,
 * there is no guarantee that the `iteratee` functions will complete in order.
 * However, the values for each key in the `result` will be in the same order as
 * the original `coll`. For Objects, the values will roughly be in the order of
 * the original Objects' keys (but this can vary across JavaScript engines).
 *
 * @name groupBy
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a `key` to group the value under.
 * Invoked with (value, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Result is an `Object` whoses
 * properties are arrays of values which returned the corresponding key.
 * @returns {Promise} a promise, if no callback is passed
 * @example
 *
 * // dir1 is a directory that contains file1.txt, file2.txt
 * // dir2 is a directory that contains file3.txt, file4.txt
 * // dir3 is a directory that contains file5.txt
 * // dir4 does not exist
 *
 * const files = ['dir1/file1.txt','dir2','dir4']
 *
 * // asynchronous function that detects file type as none, file, or directory
 * function detectFile(file, callback) {
 *     fs.stat(file, function(err, stat) {
 *         if (err) {
 *             return callback(null, 'none');
 *         }
 *         callback(null, stat.isDirectory() ? 'directory' : 'file');
 *     });
 * }
 *
 * //Using callbacks
 * async.groupBy(files, detectFile, function(err, result) {
 *     if(err) {
 *         console.log(err);
 *     } else {
 *	       console.log(result);
 *         // {
 *         //     file: [ 'dir1/file1.txt' ],
 *         //     none: [ 'dir4' ],
 *         //     directory: [ 'dir2']
 *         // }
 *         // result is object containing the files grouped by type
 *     }
 * });
 *
 * // Using Promises
 * async.groupBy(files, detectFile)
 * .then( result => {
 *     console.log(result);
 *     // {
 *     //     file: [ 'dir1/file1.txt' ],
 *     //     none: [ 'dir4' ],
 *     //     directory: [ 'dir2']
 *     // }
 *     // result is object containing the files grouped by type
 * }).catch( err => {
 *     console.log(err);
 * });
 *
 * // Using async/await
 * async () => {
 *     try {
 *         let result = await async.groupBy(files, detectFile);
 *         console.log(result);
 *         // {
 *         //     file: [ 'dir1/file1.txt' ],
 *         //     none: [ 'dir4' ],
 *         //     directory: [ 'dir2']
 *         // }
 *         // result is object containing the files grouped by type
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 */
function groupBy (coll, iteratee, callback) {
    return groupByLimit$1(coll, Infinity, iteratee, callback)
}

/**
 * The same as [`groupBy`]{@link module:Collections.groupBy} but runs only a single async operation at a time.
 *
 * @name groupBySeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.groupBy]{@link module:Collections.groupBy}
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a `key` to group the value under.
 * Invoked with (value, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Result is an `Object` whose
 * properties are arrays of values which returned the corresponding key.
 * @returns {Promise} a promise, if no callback is passed
 */
function groupBySeries (coll, iteratee, callback) {
    return groupByLimit$1(coll, 1, iteratee, callback)
}

/**
 * Logs the result of an `async` function to the `console`. Only works in
 * Node.js or in browsers that support `console.log` and `console.error` (such
 * as FF and Chrome). If multiple arguments are returned from the async
 * function, `console.log` is called on each argument in order.
 *
 * @name log
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} function - The function you want to eventually apply
 * all arguments to.
 * @param {...*} arguments... - Any number of arguments to apply to the function.
 * @example
 *
 * // in a module
 * var hello = function(name, callback) {
 *     setTimeout(function() {
 *         callback(null, 'hello ' + name);
 *     }, 1000);
 * };
 *
 * // in the node repl
 * node> async.log(hello, 'world');
 * 'hello world'
 */
var log = consoleFunc('log');

/**
 * The same as [`mapValues`]{@link module:Collections.mapValues} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name mapValuesLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.mapValues]{@link module:Collections.mapValues}
 * @category Collection
 * @param {Object} obj - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - A function to apply to each value and key
 * in `coll`.
 * The iteratee should complete with the transformed value as its result.
 * Invoked with (value, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. `result` is a new object consisting
 * of each key from `obj`, with each transformed value on the right-hand side.
 * Invoked with (err, result).
 * @returns {Promise} a promise, if no callback is passed
 */
function mapValuesLimit(obj, limit, iteratee, callback) {
    callback = once(callback);
    var newObj = {};
    var _iteratee = wrapAsync(iteratee);
    return eachOfLimit$2(limit)(obj, (val, key, next) => {
        _iteratee(val, key, (err, result) => {
            if (err) return next(err);
            newObj[key] = result;
            next(err);
        });
    }, err => callback(err, newObj));
}

var mapValuesLimit$1 = awaitify(mapValuesLimit, 4);

/**
 * A relative of [`map`]{@link module:Collections.map}, designed for use with objects.
 *
 * Produces a new Object by mapping each value of `obj` through the `iteratee`
 * function. The `iteratee` is called each `value` and `key` from `obj` and a
 * callback for when it has finished processing. Each of these callbacks takes
 * two arguments: an `error`, and the transformed item from `obj`. If `iteratee`
 * passes an error to its callback, the main `callback` (for the `mapValues`
 * function) is immediately called with the error.
 *
 * Note, the order of the keys in the result is not guaranteed.  The keys will
 * be roughly in the order they complete, (but this is very engine-specific)
 *
 * @name mapValues
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Object} obj - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each value and key
 * in `coll`.
 * The iteratee should complete with the transformed value as its result.
 * Invoked with (value, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. `result` is a new object consisting
 * of each key from `obj`, with each transformed value on the right-hand side.
 * Invoked with (err, result).
 * @returns {Promise} a promise, if no callback is passed
 * @example
 *
 * // file1.txt is a file that is 1000 bytes in size
 * // file2.txt is a file that is 2000 bytes in size
 * // file3.txt is a file that is 3000 bytes in size
 * // file4.txt does not exist
 *
 * const fileMap = {
 *     f1: 'file1.txt',
 *     f2: 'file2.txt',
 *     f3: 'file3.txt'
 * };
 *
 * const withMissingFileMap = {
 *     f1: 'file1.txt',
 *     f2: 'file2.txt',
 *     f3: 'file4.txt'
 * };
 *
 * // asynchronous function that returns the file size in bytes
 * function getFileSizeInBytes(file, key, callback) {
 *     fs.stat(file, function(err, stat) {
 *         if (err) {
 *             return callback(err);
 *         }
 *         callback(null, stat.size);
 *     });
 * }
 *
 * // Using callbacks
 * async.mapValues(fileMap, getFileSizeInBytes, function(err, result) {
 *     if (err) {
 *         console.log(err);
 *     } else {
 *         console.log(result);
 *         // result is now a map of file size in bytes for each file, e.g.
 *         // {
 *         //     f1: 1000,
 *         //     f2: 2000,
 *         //     f3: 3000
 *         // }
 *     }
 * });
 *
 * // Error handling
 * async.mapValues(withMissingFileMap, getFileSizeInBytes, function(err, result) {
 *     if (err) {
 *         console.log(err);
 *         // [ Error: ENOENT: no such file or directory ]
 *     } else {
 *         console.log(result);
 *     }
 * });
 *
 * // Using Promises
 * async.mapValues(fileMap, getFileSizeInBytes)
 * .then( result => {
 *     console.log(result);
 *     // result is now a map of file size in bytes for each file, e.g.
 *     // {
 *     //     f1: 1000,
 *     //     f2: 2000,
 *     //     f3: 3000
 *     // }
 * }).catch (err => {
 *     console.log(err);
 * });
 *
 * // Error Handling
 * async.mapValues(withMissingFileMap, getFileSizeInBytes)
 * .then( result => {
 *     console.log(result);
 * }).catch (err => {
 *     console.log(err);
 *     // [ Error: ENOENT: no such file or directory ]
 * });
 *
 * // Using async/await
 * async () => {
 *     try {
 *         let result = await async.mapValues(fileMap, getFileSizeInBytes);
 *         console.log(result);
 *         // result is now a map of file size in bytes for each file, e.g.
 *         // {
 *         //     f1: 1000,
 *         //     f2: 2000,
 *         //     f3: 3000
 *         // }
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 * // Error Handling
 * async () => {
 *     try {
 *         let result = await async.mapValues(withMissingFileMap, getFileSizeInBytes);
 *         console.log(result);
 *     }
 *     catch (err) {
 *         console.log(err);
 *         // [ Error: ENOENT: no such file or directory ]
 *     }
 * }
 *
 */
function mapValues(obj, iteratee, callback) {
    return mapValuesLimit$1(obj, Infinity, iteratee, callback)
}

/**
 * The same as [`mapValues`]{@link module:Collections.mapValues} but runs only a single async operation at a time.
 *
 * @name mapValuesSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.mapValues]{@link module:Collections.mapValues}
 * @category Collection
 * @param {Object} obj - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each value and key
 * in `coll`.
 * The iteratee should complete with the transformed value as its result.
 * Invoked with (value, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. `result` is a new object consisting
 * of each key from `obj`, with each transformed value on the right-hand side.
 * Invoked with (err, result).
 * @returns {Promise} a promise, if no callback is passed
 */
function mapValuesSeries(obj, iteratee, callback) {
    return mapValuesLimit$1(obj, 1, iteratee, callback)
}

/**
 * Caches the results of an async function. When creating a hash to store
 * function results against, the callback is omitted from the hash and an
 * optional hash function can be used.
 *
 * **Note: if the async function errs, the result will not be cached and
 * subsequent calls will call the wrapped function.**
 *
 * If no hash function is specified, the first argument is used as a hash key,
 * which may work reasonably if it is a string or a data type that converts to a
 * distinct string. Note that objects and arrays will not behave reasonably.
 * Neither will cases where the other arguments are significant. In such cases,
 * specify your own hash function.
 *
 * The cache of results is exposed as the `memo` property of the function
 * returned by `memoize`.
 *
 * @name memoize
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} fn - The async function to proxy and cache results from.
 * @param {Function} hasher - An optional function for generating a custom hash
 * for storing results. It has all the arguments applied to it apart from the
 * callback, and must be synchronous.
 * @returns {AsyncFunction} a memoized version of `fn`
 * @example
 *
 * var slow_fn = function(name, callback) {
 *     // do something
 *     callback(null, result);
 * };
 * var fn = async.memoize(slow_fn);
 *
 * // fn can now be used as if it were slow_fn
 * fn('some name', function() {
 *     // callback
 * });
 */
function memoize(fn, hasher = v => v) {
    var memo = Object.create(null);
    var queues = Object.create(null);
    var _fn = wrapAsync(fn);
    var memoized = initialParams((args, callback) => {
        var key = hasher(...args);
        if (key in memo) {
            setImmediate$1(() => callback(null, ...memo[key]));
        } else if (key in queues) {
            queues[key].push(callback);
        } else {
            queues[key] = [callback];
            _fn(...args, (err, ...resultArgs) => {
                // #1465 don't memoize if an error occurred
                if (!err) {
                    memo[key] = resultArgs;
                }
                var q = queues[key];
                delete queues[key];
                for (var i = 0, l = q.length; i < l; i++) {
                    q[i](err, ...resultArgs);
                }
            });
        }
    });
    memoized.memo = memo;
    memoized.unmemoized = fn;
    return memoized;
}

/* istanbul ignore file */

/**
 * Calls `callback` on a later loop around the event loop. In Node.js this just
 * calls `process.nextTick`.  In the browser it will use `setImmediate` if
 * available, otherwise `setTimeout(callback, 0)`, which means other higher
 * priority events may precede the execution of `callback`.
 *
 * This is used internally for browser-compatibility purposes.
 *
 * @name nextTick
 * @static
 * @memberOf module:Utils
 * @method
 * @see [async.setImmediate]{@link module:Utils.setImmediate}
 * @category Util
 * @param {Function} callback - The function to call on a later loop around
 * the event loop. Invoked with (args...).
 * @param {...*} args... - any number of additional arguments to pass to the
 * callback on the next tick.
 * @example
 *
 * var call_order = [];
 * async.nextTick(function() {
 *     call_order.push('two');
 *     // call_order now equals ['one','two']
 * });
 * call_order.push('one');
 *
 * async.setImmediate(function (a, b, c) {
 *     // a, b, and c equal 1, 2, and 3
 * }, 1, 2, 3);
 */
var _defer;

if (hasNextTick) {
    _defer = process.nextTick;
} else if (hasSetImmediate) {
    _defer = setImmediate;
} else {
    _defer = fallback;
}

var nextTick = wrap(_defer);

var _parallel = awaitify((eachfn, tasks, callback) => {
    var results = isArrayLike(tasks) ? [] : {};

    eachfn(tasks, (task, key, taskCb) => {
        wrapAsync(task)((err, ...result) => {
            if (result.length < 2) {
                [result] = result;
            }
            results[key] = result;
            taskCb(err);
        });
    }, err => callback(err, results));
}, 3);

/**
 * Run the `tasks` collection of functions in parallel, without waiting until
 * the previous function has completed. If any of the functions pass an error to
 * its callback, the main `callback` is immediately called with the value of the
 * error. Once the `tasks` have completed, the results are passed to the final
 * `callback` as an array.
 *
 * **Note:** `parallel` is about kicking-off I/O tasks in parallel, not about
 * parallel execution of code.  If your tasks do not use any timers or perform
 * any I/O, they will actually be executed in series.  Any synchronous setup
 * sections for each task will happen one after the other.  JavaScript remains
 * single-threaded.
 *
 * **Hint:** Use [`reflect`]{@link module:Utils.reflect} to continue the
 * execution of other tasks when a task fails.
 *
 * It is also possible to use an object instead of an array. Each property will
 * be run as a function and the results will be passed to the final `callback`
 * as an object instead of an array. This can be a more readable way of handling
 * results from {@link async.parallel}.
 *
 * @name parallel
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|AsyncIterable|Object} tasks - A collection of
 * [async functions]{@link AsyncFunction} to run.
 * Each async function can complete with any number of optional `result` values.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed successfully. This function gets a results array
 * (or object) containing all the result arguments passed to the task callbacks.
 * Invoked with (err, results).
 * @returns {Promise} a promise, if a callback is not passed
 *
 * @example
 *
 * //Using Callbacks
 * async.parallel([
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ], function(err, results) {
 *     console.log(results);
 *     // results is equal to ['one','two'] even though
 *     // the second function had a shorter timeout.
 * });
 *
 * // an example using an object instead of an array
 * async.parallel({
 *     one: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 1);
 *         }, 200);
 *     },
 *     two: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 2);
 *         }, 100);
 *     }
 * }, function(err, results) {
 *     console.log(results);
 *     // results is equal to: { one: 1, two: 2 }
 * });
 *
 * //Using Promises
 * async.parallel([
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ]).then(results => {
 *     console.log(results);
 *     // results is equal to ['one','two'] even though
 *     // the second function had a shorter timeout.
 * }).catch(err => {
 *     console.log(err);
 * });
 *
 * // an example using an object instead of an array
 * async.parallel({
 *     one: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 1);
 *         }, 200);
 *     },
 *     two: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 2);
 *         }, 100);
 *     }
 * }).then(results => {
 *     console.log(results);
 *     // results is equal to: { one: 1, two: 2 }
 * }).catch(err => {
 *     console.log(err);
 * });
 *
 * //Using async/await
 * async () => {
 *     try {
 *         let results = await async.parallel([
 *             function(callback) {
 *                 setTimeout(function() {
 *                     callback(null, 'one');
 *                 }, 200);
 *             },
 *             function(callback) {
 *                 setTimeout(function() {
 *                     callback(null, 'two');
 *                 }, 100);
 *             }
 *         ]);
 *         console.log(results);
 *         // results is equal to ['one','two'] even though
 *         // the second function had a shorter timeout.
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 * // an example using an object instead of an array
 * async () => {
 *     try {
 *         let results = await async.parallel({
 *             one: function(callback) {
 *                 setTimeout(function() {
 *                     callback(null, 1);
 *                 }, 200);
 *             },
 *            two: function(callback) {
 *                 setTimeout(function() {
 *                     callback(null, 2);
 *                 }, 100);
 *            }
 *         });
 *         console.log(results);
 *         // results is equal to: { one: 1, two: 2 }
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 */
function parallel(tasks, callback) {
    return _parallel(eachOf$1, tasks, callback);
}

/**
 * The same as [`parallel`]{@link module:ControlFlow.parallel} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name parallelLimit
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.parallel]{@link module:ControlFlow.parallel}
 * @category Control Flow
 * @param {Array|Iterable|AsyncIterable|Object} tasks - A collection of
 * [async functions]{@link AsyncFunction} to run.
 * Each async function can complete with any number of optional `result` values.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed successfully. This function gets a results array
 * (or object) containing all the result arguments passed to the task callbacks.
 * Invoked with (err, results).
 * @returns {Promise} a promise, if a callback is not passed
 */
function parallelLimit(tasks, limit, callback) {
    return _parallel(eachOfLimit$2(limit), tasks, callback);
}

/**
 * A queue of tasks for the worker function to complete.
 * @typedef {Iterable} QueueObject
 * @memberOf module:ControlFlow
 * @property {Function} length - a function returning the number of items
 * waiting to be processed. Invoke with `queue.length()`.
 * @property {boolean} started - a boolean indicating whether or not any
 * items have been pushed and processed by the queue.
 * @property {Function} running - a function returning the number of items
 * currently being processed. Invoke with `queue.running()`.
 * @property {Function} workersList - a function returning the array of items
 * currently being processed. Invoke with `queue.workersList()`.
 * @property {Function} idle - a function returning false if there are items
 * waiting or being processed, or true if not. Invoke with `queue.idle()`.
 * @property {number} concurrency - an integer for determining how many `worker`
 * functions should be run in parallel. This property can be changed after a
 * `queue` is created to alter the concurrency on-the-fly.
 * @property {number} payload - an integer that specifies how many items are
 * passed to the worker function at a time. only applies if this is a
 * [cargo]{@link module:ControlFlow.cargo} object
 * @property {AsyncFunction} push - add a new task to the `queue`. Calls `callback`
 * once the `worker` has finished processing the task. Instead of a single task,
 * a `tasks` array can be submitted. The respective callback is used for every
 * task in the list. Invoke with `queue.push(task, [callback])`,
 * @property {AsyncFunction} unshift - add a new task to the front of the `queue`.
 * Invoke with `queue.unshift(task, [callback])`.
 * @property {AsyncFunction} pushAsync - the same as `q.push`, except this returns
 * a promise that rejects if an error occurs.
 * @property {AsyncFunction} unshiftAsync - the same as `q.unshift`, except this returns
 * a promise that rejects if an error occurs.
 * @property {Function} remove - remove items from the queue that match a test
 * function.  The test function will be passed an object with a `data` property,
 * and a `priority` property, if this is a
 * [priorityQueue]{@link module:ControlFlow.priorityQueue} object.
 * Invoked with `queue.remove(testFn)`, where `testFn` is of the form
 * `function ({data, priority}) {}` and returns a Boolean.
 * @property {Function} saturated - a function that sets a callback that is
 * called when the number of running workers hits the `concurrency` limit, and
 * further tasks will be queued.  If the callback is omitted, `q.saturated()`
 * returns a promise for the next occurrence.
 * @property {Function} unsaturated - a function that sets a callback that is
 * called when the number of running workers is less than the `concurrency` &
 * `buffer` limits, and further tasks will not be queued. If the callback is
 * omitted, `q.unsaturated()` returns a promise for the next occurrence.
 * @property {number} buffer - A minimum threshold buffer in order to say that
 * the `queue` is `unsaturated`.
 * @property {Function} empty - a function that sets a callback that is called
 * when the last item from the `queue` is given to a `worker`. If the callback
 * is omitted, `q.empty()` returns a promise for the next occurrence.
 * @property {Function} drain - a function that sets a callback that is called
 * when the last item from the `queue` has returned from the `worker`. If the
 * callback is omitted, `q.drain()` returns a promise for the next occurrence.
 * @property {Function} error - a function that sets a callback that is called
 * when a task errors. Has the signature `function(error, task)`. If the
 * callback is omitted, `error()` returns a promise that rejects on the next
 * error.
 * @property {boolean} paused - a boolean for determining whether the queue is
 * in a paused state.
 * @property {Function} pause - a function that pauses the processing of tasks
 * until `resume()` is called. Invoke with `queue.pause()`.
 * @property {Function} resume - a function that resumes the processing of
 * queued tasks when the queue is paused. Invoke with `queue.resume()`.
 * @property {Function} kill - a function that removes the `drain` callback and
 * empties remaining tasks from the queue forcing it to go idle. No more tasks
 * should be pushed to the queue after calling this function. Invoke with `queue.kill()`.
 *
 * @example
 * const q = async.queue(worker, 2)
 * q.push(item1)
 * q.push(item2)
 * q.push(item3)
 * // queues are iterable, spread into an array to inspect
 * const items = [...q] // [item1, item2, item3]
 * // or use for of
 * for (let item of q) {
 *     console.log(item)
 * }
 *
 * q.drain(() => {
 *     console.log('all done')
 * })
 * // or
 * await q.drain()
 */

/**
 * Creates a `queue` object with the specified `concurrency`. Tasks added to the
 * `queue` are processed in parallel (up to the `concurrency` limit). If all
 * `worker`s are in progress, the task is queued until one becomes available.
 * Once a `worker` completes a `task`, that `task`'s callback is called.
 *
 * @name queue
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {AsyncFunction} worker - An async function for processing a queued task.
 * If you want to handle errors from an individual task, pass a callback to
 * `q.push()`. Invoked with (task, callback).
 * @param {number} [concurrency=1] - An `integer` for determining how many
 * `worker` functions should be run in parallel.  If omitted, the concurrency
 * defaults to `1`.  If the concurrency is `0`, an error is thrown.
 * @returns {module:ControlFlow.QueueObject} A queue object to manage the tasks. Callbacks can be
 * attached as certain properties to listen for specific events during the
 * lifecycle of the queue.
 * @example
 *
 * // create a queue object with concurrency 2
 * var q = async.queue(function(task, callback) {
 *     console.log('hello ' + task.name);
 *     callback();
 * }, 2);
 *
 * // assign a callback
 * q.drain(function() {
 *     console.log('all items have been processed');
 * });
 * // or await the end
 * await q.drain()
 *
 * // assign an error callback
 * q.error(function(err, task) {
 *     console.error('task experienced an error');
 * });
 *
 * // add some items to the queue
 * q.push({name: 'foo'}, function(err) {
 *     console.log('finished processing foo');
 * });
 * // callback is optional
 * q.push({name: 'bar'});
 *
 * // add some items to the queue (batch-wise)
 * q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
 *     console.log('finished processing item');
 * });
 *
 * // add some items to the front of the queue
 * q.unshift({name: 'bar'}, function (err) {
 *     console.log('finished processing bar');
 * });
 */
function queue (worker, concurrency) {
    var _worker = wrapAsync(worker);
    return queue$1((items, cb) => {
        _worker(items[0], cb);
    }, concurrency, 1);
}

// Binary min-heap implementation used for priority queue.
// Implementation is stable, i.e. push time is considered for equal priorities
class Heap {
    constructor() {
        this.heap = [];
        this.pushCount = Number.MIN_SAFE_INTEGER;
    }

    get length() {
        return this.heap.length;
    }

    empty () {
        this.heap = [];
        return this;
    }

    percUp(index) {
        let p;

        while (index > 0 && smaller(this.heap[index], this.heap[p=parent(index)])) {
            let t = this.heap[index];
            this.heap[index] = this.heap[p];
            this.heap[p] = t;

            index = p;
        }
    }

    percDown(index) {
        let l;

        while ((l=leftChi(index)) < this.heap.length) {
            if (l+1 < this.heap.length && smaller(this.heap[l+1], this.heap[l])) {
                l = l+1;
            }

            if (smaller(this.heap[index], this.heap[l])) {
                break;
            }

            let t = this.heap[index];
            this.heap[index] = this.heap[l];
            this.heap[l] = t;

            index = l;
        }
    }

    push(node) {
        node.pushCount = ++this.pushCount;
        this.heap.push(node);
        this.percUp(this.heap.length-1);
    }

    unshift(node) {
        return this.heap.push(node);
    }

    shift() {
        let [top] = this.heap;

        this.heap[0] = this.heap[this.heap.length-1];
        this.heap.pop();
        this.percDown(0);

        return top;
    }

    toArray() {
        return [...this];
    }

    *[Symbol.iterator] () {
        for (let i = 0; i < this.heap.length; i++) {
            yield this.heap[i].data;
        }
    }

    remove (testFn) {
        let j = 0;
        for (let i = 0; i < this.heap.length; i++) {
            if (!testFn(this.heap[i])) {
                this.heap[j] = this.heap[i];
                j++;
            }
        }

        this.heap.splice(j);

        for (let i = parent(this.heap.length-1); i >= 0; i--) {
            this.percDown(i);
        }

        return this;
    }
}

function leftChi(i) {
    return (i<<1)+1;
}

function parent(i) {
    return ((i+1)>>1)-1;
}

function smaller(x, y) {
    if (x.priority !== y.priority) {
        return x.priority < y.priority;
    }
    else {
        return x.pushCount < y.pushCount;
    }
}

/**
 * The same as [async.queue]{@link module:ControlFlow.queue} only tasks are assigned a priority and
 * completed in ascending priority order.
 *
 * @name priorityQueue
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.queue]{@link module:ControlFlow.queue}
 * @category Control Flow
 * @param {AsyncFunction} worker - An async function for processing a queued task.
 * If you want to handle errors from an individual task, pass a callback to
 * `q.push()`.
 * Invoked with (task, callback).
 * @param {number} concurrency - An `integer` for determining how many `worker`
 * functions should be run in parallel.  If omitted, the concurrency defaults to
 * `1`.  If the concurrency is `0`, an error is thrown.
 * @returns {module:ControlFlow.QueueObject} A priorityQueue object to manage the tasks. There are three
 * differences between `queue` and `priorityQueue` objects:
 * * `push(task, priority, [callback])` - `priority` should be a number. If an
 *   array of `tasks` is given, all tasks will be assigned the same priority.
 * * `pushAsync(task, priority, [callback])` - the same as `priorityQueue.push`,
 *   except this returns a promise that rejects if an error occurs.
 * * The `unshift` and `unshiftAsync` methods were removed.
 */
function priorityQueue(worker, concurrency) {
    // Start with a normal queue
    var q = queue(worker, concurrency);

    var {
        push,
        pushAsync
    } = q;

    q._tasks = new Heap();
    q._createTaskItem = ({data, priority}, callback) => {
        return {
            data,
            priority,
            callback
        };
    };

    function createDataItems(tasks, priority) {
        if (!Array.isArray(tasks)) {
            return {data: tasks, priority};
        }
        return tasks.map(data => { return {data, priority}; });
    }

    // Override push to accept second parameter representing priority
    q.push = function(data, priority = 0, callback) {
        return push(createDataItems(data, priority), callback);
    };

    q.pushAsync = function(data, priority = 0, callback) {
        return pushAsync(createDataItems(data, priority), callback);
    };

    // Remove unshift functions
    delete q.unshift;
    delete q.unshiftAsync;

    return q;
}

/**
 * Runs the `tasks` array of functions in parallel, without waiting until the
 * previous function has completed. Once any of the `tasks` complete or pass an
 * error to its callback, the main `callback` is immediately called. It's
 * equivalent to `Promise.race()`.
 *
 * @name race
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array} tasks - An array containing [async functions]{@link AsyncFunction}
 * to run. Each function can complete with an optional `result` value.
 * @param {Function} callback - A callback to run once any of the functions have
 * completed. This function gets an error or result from the first function that
 * completed. Invoked with (err, result).
 * @returns {Promise} a promise, if a callback is omitted
 * @example
 *
 * async.race([
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ],
 * // main callback
 * function(err, result) {
 *     // the result will be equal to 'two' as it finishes earlier
 * });
 */
function race(tasks, callback) {
    callback = once(callback);
    if (!Array.isArray(tasks)) return callback(new TypeError('First argument to race must be an array of functions'));
    if (!tasks.length) return callback();
    for (var i = 0, l = tasks.length; i < l; i++) {
        wrapAsync(tasks[i])(callback);
    }
}

var race$1 = awaitify(race, 2);

/**
 * Same as [`reduce`]{@link module:Collections.reduce}, only operates on `array` in reverse order.
 *
 * @name reduceRight
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.reduce]{@link module:Collections.reduce}
 * @alias foldr
 * @category Collection
 * @param {Array} array - A collection to iterate over.
 * @param {*} memo - The initial state of the reduction.
 * @param {AsyncFunction} iteratee - A function applied to each item in the
 * array to produce the next step in the reduction.
 * The `iteratee` should complete with the next state of the reduction.
 * If the iteratee completes with an error, the reduction is stopped and the
 * main `callback` is immediately called with the error.
 * Invoked with (memo, item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result is the reduced value. Invoked with
 * (err, result).
 * @returns {Promise} a promise, if no callback is passed
 */
function reduceRight (array, memo, iteratee, callback) {
    var reversed = [...array].reverse();
    return reduce$1(reversed, memo, iteratee, callback);
}

/**
 * Wraps the async function in another function that always completes with a
 * result object, even when it errors.
 *
 * The result object has either the property `error` or `value`.
 *
 * @name reflect
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} fn - The async function you want to wrap
 * @returns {Function} - A function that always passes null to it's callback as
 * the error. The second argument to the callback will be an `object` with
 * either an `error` or a `value` property.
 * @example
 *
 * async.parallel([
 *     async.reflect(function(callback) {
 *         // do some stuff ...
 *         callback(null, 'one');
 *     }),
 *     async.reflect(function(callback) {
 *         // do some more stuff but error ...
 *         callback('bad stuff happened');
 *     }),
 *     async.reflect(function(callback) {
 *         // do some more stuff ...
 *         callback(null, 'two');
 *     })
 * ],
 * // optional callback
 * function(err, results) {
 *     // values
 *     // results[0].value = 'one'
 *     // results[1].error = 'bad stuff happened'
 *     // results[2].value = 'two'
 * });
 */
function reflect(fn) {
    var _fn = wrapAsync(fn);
    return initialParams(function reflectOn(args, reflectCallback) {
        args.push((error, ...cbArgs) => {
            let retVal = {};
            if (error) {
                retVal.error = error;
            }
            if (cbArgs.length > 0){
                var value = cbArgs;
                if (cbArgs.length <= 1) {
                    [value] = cbArgs;
                }
                retVal.value = value;
            }
            reflectCallback(null, retVal);
        });

        return _fn.apply(this, args);
    });
}

/**
 * A helper function that wraps an array or an object of functions with `reflect`.
 *
 * @name reflectAll
 * @static
 * @memberOf module:Utils
 * @method
 * @see [async.reflect]{@link module:Utils.reflect}
 * @category Util
 * @param {Array|Object|Iterable} tasks - The collection of
 * [async functions]{@link AsyncFunction} to wrap in `async.reflect`.
 * @returns {Array} Returns an array of async functions, each wrapped in
 * `async.reflect`
 * @example
 *
 * let tasks = [
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         // do some more stuff but error ...
 *         callback(new Error('bad stuff happened'));
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ];
 *
 * async.parallel(async.reflectAll(tasks),
 * // optional callback
 * function(err, results) {
 *     // values
 *     // results[0].value = 'one'
 *     // results[1].error = Error('bad stuff happened')
 *     // results[2].value = 'two'
 * });
 *
 * // an example using an object instead of an array
 * let tasks = {
 *     one: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     two: function(callback) {
 *         callback('two');
 *     },
 *     three: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'three');
 *         }, 100);
 *     }
 * };
 *
 * async.parallel(async.reflectAll(tasks),
 * // optional callback
 * function(err, results) {
 *     // values
 *     // results.one.value = 'one'
 *     // results.two.error = 'two'
 *     // results.three.value = 'three'
 * });
 */
function reflectAll(tasks) {
    var results;
    if (Array.isArray(tasks)) {
        results = tasks.map(reflect);
    } else {
        results = {};
        Object.keys(tasks).forEach(key => {
            results[key] = reflect.call(this, tasks[key]);
        });
    }
    return results;
}

function reject$2(eachfn, arr, _iteratee, callback) {
    const iteratee = wrapAsync(_iteratee);
    return _filter(eachfn, arr, (value, cb) => {
        iteratee(value, (err, v) => {
            cb(err, !v);
        });
    }, callback);
}

/**
 * The opposite of [`filter`]{@link module:Collections.filter}. Removes values that pass an `async` truth test.
 *
 * @name reject
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.filter]{@link module:Collections.filter}
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - An async truth test to apply to each item in
 * `coll`.
 * The should complete with a boolean value as its `result`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback is passed
 * @example
 *
 * // dir1 is a directory that contains file1.txt, file2.txt
 * // dir2 is a directory that contains file3.txt, file4.txt
 * // dir3 is a directory that contains file5.txt
 *
 * const fileList = ['dir1/file1.txt','dir2/file3.txt','dir3/file6.txt'];
 *
 * // asynchronous function that checks if a file exists
 * function fileExists(file, callback) {
 *    fs.access(file, fs.constants.F_OK, (err) => {
 *        callback(null, !err);
 *    });
 * }
 *
 * // Using callbacks
 * async.reject(fileList, fileExists, function(err, results) {
 *    // [ 'dir3/file6.txt' ]
 *    // results now equals an array of the non-existing files
 * });
 *
 * // Using Promises
 * async.reject(fileList, fileExists)
 * .then( results => {
 *     console.log(results);
 *     // [ 'dir3/file6.txt' ]
 *     // results now equals an array of the non-existing files
 * }).catch( err => {
 *     console.log(err);
 * });
 *
 * // Using async/await
 * async () => {
 *     try {
 *         let results = await async.reject(fileList, fileExists);
 *         console.log(results);
 *         // [ 'dir3/file6.txt' ]
 *         // results now equals an array of the non-existing files
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 */
function reject (coll, iteratee, callback) {
    return reject$2(eachOf$1, coll, iteratee, callback)
}
var reject$1 = awaitify(reject, 3);

/**
 * The same as [`reject`]{@link module:Collections.reject} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name rejectLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.reject]{@link module:Collections.reject}
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {Function} iteratee - An async truth test to apply to each item in
 * `coll`.
 * The should complete with a boolean value as its `result`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback is passed
 */
function rejectLimit (coll, limit, iteratee, callback) {
    return reject$2(eachOfLimit$2(limit), coll, iteratee, callback)
}
var rejectLimit$1 = awaitify(rejectLimit, 4);

/**
 * The same as [`reject`]{@link module:Collections.reject} but runs only a single async operation at a time.
 *
 * @name rejectSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.reject]{@link module:Collections.reject}
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - An async truth test to apply to each item in
 * `coll`.
 * The should complete with a boolean value as its `result`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback is passed
 */
function rejectSeries (coll, iteratee, callback) {
    return reject$2(eachOfSeries$1, coll, iteratee, callback)
}
var rejectSeries$1 = awaitify(rejectSeries, 3);

function constant(value) {
    return function () {
        return value;
    }
}

/**
 * Attempts to get a successful response from `task` no more than `times` times
 * before returning an error. If the task is successful, the `callback` will be
 * passed the result of the successful task. If all attempts fail, the callback
 * will be passed the error and result (if any) of the final attempt.
 *
 * @name retry
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @see [async.retryable]{@link module:ControlFlow.retryable}
 * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - Can be either an
 * object with `times` and `interval` or a number.
 * * `times` - The number of attempts to make before giving up.  The default
 *   is `5`.
 * * `interval` - The time to wait between retries, in milliseconds.  The
 *   default is `0`. The interval may also be specified as a function of the
 *   retry count (see example).
 * * `errorFilter` - An optional synchronous function that is invoked on
 *   erroneous result. If it returns `true` the retry attempts will continue;
 *   if the function returns `false` the retry flow is aborted with the current
 *   attempt's error and result being returned to the final callback.
 *   Invoked with (err).
 * * If `opts` is a number, the number specifies the number of times to retry,
 *   with the default interval of `0`.
 * @param {AsyncFunction} task - An async function to retry.
 * Invoked with (callback).
 * @param {Function} [callback] - An optional callback which is called when the
 * task has succeeded, or after the final failed attempt. It receives the `err`
 * and `result` arguments of the last attempt at completing the `task`. Invoked
 * with (err, results).
 * @returns {Promise} a promise if no callback provided
 *
 * @example
 *
 * // The `retry` function can be used as a stand-alone control flow by passing
 * // a callback, as shown below:
 *
 * // try calling apiMethod 3 times
 * async.retry(3, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod 3 times, waiting 200 ms between each retry
 * async.retry({times: 3, interval: 200}, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod 10 times with exponential backoff
 * // (i.e. intervals of 100, 200, 400, 800, 1600, ... milliseconds)
 * async.retry({
 *   times: 10,
 *   interval: function(retryCount) {
 *     return 50 * Math.pow(2, retryCount);
 *   }
 * }, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod the default 5 times no delay between each retry
 * async.retry(apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod only when error condition satisfies, all other
 * // errors will abort the retry control flow and return to final callback
 * async.retry({
 *   errorFilter: function(err) {
 *     return err.message === 'Temporary error'; // only retry on a specific error
 *   }
 * }, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // to retry individual methods that are not as reliable within other
 * // control flow functions, use the `retryable` wrapper:
 * async.auto({
 *     users: api.getUsers.bind(api),
 *     payments: async.retryable(3, api.getPayments.bind(api))
 * }, function(err, results) {
 *     // do something with the results
 * });
 *
 */
const DEFAULT_TIMES = 5;
const DEFAULT_INTERVAL = 0;

function retry(opts, task, callback) {
    var options = {
        times: DEFAULT_TIMES,
        intervalFunc: constant(DEFAULT_INTERVAL)
    };

    if (arguments.length < 3 && typeof opts === 'function') {
        callback = task || promiseCallback();
        task = opts;
    } else {
        parseTimes(options, opts);
        callback = callback || promiseCallback();
    }

    if (typeof task !== 'function') {
        throw new Error("Invalid arguments for async.retry");
    }

    var _task = wrapAsync(task);

    var attempt = 1;
    function retryAttempt() {
        _task((err, ...args) => {
            if (err === false) return
            if (err && attempt++ < options.times &&
                (typeof options.errorFilter != 'function' ||
                    options.errorFilter(err))) {
                setTimeout(retryAttempt, options.intervalFunc(attempt - 1));
            } else {
                callback(err, ...args);
            }
        });
    }

    retryAttempt();
    return callback[PROMISE_SYMBOL]
}

function parseTimes(acc, t) {
    if (typeof t === 'object') {
        acc.times = +t.times || DEFAULT_TIMES;

        acc.intervalFunc = typeof t.interval === 'function' ?
            t.interval :
            constant(+t.interval || DEFAULT_INTERVAL);

        acc.errorFilter = t.errorFilter;
    } else if (typeof t === 'number' || typeof t === 'string') {
        acc.times = +t || DEFAULT_TIMES;
    } else {
        throw new Error("Invalid arguments for async.retry");
    }
}

/**
 * A close relative of [`retry`]{@link module:ControlFlow.retry}.  This method
 * wraps a task and makes it retryable, rather than immediately calling it
 * with retries.
 *
 * @name retryable
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.retry]{@link module:ControlFlow.retry}
 * @category Control Flow
 * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - optional
 * options, exactly the same as from `retry`, except for a `opts.arity` that
 * is the arity of the `task` function, defaulting to `task.length`
 * @param {AsyncFunction} task - the asynchronous function to wrap.
 * This function will be passed any arguments passed to the returned wrapper.
 * Invoked with (...args, callback).
 * @returns {AsyncFunction} The wrapped function, which when invoked, will
 * retry on an error, based on the parameters specified in `opts`.
 * This function will accept the same parameters as `task`.
 * @example
 *
 * async.auto({
 *     dep1: async.retryable(3, getFromFlakyService),
 *     process: ["dep1", async.retryable(3, function (results, cb) {
 *         maybeProcessData(results.dep1, cb);
 *     })]
 * }, callback);
 */
function retryable (opts, task) {
    if (!task) {
        task = opts;
        opts = null;
    }
    let arity = (opts && opts.arity) || task.length;
    if (isAsync(task)) {
        arity += 1;
    }
    var _task = wrapAsync(task);
    return initialParams((args, callback) => {
        if (args.length < arity - 1 || callback == null) {
            args.push(callback);
            callback = promiseCallback();
        }
        function taskFn(cb) {
            _task(...args, cb);
        }

        if (opts) retry(opts, taskFn, callback);
        else retry(taskFn, callback);

        return callback[PROMISE_SYMBOL]
    });
}

/**
 * Run the functions in the `tasks` collection in series, each one running once
 * the previous function has completed. If any functions in the series pass an
 * error to its callback, no more functions are run, and `callback` is
 * immediately called with the value of the error. Otherwise, `callback`
 * receives an array of results when `tasks` have completed.
 *
 * It is also possible to use an object instead of an array. Each property will
 * be run as a function, and the results will be passed to the final `callback`
 * as an object instead of an array. This can be a more readable way of handling
 *  results from {@link async.series}.
 *
 * **Note** that while many implementations preserve the order of object
 * properties, the [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6)
 * explicitly states that
 *
 * > The mechanics and order of enumerating the properties is not specified.
 *
 * So if you rely on the order in which your series of functions are executed,
 * and want this to work on all platforms, consider using an array.
 *
 * @name series
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|AsyncIterable|Object} tasks - A collection containing
 * [async functions]{@link AsyncFunction} to run in series.
 * Each function can complete with any number of optional `result` values.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed. This function gets a results array (or object)
 * containing all the result arguments passed to the `task` callbacks. Invoked
 * with (err, result).
 * @return {Promise} a promise, if no callback is passed
 * @example
 *
 * //Using Callbacks
 * async.series([
 *     function(callback) {
 *         setTimeout(function() {
 *             // do some async task
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             // then do another async task
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ], function(err, results) {
 *     console.log(results);
 *     // results is equal to ['one','two']
 * });
 *
 * // an example using objects instead of arrays
 * async.series({
 *     one: function(callback) {
 *         setTimeout(function() {
 *             // do some async task
 *             callback(null, 1);
 *         }, 200);
 *     },
 *     two: function(callback) {
 *         setTimeout(function() {
 *             // then do another async task
 *             callback(null, 2);
 *         }, 100);
 *     }
 * }, function(err, results) {
 *     console.log(results);
 *     // results is equal to: { one: 1, two: 2 }
 * });
 *
 * //Using Promises
 * async.series([
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ]).then(results => {
 *     console.log(results);
 *     // results is equal to ['one','two']
 * }).catch(err => {
 *     console.log(err);
 * });
 *
 * // an example using an object instead of an array
 * async.series({
 *     one: function(callback) {
 *         setTimeout(function() {
 *             // do some async task
 *             callback(null, 1);
 *         }, 200);
 *     },
 *     two: function(callback) {
 *         setTimeout(function() {
 *             // then do another async task
 *             callback(null, 2);
 *         }, 100);
 *     }
 * }).then(results => {
 *     console.log(results);
 *     // results is equal to: { one: 1, two: 2 }
 * }).catch(err => {
 *     console.log(err);
 * });
 *
 * //Using async/await
 * async () => {
 *     try {
 *         let results = await async.series([
 *             function(callback) {
 *                 setTimeout(function() {
 *                     // do some async task
 *                     callback(null, 'one');
 *                 }, 200);
 *             },
 *             function(callback) {
 *                 setTimeout(function() {
 *                     // then do another async task
 *                     callback(null, 'two');
 *                 }, 100);
 *             }
 *         ]);
 *         console.log(results);
 *         // results is equal to ['one','two']
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 * // an example using an object instead of an array
 * async () => {
 *     try {
 *         let results = await async.parallel({
 *             one: function(callback) {
 *                 setTimeout(function() {
 *                     // do some async task
 *                     callback(null, 1);
 *                 }, 200);
 *             },
 *            two: function(callback) {
 *                 setTimeout(function() {
 *                     // then do another async task
 *                     callback(null, 2);
 *                 }, 100);
 *            }
 *         });
 *         console.log(results);
 *         // results is equal to: { one: 1, two: 2 }
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 */
function series(tasks, callback) {
    return _parallel(eachOfSeries$1, tasks, callback);
}

/**
 * Returns `true` if at least one element in the `coll` satisfies an async test.
 * If any iteratee call returns `true`, the main `callback` is immediately
 * called.
 *
 * @name some
 * @static
 * @memberOf module:Collections
 * @method
 * @alias any
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collections in parallel.
 * The iteratee should complete with a boolean `result` value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the iteratee functions have finished.
 * Result will be either `true` or `false` depending on the values of the async
 * tests. Invoked with (err, result).
 * @returns {Promise} a promise, if no callback provided
 * @example
 *
 * // dir1 is a directory that contains file1.txt, file2.txt
 * // dir2 is a directory that contains file3.txt, file4.txt
 * // dir3 is a directory that contains file5.txt
 * // dir4 does not exist
 *
 * // asynchronous function that checks if a file exists
 * function fileExists(file, callback) {
 *    fs.access(file, fs.constants.F_OK, (err) => {
 *        callback(null, !err);
 *    });
 * }
 *
 * // Using callbacks
 * async.some(['dir1/missing.txt','dir2/missing.txt','dir3/file5.txt'], fileExists,
 *    function(err, result) {
 *        console.log(result);
 *        // true
 *        // result is true since some file in the list exists
 *    }
 *);
 *
 * async.some(['dir1/missing.txt','dir2/missing.txt','dir4/missing.txt'], fileExists,
 *    function(err, result) {
 *        console.log(result);
 *        // false
 *        // result is false since none of the files exists
 *    }
 *);
 *
 * // Using Promises
 * async.some(['dir1/missing.txt','dir2/missing.txt','dir3/file5.txt'], fileExists)
 * .then( result => {
 *     console.log(result);
 *     // true
 *     // result is true since some file in the list exists
 * }).catch( err => {
 *     console.log(err);
 * });
 *
 * async.some(['dir1/missing.txt','dir2/missing.txt','dir4/missing.txt'], fileExists)
 * .then( result => {
 *     console.log(result);
 *     // false
 *     // result is false since none of the files exists
 * }).catch( err => {
 *     console.log(err);
 * });
 *
 * // Using async/await
 * async () => {
 *     try {
 *         let result = await async.some(['dir1/missing.txt','dir2/missing.txt','dir3/file5.txt'], fileExists);
 *         console.log(result);
 *         // true
 *         // result is true since some file in the list exists
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 * async () => {
 *     try {
 *         let result = await async.some(['dir1/missing.txt','dir2/missing.txt','dir4/missing.txt'], fileExists);
 *         console.log(result);
 *         // false
 *         // result is false since none of the files exists
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 */
function some(coll, iteratee, callback) {
    return _createTester(Boolean, res => res)(eachOf$1, coll, iteratee, callback)
}
var some$1 = awaitify(some, 3);

/**
 * The same as [`some`]{@link module:Collections.some} but runs a maximum of `limit` async operations at a time.
 *
 * @name someLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.some]{@link module:Collections.some}
 * @alias anyLimit
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collections in parallel.
 * The iteratee should complete with a boolean `result` value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the iteratee functions have finished.
 * Result will be either `true` or `false` depending on the values of the async
 * tests. Invoked with (err, result).
 * @returns {Promise} a promise, if no callback provided
 */
function someLimit(coll, limit, iteratee, callback) {
    return _createTester(Boolean, res => res)(eachOfLimit$2(limit), coll, iteratee, callback)
}
var someLimit$1 = awaitify(someLimit, 4);

/**
 * The same as [`some`]{@link module:Collections.some} but runs only a single async operation at a time.
 *
 * @name someSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.some]{@link module:Collections.some}
 * @alias anySeries
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collections in series.
 * The iteratee should complete with a boolean `result` value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the iteratee functions have finished.
 * Result will be either `true` or `false` depending on the values of the async
 * tests. Invoked with (err, result).
 * @returns {Promise} a promise, if no callback provided
 */
function someSeries(coll, iteratee, callback) {
    return _createTester(Boolean, res => res)(eachOfSeries$1, coll, iteratee, callback)
}
var someSeries$1 = awaitify(someSeries, 3);

/**
 * Sorts a list by the results of running each `coll` value through an async
 * `iteratee`.
 *
 * @name sortBy
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a value to use as the sort criteria as
 * its `result`.
 * Invoked with (item, callback).
 * @param {Function} callback - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is the items
 * from the original `coll` sorted by the values returned by the `iteratee`
 * calls. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback passed
 * @example
 *
 * // bigfile.txt is a file that is 251100 bytes in size
 * // mediumfile.txt is a file that is 11000 bytes in size
 * // smallfile.txt is a file that is 121 bytes in size
 *
 * // asynchronous function that returns the file size in bytes
 * function getFileSizeInBytes(file, callback) {
 *     fs.stat(file, function(err, stat) {
 *         if (err) {
 *             return callback(err);
 *         }
 *         callback(null, stat.size);
 *     });
 * }
 *
 * // Using callbacks
 * async.sortBy(['mediumfile.txt','smallfile.txt','bigfile.txt'], getFileSizeInBytes,
 *     function(err, results) {
 *         if (err) {
 *             console.log(err);
 *         } else {
 *             console.log(results);
 *             // results is now the original array of files sorted by
 *             // file size (ascending by default), e.g.
 *             // [ 'smallfile.txt', 'mediumfile.txt', 'bigfile.txt']
 *         }
 *     }
 * );
 *
 * // By modifying the callback parameter the
 * // sorting order can be influenced:
 *
 * // ascending order
 * async.sortBy(['mediumfile.txt','smallfile.txt','bigfile.txt'], function(file, callback) {
 *     getFileSizeInBytes(file, function(getFileSizeErr, fileSize) {
 *         if (getFileSizeErr) return callback(getFileSizeErr);
 *         callback(null, fileSize);
 *     });
 * }, function(err, results) {
 *         if (err) {
 *             console.log(err);
 *         } else {
 *             console.log(results);
 *             // results is now the original array of files sorted by
 *             // file size (ascending by default), e.g.
 *             // [ 'smallfile.txt', 'mediumfile.txt', 'bigfile.txt']
 *         }
 *     }
 * );
 *
 * // descending order
 * async.sortBy(['bigfile.txt','mediumfile.txt','smallfile.txt'], function(file, callback) {
 *     getFileSizeInBytes(file, function(getFileSizeErr, fileSize) {
 *         if (getFileSizeErr) {
 *             return callback(getFileSizeErr);
 *         }
 *         callback(null, fileSize * -1);
 *     });
 * }, function(err, results) {
 *         if (err) {
 *             console.log(err);
 *         } else {
 *             console.log(results);
 *             // results is now the original array of files sorted by
 *             // file size (ascending by default), e.g.
 *             // [ 'bigfile.txt', 'mediumfile.txt', 'smallfile.txt']
 *         }
 *     }
 * );
 *
 * // Error handling
 * async.sortBy(['mediumfile.txt','smallfile.txt','missingfile.txt'], getFileSizeInBytes,
 *     function(err, results) {
 *         if (err) {
 *             console.log(err);
 *             // [ Error: ENOENT: no such file or directory ]
 *         } else {
 *             console.log(results);
 *         }
 *     }
 * );
 *
 * // Using Promises
 * async.sortBy(['mediumfile.txt','smallfile.txt','bigfile.txt'], getFileSizeInBytes)
 * .then( results => {
 *     console.log(results);
 *     // results is now the original array of files sorted by
 *     // file size (ascending by default), e.g.
 *     // [ 'smallfile.txt', 'mediumfile.txt', 'bigfile.txt']
 * }).catch( err => {
 *     console.log(err);
 * });
 *
 * // Error handling
 * async.sortBy(['mediumfile.txt','smallfile.txt','missingfile.txt'], getFileSizeInBytes)
 * .then( results => {
 *     console.log(results);
 * }).catch( err => {
 *     console.log(err);
 *     // [ Error: ENOENT: no such file or directory ]
 * });
 *
 * // Using async/await
 * (async () => {
 *     try {
 *         let results = await async.sortBy(['bigfile.txt','mediumfile.txt','smallfile.txt'], getFileSizeInBytes);
 *         console.log(results);
 *         // results is now the original array of files sorted by
 *         // file size (ascending by default), e.g.
 *         // [ 'smallfile.txt', 'mediumfile.txt', 'bigfile.txt']
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * })();
 *
 * // Error handling
 * async () => {
 *     try {
 *         let results = await async.sortBy(['missingfile.txt','mediumfile.txt','smallfile.txt'], getFileSizeInBytes);
 *         console.log(results);
 *     }
 *     catch (err) {
 *         console.log(err);
 *         // [ Error: ENOENT: no such file or directory ]
 *     }
 * }
 *
 */
function sortBy (coll, iteratee, callback) {
    var _iteratee = wrapAsync(iteratee);
    return map$1(coll, (x, iterCb) => {
        _iteratee(x, (err, criteria) => {
            if (err) return iterCb(err);
            iterCb(err, {value: x, criteria});
        });
    }, (err, results) => {
        if (err) return callback(err);
        callback(null, results.sort(comparator).map(v => v.value));
    });

    function comparator(left, right) {
        var a = left.criteria, b = right.criteria;
        return a < b ? -1 : a > b ? 1 : 0;
    }
}
var sortBy$1 = awaitify(sortBy, 3);

/**
 * Sets a time limit on an asynchronous function. If the function does not call
 * its callback within the specified milliseconds, it will be called with a
 * timeout error. The code property for the error object will be `'ETIMEDOUT'`.
 *
 * @name timeout
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} asyncFn - The async function to limit in time.
 * @param {number} milliseconds - The specified time limit.
 * @param {*} [info] - Any variable you want attached (`string`, `object`, etc)
 * to timeout Error for more information..
 * @returns {AsyncFunction} Returns a wrapped function that can be used with any
 * of the control flow functions.
 * Invoke this function with the same parameters as you would `asyncFunc`.
 * @example
 *
 * function myFunction(foo, callback) {
 *     doAsyncTask(foo, function(err, data) {
 *         // handle errors
 *         if (err) return callback(err);
 *
 *         // do some stuff ...
 *
 *         // return processed data
 *         return callback(null, data);
 *     });
 * }
 *
 * var wrapped = async.timeout(myFunction, 1000);
 *
 * // call `wrapped` as you would `myFunction`
 * wrapped({ bar: 'bar' }, function(err, data) {
 *     // if `myFunction` takes < 1000 ms to execute, `err`
 *     // and `data` will have their expected values
 *
 *     // else `err` will be an Error with the code 'ETIMEDOUT'
 * });
 */
function timeout(asyncFn, milliseconds, info) {
    var fn = wrapAsync(asyncFn);

    return initialParams((args, callback) => {
        var timedOut = false;
        var timer;

        function timeoutCallback() {
            var name = asyncFn.name || 'anonymous';
            var error  = new Error('Callback function "' + name + '" timed out.');
            error.code = 'ETIMEDOUT';
            if (info) {
                error.info = info;
            }
            timedOut = true;
            callback(error);
        }

        args.push((...cbArgs) => {
            if (!timedOut) {
                callback(...cbArgs);
                clearTimeout(timer);
            }
        });

        // setup timer and call original function
        timer = setTimeout(timeoutCallback, milliseconds);
        fn(...args);
    });
}

function range(size) {
    var result = Array(size);
    while (size--) {
        result[size] = size;
    }
    return result;
}

/**
 * The same as [times]{@link module:ControlFlow.times} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name timesLimit
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.times]{@link module:ControlFlow.times}
 * @category Control Flow
 * @param {number} count - The number of times to run the function.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - The async function to call `n` times.
 * Invoked with the iteration index and a callback: (n, next).
 * @param {Function} callback - see [async.map]{@link module:Collections.map}.
 * @returns {Promise} a promise, if no callback is provided
 */
function timesLimit(count, limit, iteratee, callback) {
    var _iteratee = wrapAsync(iteratee);
    return mapLimit$1(range(count), limit, _iteratee, callback);
}

/**
 * Calls the `iteratee` function `n` times, and accumulates results in the same
 * manner you would use with [map]{@link module:Collections.map}.
 *
 * @name times
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.map]{@link module:Collections.map}
 * @category Control Flow
 * @param {number} n - The number of times to run the function.
 * @param {AsyncFunction} iteratee - The async function to call `n` times.
 * Invoked with the iteration index and a callback: (n, next).
 * @param {Function} callback - see {@link module:Collections.map}.
 * @returns {Promise} a promise, if no callback is provided
 * @example
 *
 * // Pretend this is some complicated async factory
 * var createUser = function(id, callback) {
 *     callback(null, {
 *         id: 'user' + id
 *     });
 * };
 *
 * // generate 5 users
 * async.times(5, function(n, next) {
 *     createUser(n, function(err, user) {
 *         next(err, user);
 *     });
 * }, function(err, users) {
 *     // we should now have 5 users
 * });
 */
function times (n, iteratee, callback) {
    return timesLimit(n, Infinity, iteratee, callback)
}

/**
 * The same as [times]{@link module:ControlFlow.times} but runs only a single async operation at a time.
 *
 * @name timesSeries
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.times]{@link module:ControlFlow.times}
 * @category Control Flow
 * @param {number} n - The number of times to run the function.
 * @param {AsyncFunction} iteratee - The async function to call `n` times.
 * Invoked with the iteration index and a callback: (n, next).
 * @param {Function} callback - see {@link module:Collections.map}.
 * @returns {Promise} a promise, if no callback is provided
 */
function timesSeries (n, iteratee, callback) {
    return timesLimit(n, 1, iteratee, callback)
}

/**
 * A relative of `reduce`.  Takes an Object or Array, and iterates over each
 * element in parallel, each step potentially mutating an `accumulator` value.
 * The type of the accumulator defaults to the type of collection passed in.
 *
 * @name transform
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {*} [accumulator] - The initial state of the transform.  If omitted,
 * it will default to an empty Object or Array, depending on the type of `coll`
 * @param {AsyncFunction} iteratee - A function applied to each item in the
 * collection that potentially modifies the accumulator.
 * Invoked with (accumulator, item, key, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result is the transformed accumulator.
 * Invoked with (err, result).
 * @returns {Promise} a promise, if no callback provided
 * @example
 *
 * // file1.txt is a file that is 1000 bytes in size
 * // file2.txt is a file that is 2000 bytes in size
 * // file3.txt is a file that is 3000 bytes in size
 *
 * // helper function that returns human-readable size format from bytes
 * function formatBytes(bytes, decimals = 2) {
 *   // implementation not included for brevity
 *   return humanReadbleFilesize;
 * }
 *
 * const fileList = ['file1.txt','file2.txt','file3.txt'];
 *
 * // asynchronous function that returns the file size, transformed to human-readable format
 * // e.g. 1024 bytes = 1KB, 1234 bytes = 1.21 KB, 1048576 bytes = 1MB, etc.
 * function transformFileSize(acc, value, key, callback) {
 *     fs.stat(value, function(err, stat) {
 *         if (err) {
 *             return callback(err);
 *         }
 *         acc[key] = formatBytes(stat.size);
 *         callback(null);
 *     });
 * }
 *
 * // Using callbacks
 * async.transform(fileList, transformFileSize, function(err, result) {
 *     if(err) {
 *         console.log(err);
 *     } else {
 *         console.log(result);
 *         // [ '1000 Bytes', '1.95 KB', '2.93 KB' ]
 *     }
 * });
 *
 * // Using Promises
 * async.transform(fileList, transformFileSize)
 * .then(result => {
 *     console.log(result);
 *     // [ '1000 Bytes', '1.95 KB', '2.93 KB' ]
 * }).catch(err => {
 *     console.log(err);
 * });
 *
 * // Using async/await
 * (async () => {
 *     try {
 *         let result = await async.transform(fileList, transformFileSize);
 *         console.log(result);
 *         // [ '1000 Bytes', '1.95 KB', '2.93 KB' ]
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * })();
 *
 * @example
 *
 * // file1.txt is a file that is 1000 bytes in size
 * // file2.txt is a file that is 2000 bytes in size
 * // file3.txt is a file that is 3000 bytes in size
 *
 * // helper function that returns human-readable size format from bytes
 * function formatBytes(bytes, decimals = 2) {
 *   // implementation not included for brevity
 *   return humanReadbleFilesize;
 * }
 *
 * const fileMap = { f1: 'file1.txt', f2: 'file2.txt', f3: 'file3.txt' };
 *
 * // asynchronous function that returns the file size, transformed to human-readable format
 * // e.g. 1024 bytes = 1KB, 1234 bytes = 1.21 KB, 1048576 bytes = 1MB, etc.
 * function transformFileSize(acc, value, key, callback) {
 *     fs.stat(value, function(err, stat) {
 *         if (err) {
 *             return callback(err);
 *         }
 *         acc[key] = formatBytes(stat.size);
 *         callback(null);
 *     });
 * }
 *
 * // Using callbacks
 * async.transform(fileMap, transformFileSize, function(err, result) {
 *     if(err) {
 *         console.log(err);
 *     } else {
 *         console.log(result);
 *         // { f1: '1000 Bytes', f2: '1.95 KB', f3: '2.93 KB' }
 *     }
 * });
 *
 * // Using Promises
 * async.transform(fileMap, transformFileSize)
 * .then(result => {
 *     console.log(result);
 *     // { f1: '1000 Bytes', f2: '1.95 KB', f3: '2.93 KB' }
 * }).catch(err => {
 *     console.log(err);
 * });
 *
 * // Using async/await
 * async () => {
 *     try {
 *         let result = await async.transform(fileMap, transformFileSize);
 *         console.log(result);
 *         // { f1: '1000 Bytes', f2: '1.95 KB', f3: '2.93 KB' }
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 */
function transform (coll, accumulator, iteratee, callback) {
    if (arguments.length <= 3 && typeof accumulator === 'function') {
        callback = iteratee;
        iteratee = accumulator;
        accumulator = Array.isArray(coll) ? [] : {};
    }
    callback = once(callback || promiseCallback());
    var _iteratee = wrapAsync(iteratee);

    eachOf$1(coll, (v, k, cb) => {
        _iteratee(accumulator, v, k, cb);
    }, err => callback(err, accumulator));
    return callback[PROMISE_SYMBOL]
}

/**
 * It runs each task in series but stops whenever any of the functions were
 * successful. If one of the tasks were successful, the `callback` will be
 * passed the result of the successful task. If all tasks fail, the callback
 * will be passed the error and result (if any) of the final attempt.
 *
 * @name tryEach
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|AsyncIterable|Object} tasks - A collection containing functions to
 * run, each function is passed a `callback(err, result)` it must call on
 * completion with an error `err` (which can be `null`) and an optional `result`
 * value.
 * @param {Function} [callback] - An optional callback which is called when one
 * of the tasks has succeeded, or all have failed. It receives the `err` and
 * `result` arguments of the last attempt at completing the `task`. Invoked with
 * (err, results).
 * @returns {Promise} a promise, if no callback is passed
 * @example
 * async.tryEach([
 *     function getDataFromFirstWebsite(callback) {
 *         // Try getting the data from the first website
 *         callback(err, data);
 *     },
 *     function getDataFromSecondWebsite(callback) {
 *         // First website failed,
 *         // Try getting the data from the backup website
 *         callback(err, data);
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     Now do something with the data.
 * });
 *
 */
function tryEach(tasks, callback) {
    var error = null;
    var result;
    return eachSeries$1(tasks, (task, taskCb) => {
        wrapAsync(task)((err, ...args) => {
            if (err === false) return taskCb(err);

            if (args.length < 2) {
                [result] = args;
            } else {
                result = args;
            }
            error = err;
            taskCb(err ? null : {});
        });
    }, () => callback(error, result));
}

var tryEach$1 = awaitify(tryEach);

/**
 * Undoes a [memoize]{@link module:Utils.memoize}d function, reverting it to the original,
 * unmemoized form. Handy for testing.
 *
 * @name unmemoize
 * @static
 * @memberOf module:Utils
 * @method
 * @see [async.memoize]{@link module:Utils.memoize}
 * @category Util
 * @param {AsyncFunction} fn - the memoized function
 * @returns {AsyncFunction} a function that calls the original unmemoized function
 */
function unmemoize(fn) {
    return (...args) => {
        return (fn.unmemoized || fn)(...args);
    };
}

/**
 * Repeatedly call `iteratee`, while `test` returns `true`. Calls `callback` when
 * stopped, or an error occurs.
 *
 * @name whilst
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {AsyncFunction} test - asynchronous truth test to perform before each
 * execution of `iteratee`. Invoked with (callback).
 * @param {AsyncFunction} iteratee - An async function which is called each time
 * `test` passes. Invoked with (callback).
 * @param {Function} [callback] - A callback which is called after the test
 * function has failed and repeated execution of `iteratee` has stopped. `callback`
 * will be passed an error and any arguments passed to the final `iteratee`'s
 * callback. Invoked with (err, [results]);
 * @returns {Promise} a promise, if no callback is passed
 * @example
 *
 * var count = 0;
 * async.whilst(
 *     function test(cb) { cb(null, count < 5); },
 *     function iter(callback) {
 *         count++;
 *         setTimeout(function() {
 *             callback(null, count);
 *         }, 1000);
 *     },
 *     function (err, n) {
 *         // 5 seconds have passed, n = 5
 *     }
 * );
 */
function whilst(test, iteratee, callback) {
    callback = onlyOnce(callback);
    var _fn = wrapAsync(iteratee);
    var _test = wrapAsync(test);
    var results = [];

    function next(err, ...rest) {
        if (err) return callback(err);
        results = rest;
        if (err === false) return;
        _test(check);
    }

    function check(err, truth) {
        if (err) return callback(err);
        if (err === false) return;
        if (!truth) return callback(null, ...results);
        _fn(next);
    }

    return _test(check);
}
var whilst$1 = awaitify(whilst, 3);

/**
 * Repeatedly call `iteratee` until `test` returns `true`. Calls `callback` when
 * stopped, or an error occurs. `callback` will be passed an error and any
 * arguments passed to the final `iteratee`'s callback.
 *
 * The inverse of [whilst]{@link module:ControlFlow.whilst}.
 *
 * @name until
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.whilst]{@link module:ControlFlow.whilst}
 * @category Control Flow
 * @param {AsyncFunction} test - asynchronous truth test to perform before each
 * execution of `iteratee`. Invoked with (callback).
 * @param {AsyncFunction} iteratee - An async function which is called each time
 * `test` fails. Invoked with (callback).
 * @param {Function} [callback] - A callback which is called after the test
 * function has passed and repeated execution of `iteratee` has stopped. `callback`
 * will be passed an error and any arguments passed to the final `iteratee`'s
 * callback. Invoked with (err, [results]);
 * @returns {Promise} a promise, if a callback is not passed
 *
 * @example
 * const results = []
 * let finished = false
 * async.until(function test(cb) {
 *     cb(null, finished)
 * }, function iter(next) {
 *     fetchPage(url, (err, body) => {
 *         if (err) return next(err)
 *         results = results.concat(body.objects)
 *         finished = !!body.next
 *         next(err)
 *     })
 * }, function done (err) {
 *     // all pages have been fetched
 * })
 */
function until(test, iteratee, callback) {
    const _test = wrapAsync(test);
    return whilst$1((cb) => _test((err, truth) => cb (err, !truth)), iteratee, callback);
}

/**
 * Runs the `tasks` array of functions in series, each passing their results to
 * the next in the array. However, if any of the `tasks` pass an error to their
 * own callback, the next function is not executed, and the main `callback` is
 * immediately called with the error.
 *
 * @name waterfall
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array} tasks - An array of [async functions]{@link AsyncFunction}
 * to run.
 * Each function should complete with any number of `result` values.
 * The `result` values will be passed as arguments, in order, to the next task.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed. This will be passed the results of the last task's
 * callback. Invoked with (err, [results]).
 * @returns {Promise} a promise, if a callback is omitted
 * @example
 *
 * async.waterfall([
 *     function(callback) {
 *         callback(null, 'one', 'two');
 *     },
 *     function(arg1, arg2, callback) {
 *         // arg1 now equals 'one' and arg2 now equals 'two'
 *         callback(null, 'three');
 *     },
 *     function(arg1, callback) {
 *         // arg1 now equals 'three'
 *         callback(null, 'done');
 *     }
 * ], function (err, result) {
 *     // result now equals 'done'
 * });
 *
 * // Or, with named functions:
 * async.waterfall([
 *     myFirstFunction,
 *     mySecondFunction,
 *     myLastFunction,
 * ], function (err, result) {
 *     // result now equals 'done'
 * });
 * function myFirstFunction(callback) {
 *     callback(null, 'one', 'two');
 * }
 * function mySecondFunction(arg1, arg2, callback) {
 *     // arg1 now equals 'one' and arg2 now equals 'two'
 *     callback(null, 'three');
 * }
 * function myLastFunction(arg1, callback) {
 *     // arg1 now equals 'three'
 *     callback(null, 'done');
 * }
 */
function waterfall (tasks, callback) {
    callback = once(callback);
    if (!Array.isArray(tasks)) return callback(new Error('First argument to waterfall must be an array of functions'));
    if (!tasks.length) return callback();
    var taskIndex = 0;

    function nextTask(args) {
        var task = wrapAsync(tasks[taskIndex++]);
        task(...args, onlyOnce(next));
    }

    function next(err, ...args) {
        if (err === false) return
        if (err || taskIndex === tasks.length) {
            return callback(err, ...args);
        }
        nextTask(args);
    }

    nextTask([]);
}

var waterfall$1 = awaitify(waterfall);

/**
 * An "async function" in the context of Async is an asynchronous function with
 * a variable number of parameters, with the final parameter being a callback.
 * (`function (arg1, arg2, ..., callback) {}`)
 * The final callback is of the form `callback(err, results...)`, which must be
 * called once the function is completed.  The callback should be called with a
 * Error as its first argument to signal that an error occurred.
 * Otherwise, if no error occurred, it should be called with `null` as the first
 * argument, and any additional `result` arguments that may apply, to signal
 * successful completion.
 * The callback must be called exactly once, ideally on a later tick of the
 * JavaScript event loop.
 *
 * This type of function is also referred to as a "Node-style async function",
 * or a "continuation passing-style function" (CPS). Most of the methods of this
 * library are themselves CPS/Node-style async functions, or functions that
 * return CPS/Node-style async functions.
 *
 * Wherever we accept a Node-style async function, we also directly accept an
 * [ES2017 `async` function]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function}.
 * In this case, the `async` function will not be passed a final callback
 * argument, and any thrown error will be used as the `err` argument of the
 * implicit callback, and the return value will be used as the `result` value.
 * (i.e. a `rejected` of the returned Promise becomes the `err` callback
 * argument, and a `resolved` value becomes the `result`.)
 *
 * Note, due to JavaScript limitations, we can only detect native `async`
 * functions and not transpilied implementations.
 * Your environment must have `async`/`await` support for this to work.
 * (e.g. Node > v7.6, or a recent version of a modern browser).
 * If you are using `async` functions through a transpiler (e.g. Babel), you
 * must still wrap the function with [asyncify]{@link module:Utils.asyncify},
 * because the `async function` will be compiled to an ordinary function that
 * returns a promise.
 *
 * @typedef {Function} AsyncFunction
 * @static
 */


var index$1 = {
    apply,
    applyEach,
    applyEachSeries,
    asyncify,
    auto,
    autoInject,
    cargo: cargo$1,
    cargoQueue: cargo,
    compose,
    concat: concat$1,
    concatLimit: concatLimit$1,
    concatSeries: concatSeries$1,
    constant: constant$1,
    detect: detect$1,
    detectLimit: detectLimit$1,
    detectSeries: detectSeries$1,
    dir,
    doUntil,
    doWhilst: doWhilst$1,
    each,
    eachLimit: eachLimit$1,
    eachOf: eachOf$1,
    eachOfLimit: eachOfLimit$1,
    eachOfSeries: eachOfSeries$1,
    eachSeries: eachSeries$1,
    ensureAsync,
    every: every$1,
    everyLimit: everyLimit$1,
    everySeries: everySeries$1,
    filter: filter$1,
    filterLimit: filterLimit$1,
    filterSeries: filterSeries$1,
    forever: forever$1,
    groupBy,
    groupByLimit: groupByLimit$1,
    groupBySeries,
    log,
    map: map$1,
    mapLimit: mapLimit$1,
    mapSeries: mapSeries$1,
    mapValues,
    mapValuesLimit: mapValuesLimit$1,
    mapValuesSeries,
    memoize,
    nextTick,
    parallel,
    parallelLimit,
    priorityQueue,
    queue,
    race: race$1,
    reduce: reduce$1,
    reduceRight,
    reflect,
    reflectAll,
    reject: reject$1,
    rejectLimit: rejectLimit$1,
    rejectSeries: rejectSeries$1,
    retry,
    retryable,
    seq,
    series,
    setImmediate: setImmediate$1,
    some: some$1,
    someLimit: someLimit$1,
    someSeries: someSeries$1,
    sortBy: sortBy$1,
    timeout,
    times,
    timesLimit,
    timesSeries,
    transform,
    tryEach: tryEach$1,
    unmemoize,
    until,
    waterfall: waterfall$1,
    whilst: whilst$1,

    // aliases
    all: every$1,
    allLimit: everyLimit$1,
    allSeries: everySeries$1,
    any: some$1,
    anyLimit: someLimit$1,
    anySeries: someSeries$1,
    find: detect$1,
    findLimit: detectLimit$1,
    findSeries: detectSeries$1,
    flatMap: concat$1,
    flatMapLimit: concatLimit$1,
    flatMapSeries: concatSeries$1,
    forEach: each,
    forEachSeries: eachSeries$1,
    forEachLimit: eachLimit$1,
    forEachOf: eachOf$1,
    forEachOfSeries: eachOfSeries$1,
    forEachOfLimit: eachOfLimit$1,
    inject: reduce$1,
    foldl: reduce$1,
    foldr: reduceRight,
    select: filter$1,
    selectLimit: filterLimit$1,
    selectSeries: filterSeries$1,
    wrapSync: asyncify,
    during: whilst$1,
    doDuring: doWhilst$1
};

const async = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	all: every$1,
	allLimit: everyLimit$1,
	allSeries: everySeries$1,
	any: some$1,
	anyLimit: someLimit$1,
	anySeries: someSeries$1,
	apply,
	applyEach,
	applyEachSeries,
	asyncify,
	auto,
	autoInject,
	cargo: cargo$1,
	cargoQueue: cargo,
	compose,
	concat: concat$1,
	concatLimit: concatLimit$1,
	concatSeries: concatSeries$1,
	constant: constant$1,
	default: index$1,
	detect: detect$1,
	detectLimit: detectLimit$1,
	detectSeries: detectSeries$1,
	dir,
	doDuring: doWhilst$1,
	doUntil,
	doWhilst: doWhilst$1,
	during: whilst$1,
	each,
	eachLimit: eachLimit$1,
	eachOf: eachOf$1,
	eachOfLimit: eachOfLimit$1,
	eachOfSeries: eachOfSeries$1,
	eachSeries: eachSeries$1,
	ensureAsync,
	every: every$1,
	everyLimit: everyLimit$1,
	everySeries: everySeries$1,
	filter: filter$1,
	filterLimit: filterLimit$1,
	filterSeries: filterSeries$1,
	find: detect$1,
	findLimit: detectLimit$1,
	findSeries: detectSeries$1,
	flatMap: concat$1,
	flatMapLimit: concatLimit$1,
	flatMapSeries: concatSeries$1,
	foldl: reduce$1,
	foldr: reduceRight,
	forEach: each,
	forEachLimit: eachLimit$1,
	forEachOf: eachOf$1,
	forEachOfLimit: eachOfLimit$1,
	forEachOfSeries: eachOfSeries$1,
	forEachSeries: eachSeries$1,
	forever: forever$1,
	groupBy,
	groupByLimit: groupByLimit$1,
	groupBySeries,
	inject: reduce$1,
	log,
	map: map$1,
	mapLimit: mapLimit$1,
	mapSeries: mapSeries$1,
	mapValues,
	mapValuesLimit: mapValuesLimit$1,
	mapValuesSeries,
	memoize,
	nextTick,
	parallel,
	parallelLimit,
	priorityQueue,
	queue,
	race: race$1,
	reduce: reduce$1,
	reduceRight,
	reflect,
	reflectAll,
	reject: reject$1,
	rejectLimit: rejectLimit$1,
	rejectSeries: rejectSeries$1,
	retry,
	retryable,
	select: filter$1,
	selectLimit: filterLimit$1,
	selectSeries: filterSeries$1,
	seq,
	series,
	setImmediate: setImmediate$1,
	some: some$1,
	someLimit: someLimit$1,
	someSeries: someSeries$1,
	sortBy: sortBy$1,
	timeout,
	times,
	timesLimit,
	timesSeries,
	transform,
	tryEach: tryEach$1,
	unmemoize,
	until,
	waterfall: waterfall$1,
	whilst: whilst$1,
	wrapSync: asyncify
}, Symbol.toStringTag, { value: 'Module' }));

const require$$1 = /*@__PURE__*/getAugmentedNamespace(async);

var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util;
	hasRequiredUtil = 1;
	const path = require$$1$1;
	const async = require$$1;
	const fs = /*@__PURE__*/ requireLib$1();
	const Git = requireGit();

	/**
	 * Generate a list of unique directory paths given a list of file paths.
	 * @param {Array<string>} files List of file paths.
	 * @return {Array<string>} List of directory paths.
	 */
	function uniqueDirs(files) {
	  const dirs = new Set();
	  files.forEach((filepath) => {
	    const parts = path.dirname(filepath).split(path.sep);
	    let partial = parts[0] || '/';
	    dirs.add(partial);
	    for (let i = 1, ii = parts.length; i < ii; ++i) {
	      partial = path.join(partial, parts[i]);
	      dirs.add(partial);
	    }
	  });
	  return Array.from(dirs);
	}

	/**
	 * Sort function for paths.  Sorter paths come first.  Paths of equal length are
	 * sorted alphanumerically in path segment order.
	 * @param {string} a First path.
	 * @param {string} b Second path.
	 * @return {number} Comparison.
	 */
	function byShortPath(a, b) {
	  const aParts = a.split(path.sep);
	  const bParts = b.split(path.sep);
	  const aLength = aParts.length;
	  const bLength = bParts.length;
	  let cmp = 0;
	  if (aLength < bLength) {
	    cmp = -1;
	  } else if (aLength > bLength) {
	    cmp = 1;
	  } else {
	    let aPart, bPart;
	    for (let i = 0; i < aLength; ++i) {
	      aPart = aParts[i];
	      bPart = bParts[i];
	      if (aPart < bPart) {
	        cmp = -1;
	        break;
	      } else if (aPart > bPart) {
	        cmp = 1;
	        break;
	      }
	    }
	  }
	  return cmp;
	}
	util.byShortPath = byShortPath;

	/**
	 * Generate a list of directories to create given a list of file paths.
	 * @param {Array<string>} files List of file paths.
	 * @return {Array<string>} List of directory paths ordered by path length.
	 */
	function dirsToCreate(files) {
	  return uniqueDirs(files).sort(byShortPath);
	}
	util.copy = function (files, base, dest) {
	  return new Promise((resolve, reject) => {
	    const pairs = [];
	    const destFiles = [];
	    files.forEach((file) => {
	      const src = path.resolve(base, file);
	      const relative = path.relative(base, src);
	      const target = path.join(dest, relative);
	      pairs.push({
	        src: src,
	        dest: target,
	      });
	      destFiles.push(target);
	    });

	    async.eachSeries(dirsToCreate(destFiles), makeDir, (err) => {
	      if (err) {
	        return reject(err);
	      }
	      async.each(pairs, copyFile, (err) => {
	        if (err) {
	          return reject(err);
	        } else {
	          return resolve();
	        }
	      });
	    });
	  });
	};

	util.copyFile = copyFile;

	util.dirsToCreate = dirsToCreate;

	/**
	 * Copy a file.
	 * @param {Object} obj Object with src and dest properties.
	 * @param {function(Error):void} callback Callback
	 */
	function copyFile(obj, callback) {
	  let called = false;
	  function done(err) {
	    if (!called) {
	      called = true;
	      callback(err);
	    }
	  }

	  const read = fs.createReadStream(obj.src);
	  read.on('error', (err) => {
	    done(err);
	  });

	  const write = fs.createWriteStream(obj.dest);
	  write.on('error', (err) => {
	    done(err);
	  });
	  write.on('close', () => {
	    done();
	  });

	  read.pipe(write);
	}

	/**
	 * Make directory, ignoring errors if directory already exists.
	 * @param {string} path Directory path.
	 * @param {function(Error):void} callback Callback.
	 */
	function makeDir(path, callback) {
	  fs.mkdir(path, (err) => {
	    if (err) {
	      // check if directory exists
	      fs.stat(path, (err2, stat) => {
	        if (err2 || !stat.isDirectory()) {
	          callback(err);
	        } else {
	          callback();
	        }
	      });
	    } else {
	      callback();
	    }
	  });
	}

	/**
	 * Copy a list of files.
	 * @param {Array<string>} files Files to copy.
	 * @param {string} base Base directory.
	 * @param {string} dest Destination directory.
	 * @return {Promise} A promise.
	 */

	util.getUser = function (cwd) {
	  return Promise.all([
	    new Git(cwd).exec('config', 'user.name'),
	    new Git(cwd).exec('config', 'user.email'),
	  ])
	    .then((results) => {
	      return {name: results[0].output.trim(), email: results[1].output.trim()};
	    })
	    .catch((err) => {
	      // git config exits with 1 if name or email is not set
	      return null;
	    });
	};

	util.uniqueDirs = uniqueDirs;
	return util;
}

var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib$1;
	hasRequiredLib = 1;
	(function (exports) {
		const path = require$$1$1;
		const util = require$$1$1;
		const filenamify = requireFilenamify();
		const findCacheDir = requireFindCacheDir();
		const fs = /*@__PURE__*/ requireLib$1();
		const globby = requireGlobby();
		const Git = requireGit();
		const copy = requireUtil().copy;
		const getUser = requireUtil().getUser;

		const log = util.debuglog('gh-pages');

		/**
		 * Get the cache directory.
		 * @param {string} [optPath] Optional path.
		 * @return {string} The full path to the cache directory.
		 */
		function getCacheDir(optPath) {
		  const dir = findCacheDir({name: 'gh-pages'});
		  if (!optPath) {
		    return dir;
		  }

		  return path.join(dir, filenamify(optPath));
		}

		/**
		 * Clean the cache directory.
		 */
		exports.clean = function clean() {
		  fs.removeSync(getCacheDir());
		};

		exports.defaults = {
		  dest: '.',
		  add: false,
		  git: 'git',
		  depth: 1,
		  dotfiles: false,
		  branch: 'gh-pages',
		  remote: 'origin',
		  src: '**/*',
		  remove: '.',
		  push: true,
		  history: true,
		  message: 'Updates',
		  silent: false,
		};

		exports.getCacheDir = getCacheDir;

		function getRepo(options) {
		  if (options.repo) {
		    return Promise.resolve(options.repo);
		  } else {
		    const git = new Git(process.cwd(), options.git);
		    return git.getRemoteUrl(options.remote);
		  }
		}

		/**
		 * Push a git branch to a remote (pushes gh-pages by default).
		 * @param {string} basePath The base path.
		 * @param {Object} config Publish options.
		 * @param {Function} callback Callback.
		 * @return {Promise} A promise.
		 */
		exports.publish = function publish(basePath, config, callback) {
		  if (typeof config === 'function') {
		    callback = config;
		    config = {};
		  }

		  const options = Object.assign({}, exports.defaults, config);

		  // For backward compatibility before fixing #334
		  if (options.only) {
		    options.remove = options.only;
		  }

		  if (!callback) {
		    callback = function (err) {
		      if (err) {
		        log(err.message);
		      }
		    };
		  }

		  function done(err) {
		    try {
		      callback(err);
		    } catch (err2) {
		      log('Publish callback threw: %s', err2.message);
		    }
		  }

		  try {
		    if (!fs.statSync(basePath).isDirectory()) {
		      const err = new Error('The "base" option must be an existing directory');
		      done(err);
		      return Promise.reject(err);
		    }
		  } catch (err) {
		    done(err);
		    return Promise.reject(err);
		  }

		  const files = globby
		    .sync(options.src, {
		      cwd: basePath,
		      dot: options.dotfiles,
		    })
		    .filter((file) => {
		      return !fs.statSync(path.join(basePath, file)).isDirectory();
		    });

		  if (!Array.isArray(files) || files.length === 0) {
		    done(
		      new Error('The pattern in the "src" property didn\'t match any files.'),
		    );
		    return;
		  }

		  let repoUrl;
		  let userPromise;
		  if (options.user) {
		    userPromise = Promise.resolve(options.user);
		  } else {
		    userPromise = getUser();
		  }
		  return userPromise.then((user) =>
		    getRepo(options)
		      .then((repo) => {
		        repoUrl = repo;
		        const clone = getCacheDir(repo);
		        log('Cloning %s into %s', repo, clone);
		        return Git.clone(repo, clone, options.branch, options);
		      })
		      .then((git) => {
		        return git.getRemoteUrl(options.remote).then((url) => {
		          if (url !== repoUrl) {
		            const message =
		              'Remote url mismatch.  Got "' +
		              url +
		              '" ' +
		              'but expected "' +
		              repoUrl +
		              '" in ' +
		              git.cwd +
		              '.  Try running the `gh-pages-clean` script first.';
		            throw new Error(message);
		          }
		          return git;
		        });
		      })
		      .then((git) => {
		        // only required if someone mucks with the checkout between builds
		        log('Cleaning');
		        return git.clean();
		      })
		      .then((git) => {
		        log('Fetching %s', options.remote);
		        return git.fetch(options.remote);
		      })
		      .then((git) => {
		        log('Checking out %s/%s ', options.remote, options.branch);
		        return git.checkout(options.remote, options.branch);
		      })
		      .then((git) => {
		        if (!options.history) {
		          return git.deleteRef(options.branch);
		        } else {
		          return git;
		        }
		      })
		      .then((git) => {
		        if (options.add) {
		          return git;
		        }

		        log('Removing files');
		        const files = globby
		          .sync(options.remove, {
		            cwd: path.join(git.cwd, options.dest),
		          })
		          .map((file) => path.join(options.dest, file));
		        if (files.length > 0) {
		          return git.rm(files);
		        } else {
		          return git;
		        }
		      })
		      .then((git) => {
		        if (options.nojekyll) {
		          log('Creating .nojekyll');
		          fs.createFileSync(path.join(git.cwd, '.nojekyll'));
		        }
		        if (options.cname) {
		          log('Creating CNAME for %s', options.cname);
		          fs.writeFileSync(path.join(git.cwd, 'CNAME'), options.cname);
		        }
		        log('Copying files');
		        return copy(files, basePath, path.join(git.cwd, options.dest)).then(
		          function () {
		            return git;
		          },
		        );
		      })
		      .then((git) => {
		        return Promise.resolve(
		          options.beforeAdd && options.beforeAdd(git),
		        ).then(() => git);
		      })
		      .then((git) => {
		        log('Adding all');
		        return git.add('.');
		      })
		      .then((git) => {
		        if (!user) {
		          return git;
		        }
		        return git.exec('config', 'user.email', user.email).then(() => {
		          if (!user.name) {
		            return git;
		          }
		          return git.exec('config', 'user.name', user.name);
		        });
		      })
		      .then((git) => {
		        log('Committing');
		        return git.commit(options.message);
		      })
		      .then((git) => {
		        if (options.tag) {
		          log('Tagging');
		          return git.tag(options.tag).catch((error) => {
		            // tagging failed probably because this tag alredy exists
		            log(error);
		            log('Tagging failed, continuing');
		            return git;
		          });
		        } else {
		          return git;
		        }
		      })
		      .then((git) => {
		        if (options.push) {
		          log('Pushing');
		          return git.push(options.remote, options.branch, !options.history);
		        } else {
		          return git;
		        }
		      })
		      .then(
		        () => done(),
		        (error) => {
		          if (options.silent) {
		            error = new Error(
		              'Unspecified error (run without silent option for detail)',
		            );
		          }
		          done(error);
		        },
		      ),
		  );
		}; 
	} (lib$1));
	return lib$1;
}

var libExports = requireLib();
const index = /*@__PURE__*/getDefaultExportFromCjs(libExports);

export { index as default };
