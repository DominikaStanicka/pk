document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById('content');
    const buttons = document.querySelectorAll('nav ul li button');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            pokaz(target);

            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });



    function pokaz(id) {
        let tresc = "";
        switch (id) {
            case "galeria":
                tresc += pokazGalerie();
                content.innerHTML = tresc;
                break;
            case "kontakt":
                tresc += pokazKontakt();
                content.innerHTML = tresc;
                initMap(); // Wywołaj initMap po dodaniu treści
                return; // zakończ funkcję, ponieważ treść już została ustawiona
            case "praktyki":
                tresc += pokazPraktyki();
                content.innerHTML = tresc;
                break;
            case "wyslanyformularz":
                tresc += pokazWyslanyFormularz();
                content.innerHTML = tresc;
                break;
            default:
                pokazHome();
        }
        if(localStorage.getItem("formSubmitted") === 'true' && id === "praktyki") {
            pokazWyslanyFormularz();
        }
    }

    function pokazHome() {
        let tresc = `
            <section class="hero">
                <h2>Zapraszamy do naszego salonu</h2>
                <p>— Bożena Stanicka</p>
            </section>
            <section id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="d-block w-100" alt="Witamy w naszym salonie fryzjerskim!">
                        <div class="carousel-caption d-none d-md-block">
                            <h3>Witamy w naszym salonie fryzjerskim!</h3>
                            
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="d-block w-100" alt="Fryzjer przy pracy">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Kompleksowa pielęgnacja włosów</h5>
                            <p>Oferujemy profesjonalne usługi fryzjerskie dla każdego</p>
                        </div>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </section>
        <div class="cwrap">
        <div class="carousel-container">
            <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
                <img class="image" src="https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" draggable="false"/>
                <img class="image" src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" draggable="false"/>
                <img class="image" src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" draggable="false"/>
                <img class="image" src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" draggable="false"/>
                <img class="image" src="https://images.unsplash.com/photo-1712337646541-d0c6f85447f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D" draggable="false"/>
                <img class="image" src="https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" draggable="false"/>
                <img class="image" src="https://images.unsplash.com/photo-1565867254334-10280784ff69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI1fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D" draggable="false"/>
            </div>
        </div>
        </div>
        
        `;

        content.innerHTML = tresc;

        const track = document.getElementById("image-track");
        
        let mouseDownAt = 0;
let prevPercentage = 0;

const handleOnDown = e => {
  mouseDownAt = e.clientX;
}

const handleOnUp = () => {
  mouseDownAt = 0;
  prevPercentage = parseFloat(track.style.transform.split("(")[1].split("%")[0]);
}

const handleOnMove = e => {
  if(mouseDownAt === 0) return;

  const mouseDelta = mouseDownAt - e.clientX ;
  const maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -2;
  const nextPercentageUnconstrained = prevPercentage + percentage;
  const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  prevPercentage = nextPercentage;

  track.style.transform = `translate(${nextPercentage}%, -50%)`;

  for(const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${100 + nextPercentage}% center`;
  }
}



/* -- Add touch event listeners -- */

window.onmousedown = e => {
  handleOnDown(e);
};
window.ontouchstart = e => {
  handleOnDown(e.touches[0]);
};

window.onmouseup = e => {
  handleOnUp(e);
};
window.ontouchend = e => {
  handleOnUp(e.touches[0]);
};

window.onmousemove = e => {
  handleOnMove(e);
};
window.ontouchmove = e => {
  handleOnMove(e.touches[0]);
};

    }

    function pokazGalerie() {
        fetch('https://penguinpops.github.io/fp-fake-api/data2.json')
            .then(response => response.json())
            .then(images => {
                let galleryHTML = `
                    <h2><br />Galeria</h2>
                    <div class="gallery">
                `;
    
                images.forEach(image => {
                    galleryHTML += `
                        <a href="#lightbox"><img src="${image.src}" alt="${image.alt}" data-large="${image.src}" /></a>
                    `;
                });
    
                galleryHTML += `</div>
                    <div id="lightbox" class="lightbox">
                        <img src="" alt="" />
                    </div>`;
    
                document.getElementById('content').innerHTML = galleryHTML;
    
                const gallery = document.querySelector('.gallery'); 
                const galleryImages = document.querySelectorAll('.gallery img');
                const lightbox = document.querySelector('.lightbox');
                const lightboxImg = lightbox.querySelector('img');
    
                galleryImages.forEach(img => {
                    img.addEventListener('click', function (e) {
                        e.preventDefault();
                        lightboxImg.src = this.getAttribute('data-large');
                        lightbox.style.display = 'flex';
                    });
                });
    
                lightbox.addEventListener('click', function () {
                    lightbox.style.display = 'none';
                });
    
                // Dodanie klasy do galerii, aby wyśrodkować ją za pomocą CSS
                gallery.classList.add('centered');
            });
    }
    
    
    

    function pokazKontakt() {
        return `
            <h2><br />Kontakt</h2>
            <p>Adres: ul. Przykładowa 123, 00-000 Miasto</p>
            <p>Telefon: 123 456 789</p>
            <p>Email: kontakt@salonfryzjerski.pl</p>
            <div id="map" style="width: 400px; height: 400px;"></div>
        `;
    }

    function pokazPraktyki() {
        return `
            <h2>Formularz Praktyki Zawodowej</h2>
                <form id="praktyki-form">
                    <label for="name">Imię i nazwisko:</label><br>
                    <input type="text" id="name" name="name" size="30" required><br>
                    <span id="nameError" class="czerwone"></span><br>
                    
                    <label for="email">Email:</label><br>
                    <input type="email" id="email" name="email" size="30" required><br>
                    <span id="emailError" class="czerwone"></span><br>
                    
                    <label for="phone">Telefon:</label><br>
                    <input type="tel" id="phone" name="phone" size="9" required><br>
                    <span id="phoneError" class="czerwone"></span><br>
                    
                    <label for="school">Szkoła:</label><br>
                    <input type="text" id="school" name="school" size="30" required><br>
                    <span id="schoolError" class="czerwone"></span><br>
                    
                    <label for="year">Rok nauki:</label><br>
                    <select id="year" name="year" required>
                        <option value="">Wybierz rok</option>
                        <option value="1">1 rok</option>
                        <option value="2">2 rok</option>
                        <option value="3">3 rok</option>
                        <option value="4">4 rok</option>
                    </select><br>
                    <span id="yearError" class="czerwone"></span><br>
                    
                    <label for="why">Dlaczego chcesz u nas praktykować?</label><br>
                    <textarea id="why" name="why" rows="4" required></textarea><br>
                    <span id="whyError" class="czerwone"></span><br>
                    
                    <fieldset>
                        <legend>Preferowane dni praktyk:</legend>
                        <input type="checkbox" id="monday" name="days" value="Monday">
                        <label for="monday">Poniedziałek</label><br>
                        <input type="checkbox" id="tuesday" name="days" value="Tuesday">
                        <label for="tuesday">Wtorek</label><br>
                        <input type="checkbox" id="wednesday" name="days" value="Wednesday">
                        <label for="wednesday">Środa</label><br>
                        <input type="checkbox" id="thursday" name="days" value="Thursday">
                        <label for="thursday">Czwartek</label><br>
                        <input type="checkbox" id="friday" name="days" value="Friday">
                        <label for="friday">Piątek</label><br>
                    </fieldset>
                    <span id="daysError" class="czerwone"></span><br>

                    <fieldset>
                        <legend>Preferowane godziny:</legend>
                        <input type="radio" id="morning" name="time" value="Morning" required>
                        <label for="morning">Rano</label><br>
                        <input type="radio" id="afternoon" name="time" value="Afternoon">
                        <label for="afternoon">Po południu</label><br>
                    </fieldset>
                    <span id="timeError" class="czerwone"></span><br>
                    
                    <input type="button" value="Wyślij" id="submit-button" onclick="submitButton()">
                    <input type="reset" value="Anuluj">
                </form>
                <div id="formularz-wyslany" style="display: none;">
                    <h2>Formularz został wysłany</h2>
                    <div id="wyslane-dane"></div>
                    <button id="edit-button">Edytuj</button>
                </div>
                <div id="wyslanyformularz"></div>
            `;
    }

    // // Załaduj domyślną zawartość
    // pokaz('home');
});

// Funkcja do inicjacji mapy Google
function initMap() {
    const salonLocation = { lat: 52.2296756, lng: 21.0122287 }; // Przykładowe współrzędne (Warszawa)
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: salonLocation
    });
    const marker = new google.maps.Marker({
        position: salonLocation,
        map: map
    });
}
