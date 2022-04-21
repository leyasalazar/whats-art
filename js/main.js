//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const randomPage = Math.ceil(Math.random() * 9900)
  const url = `https://api.artic.edu/api/v1/artworks?page=${randomPage}&limit=1`
  
//&fields=id,title,image_id,artwork_type_title,artist_title
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        let imageID = data.data[0].image_id
        let imageUrl = data.config['iiif_url']
        document.querySelector('button').innerText = "New artwork"
        if(imageID == null){
          document.querySelector('img').style.display = 'none'
          document.querySelector('h2').style.display = 'block'
          document.querySelector('h2').innerText = "Try again, this artwork doesn't have an image"
        } else {
          document.querySelector('h2').style.display = 'none'
          document.querySelector('img').style.display = 'block'
          document.querySelector('img').src = `${imageUrl}/${imageID}/full/843,/0/default.jpg`
          
        }
        document.querySelector('h3').innerText = `${data.data[0].title} by ${data.data[0].artist_title}`
        document.querySelector('h4').innerText = `Artwork type: ${data.data[0].artwork_type_title}`
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

