const { readFileSync, appendFileSync } = require("fs")

const usersInfo = {}
const users = []
const startAction = "Intake"
const endAction = "Discharge"
const treatAction = "Treatment"

const processPatientData = async (filename) => {
  const inputs = await readFileSync(filename, { encoding: "utf-8" })

  inputs.split("\r\n").forEach((info) => {
    const data = info.split(" ")
    if (data.length === 2) {
      const name = data[1]

      if (!users.includes(name)) {
        users.push(name)
        usersInfo[name] = { start: null, end: null, treatments: 0 }
      }
    } else {
      const action = data[1]
      const name = data[2]
      const date = new Date(data[3])

      if (!users.includes(name)) {
        users.push(name)
        usersInfo[name] = { start: null, end: null, treatments: 0 }
      } else {
        if (action === startAction) {
          usersInfo[name].start = date
        }
        if (action === endAction) {
          usersInfo[name].end = date
        }
        if (action === treatAction) {
          usersInfo[name].treatments = usersInfo[name].treatments + 1
        }
      }
    }
  })

  if (users.length) {
    users.forEach(async (user) => {
      const diff =
        (usersInfo[user].end.getTime() - usersInfo[user].start.getTime()) / 1000
      const text = `Patient ${user} stayed for ${Math.round(
        diff / 3600
      ).toFixed(1)} hours and ${Math.round((diff % 3600) / 60).toFixed(
        1
      )} minutes and received ${usersInfo[user].treatments} treatments\n`

      await appendFileSync("output.txt", text, { encoding: "utf-8" })
    })
  }
}

processPatientData("input.txt")
