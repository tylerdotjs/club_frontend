const axios = require('axios').default
const qs = require('qs')

const apiRoot = "https://api.snec.club"
const api = {
    root: apiRoot,
    login: apiRoot + "/auth/login",
    register: apiRoot + "/auth/register",
    logout: apiRoot + "/auth/logout",
    user: apiRoot + "/user",
    events: apiRoot + "/events",
    images: apiRoot + "/images"
}
const events = {
    loggedIn: new Event('loggedIn')
}
module.exports = {
    user: {},
    loggedIn: false,
    authOverlayCallback() { },
    userData() {
        return axios({
            method: "GET",
            url: api.user,
            withCredentials: true
        })
            .then(res => {
                this.user = res.data
                this.user.username = res.data.username
                return res.data
            })
    },
    login(username, password) {
        return axios({
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
                return res.data
            })
    },
    logout() {
        return axios({
            method: "GET",
            url: api.logout,
            withCredentials: true,
        })
    },
    register(username, email, password) {
        return axios({
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
    },
    events() {
        return axios({
            url: api.events,
            method: 'GET',
            withCredentials: true
        })
    },
    event: {
        get(id) {
            return axios({
                url: `${api.events}/${id}`,
                method: 'GET',
                withCredentials: true
            })
        },
        removeUser(id, userId){
            return axios({
                url: `${api.events}/${id}/attend/${userId}`,
                method: 'DELETE',
                withCredentials: true
            })
        },
        addUser(id, userId){
            return axios({
                url: `${api.events}/${id}/attend/${userId}`,
                method: 'POST',
                withCredentials: true
            })
        },
        create(properties) {
            return axios({
                url: api.events,
                method: "POST",
                withCredentials: true,
                data: qs.stringify(properties),
                headers: {
                    "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                }
            })
        },
        modify(id, data) {
            return axios({
                url: `${api.events}/${id}`,
                method: "PUT",
                withCredentials: true,
                data: qs.stringify(data),
                headers: {
                    "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                }
            })
        },
        delete(id) {
            return axios({
                url: `${api.events}/${id}`,
                method: 'DELETE',
                withCredentials: true
            })
        },
        join(id) {
            return axios({
                url: `${api.events}/${id}/attend`,
                method: "POST",
                withCredentials: true
            })
        },
        cancel(id) {
            return axios({
                url: `${api.events}/${id}/attend`,
                method: "DELETE",
                withCredentials: true
            })
        }
    },
    image: {
        get(id) {
            return `${api.images}/${id}`
        },
        create: api.images,
        modify(id, data) {
            return axios({
                url: `${api.images}/${id}`,
                method: "PUT",
                withCredentials: true,
                data: qs.stringify(data),
                headers: {
                    "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                }
            })
        },
        delete(id) {
            return axios({
                url: `${api.images}/${id}`,
                method: 'DELETE',
                withCredentials: true
            })
        }
    },
    profile: {
        get(id) {
            return axios({
                url: `${api.user}/${id}`,
                method: "GET",
                withCredentials: true
            })
        },
        getProp(id, prop) {
            return axios({
                url: `${api.user}/${id}/${prop}`,
                method: "GET",
                withCredentials: true
            })
        }
    }
}