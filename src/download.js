const fs = require("fs/promises")
const path = require("path")
const fetch = require("node-fetch")
const filesize = require("filesize")
const generateID = require("./generateID")
const util = require("./util")

const ERROR_URL = "https://st.prntscr.com/2020/08/01/0537/img/0_173a7b_211be8ff.png"

module.exports = async function download(output) {
    const id = generateID()
    const url = `https://prnt.sc/${id}/direct`

    let error
    const response = await fetch(url).catch(() => {
        error = true
        util.error(`{${id}}: Failed to request.`, false)
    })
    if (error) return
    const total = (await fs.readdir(output)).length

    if (response.status === 403) util.error("This IP has been {banned} from Lightshot.")

    const buffer = await response.buffer()
    if (
        response.url === "https://i.imgur.com/removed.png" ||
        response.url === ERROR_URL ||
        response.status === 404 ||
        buffer.toString().trim().startsWith("<!DOCTYPE html>")
    )
        return util.error(`{${id}}: The screenshot does not exist.`, false)

    const size = filesize(buffer.length)
    await fs
        .writeFile(path.join(output, id + ".png"), buffer)
        .then(() => util.success(`{${id}}: Downloaded (${size}). Total: {${total + 1}}.`))
        .catch(() => util.error(`{${id}}: Failed to save.`, false))
}
