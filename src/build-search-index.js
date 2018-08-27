const fs = require('fs')
const path = require('path')
const fm = require('front-matter')
const lunr = require('lunr')
const removeMd = require('remove-markdown')
const {promisify} = require('util')
const readDirAsync = promisify(fs.readdir)
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

// Extracts the file slug and formats it to match Jekyll's page.url variable:
// https://jekyllrb.com/docs/variables/#page-variables
function toUrl(fileName){
  return '/notes/' + fileName.match(/(?:\d+-\d+-\d+-)([^\.]+)/)[1] + '.html'
}

// List posts
const dirPath = '../_posts/'
readDirAsync(dirPath).then(files =>
  Promise.all(files.map((file,index) => {

    // Extract contents from each post
    const filePath = dirPath + file
    return readFileAsync(filePath, 'utf8').then(contents => {
      const parsed = fm(contents)

      // Structure contents for indexing
      parsed.title = parsed.attributes.title
      parsed.tags = parsed.attributes.tags.join()
      parsed.url = toUrl(file)
      parsed.body = removeMd(parsed.body)
      return parsed
    })

  // Index
  }))).then(docs => lunr(builder => {
    builder.ref('url')
    builder.field('title')
    builder.field('tags')
    builder.field('body')
    docs.forEach(doc => builder.add(doc))

  // Write index to file
  })).then(idx =>
    writeFileAsync('./search-index.json', JSON.stringify(idx), 'utf8')).catch(console.log)


