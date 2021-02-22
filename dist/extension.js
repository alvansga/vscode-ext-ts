/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const FoodPyramidHierarchyProvider_1 = __webpack_require__(2);
const util_1 = __webpack_require__(4);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "call-hierarchy-sample" is now active!');
    const disposable = vscode.languages.registerCallHierarchyProvider('c', new FoodPyramidHierarchyProvider_1.FoodPyramidHierarchyProvider());
    context.subscriptions.push(disposable);
    // showSampleText(context);
}
exports.activate = activate;
function showSampleText(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const sampleTextEncoded = yield vscode.workspace.fs.readFile(vscode.Uri.file(context.asAbsolutePath('sample.txt')));
        const sampleText = new util_1.TextDecoder('utf-8').decode(sampleTextEncoded);
        const doc = yield vscode.workspace.openTextDocument({ language: 'c', content: sampleText });
        vscode.window.showTextDocument(doc);
    });
}


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");;

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FoodPyramidHierarchyProvider = void 0;
const vscode = __webpack_require__(1);
const model_1 = __webpack_require__(3);
class FoodPyramidHierarchyProvider {
    prepareCallHierarchy(document, position, token) {
        const range = document.getWordRangeAtPosition(position);
        console.log("filename : " + document.fileName);
        console.log("range prepareCallhierarchy : " + range);
        if (range) {
            const word = document.getText(range);
            console.log("word : " + word);
            return this.createCallHierarchyItem(word, '', document, range);
        }
        else {
            return undefined;
        }
    }
    provideCallHierarchyOutgoingCalls(item, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield vscode.workspace.openTextDocument(item.uri);
            const parser = new FoodPyramidParser();
            parser.parse(document);
            const model = parser.getModel();
            const originRelation = model.getRelationAt(item.range);
            const outgoingCallItems = [];
            if (model.isVerb(item.name)) {
                const outgoingCalls = model.getVerbRelations(item.name)
                    .filter(relation => relation.subject === originRelation.subject);
                outgoingCalls.forEach(relation => {
                    const outgoingCallRange = relation.getRangeOf(relation.object);
                    const verbItem = this.createCallHierarchyItem(relation.object, 'noun', document, outgoingCallRange);
                    const outgoingCallItem = new vscode.CallHierarchyOutgoingCall(verbItem, [outgoingCallRange]);
                    outgoingCallItems.push(outgoingCallItem);
                });
            }
            else if (model.isNoun(item.name)) {
                const outgoingCallMap = groupBy(model.getSubjectRelations(item.name), relation => relation.verb);
                outgoingCallMap.forEach((relations, verb) => {
                    const outgoingCallRanges = relations.map(relation => relation.getRangeOf(verb));
                    const verbItem = this.createCallHierarchyItem(verb, 'verb', document, outgoingCallRanges[0]);
                    const outgoingCallItem = new vscode.CallHierarchyOutgoingCall(verbItem, outgoingCallRanges);
                    outgoingCallItems.push(outgoingCallItem);
                });
            }
            return outgoingCallItems;
        });
    }
    provideCallHierarchyIncomingCalls(item, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield vscode.workspace.openTextDocument(item.uri);
            const parser = new FoodPyramidParser();
            parser.parse(document);
            const model = parser.getModel();
            const originRelation = model.getRelationAt(item.range);
            const outgoingCallItems = [];
            if (model.isVerb(item.name)) {
                const outgoingCalls = model.getVerbRelations(item.name)
                    .filter(relation => relation.object === originRelation.object);
                outgoingCalls.forEach(relation => {
                    const outgoingCallRange = relation.getRangeOf(relation.subject);
                    const verbItem = this.createCallHierarchyItem(relation.subject, 'noun', document, outgoingCallRange);
                    const outgoingCallItem = new vscode.CallHierarchyIncomingCall(verbItem, [outgoingCallRange]);
                    outgoingCallItems.push(outgoingCallItem);
                });
            }
            else if (model.isNoun(item.name)) {
                const outgoingCallMap = groupBy(model.getObjectRelations(item.name), relation => relation.verb);
                outgoingCallMap.forEach((relations, verb) => {
                    const outgoingCallRanges = relations.map(relation => relation.getRangeOf(verb));
                    const verbItem = this.createCallHierarchyItem(verb, 'verb-inverted', document, outgoingCallRanges[0]);
                    const outgoingCallItem = new vscode.CallHierarchyIncomingCall(verbItem, outgoingCallRanges);
                    outgoingCallItems.push(outgoingCallItem);
                });
            }
            return outgoingCallItems;
        });
    }
    createCallHierarchyItem(word, type, document, range) {
        console.log("creating callhierarchyitem");
        return new vscode.CallHierarchyItem(vscode.SymbolKind.Object, word, `(${type})`, document.uri, range, range);
    }
}
exports.FoodPyramidHierarchyProvider = FoodPyramidHierarchyProvider;
/**
 * Sample parser of the document text into the [FoodPyramid](#FoodPyramid) model.
 */
