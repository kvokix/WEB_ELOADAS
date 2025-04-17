// Alap osztály: HTMLForm (űrlap validálás)
class HTMLForm {
    constructor(formId) {
        this.form = document.getElementById(formId);  // Űrlap elem
        this.feedbackDiv = document.getElementById('feedback');  // Visszajelzés div
    }

    // Validálja az email mezőt
    validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    // Validálja a telefonszám mezőt
    validatePhone(phone) {
        const phonePattern = /^[0-9]{10}$/;  // Egyszerű 10 számjegyű telefonszám
        return phonePattern.test(phone);
    }

    // Validálja a jelszó mezőt
    validatePassword(password) {
        return password.length >= 6;  // Jelszónak legalább 6 karakter hosszúnak kell lennie
    }

    // Visszajelzés megjelenítése
    showFeedback(message, isError = false) {
        this.feedbackDiv.textContent = message;
        this.feedbackDiv.className = isError ? 'error' : 'feedback';
    }

    // Form validálás
    validateForm() {
        const email = this.form.email.value;
        const phone = this.form.phone.value;
        const password = this.form.password.value;

        if (!this.validateEmail(email)) {
            this.showFeedback("Hibás email cím!", true);
            return false;
        }

        if (!this.validatePhone(phone)) {
            this.showFeedback("Hibás telefonszám! Csak számjegyek és 10 karakter!", true);
            return false;
        }

        if (!this.validatePassword(password)) {
            this.showFeedback("A jelszó legalább 6 karakter hosszú kell legyen!", true);
            return false;
        }

        this.showFeedback("Sikeres validálás!", false);
        return true;
    }
}

// Kiterjesztett osztály: ExtendedForm (új mezőkkel)
class ExtendedForm extends HTMLForm {
    constructor(formId) {
        super(formId);  // Az ősosztály konstruktorának hívása
    }

    // További validálás, például mezők ürességének ellenőrzése
    validateEmptyFields() {
        const email = this.form.email.value;
        const phone = this.form.phone.value;
        const password = this.form.password.value;

        if (!email || !phone || !password) {
            this.showFeedback("Minden mezőt ki kell tölteni!", true);
            return false;
        }
        return true;
    }

    // Felülírjuk a validálás metódust, hogy további ellenőrzéseket végezzünk
    validateForm() {
        if (!this.validateEmptyFields()) return false;
        return super.validateForm();
    }
}

// Űrlap beküldésének kezelése
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Megakadályozzuk az alapértelmezett űrlap küldést

    const formValidator = new ExtendedForm('myForm');
    if (formValidator.validateForm()) {
        // Itt valósíthatjuk meg a formadatok elküldését
        alert("Űrlap sikeresen elküldve!");
    }
});
