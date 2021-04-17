import { Platform } from 'react-native'

let baseURL = '';

// Check OS of device
{Platform.OS == 'android'
? baseURL = 'http://192.168.0.136:3000/api/v1/'
: baseURL = 'http://localhost:3000/api/v1'
}


export default baseURL;