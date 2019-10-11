import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = config.appConf.baseUrl

const axios = new HttpRequest(baseUrl)
export default axios
