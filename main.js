const zop = document.getElementById("zop")
const audio = document.getElementById("audio")

let spinning = false

zop.addEventListener("click", () => {
    if (spinning) return
    spinning = true

    let start = null
    function spin(timestamp) {
        if (!start) start = timestamp
        const elapsed = timestamp - start
        const rotation = (elapsed / 4000) * 1440
        zop.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`
        if (elapsed < 4000) {
            requestAnimationFrame(spin)
        } else {
            zop.style.transform = "translate(-50%, -50%) rotate(0deg)"
            audio.currentTime = 0
            audio.play()
            spinning = false
        }
    }
    requestAnimationFrame(spin)
})
