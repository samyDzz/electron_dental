// Modules
const {app, BrowserWindow, ipcMain, session } = require('electron')
const windowStateKeeper = require('electron-window-state')
const appMenu = require('./menu')
var path = require('path')
const ejse = require('ejs-electron')
    .options('debug', false)

var mysql = require('mysql');
var config = require("./db-config");
var validator = require('validator');
const bcrypt = require("bcrypt-nodejs");
const storage = require('electron-json-storage');


// Add the credentials to access your database
var connection = mysql.createConnection(config.db);

// connect to mysql
connection.connect(function (err) {
    // in case of error
    if (err) {
        console.log(err.code);
        console.log(err.fatal);
    }
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

var windows = require("./functions/windows")
var functions = require("./functions/functions")

// Create a new BrowserWindow when `app` is ready
function createWindow () {

	//------------------------SPLASH SCREEN INIT------------------------------------
	// create the splash window
	let splashWin = new BrowserWindow({
	  width: 600,
	  height: 400,
	  frame: false,
	  transparent: true,
	  icon: __dirname + '/renderer/assets/images/logos/logo.png',
	  type: "splash",
	  alwaysOnTop: true,
	  show: false,
	  position: "center",
	  resizable: false,
	  toolbar: false,
	  fullscreen: false,
	  webPreferences: {
	    nodeIntegration: true
	  }
	});


	// load splash file
	splashWin.loadFile('renderer/views/splash.ejs')

	splashWin.webContents.on('did-finish-load', function () {
	  splashWin.show(); //close splash
	});


	// Emitted when the window is closed.
	splashWin.on('closed', () => {
	  // Dereference the window object
	  splashWin = null
	})

  //------------------------Main SCREEN INIT------------------------------------
  // Win state keeper
  let state = windowStateKeeper({
    defaultWidth: 500, defaultHeight: 800
  })

  mainWindow = new BrowserWindow({
    x: state.x, y: state.y,
    width: 465, height: 800, 
    show: false,
    toolbar: false,  
    frame: false,
    minWidth: 350, maxWidth: 800, minHeight: 300,
    titleBarStyle: "hidden",
    icon: path.join(__dirname, 'renderer/assets/images/logos/logo.png'),
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      backgroundThrottling: false
    }
  })


  // Create main app menu
  appMenu(mainWindow.webContents)

  // Load index.html into the new BrowserWindow
  // mainWindow.loadFile('renderer/views/login.ejs')
  mainWindow.loadFile('renderer/views/login.ejs')
  mainWindow.center()
  // Manage new window state
  state.manage(mainWindow)

  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })

  // Emitted when the window is finished loading.
  mainWindow.webContents.on('did-finish-load', function () {
  	
    setTimeout(() => {
      splashWin.close(); //close splash
      mainWindow.show(); //show main
    }, 5000);
  });

}

ipcMain.on( 'login-form', (e, args) => {


  storage.get('userInfos', function(error, data) {
    if (error) throw error;
   
    console.log(data);
  });

  if( args.pseudo === undefined | args.password === undefined ){
    e.returnValue = {
      success : false,
      msg : "Les paramètres sont invalides"
    }
    return false;
  }

  let isPseudo = validator.isLength(args.pseudo,{gt : 8,lt : 30});
  let isPassword = validator.isLength(args.password,{gt : 8,lt : 10});

  if( !isPseudo ){
    e.returnValue = {
      success : false,
      msg : "Le pseudo n'est pas valide"
    }
    return false;
  }

  if( !isPassword ){
    e.returnValue = {
      success : false,
      msg : "Le mot de passe n'est pas valide"
    }
    return false;
  }

  connection.query(`SELECT * FROM users where pseudo = ?`,[args.pseudo],async (err,rows,fields) => {
    if(err){
      console.log(err.stack);
      return false;
    }
    
    if( rows.length == 1 ){

      let confirm_pass = bcrypt.compareSync(args.password, rows[0]['password']); // true

      if(confirm_pass) {
        let user = rows[0];

        windows.createWindowDashboard();
        mainWindow.hide(); //show main

        // create Token
        let payload_token = {
          id_user : user.id_user,
          nom: user.nom, 
          prenom: user.prenom, 
          pseudo: user.pseudo
        }

        let payload_new_token = {
          id : user.id_user,
          new_token : true
        }

        // create new Token
        let jwt_token = await functions.createJWT(payload_token);
        let jwt_new_token = await functions.createJWT(payload_new_token);

        storage.set(
          'userInfos', 
          { 
            id_user : user.id_user,
            nom: user.nom, 
            prenom: user.prenom, 
            pseudo: user.pseudo,
            token : jwt_token,
            refresh_token : jwt_new_token
          }, function(error) {
          if (error) throw error;
        });

        e.returnValue = {
          success : true
        }
        return false
      }else{
        e.returnValue = {
          success : false,
          msg : "Veuillez vérifier vos coordonnées"
        }
        return false;
      }
    }else{
      e.returnValue = {
        success : false,
        msg : "Veuillez vérifier vos coordonnées"
      }
      return false;
    }
  });

})

ipcMain.on( 'logout', (e, args) => {
  dashWindow.hide(); 
  setTimeout( () => {
  	mainWindow.show(); 
  }, 200)
})

ipcMain.on( 'temp_login', (e, args) => {
  windows.createWindowDashboard();
  mainWindow.hide(); //show main.

  e.returnValue = 'LOL';
})

ipcMain.on( 'add_patient', (e, args) => {
  windows.createChildWindow(args.name,args.icon_name);
  e.returnValue = 'LOL';
})

ipcMain.on( 'report_treatement', (e, args) => {
  windows.createChildWindow(args.name,args.icon_name);
  e.returnValue = 'LOL';
})

ipcMain.on( 'create_dental_procedure', (e, args) => {
  windows.createChildWindow(args.name,args.icon_name);
  e.returnValue = 'LOL';
})

ipcMain.on( 'help', (e, args) => {
  windows.createChildWindow(args.name,args.icon_name);
  e.returnValue = 'LOL';
})

// Electron `app` is ready
// app.on('ready', windows.createWindowDashboard)
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
