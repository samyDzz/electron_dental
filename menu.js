
// Modules
const {Menu, shell} = require('electron')

// Module function to create main app menu
module.exports = appWin => {

  // Menu template
  let template = [
    {
      role: 'editMenu'
    },
    {
      role: 'windowMenu'
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn more',
          click: () => {
            shell.openExternal('https://samiridir.com')
          }
        }
      ]
    }
  ]

  // Create Mac app menu
  if ( process.platform === 'darwin' ) template.unshift({ role: 'appMenu' })

  // Build menu
  let menu = Menu.buildFromTemplate(template)

  // Set as main app menu
  Menu.setApplicationMenu(menu)
}
