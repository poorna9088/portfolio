
/* ==============================
   1. DYNAMIC COPYRIGHT YEAR
============================== */

document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
});


/* ==============================
   2. DARK / LIGHT THEME
============================== */

const themeToggle = document.getElementById('themeToggle');

// Get previously selected theme
const savedTheme = localStorage.getItem('portfolio-theme');

// Apply saved theme
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
}

// Update theme button
function updateThemeButton() {

    const isLight = document.body.classList.contains('light-theme');

    if (themeToggle) {

        themeToggle.textContent = isLight
            ? '🌙 Dark Mode'
            : '☀️ Light Mode';

        themeToggle.setAttribute(
            'aria-label',
            isLight ? 'Switch to dark theme' : 'Switch to light theme'
        );

        themeToggle.setAttribute(
            'aria-pressed',
            String(isLight)
        );
    }
}

updateThemeButton();

// Change theme when button is clicked
if (themeToggle) {

    themeToggle.addEventListener('click', () => {

        document.body.classList.toggle('light-theme');

        const currentTheme =
            document.body.classList.contains('light-theme')
                ? 'light'
                : 'dark';

        localStorage.setItem('portfolio-theme', currentTheme);

        updateThemeButton();
    });
}


/* ==============================
   3. CONTACT FORM
============================== */

const form = document.querySelector('[data-contact-form]');

if (form) {

    form.addEventListener('submit', (event) => {

        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        const data = new FormData(form);

        const name = data.get('name');
        const email = data.get('email');
        const message = data.get('message');

        const subject =
            data.get('subject') ||
            `Portfolio message from ${name}`;

        const body =
            `Name: ${name}\nEmail: ${email}\n\n${message}`;

        const status = document.querySelector('[data-form-status]');

        const mailto =
            `mailto:?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;

        if (status) {

            status.replaceChildren(
                'Your email app can open a draft. '
            );

            const link = document.createElement('a');

            link.href = mailto;
            link.textContent = 'Open email draft';

            status.append(link);
        }

        window.location.href = mailto;

    });

}
