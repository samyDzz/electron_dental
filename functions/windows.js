const {BrowserWindow} = require('electron')
const appMenu = require('../menu')
var path = require('path')
const ejse = require('ejs-electron')
    .options('debug', false)


exports.createWindowDashboard = () => {

  dashWindow = new BrowserWindow({
    width: 1700, height: 900, 
    minWidth: 350, minHeight: 300,
    // toolbar: false,  
    // frame: false,
    icon: path.join(__dirname, '/../renderer/assets/images/logos/logo.png'),
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      backgroundThrottling: false
    }
  })

  // Create main app menu
  appMenu(dashWindow.webContents)

  // Load index.html into the new BrowserWindow
  dashWindow.loadFile( path.join(__dirname, '/../renderer/views/dashboard/index.ejs') )
  dashWindow.show()
  dashWindow.maximize()
  dashWindow.setResizable(false);

  // Open DevTools - Remove for PRODUCTION!
  // dashWindow.webContents.openDevTools();

  // Listen for window being closed
  dashWindow.on('closed',  () => {
    dashWindow = null
  })
}

exports.createChildWindow = (page,w,h,icon_name) => {

  childWindow = new BrowserWindow({
    maxWidth: w, maxHeight: h, 
    icon: icon_name,
    parent : dashWindow,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      backgroundThrottling: false
    }
  })

  // Create main app menu
  appMenu(childWindow.webContents)

  // Load index.html into the new BrowserWindow
  childWindow.loadFile( path.join(__dirname, '/../renderer/views/dashboard/'+page) )
  childWindow.show()
  childWindow.center()

  // childWindow.webContents.openDevTools();

  // Listen for window being closed
  childWindow.on('closed',  () => {
    childWindow = null
  })

}

