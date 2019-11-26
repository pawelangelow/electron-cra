const { fork } = require('child_process');
const { join } = require('path');
const { ipcMain } = require('electron');

const hardWorker = fork(join(__dirname, 'worker'));

ipcMain.on('start-the-worker', () => {
  hardWorker.send({ message: 'start-worker' });
});

ipcMain.on('stop-the-worker', () => {
  hardWorker.send({ message: 'stop-worker' });
});

module.exports = mainWindow => {
  hardWorker.on('message', m => {
    mainWindow.webContents.send(m.message, m.payload);
  });
};
