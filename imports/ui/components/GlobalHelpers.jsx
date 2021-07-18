import Images from '/lib/dropbox.js';

const helpers = {
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
    helper2: function(param1){

    },
    helper3: function(param1, param2){

    }
}


export default helpers;