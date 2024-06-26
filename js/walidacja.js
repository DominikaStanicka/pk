document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('formSubmitted') === 'true') {
        pokazWyslanyFormularz();
        document.getElementById('praktyki-form').style.display = 'none';
    } else {
        document.getElementById('praktyki-form').style.display = 'block';
    }
});

function submitButton() {
    // Walidacja danych
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const school = document.getElementById('school').value;
    const year = document.getElementById('year').value;
    const why = document.getElementById('why').value;
    const days = Array.from(document.querySelectorAll('input[name="days"]:checked')).map(cb => cb.labels[0].innerText);
    const time = document.querySelector('input[name="time"]:checked');

    // Usuwanie starych komunikatów błędów
    document.querySelectorAll('.czerwone').forEach(el => el.style.display = 'none');

    let hasError = false;

    // Sprawdzenie wymaganych pól
    if (!name) {
        document.getElementById('nameError').innerText = 'Proszę wypełnić pole Imię.';
        document.getElementById('nameError').style.display = 'inline';
        hasError = true;
    }
    if (!email) {
        document.getElementById('emailError').innerText = 'Proszę wypełnić pole Email.';
        document.getElementById('emailError').style.display = 'inline';
        hasError = true;
    }
    if (!phone) {
        document.getElementById('phoneError').innerText = 'Proszę wypełnić pole Telefon.';
        document.getElementById('phoneError').style.display = 'inline';
        hasError = true;
    }
    if (!school) {
        document.getElementById('schoolError').innerText = 'Proszę wypełnić pole Szkoła.';
        document.getElementById('schoolError').style.display = 'inline';
        hasError = true;
    }
    if (!year) {
        document.getElementById('yearError').innerText = 'Proszę wypełnić pole Rok.';
        document.getElementById('yearError').style.display = 'inline';
        hasError = true;
    }
    if (!why) {
        document.getElementById('whyError').innerText = 'Proszę wypełnić pole Dlaczego.';
        document.getElementById('whyError').style.display = 'inline';
        hasError = true;
    }
    if (!days.length) {
        document.getElementById('daysError').innerText = 'Proszę wybrać przynajmniej jeden dzień.';
        document.getElementById('daysError').style.display = 'inline';
        hasError = true;
    }
    if (!time) {
        document.getElementById('timeError').innerText = 'Proszę wybrać godzinę.';
        document.getElementById('timeError').style.display = 'inline';
        hasError = true;
    }

    // Walidacja numeru telefonu
    if (phone && !/^\d{9}$/.test(phone)) {
        document.getElementById('phoneError').innerText = 'Numer telefonu powinien składać się z 9 cyfr.';
        document.getElementById('phoneError').style.display = 'inline';
        hasError = true;
    }

    // Walidacja adresu email
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById('emailError').innerText = 'Proszę podać poprawny adres email.';
        document.getElementById('emailError').style.display = 'inline';
        hasError = true;
    }

    if (hasError) {
        return;
    }
    const formData = {
        name,
        email,
        phone,
        school,
        year,
        why,
        days,
        time: time.labels[0].innerText
    };

    localStorage.setItem('formData', JSON.stringify(formData));
    localStorage.setItem('formSubmitted', 'true');

    // Wyświetlanie wysłanego formularza
    pokazWyslanyFormularz();

    // Resetowanie formularza po wysłaniu
}

function pokazWyslanyFormularz() {
    document.getElementById('praktyki-form').reset();

    // Chowanie formularza
    document.getElementById('praktyki-form').style.display = 'none';
    const formData = JSON.parse(localStorage.getItem('formData'));
    const tresc = `
        <h2>Formularz został wysłany</h2>
        <h3>Twoje Dane:</h3>
        <p>Imię i nazwisko: ${formData.name}</p>
        <p>Email: ${formData.email}</p>
        <p>Telefon: ${formData.phone}</p>
        <p>Szkoła: ${formData.school}</p>
        <p>Rok nauki: ${formData.year}</p>
        <p>Dlaczego praktykujesz u nas: ${formData.why}</p>
        <p>Preferowane dni praktyk: ${formData.days.join(', ')}</p>
        <p>Preferowane godziny: ${formData.time}</p>
        <button id="edit-button" onclick="editButton()">Edytuj</button>
    `;

    document.getElementById('wyslanyformularz').innerHTML = tresc;
}

function editButton() {
    const formData = JSON.parse(localStorage.getItem('formData'));

    document.getElementById('name').value = formData.name;
    document.getElementById('email').value = formData.email;
    document.getElementById('phone').value = formData.phone;
    document.getElementById('school').value = formData.school;
    document.getElementById('year').value = formData.year;
    document.getElementById('why').value = formData.why;

    document.querySelectorAll('input[name="days"]').forEach(input => {
        input.checked = formData.days.includes(input.labels[0].innerText);
    });

    document.querySelectorAll('input[name="time"]').forEach(input => {
        if (input.labels[0].innerText === formData.time) {
            input.checked = true;
        }
    });

    // Pokazywanie formularza
    document.getElementById('praktyki-form').style.display = 'block';

    // Chowanie wysłanego formularza
    document.getElementById('wyslanyformularz').innerHTML = '';

    // Remove the form submitted flag
    localStorage.removeItem('formSubmitted');
}
