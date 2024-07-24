document.addEventListener("DOMContentLoaded", () => {
    const breedButtonsContainer = document.getElementById("breed-buttons");
    const breedImagesContainer = document.getElementById("breed-images");

    async function fetchBreeds() {
        try {
            const response = await fetch("https://dog.ceo/api/breeds/list/all");
            const data = await response.json();
            return Object.keys(data.message);
        } catch (error) {
            console.error("Erro ao obter lista de raças:", error);
            alert(
                "Não foi possível carregar a lista de raças. Por favor, tente novamente mais tarde."
            );
        }
    }

    async function fetchBreedImages(breed) {
        try {
            const response = await fetch(
                `https://dog.ceo/api/breed/${breed}/images/random/4`
            );
            const data = await response.json();
            return data.message;
        } catch (error) {
            console.error(`Erro ao obter imagens da raça ${breed}:`, error);
            alert(
                "Não foi possível carregar as imagens. Por favor, tente novamente mais tarde."
            );
        }
    }

    function createBreedButtons(breeds) {
        breeds.forEach((breed) => {
            const button = document.createElement("button");
            button.textContent = breed;
            button.addEventListener("click", async () => {
                const images = await fetchBreedImages(breed);
                displayBreedImages(images);
            });
            breedButtonsContainer.appendChild(button);
        });
    }

    function displayBreedImages(images) {
        breedImagesContainer.innerHTML = "";
        images.forEach((image) => {
            const imgElement = document.createElement("img");
            imgElement.src = image;
            breedImagesContainer.appendChild(imgElement);
        });
    }

    async function init() {
        const breeds = await fetchBreeds();
        createBreedButtons(breeds);
    }

    init();
});
