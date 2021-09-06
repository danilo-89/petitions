import Images from '/lib/dropbox.js';

const d = new Date(Date.now());

const helpers = {

    ye : function(d){
        return  new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    },
    mo : function(d){
        return  new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
    },
    da : function(d){
        return  new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    },
    tm : function(d){
        return  new Intl.DateTimeFormat('en', { hour12:false , hour: '2-digit', minute: '2-digit' }).format(d)
    },
    rootUrl : function(){
        return Meteor.absoluteUrl().substring(0, Meteor.absoluteUrl().length - 1)
    },
    getImgUrl : function(obj){
        return Images.link(obj); 
    },
    getImgUrlById : function(img){
        return `/cdn/storage/uploadedFiles/${img}/original/${img}`; 
    },
    formatDateObj: function(obj){
        return obj.toString()
    },
    formatDate: function(d){
        return `${this.ye(d)}/${this.mo(d)}/${this.da(d)}`
    },
    formatTime: function(d){
        return `${this.tm(d)}`
    },
    formatDateWithTime: function(d){
        return `${this.ye(d)}/${this.mo(d)}/${this.da(d)} ${this.tm(d)}`
    },
    calcPercent: function(total=0, nedeed) {
        const percentNum = (total/nedeed) * 100;
        if (percentNum < 0) {
            return 0
        } else if (percentNum > 100) {
            return 100
        } else {
            return percentNum.toFixed(2)
        }
    },
    helper2: function(param1){

    },
    helper3: function(param1, param2){

    }
}


export default helpers;