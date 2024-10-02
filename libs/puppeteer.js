const puppeteer = require('puppeteer')

const excludedSections = `#pdf-text-banner { display: none;} #pdf-edit-content{ display: none;} #pdf-footer{ display: none;} #pdf-paginator{ display: none;} .breadcrumbs{ display: none;} `

const printPdf = async (options) => {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080}); 
    await page.goto(options.url, {waitUntil: 'networkidle2'});
    await page.addStyleTag({ content: `${options.excludedSections}`|| excludedSections })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'A4'
    });

    await browser.close();

    return pdf;
}

module.exports = printPdf