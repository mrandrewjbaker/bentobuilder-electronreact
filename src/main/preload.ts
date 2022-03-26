import { contextBridge, ipcRenderer } from 'electron';
import { project_ipcRenderer } from './ipc/project/project.ipcRenderer';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    ...project_ipcRenderer,
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(channel: string, func: (...args: any[]) => void) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (_event, ...args) => func(...args));
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    once(channel: string, func: (...args: any[]) => void) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
  },
});
