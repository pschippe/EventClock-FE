import axios from 'axios';

class Api {
    baseAxios = axios.create({
        baseURL: 'http://192.168.12.140/clocksapp'
    });

    // Create another method for Master if changes are too extensive or if new api call is needed
    postTime (postObj) {
        return this.baseAxios.get(`/timer`,{
            params: {
                time: `${postObj.hours}:${postObj.minutes}:${postObj.seconds}`,
                fulltime : postObj.timerTime,
                id : postObj.id,
                stop : false,
                pause : false
            }
        });
    }
    postPower (postObj) {
        return this.baseAxios.post(`/powerBtn`, {
            on: postObj.power
        });
    }
    postBright (postObj) {
        return this.baseAxios.post(`/dim`, {
            bright: postObj.bright
        });
    }
    postSync (postObj) {
        return this.baseAxios.post(`/sync`, {
            sync: postObj.sync
        });
    }
    postMil (postObj) {
        return this.baseAxios.post(`/milTime`, {
            mil: postObj.mil
        });
    }
};

export default new Api();