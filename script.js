document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const form = document.querySelector('[data-contact-form]');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const subject = data.get('subject') || `Portfolio message from ${data.get('name')}`;
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
    const status = document.querySelector('[data-form-status]');
    const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.replaceChildren('Your email app can open a draft. ');
    const link = document.createElement('a');
    link.href = mailto;
    link.textContent = 'Open email draft';
    status.append(link);
    window.location.href = mailto;
  });
}
