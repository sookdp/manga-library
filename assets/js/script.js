//require('dotenv').config();

const hamburgerButton = document.querySelector(".hamburger")
const navigation = document.querySelector("nav")

hamburgerButton.addEventListener ("click", toggleNav)

function toggleNav() {
    hamburgerButton.classList.toggle("active")
    navigation.classList.toggle("active")
}

document.addEventListener('DOMContentLoaded', function () {
    const mangaListContainer = document.getElementById('manga-list');

    const API_URL = 'https://graphql.anilist.co';
    const QUERY = `
        query {
            User(name: "skna13") {
                favourites {
                    manga {
                        nodes {
                            id
                            title {
                                romaji
                                english
                                native
                            }
                            coverImage {
                                large
                            }
                            description
                        }
                    }
                }
            }
        }
    `;

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: QUERY })
    })
        .then(response => response.json())
        .then(data => {
            const mangas = data.data.User.favourites.manga.nodes;

            mangas.forEach(manga => {
                const card = document.createElement('div');
                card.classList.add('card');

                const mangaUrl = `https://anilist.co/manga/${manga.id}`;

                card.innerHTML = `
                <img src="${manga.coverImage.large}" alt="${manga.title.romaji}">
                <div class="card-content">
                    <h3>${manga.title.romaji || manga.title.english || manga.title.native}</h3>
                    <p>${manga.description ? manga.description.substring(0, 250) + '...' : 'Description non disponible'}</p>
                    <div class="anilist-link-container">
                        <a id="anilist-link" href="${mangaUrl}" target="_blank">En savoir plus</a>
                    </div>
                    
                </div>
            `;

                mangaListContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
});
