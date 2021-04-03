const url_APOD = 'https://api.nasa.gov/planetary/apod?api_key='
const api_key = config.NASA_API

const fetchNASAData = async () => {
    try {
        const response = await fetch('${url_APOD}${api_key}')
        const data = await response.jason()
        console.log('NASA APOD data', data)
    } catch (error) {
        console.log(error)
    }
}

const displayData = data =>{
    document.getElementById('title').textContent = data.title
    document.getElementById('date').textContent = data.date
    document.getElementById('picture').src = data.hdurl
    document.getElementById('explanation').textContent = data.explanation
}

fetchNASAData()