# HTML to PDF (Headless Solution)

An open-source API for setting up API to generate PDF from a given URL and option to add css restrictions.

## Documentation

**Install dependecies**
```bash
npm install
```

*or*

```bash
yarn install
```

**How to use?**

Current endpoint points to `/` route, but you can change it depends on your setup.

To send a request call **your specified endpoint (default `/`)** under `app.js`, with a required query `?url=<urlToGenerate>` and an optional body 
```json
{
    "excludedSections": ".container{display:none;} .navbar{display:none;}"
}
```


The **excludedSections** query is a string of css styling that you can define before generating the PDF. Take note that the ***css styling selector should be existing on the page*** you are generating from.

## Sample request

```curl
curl -H 'Content-Type: application/pdf' \
-o 'download.pdf' \
-d '{"excludedSection":"img{display:none;}" }' \
-X POST \
https://your-server?url=https://google.com
```

## Output
![alt text](image.png)