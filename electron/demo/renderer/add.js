const { ipcRenderer } = require("electron")
const { $ } = require("./helper")
const path = require("path")
let musicListPaths = []
$("select-music").addEventListener("click", ()=> {
    ipcRenderer.send("openMusic")
})

$("add-music").addEventListener("click", ()=> {
    ipcRenderer.send("addMusic", musicListPaths)
})
const renderListHTML = (pathes) => {
    const musicList = $("musicList")
    const musicListItem = pathes.reduce((html, music) => {
        html += `<li class="list-group-item">${path.basename(music)}</li>`
        return html
    }, '')
    musicList.innerHTML = `<ul class="list-group">${musicListItem}</ul>`
}
ipcRenderer.on("select-files", (event, path)=> {
    console.log(path)
    if(Array.isArray(path)) {
        renderListHTML(path)
        musicListPaths = path
    }
})