var moment = require('moment');

module.exports = {
  buildMessage: function(msg, sendername, senderid, senderusergroup, time) {
    var ret = {
      message: msg,
      userid: senderid || 0,
      username: sendername || 'Chat Help',
      usergroupid: senderusergroup || 0,
      time: time || moment()
    };

    return ret;
  },

  /**
   * Splits the arguments in the format: '/command param1 "par am2"' into: ['/command', 'param1', 'par am2', ...]
   * Credits: https://github.com/elgs/splitargs/blob/master/splitargs.js
   * 
   * @param {string} input Text to be parsed in to an array
   * @return {array} strArray An array containing all the parameters split
   */
  splitArgs: function(input) {
    var separator = /\s/g;
    var singleQuoteOpen = false;
    var doubleQuoteOpen = false;
    var tokenBuffer = [];
    var ret = [];
    
    var arr = input.split('');
    for (var i = 0; i < arr.length; ++i) {
        var element = arr[i];
        var matches = element.match(separator);
        if (element === "'") {
            if (!doubleQuoteOpen) {
                singleQuoteOpen = !singleQuoteOpen;
                continue;
            }
        } else if (element === '"') {
            if (!singleQuoteOpen) {
                doubleQuoteOpen = !doubleQuoteOpen;
                continue;
            }
        }
        
        if (!singleQuoteOpen && !doubleQuoteOpen) {
            if (matches) {
                if (tokenBuffer && tokenBuffer.length > 0) {
                    ret.push(tokenBuffer.join(''));
                    tokenBuffer = [];
                }
            } else {
                tokenBuffer.push(element);
            }
        } else if (singleQuoteOpen) {
            tokenBuffer.push(element);
        } else if (doubleQuoteOpen) {
            tokenBuffer.push(element);
        }
    }
    if (tokenBuffer && tokenBuffer.length > 0) {
        ret.push(tokenBuffer.join(''));
    }

    return ret;
  },


  /*
   * Converts a time in seconds to a string in format: 'hh:mm:ss'
   * src: http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
   * @param {number} sec_num The time in seconds
   * @return {string} The time formatted in 'hh:mm:ss'
   */
  secondsToHHMMSS: function (sec_num) {
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60));

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+'h'+minutes+'m'+seconds+'s';

    return time;
  },

  /*
   *
   */
  getUserLinkClass: function(usergroupid) {
    var usergroupClasses = [
        /*0*/'',
        /*1*/'user-unregistered',
        /*2*/'user-registered',
        /*3*/'user-awaitingconfirmation',
        /*4*/'user-awaitingmoderation',
        /*5*/'user-supermoderators',
        /*6*/'user-admin',
        /*7*/'user-moderators',
        /*8*/'user-banned',
        /*9*/'user-wind-powered',
        /*10*/'',
        /*11*/'',
        /*12*/'user-wind-tester',
        /*13*/'',
        /*14*/'user-wind-reseller',
    ];
    
    return 'user-link ' + (usergroupClasses[usergroupid] || '');
  }
};