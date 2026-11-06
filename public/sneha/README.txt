Publish this folder at:  https://bluenxt.ai/sneha/

Files (upload all 3 into the same folder):
  index.html               the contact page
  sneha-pandey-misra.vcf   "Save contact" file
  logo-white.png           logo

Server setting:
  Serve .vcf files with  Content-Type: text/vcard
  (otherwise some phones show the text instead of saving the contact)

Also make https://bluenxt.ai/sneha (no trailing slash) open the same page.

Test after upload, on iPhone and Android:
  1. Scan the card QR -> page opens
  2. Save contact -> contact saved with both numbers, email, links
  3. Book a Meeting with Sneha -> booking page opens without login
  4. WhatsApp -> chat opens with message pre-filled

Background video:
  The page plays https://wiseguy.webetron.net/images/bn-ecosystem-future-of-hr.mp4
  Recommended: copy that video onto bluenxt.ai and update the <source src="..."> in index.html,
  so the page does not depend on another site. Keep it under ~3 MB for fast mobile loading.

CORPORATE BROCHURE
  Place the brochure PDF in this folder named exactly:
    bluenxt-corporate-brochure.pdf
  The "Download Corporate Brochure" button on the page links to it.
