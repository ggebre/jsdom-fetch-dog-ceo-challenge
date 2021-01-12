function fetchImageUrls() {
    return fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then(json => renderImages(json.message));
}
let images;
let breeds = {};
function renderImages(imageUrls) {
    const imageContainer = document.getElementById('dog-breeds');
    imageContainer.innerHTML = "";
    imageUrls.forEach (url => {
        // use regex to find the breed from the url 
        let breed = url.match("breeds/(.*)/")[1];
        breeds[breed] = url;
        // let list = document.createElement('li');
        // let image = document.createElement('img');
        // list.setAttribute('id', breed);
        // list.innerText = breed;
        // image.setAttribute('src', url);
        // list.appendChild(image);
        // imageContainer.appendChild(list);

         imageContainer.innerHTML += `<li id=${breed}> ${breed}<br> <img src=${url}></li>`
    });

    
    clickableImages();
    let selection = document.getElementById("breed-dropdown");
    selection.addEventListener('change', (event) => {
        renderImages(selectBreedsThatStartWith(`${event.target.value}`));
    })
    
} 

function clickableImages() {
    images = document.querySelectorAll('li');
    
    images.forEach ( image => image.addEventListener('click', () => {
        let randomColor = getRandomColor();
        image.setAttribute("style", `color: ${randomColor};`);
    }));

}

function selectBreedsThatStartWith(char) {
    let breedNames = Object.keys(breeds).filter(breedName => breedName.startsWith(char));
    return breedNames.map(breedName => breeds[breedName]);
}

// function allBreedUrls(imageUrls) {
//     imageUrls.forEach (url => {
//         let breed = url.match("breeds/(.*)/")[1];
//         breeds[breed] = url;
//     })
// }


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
document.addEventListener('DOMContentLoaded', function() {
    fetchImageUrls();
    // clickableImages();
  })


