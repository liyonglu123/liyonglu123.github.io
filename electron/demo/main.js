// const Store = require('electron-store');
// const store = new Store()

const { app, BrowserWindow, ipcMain, dialog } = require("electron")
const MusicStore = require("./renderer/MusicDataStore")
app.allowRendererProcessReuse = true

let myMusicStore = new MusicStore({name: "music data"})

// 持久化存储
// console.log(app.getPath('userData'))
// store.set('unicorn', '🦄');
// console.log(store.get('unicorn'));
// //=> '🦄'

// // Use dot-notation to access nested properties
// store.set('foo.bar', true);
// console.log(store.get('foo'));
// //=> {bar: true}

// store.delete('unicorn');
// console.log(store.get('unicorn'));
//=> undefined
// 创建窗口类
class AppWindow extends BrowserWindow {
    constructor(config, fileLocation) {
        let baseConfig = {
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true // 使用node.js 中的api
            }
        }
        // let config = Object.assign(baseConfig, config)
        let finalConfig = { ...baseConfig, ...config }
        super(finalConfig)
        this.loadFile(fileLocation)
        // 优化加载闪烁问题
        this.once("ready-to-show", ()=> {
            this.show()
        })
    }
}
function createWindow() {
    // 创建浏览器窗口
    let win = new AppWindow({},"./renderer/index.html")
    win.webContents.addListener("did-finish-load", () => {
        console.log("did-finish-load")
        win.send("getTracks", myMusicStore.getTracks())
    })
    // 加载index.html文件
    // win.loadFile("index.html")
    // 打开开发者工具
    win.webContents.openDevTools()
    // 通信
    // ipcMain.on("message", (event, arg) => {
    //     console.log(arg)
    //     // event.sender.send("reply", "parennt")
    //     win.send("reply", "parennt-window")
    // })

    ipcMain.on("message", (event, arg) => {
        let addWindow = new AppWindow({
            width: 500,
            height: 400,
            parent: win
        }, "./renderer/add.html")
    })
    ipcMain.on("openMusic", (event)=> {
        // 调用原生的 dialog api
        dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [{name: "Music", extensions: ["mp3"]}]
        }).then(result => {
            event.sender.send("select-files", result.filePaths)
        }).catch(err=> {
            console.log(err)
        })
    })
    ipcMain.on("addMusic", (event, tracks)=> {
        const updateTracks = myMusicStore.addTracks(tracks).getTracks()
        win.send("getTracks", updateTracks)
    })
    ipcMain.on("deleteTrack", (event, id)=> {
        const updateTracks = myMusicStore.deleteTrack(id).getTracks()
        win.send("getTracks", updateTracks)
    })
    
}
// 部分 API 在 ready 事件触发后才能使用
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", ()=> {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== "darwin") {
        app.quit()
    }

})

app.on("activate", ()=> {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if(BrowserWindow.getAllWindows().length ===0 ) {
        createWindow()
    }
})

