const { app, BrowserWindow, Tray, nativeImage, Menu } = require('electron')
const path = require('path')
const url = require('url')

let win, tray, currentRoomName = 'catz'

function createMainWindow({ roomName }) {
  win = new BrowserWindow({
    title: "Roomz",
    x: 9999,
    y: 0,
    width: 180,
    height: 50,
    frame: false,
    // focusable: false,
    alwaysOnTop: true,
    fullscreenable: false,
    hasShadow: false,
    // resizable: false,
    movable: false,
    transparent: true
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
    query: { roomName }
  }))

  win.on('closed', () => win = null)
}

app.on('ready', () => {
  const template = [
    {
      label: 'View',
      submenu: [
        {
          role: 'reload'
        },
        {
          role: 'toggledevtools'
        },
        {
          type: 'separator'
        },
        {
          role: 'resetzoom'
        },
        {
          role: 'zoomin'
        },
        {
          role: 'zoomout'
        }
      ]
    },
    {
      role: 'window',
      submenu: [
        {
          role: 'minimize'
        },
        {
          role: 'close'
        }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: () => require('electron').shell.openExternal('http://electron.atom.io')
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    })
    // Edit menu.
    template[1].submenu.push(
      {
        type: 'separator'
      },
      {
        label: 'Speech',
        submenu: [
          {
            role: 'startspeaking'
          },
          {
            role: 'stopspeaking'
          }
        ]
      }
    )
    // Window menu.
    template[3].submenu = [
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Zoom',
        role: 'zoom'
      },
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      }
    ]
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  let trayIcon = nativeImage.createFromPath(path.join(__dirname, 'images', 'tray.png'))
  // trayIcon.setTemplateImage(true)
  tray = new Tray(trayIcon)
  tray.setTitle(`#${currentRoomName}`)
  createMainWindow({ roomName: currentRoomName })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('activate', () => {
  if (win === null)
    createMainWindow({ roomName: currentRoomName })
})
