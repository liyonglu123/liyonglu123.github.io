const { ipcRenderer } = require("electron")
console.log(process.versions.node)
console.log(process.versions.electron)
window.addEventListener("DOMContentLoaded", ()=> {
    // ipc  进行组件通信
    console.log("dom side")
    ipcRenderer.send("message", "from render")
    ipcRenderer.on("reply", (event, args)=> {
        console.log(args)
        document.getElementById("message").innerHTML = args
    })

})

