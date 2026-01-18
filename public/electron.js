const {app,BrowserWindow,ipcMain}=require('electron');
const url = require('url');
const path = require('path')

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title:'StudBuddy',
        width: 400,
        height: 400,
        frame:false,
        titleBarStyle: 'hidden',
        movable: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    const startUrl = url.format({
        pathname:path.join(__dirname,'../build/index.html'),//connect to react app
        protocol:'file',
        slashes:true,
    });
    
    
   

    //menu bar
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadURL(startUrl); //load app in electron window
    
    // Open DevTools to see any errors (remove in production)
    // mainWindow.webContents.openDevTools();

     // Handle close button click
    ipcMain.on('close-app', () => {
        mainWindow.close();
    });
}

app.whenReady().then(createMainWindow)