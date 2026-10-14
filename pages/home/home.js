document.addEventListener('DOMContentLoaded', () => {
    async function getHousesPoints() {
        try {
            const responseHousesPointsGet = await fetch('http://localhost:3000/houses');

            if (!responseHousesPointsGet.ok) {
                throw new Error(`Erro HTTP: ${responseHousesPointsGet.status}`);
            }

            const housesPointsJson = await responseHousesPointsGet.json();
            const sectionHousesUl = document.querySelector('.section-houses__ul');

            sectionHousesUl.innerHTML = `
            <li class="section-houses__style section-houses__gryffindor">
                <h3>Grifinória</h3>

                <figure>
                    <img src="/assets/img/img-home/img_gryffindor.png" alt="símbolo da Grifinória">
                </figure>

                <p>Pontos Atuais: <span>${housesPointsJson[0].points}</span></p>
                </li>

                <li class="section-houses__style section-houses__slytherin">
                    <h3>Sonserina</h3>

                <figure>
                    <img src="/assets/img/img-home/img_slytherin.png" alt="símbolo da Sonserina">
                </figure>

                <p>Pontos Atuais: <span>${housesPointsJson[1].points}</span></p>
            </li>

            <li class="section-houses__style section-houses__ravenclaw">
                <h3>Corvinal</h3>

                <figure>
                    <img src="/assets/img/img-home/img_ravenclaw.png" alt="símbolo da Corvinal">
                </figure>

                <p>Pontos Atuais: <span>${housesPointsJson[3].points}</span></p>
            </li>

            <li class="section-houses__style section-houses__hufflepuff">
                <h3>Lufa-Lufa</h3>

                <figure>
                    <img src="/assets/img/img-home/img_hufflepuff.png" alt="símbolo da Lufa-Lufa">
                </figure>

                <p>Pontos Atuais: <span>${housesPointsJson[2].points}</span></p>
            </li>            
            `

        } catch (error) {
            alert(error)
        }
    }
    getHousesPoints();
})