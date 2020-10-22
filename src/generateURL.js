module.exports = function generateURL() {
    const characters = "abcdefghijklmnopqrstuvwxyz1234567890"
    const id = Array(6)
        .fill()
        .map(() => characters[Math.floor(Math.random() * characters.length)])
        .join("")
    return `https://prnt.sc/${id}`
}
