import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	vscode.window.registerTreeDataProvider('exampleView', new TreeDataProvider());

	let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Testing Tree Data View! Look at side bar by @alvansga');
	});
	
	context.subscriptions.push(disposable);
}

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
  onDidChangeTreeData?: vscode.Event<TreeItem|null|undefined>|undefined;

  data: TreeItem[];

  constructor() {
    this.data = [new TreeItem('cars', [
      new TreeItem(
          'Ford', [new TreeItem('Fiesta'), new TreeItem('Focus'), new TreeItem('Mustang')]),
      new TreeItem(
          'BMW', [new TreeItem('320'), new TreeItem('X3'), new TreeItem('X5')])
    ])];
  }

  getTreeItem(element: TreeItem): vscode.TreeItem|Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: TreeItem|undefined): vscode.ProviderResult<TreeItem[]> {
    if (element === undefined) {
      return this.data;
    }
    return element.children;
  }
}

class TreeItem extends vscode.TreeItem {
  children: TreeItem[]|undefined;

  constructor(label: string, children?: TreeItem[]) {
    super(
        label,
        children === undefined ? vscode.TreeItemCollapsibleState.None :
                                 vscode.TreeItemCollapsibleState.Expanded);
    this.children = children;
  }
}