import { app, BrowserWindow } from 'electron';
import { ipcMainHandle, ipcWebContentsSend, isDev } from './util.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
import { DEV_PORT } from './constants.js';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL(`http://localhost:${DEV_PORT}`);
  } else {
    mainWindow.loadFile(getUIPath());
  }

  ipcMainHandle('requestExample', () => {
    return { message: 'Hello World' };
  });

  let changingMessageNumber = 1;
  setInterval(() => {
    ipcWebContentsSend('exampleChanged', mainWindow.webContents, {
      message: `Message Number: ${changingMessageNumber}`,
    });
    changingMessageNumber++;
  }, 500);
});
