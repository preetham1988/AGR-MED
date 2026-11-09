# AGR Medical Center website

A static, five-page website for AGR Medical Center, Lakshmi Ganapati Nagar, off Kogilu Main Road,
Yelahanka, Bengaluru. It's plain HTML, CSS and a small script, with no build step and no
dependencies.

| Page               | What it covers                                                                  |
| ------------------ | ------------------------------------------------------------------------------- |
| `index.html`       | Home: dusk-blue landing with both doctors, the two practices, the lab, location |
| `medicine.html`    | General medicine, lungs and sleep with Dr. Gangi Reddy TK, plus FAQs            |
| `eye-care.html`    | Eye examinations, cataract, retina and vitreous with Dr. Archana M, plus FAQs   |
| `diagnostics.html` | Every test, who it's for and how to prepare                                     |
| `visit.html`       | Appointment request form (sends via WhatsApp), map, first-visit steps          |

## Design

Inspired by Apple's design principles: one clear message per section, large type, generous space,
rounded tiles and very little decoration.

- **Colours:** midnight navy `#0D1A33`, dusk blue `#8FB4E3`, and midnight orange `#C2531A` for
  buttons and small highlights. They're defined as variables at the top of `assets/css/site.css`.
- **Type:** Apple devices use the system font (SF Pro). Everyone else gets Inter, which is
  self-hosted.
- **Doctor portraits:** cut out from the supplied photos and placed on a shared dusk-blue
  background.

## Preview locally

```sh
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy

Any static host works: GitHub Pages, Netlify, Vercel or Cloudflare Pages. Publish the repository
root and leave the build command empty.

## Before launch

- [ ] **Opening hours.** Replace `[Opening hours]` in `index.html` and `visit.html`. These are
      marked on the page with a dotted orange underline.
- [ ] **Domain.** Replace `YOUR-DOMAIN` in `sitemap.xml` and `robots.txt`. Canonical tags and an
      absolute `og:image` URL can then be added to each page.
- [ ] **Qualifications.** Each doctor's page has an HTML comment where degrees, fellowships and the
      registration number go.
- [ ] **Portraits.** The supplied photos were small and have been upscaled. New professional
      photos at least 1500 px wide would look sharper still.
- [ ] **Clinic photos.** Real photos of the clinic, lab and patients (with consent) will always look
      better than stock. Swap them into `assets/img/` using the same file names.
- [ ] **WhatsApp.** The booking form sends to `918861356060`, set by `CLINIC_WHATSAPP` at the top
      of `assets/js/site.js`. Change it there if appointments should go to a different number.
- [ ] **Medical copy.** Have both doctors read their pages and the test preparation notes.

See `SEO.md` for the search-ranking plan: Google Business Profile, reviews, listings and content.

## Structure

```
assets/css/site.css   All styles.
assets/js/site.js     Mobile menu, scroll reveal, booking form → WhatsApp.
assets/fonts/         Inter (SIL Open Font License).
assets/img/           WebP photos, doctor cut-outs, logo mark, favicon, social image.
sitemap.xml           For Google Search Console (fill in the domain).
robots.txt
```

The navigation, footer and shared `<head>` tags are repeated in each page. If you change one, change
it in all five files.

## Photography

Photos are graded to one consistent look. Clinical photos are from Pexels and are free for commercial
use under the [Pexels license](https://www.pexels.com/license/). Attribution isn't required, but the
sources are:

- Blood pressure check: [pexels.com/photo/14558560](https://www.pexels.com/photo/a-doctor-taking-a-patient-s-blood-pressure-14558560/)
- Cough (shawl): [pexels.com/photo/8817795](https://www.pexels.com/photo/close-up-photo-of-a-sick-man-covering-his-mouth-8817795/)
- Cough (face mask): [pexels.com/photo/11899610](https://www.pexels.com/photo/a-man-in-black-suit-jacket-wearing-eyeglasses-11899610/) (Towfiqu Barbhuiya)
- Glucometer: [pexels.com/photo/6941101](https://www.pexels.com/photo/person-holding-a-glucose-meter-6941101/) (background recoloured to dusk blue)
- Chest X-ray: [pexels.com/photo/4225923](https://www.pexels.com/photo/doctor-looking-at-scans-of-lungs-4225923/) (Anna Shvets)
- Eye close-up: [pexels.com/photo/34369399](https://www.pexels.com/photo/close-up-of-a-human-eye-with-rich-brown-iris-34369399/) (Nitin Yadav)
- Slit lamp: [pexels.com/photo/6749702](https://www.pexels.com/photo/an-ophthalmoscope-and-an-eye-examination-equipment-6749702/)
- Eye surgery: [pexels.com/photo/31000573](https://www.pexels.com/photo/professional-eye-surgery-in-new-delhi-hospital-31000573/)
- Phoropter: [pexels.com/photo/5752309](https://www.pexels.com/photo/optical-equipment-for-testing-vision-5752309/) (Ksenia Chernaya)
- Blood samples: [pexels.com/photo/6622518](https://www.pexels.com/photo/blood-samples-in-test-tubes-6622518/) (Charlie-Helen Robinson)

Doctor portraits were sharpened with an AI super-resolution model (EDSR) and cut out onto dusk blue.
New professional photos, at least 1500 px wide, would still be better.
