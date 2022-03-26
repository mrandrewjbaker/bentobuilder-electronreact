import { ipcMain } from 'electron';
import knex from 'knex';

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});


ipcMain.on('project', async (event, arg) => {
  console.log(arg + 'ok')
});