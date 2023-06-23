# Sanctuary
An application designed for clients to efficiently find the best possible deal for any high-end clothing item they desire.



## Running the React App
### Step 1
Have Node.js and npm installed and make sure you are running node version 16.
On the first time starting the app, run the command `npm install` at the terminal/command line to setup the necessary packages.

### Step 2
To configure eslint with Visual Studio Code on your local machine, search for ESLint in the Extensions tab. Click Install once you have located the extension. Then, to configure ESLint to automatically fix syntax and formatting issues every time you save, you will need to open the settings menu.
To find the settings in Visual Studio Code, use the command palette to open Preferences: Open Workspace Settings (JSON). The `settings.json` file will open inside of your code editor. For ESLint to fix errors when you save your file, you will need to write the following code in `settings.json`:

`{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript"],
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "editor.defaultFormatter": "dbaeumer.vscode-eslint"
}`

restart Visual Studio Code to apply these changes.

### Step 3
Run the command `npm start` to start the application. You can view the application at port 3000 (localhost:3000 in a browser)
