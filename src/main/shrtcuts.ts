import { app, BrowserWindow, globalShortcut } from 'electron'

export function createShortcuts(window: BrowserWindow) {
  function registerShortcuts() {
    globalShortcut.register('CommandOrControl+N', () => {
      window.webContents.send('new-customer')
    })
  }

  app.on('browser-window-focus', registerShortcuts)

  app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll()
  })

  if (window.isFocused()) {
    registerShortcuts()
  }
}