const axios = require('axios').default
const qs = require('qs')

const apiRoot = "https://api.snec.club"
const api = {
    root: apiRoot,
    login: apiRoot + "/login",
    register: apiRoot + "/register",
    user: apiRoot + "/user",
    events: apiRoot + "/events",
    addEvent: apiRoot + "/events/add",
    joinEvent: apiRoot + "/events/join",
    cancelEvent: apiRoot + "/events/cancel"
}
const events = {
    loggedIn: new Event('loggedIn')
}
module.exports = {
    loggedIn: false,
    authOverlayCallback() { },
    retrieveUserData() {
        return new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: api.user,
                withCredentials: true
            })
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        })
    },
    login(username, password) {
        return new Promise((resolve, reject) => {
            axios({
                method: "POST",
                url: api.login,
                withCredentials: true,
                data: qs.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                }
            })
                .then(res => {
                    this.loggedIn = true
                    this.authOverlayCallback(false)
                    window.dispatchEvent(events.loggedIn)
                    return resolve(res.data)
                })
                .catch(err => {
                    return reject(err)
                })
        })
    },
    register(username, email, password) {
        return new Promise((resolve, reject) => {
            axios({
                method: "POST",
                url: api.register,
                withCredentials: true,
                data: qs.stringify({
                    username: username,
                    email: email,
                    password: password
                }),
                headers: {
                    "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                }
            })
                .then(res => resolve(res))
                .catch(err => {
                    return reject(err)
                })
        })
    },
    events() {
        return new Promise((resolve, reject) => {
            axios({
                method: "GET",
                url: api.events,
                withCredentials: true
            })
                .catch(err => reject(err))
                .then(res => resolve(res))
        })
    },
    createEvent(subject, description, location, date) {
        return new Promise((resolve, reject) => {
            axios({
                url: api.addEvent,
                method: "POST",
                withCredentials: true,
                data: qs.stringify({
                    subject: subject,
                    description: description,
                    location: location,
                    date: date
                }),
                headers: {
                    "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                }
            })
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    },
    joinEvent(id) {
        return new Promise((resolve, reject) => {
            axios({
                url: api.joinEvent,
                method: "POST",
                withCredentials: true,
                data: qs.stringify({
                    id: id
                }),
                headers: {
                    "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                }
            })
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    },
    cancelEvent(id) {
        return new Promise((resolve, reject) => {
            axios({
                url: api.cancelEvent,
                method: "POST",
                withCredentials: true,
                data: qs.stringify({
                    id: id
                }),
                headers: {
                    "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                }
            })
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
    
}