const fs = require( 'fs' )
const fm = require('front-matter')
const lunr = require('lunr')
const removeMd = require('remove-markdown')
const {promisify} = require('util')
const readDirAsync = promisify(fs.readdir)
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

// List posts
const dirPath = '_posts/'
readDirAsync(dirPath).then(files =>
  Promise.all(files.map((file,index) => {

    // Extract contents from each post
    const filePath = dirPath + file
    return readFileAsync(filePath, 'utf8').then(contents => {
      const parsed = fm(contents)

      // Structure contents for indexing
      parsed.title = parsed.attributes.title
      parsed.tags = parsed.attributes.tags.join()
      parsed.id = index
      parsed.body = removeMd(parsed.body)
      return parsed
    })

  // Index
  }))).then(docs => lunr(builder => {
    builder.ref('id')
    builder.field('title')
    builder.field('tags')
    builder.field('body')
    docs.forEach(doc => builder.add(doc))

  // Write index to file
  })).then(idx =>
    writeFileAsync('search-index.json', JSON.stringify(idx), 'utf8')).catch(console.log)


