const { join } = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const startBackgroundProcesses = require('./background');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(app.getAppPath(), '..', 'preload.js'),
    },
    show: false,
  });

  const startPointOfBuild = `file://${join(__dirname, '..', 'index.html')}`;
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : startPointOfBuild);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
  });

  isDev && mainWindow.webContents.openDevTools();

  startBackgroundProcesses(mainWindow);

  ipcMain.on('new-window-channel', (event, windowName) => {
    let newWindow = new BrowserWindow({
      title: windowName || 'My new window',
      width: 600,
      height: 480,
    });

    newWindow.on('closed', () => {
      console.log('Window is closed');
      newWindow = null;
    });

    setTimeout(() => {
      if (newWindow) {
        newWindow.close();
      }
    }, 10 * 1000);
  });
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
