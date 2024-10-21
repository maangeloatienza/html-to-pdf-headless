const puppeteer = require('puppeteer')


const excludedSections = `#pdf-text-banner { display: none;} #pdf-edit-content{ display: none;} #pdf-footer{ display: none;} #pdf-paginator{ display: none;} .breadcrumbs{ display: none;} #download-modal{ display:none;} `

const printPdf = async (options,res,archive) => {
    const pdfBlobArr = []
    const browser = await puppeteer.launch({
        headless: true
    });
    for(const url of options.urls) {
        console.log(url)
        const page = await browser.newPage();

        page.setDefaultNavigationTimeout(180000)
        await page.setViewport({ width: 1920, height: 1080}); 
        await page.goto(url, {waitUntil: 'networkidle2',timeout: 120000 });
        await page.addStyleTag({ content: options.excludedSections? options.excludedSections : excludedSections })
        let title = await page.title()
        let pdf = await page.pdf({
            printBackground: true,
            format: 'A4',
            title
        });

        // return pdf
        // archive.append(pdf, { name: title });
        pdfBlobArr.push({
            title,
            file: pdf
        })
    }

    // await new Promise(resolve => setTimeout(resolve, 10000)); 
    // await archive.finalize();
    await browser.close();

    return {
        // title,
        pdf: pdfBlobArr
    };
}

module.exports = printPdf