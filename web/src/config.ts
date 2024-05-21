let useSwEnv = ""
try {
    ///@ts-ignore
    useSwEnv = env.APP_USESW
} catch (e) {}

if (location.hostname.includes("web.app"))
    useSwEnv = "true"

let useSw = false
if (useSwEnv == "true")
    useSw = true


export default { useSw }