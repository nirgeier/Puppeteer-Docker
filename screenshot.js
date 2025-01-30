const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Get URL from environment variable
  const url = process.env.URL || 'https://example.com';

  // Validate URL
  if (!url.startsWith('http')) {
    console.error('Invalid URL format. Please use http:// or https://');
    process.exit(1);
  }

  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport size
    await page.setViewport({ width: 1280, height: 800 });

    console.log(`Navigating to ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Create screenshots directory
    if (!fs.existsSync('/screenshots')) {
      fs.mkdirSync('/screenshots');
    }

    // Generate filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `/screenshots/screenshot-${timestamp}.png`;

    // Take screenshot
    await page.screenshot({
      path: filename,
      fullPage: true
    });

    console.log(`Screenshot saved to ${filename}`);

    await browser.close();
    process.exit(0);
  } catch (error) {
    console.error('Error occurred:', error);
    process.exit(1);
  }
})();