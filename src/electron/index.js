const { join } = require('path');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(app.getAppPath(), '..', 'preload.js'),
    },
  });

  const startPointOfBuild = `file://${join(__dirname, '..', 'index.html')}`;
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : startPointOfBuild);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  isDev && mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
