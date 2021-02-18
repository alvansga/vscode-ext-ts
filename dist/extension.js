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
const vscode = __webpack_require__(1);
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "helloworld" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    vscode.window.registerTreeDataProvider('ReferFunction', new TreeDataProvider());
    let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Testing Tree Data View! Look at your Explorer\nby @alvansga');
    });
    let disposable2 = vscode.commands.registerCommand('helloworld.openPROJECT', () => __awaiter(this, void 0, void 0, function* () {
        // The code you place here will be executed every time your command is executed
        let uri = vscode.Uri.file('D:/Working/3663/PROJECT_2/code');
        let success = vscode.commands.executeCommand('vscode.openFolder', uri);
        const value = yield vscode.window.showQuickPick(["OK", "Cancel"], { placeHolder: 'Select OK or Cancel' });
        // const value = await vscode.window.showQuickPick(
        // 	[
        // 		{ label: 'User', description: 'User Settings', target: vscode.ConfigurationTarget.Global },
        // 		{ label: 'Workspace', description: 'Workspace Settings', target: vscode.ConfigurationTarget.Workspace }
        // 	],
        // 	{ placeHolder: 'Select the view to show when opening a window.' });
        console.log(value);
        // if(value)
        // {
        // 	console.log('OK');
        // }
        // else
        // {
        // 	console.log('CANCEL');
        // }
    }));
    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
}
exports.activate = activate;
class TreeDataProvider {
    constructor() {
        this.data = [new TreeItem('MApp_DVB_Scan', [
                new TreeItem('MApp_DTV_Scan MApp_Scan.c'),
                new TreeItem('MApp_DTV_Scan_Update_Mux MApp_Scan.c'),
                new TreeItem('MApp_DTV_Scan MApp_Scan_CVT.c'),
                new TreeItem('MApp_DTV_Scan_Update_Mux MApp_Scan_CVT.c'),
                new TreeItem('MApp_OAD_Scan MApp_OAD.c'),
                new TreeItem('MApp_OAD_Scan_Update_Mux MApp_OAD.c')
            ])];
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element === undefined) {
            return this.data;
        }
        return element.children;
    }
}
class TreeItem extends vscode.TreeItem {
    constructor(label, children) {
        super(label, children === undefined ? vscode.TreeItemCollapsibleState.None :
            vscode.TreeItemCollapsibleState.Expanded);
        this.children = children;
    }
}


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");;

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