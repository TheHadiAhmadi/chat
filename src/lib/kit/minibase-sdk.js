import { session } from "$app/stores"

export default class Minibase {
    appName = ''
    apiKey = ''
    constructor(appName, apiKey) {
        this.appName = appName
        this.apiKey = apiKey
    }

    _url(tableName, data) {
        return `https://minibase.deno.dev/${this.appName}/${tableName}${data? `/${data}` : ''}.json`
    }

    async _api(method, url, data) {

        console.log(url)
        let opts = {
            method: method,
            headers: {
                apiKey: this.apiKey,
                'content-type': 'application/json' 
            },
        }
        if(data) opts.body = JSON.stringify(data)
        return await fetch(url, opts).then(res => res.json())
    }

    async get(tableName) {
        return (await this._api('GET', this._url(tableName))).data
    }

    async login(data) {
        console.log('login')
        session.set(true)
    }
    
    async signup(data) {
        console.log('signup')
        session.set(true)
    }
    async logout() {
        console.log('logout')
        session.set(false)
    }
}