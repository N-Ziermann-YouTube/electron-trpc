import { ipcRenderer } from 'electron';

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  sendTrpcEvent: (param) => ipcRenderer.invoke('trpc', param),
} satisfies Window['electron']);
