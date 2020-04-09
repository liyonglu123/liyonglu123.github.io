const { ipcRenderer } = require("electron")
const { $, convertDuration } = require("./helper")
window.addEventListener("DOMContentLoaded", ()=> {
    let musicAudio = new Audio()
    musicAudio.loop = true
    let allTracks
    let currentTrack
    $("add-button").addEventListener("click", ()=> {
        ipcRenderer.send("message", "hello main from index.js")
    })
    const renderListHTML = (tracks) => {
        const tracksList = $("tracksList")
        const tracksListHTML = tracks.reduce((html, track) => {
            html+= `<li class="row music-track list-group-item d-flex justify-content-between align-items-center">
                <div class="col-10">
                    <i class="fa fa-music mr-2 text-secondary"></i>
                    <b>${track.fileName}</b>
                </div>
                <div class="col-2">
                    <i class="fa fa-play mr-3" data-id="${track.id}"></i>
                    <i class="fa fa-trash-alt" data-id="${track.id}"></i>
                </div>
            </li>`
            return html
        }, '')
        const emptyTrackHTML = `<div class="alert alert-primary">还没有添加任何音乐</div>`
        tracksList.innerHTML = tracks.length ? `<ul class="list-group">${tracksListHTML}</ul>` : emptyTrackHTML
        
    }

    const renderPlayerHTML = (name, duraion)=> {
        const player = $("player-status")
        const html = `<div class="col font-weight-bold">
                        正在播放：${name}
                     </div>
                     <div class="col">
                        <span id="current-seeker">00:00</span> / ${convertDuration(duraion)}
                     </div>`
        player.innerHTML = html
    }
    const updateProgressHTML = (currentTime, duraion)=> {
        // 计算进度条状态
        const progress = Math.floor(currentTime/ duraion * 100)
        const bar = $("player-progress")
        bar.innerHTML = progress + "%"
        bar.style.width = progress + "%"
        const seeker = $("current-seeker")
        seeker.innerHTML = convertDuration(currentTime)
    }
    ipcRenderer.on("getTracks", (event,tracks)=> {
        renderListHTML(tracks)
        allTracks = tracks;
    })
    $("tracksList").addEventListener("click", (event)=> {
        event.preventDefault()
        const { dataset, classList } = event.target
        const id = dataset && dataset.id 
        if(id && classList.contains("fa-play")) {
            // 播放音乐
            if(currentTrack && currentTrack.id === id) {
                // 继续播放音乐
                musicAudio.play()
            }else {
                // 播放新的歌曲 注意之前的图标还原
                currentTrack = allTracks.find(track => track.id === id)
                musicAudio.src = currentTrack.path
                musicAudio.play()
                const resetIconEle = document.querySelector(".fa-pause")
                if(resetIconEle) {
                    resetIconEle.classList.replace("fa-pause", "fa-play")
                }
            }
            classList.replace("fa-play", "fa-pause")
           
        }else if(id && classList.contains("fa-pause")) {
            // 暂停播放
            musicAudio.pause()
            classList.replace("fa-pause", "fa-play")
        }else if(id && classList.contains("fa-trash-alt")) {
            // 发送事件 删除当前音乐
            ipcRenderer.send("deleteTrack", id)
        }
    })

    musicAudio.addEventListener("loadedmetadata", () =>{
        // 渲染播放状态
        renderPlayerHTML(currentTrack.fileName, musicAudio.duration)
    })
    musicAudio.addEventListener("timeupdate", ()=> {
        // 时间变化
        updateProgressHTML(musicAudio.currentTime, musicAudio.duration)
    })

    // musicAudio.addEventListener("ended", ()=> {
    //     musicAudio.play()
    // })
})