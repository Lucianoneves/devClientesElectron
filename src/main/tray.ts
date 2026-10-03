import { Tray, Menu, app, nativeImage, BrowserWindow } from 'electron'
import path from 'path'
import { MusicNote } from 'phosphor-react'

export function createTray(windon: BrowserWindow) {
    const appIcon = path.join(app.getAppPath(), 'resources', 'menuTemplate.png')
    let icon = nativeImage.createFromPath(appIcon)


    const tray = new Tray(icon)

    const menu = Menu.buildFromTemplate([
        { label: "Deve clientes", enabled: false },
        { type: "separator" },
        {
            label: "Cadstrar cliente",
            click: () => {
               
                //envoar mensagem do processo (main process) para o renderer process
                windon.webContents.send('new-customer')

                if(windon.isMinimized()) windon.restore() 
                    windon.focus()
                    
            }
        },

        {
            label: "Abrir",
            click: () => {
                windon.show()
            }
        },
        { type: "separator" },

        {
            label: "Sair", click: () => {
                app.quit()
            }
        }

    ])

    tray.setToolTip("Deve clientes")
    tray.setContextMenu(menu);

}