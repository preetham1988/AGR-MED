/* AGR Medical Center: mobile menu, scroll reveal, appointment request. */

// WhatsApp number for appointment requests: digits only, with country code.
var CLINIC_WHATSAPP = '918861356060';

(function() {
  'use strict';

  /* Mobile menu */
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (btn && menu) {
    var setOpen = function(open) {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.hidden = !open;
      document.body.classList.toggle('menu-open', open);
      if (open) {
        var first = menu.querySelector('a');
        if (first) first.focus();
      }
    };
    btn.addEventListener('click', function() {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        btn.focus();
      }
    });
    menu.addEventListener('click', function(e) {
      if (e.target.closest('a')) setOpen(false);
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', function(mq) {
      if (mq.matches) setOpen(false);
    });
  }

  /* Reveal sections as they scroll into view */
  var reveal = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveal.length) {
    var io = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    reveal.forEach(function(el) {
      io.observe(el);
    });
  } else {
    reveal.forEach(function(el) {
      el.classList.add('is-in');
    });
  }

  /* Footer year */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  /* Appointment request: builds a WhatsApp message from the form */
  var form = document.getElementById('booking-form');
  if (!form) return;

  var params = new URLSearchParams(window.location.search);
  var preset = params.get('see');
  if (preset) {
    var match = form.querySelector('input[name="see"][value="' + preset + '"]');
    if (match) match.checked = true;
  }

  var dateInput = form.querySelector('input[name="date"]');
  if (dateInput) {
    var now = new Date();
    var pad = function(n) {
      return String(n).padStart(2, '0');
    };
    dateInput.min = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
  }

  var labels = {
    gangi: 'Dr. Gangi Reddy TK (medicine, lungs, sleep)',
    archana: 'Dr. Archana M (eyes)',
    tests: 'A test or health check',
    unsure: 'Not sure yet',
  };

  var showError = function(name, message) {
    var field = form.querySelector('[data-field="' + name + '"]');
    if (!field) return;
    var out = field.querySelector('.field__error');
    if (message) {
      field.setAttribute('data-invalid', '');
      out.textContent = message;
    } else {
      field.removeAttribute('data-invalid');
      out.textContent = '';
    }
  };

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var data = new FormData(form);
    var name = (data.get('name') || '').trim();
    var phone = (data.get('phone') || '').trim();
    var digits = phone.replace(/\D/g, '');

    var firstInvalid = null;
    if (!name) {
      showError('name', 'Add your name so the front desk knows who to expect.');
      firstInvalid = firstInvalid || form.elements.name;
    } else {
      showError('name', '');
    }
    if (digits.length < 10) {
      showError('phone', 'Add a phone number with at least 10 digits so we can call you back.');
      firstInvalid = firstInvalid || form.elements.phone;
    } else {
      showError('phone', '');
    }
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    var lines = ['Appointment request', '', 'Name: ' + name, 'Phone: ' + phone];
    var see = data.get('see');
    if (see && labels[see]) lines.push('To see: ' + labels[see]);
    var date = data.get('date');
    if (date) {
      var d = new Date(date + 'T00:00:00');
      lines.push(
        'Preferred day: ' +
          d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })
      );
    }
    var time = data.get('time');
    if (time) lines.push('Preferred time: ' + time);
    var note = (data.get('note') || '').trim();
    if (note) lines.push('', note);

    var url = 'https://wa.me/' + CLINIC_WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener');
  });
})();
