const zop = document.getElementById("zop")
const hand = document.getElementById("hand")
const zupy = document.getElementById("zupy")
const zopAudio = document.getElementById("zopAudio")
const sendAudio = document.getElementById("sendAudio")
const thankAudio = document.getElementById("thankAudio")
const glitch = document.getElementById("glitch-overlay")
const ctx = glitch.getContext("2d")

glitch.width = window.innerWidth
glitch.height = window.innerHeight

let spinning = false

function wobbleSquash(el, duration, timestamp=0) {
    const start = performance.now()
    function animate(now) {
        const elapsed = now - start
        const progress = elapsed / duration
        const wobble = Math.sin(progress * 20 * Math.PI) * 10
        const squash = 1 - Math.sin(progress * 10 * Math.PI) * 0.2
        el.style.transform = `translate(-50%, -50%) rotate(${progress*1440}deg) scale(${squash}, ${1/squash}) rotate(${wobble}deg)`
        if (elapsed < duration) requestAnimationFrame(animate)
        else el.style.transform = "translate(-50%, -50%) rotate(0deg) scale(1,1)"
    }
    requestAnimationFrame(animate)
}

function triggerGlitch(duration=1000) {
    glitch.style.display="block"
    const end = performance.now()+duration
    function draw() {
        if(performance.now()>end){
            glitch.style.display="none"
            ctx.clearRect(0,0,glitch.width,glitch.height)
            return
        }
        const imageData = ctx.createImageData(glitch.width, glitch.height)
        for(let i=0;i<imageData.data.length;i+=4){
            imageData.data[i]=Math.random()*255
            imageData.data[i+1]=Math.random()*255
            imageData.data[i+2]=Math.random()*255
            imageData.data[i+3]=255
        }
        ctx.putImageData(imageData,0,0)
        requestAnimationFrame(draw)
    }
    draw()
}

zop.addEventListener("click", ()=>{
    if(spinning) return
    spinning = true
    zopAudio.volume = 0.25
    wobbleSquash(zop,4000)
    setTimeout(()=>{
        zopAudio.currentTime=0
        zopAudio.play()
        zop.style.display="none"
        hand.style.display="block"
        spinning = false
    },4000)
})

hand.addEventListener("click", ()=>{
    sendAudio.currentTime=0
    sendAudio.play()
    const delay = 10000 + Math.random()*8000
    triggerGlitch(1000)
    setTimeout(()=>{
        thankAudio.currentTime=0
        thankAudio.play()
    },delay)
})

window.addEventListener("resize", ()=>{
    glitch.width = window.innerWidth
    glitch.height = window.innerHeight
})
