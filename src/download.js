const fs = require("fs/promises")
const path = require("path")
const fetch = require("node-fetch")
const generateID = require("./generateID")
const util = require("./util")

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

    const buffer = await response.buffer()
    await fs
        .writeFile(path.join(output, id + ".png"), buffer)
        .then(() => util.success(`{${id}}: Downloaded. Total: {${total + 1}}`))
        .catch(() => util.error(`{${id}}: Failed to save.`))
}
