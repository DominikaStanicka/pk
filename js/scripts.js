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
                break;
            case "kontakt":
                tresc += pokazKontakt();
                content.innerHTML = tresc;
                initMap(); // Wywołaj initMap po dodaniu treści
                return; // zakończ funkcję, ponieważ treść już została ustawiona
            case "praktyki":
                tresc += pokazPraktyki();
                break;
            case "wyslanyformularz":
                tresc += pokazWyslanyFormularz();
                content.innerHTML = tresc;
                break;
            default:
                tresc += pokazHome();
        }
        content.innerHTML = tresc;
        if(localStorage.getItem("formSubmitted") === 'true' && id === "praktyki") {
            pokazWyslanyFormularz();
        }
    }

    function pokazHome() {
        return `
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
        `;
    }

    function pokazGalerie() {
        fetch('https://penguinpops.github.io/fp-fake-api/data2.json')
            .then(response => response.json())
            .then(images => {
                let galleryHTML = `
                    <h2><br />Galeria</h2>
                    <div class="galeria">
                `;
    
                images.forEach(image => {
                    console.log(image.src, image.alt);
                    galleryHTML += `
                        <div class="slajd"><img src="${image.src}" alt="${image.alt}" /></div>
                    `;
                });
    
                galleryHTML += `</div>`;
    
                document.getElementById('content').innerHTML = galleryHTML;
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
                <span id="nazw_error" class="czerwone"></span><br>
                
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email" size="30" required><br>
                <span id="email_error" class="czerwone"></span><br>
                
                <label for="phone">Telefon:</label><br>
                <input type="tel" id="phone" name="phone" size="30" required><br>
                <span id="phone_error" class="czerwone"></span><br>
                
                <label for="school">Szkoła:</label><br>
                <input type="text" id="school" name="school" size="30" required><br>
                <span id="school_error" class="czerwone"></span><br>
                
                <label for="year">Rok nauki:</label><br>
                <select id="year" name="year" required>
                    <option value="">Wybierz rok</option>
                    <option value="1">1 rok</option>
                    <option value="2">2 rok</option>
                    <option value="3">3 rok</option>
                    <option value="4">4 rok</option>
                </select><br>
                <span id="year_error" class="czerwone"></span><br>
                
                <label for="why">Dlaczego chcesz u nas praktykować?</label><br>
                <textarea id="why" name="why" rows="4" required></textarea><br>
                <span id="why_error" class="czerwone"></span><br>
                
                <fieldset>
                    <legend>Preferowane dni praktyk:</legend>
                    <input type="checkbox" id="monday" name="days" value="Monday">
                    <label for="monday">Poniedziałek</label><br>
                    <!-- Kontynuuj dodawanie pól checkbox -->
                </fieldset>
                
                <fieldset>
                    <legend>Preferowane godziny:</legend>
                    <input type="radio" id="morning" name="time" value="Morning" required>
                    <label for="morning">Rano</label><br>
                    <!-- Kontynuuj dodawanie pól radio -->
                </fieldset>
                
                <input type="button" value=" Wyślij " id="submit-button" onclick="submitButton()">
                <input type="reset" value=" Anuluj ">
            </form>
            <div id="formularz-wyslany" style="display: none;">
                <h2>Formularz został wysłany</h2>
                <div id="wyslane-dane"></div>
                <button id="edit-button">Edytuj</button>
            </div>
            <div id=wyslanyformularz></div>
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
