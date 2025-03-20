let passwordInput = document.querySelector('.password');
let togglePassword = document.getElementById("togglePassword");
let icon = togglePassword.querySelector("i");
let progressBar = document.querySelector('.progress .bar');

// Alternar visibilidade da senha
togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash"); // Ícone de olho fechado
    } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye"); // Ícone de olho aberto
    }
});

// Validação da senha
passwordInput.addEventListener('keyup', () => {
    let strength = 0;

    strength += renderRule('.upper-case', /[A-Z]/.test(passwordInput.value));
    strength += renderRule('.low-case', /[a-z]/.test(passwordInput.value));
    strength += renderRule('.one-number', /[0-9]/.test(passwordInput.value));
    strength += renderRule('.one-special-char', /[!@#$%&*_]/.test(passwordInput.value));
    strength += renderRule('.min-char', passwordInput.value.length >= 6);

    let pct = Math.floor((strength / 5) * 100);
    progressBar.style.width = `${pct}%`;

    if (pct < 40) {
        progressBar.style.backgroundColor = 'red';
    } else if (pct < 80) {
        progressBar.style.backgroundColor = 'orange';
    } else {
        progressBar.style.backgroundColor = 'green';
    }
});

function renderRule(ruleClass, valid) {
    let ruleArea = document.querySelector(ruleClass);
    ruleArea.querySelector('.valid-point').style.backgroundColor = valid ? 'green' : 'red';
    return valid ? 1 : 0;
}
