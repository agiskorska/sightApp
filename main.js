'use strict';

const path = require('path');
const { app, BrowserWindow } = require('electron');

function main() {

  // create new window
  let mainWindow = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true
    },
    width: 800,
    height: 800,
  })

  // load app/index.html as the window content
  mainWindow.loadFile(path.join('app', 'index.html'));

}

app.on('ready', main);

app.on('window-all-closed', function () {
  app.quit();
});