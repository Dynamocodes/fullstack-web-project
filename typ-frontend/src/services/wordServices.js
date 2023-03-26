import axios from 'axios'
const baseUrl = `http://localhost:3001/api/words`

const getWordPool = async () => {
    const response =  await axios.get(baseUrl)
    return response.data
}

const services = {getWordPool}
export default services