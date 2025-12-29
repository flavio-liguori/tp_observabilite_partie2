import puppeteer from 'puppeteer';

(async () => {
    // Launch the browser
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.failure().errorText, request.url()));

    console.log('Starting Scenario: Normal User Flow');

    // Scenario 1: Load Page
    console.log('1. User visits dashboard...');
    const PORT = 5173; // Try 5174 if this fails, or use logic to try both
    try {
        await page.goto(`http://localhost:${PORT}`);
    } catch (e) {
        console.log('Retrying on port 5174...');
        await page.goto('http://localhost:5174');
    }

    await new Promise(r => setTimeout(r, 2000));
    // Wait for the form to be visible
    try {
        await page.waitForSelector('#name', { timeout: 5000 });
    } catch (e) {
        console.error('Could not find #name element. Dumping page content...');
        console.log(await page.content());
        throw e;
    }

    // Scenario 2: Create a Product (POST /api/products)
    console.log('2. User creates a "Gaming Mouse"...');
    await page.type('#name', 'Gaming Mouse');
    await page.type('#price', '59.99');
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 1000)); // Wait for submission

    // Scenario 3: Create another Product
    console.log('3. User creates a "Mechanical Keyboard"...');
    await page.type('#name', 'Mechanical Keyboard');
    await page.type('#price', '120.50');
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 1000));

    // Scenario 4: User refreshes page (Another GET /api/products)
    console.log('4. User refreshes the page...');
    await page.reload();
    await new Promise(r => setTimeout(r, 2000));

    // Scenario 5: User tries to submit invalid form (Frontend validation prevents fetch, but maybe we can bypass?)
    // Actually current app has frontend validation `if (!name || !price) return`, so no trace generated for invalid.

    console.log('Scenarios completed. Check Zipkin for traces.');

    await browser.close();
})();
