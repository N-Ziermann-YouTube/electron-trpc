import { app, BrowserWindow } from 'electron';
import { isDev } from './util.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
import { DEV_PORT } from './constants.js';
import { registerTrpcIpcListener } from './trpc.js';

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

  registerTrpcIpcListener();
});