class FoodPyramidParser {
    constructor() {
        this._model = new model_1.FoodPyramid();
    }
    getModel() {
        return this._model;
    }
    parse(textDocument) {
        const pattern = /^(\w+)\s+(\w+)\s+(\w+).$/gm;
        let match;
        console.log("textDocument.getText() : " + textDocument.getText());
        while ((match = pattern.exec(textDocument.getText()))) {
            const startPosition = textDocument.positionAt(match.index);
            const range = new vscode.Range(startPosition, startPosition.translate({ characterDelta: match[0].length }));
            console.log("match[1]: " + match[1] + "; match[2]: " + match[2] + "; match[3]: " + match[3] + "; match[0]: " + match[0] + "; range: " + range);
            this._model.addRelation(new model_1.FoodRelation(match[1], match[2], match[3], match[0], range));
        }
    }
}
/**
 * Groups array items by a field defined using a key selector.
 * @param array array to be grouped
 * @param keyGetter grouping key selector
 */
function groupBy(array, keyGetter) {
    const map = new Map();
    array.forEach((item) => {
        const key = keyGetter(item);
        const groupForKey = map.get(key) || [];
        groupForKey.push(item);
        map.set(key, groupForKey);
    });
    return map;
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FoodRelation = exports.FoodPyramid = void 0;
const vscode = __webpack_require__(1);
/**
 * Sample model of what the text in the document contains.
 */
class FoodPyramid {
    constructor() {
        this._relations = [];
        this._nouns = new Set();
        this._verbs = new Set();
    }
    getRelationAt(wordRange) {
        return this._relations.find(relation => relation.range.contains(wordRange));
    }
    addRelation(relation) {
        this._relations.push(relation);
        this._nouns.add(relation.object).add(relation.subject);
        this._verbs.add(relation.verb);
    }
    isVerb(name) {
        return this._verbs.has(name.toLowerCase());
    }
    isNoun(name) {
        return this._nouns.has(name.toLowerCase());
    }
    getVerbRelations(verb) {
        return this._relations
            .filter(relation => relation.verb === verb.toLowerCase());
    }
    getNounRelations(noun) {
        return this._relations
            .filter(relation => relation.involves(noun));
    }
    getSubjectRelations(subject) {
        return this._relations
            .filter(relation => relation.subject === subject.toLowerCase());
    }
    getObjectRelations(object) {
        return this._relations
            .filter(relation => relation.object === object.toLowerCase());
    }
}
exports.FoodPyramid = FoodPyramid;
/**
 * Model element.
 */
class FoodRelation {
    constructor(subject, verb, object, originalText, range) {
        this.originalText = originalText;
        this.range = range;
        this._subject = subject.toLowerCase();
        this._verb = verb.toLowerCase();
        this._object = object.toLowerCase();
    }
    get subject() {
        return this._subject;
    }
    get object() {
        return this._object;
    }
    get verb() {
        return this._verb;
    }
    involves(noun) {
        const needle = noun.toLowerCase();
        return this._subject === needle || this._object === needle;
    }
    getRangeOf(word) {
        const indexOfWord = new RegExp("\\b" + word + "\\b", "i").exec(this.originalText).index;
        return new vscode.Range(this.range.start.translate({ characterDelta: indexOfWord }), this.range.start.translate({ characterDelta: indexOfWord + word.length }));
    }
}
exports.FoodRelation = FoodRelation;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("util");;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map