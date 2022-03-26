import { ipcRenderer } from "electron"

const project_ipcRenderer = {
  projectCreate: () => {
    ipcRenderer.send('project', {method: 'create'})
  },
  on(channel: string, func: (...args: any[]) => void) {
    const validChannels = ['project'];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (_event, ...args) => func(...args));
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  once(channel: string, func: (...args: any[]) => void) {
    const validChannels = ['project'];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    }
  },
}

export { project_ipcRenderer }