const esbuild = require('esbuild')
const outDir = `.test`
const functionsDir = `src`
const { join } = require('path')
const { readdirSync, statSync } = require('fs')

const getAllFiles = (dir, regExp, files, result, regex) => {
  files = files || readdirSync(dir)
  result = result || []
  regex = regex || new RegExp(regExp)

  for (let i = 0; i < files.length; i++) {
    let file = join(dir, files[i])
    if (statSync(file).isDirectory()) {
      try {
        result = getAllFiles(file, regExp, readdirSync(file), result, regex)
      } catch (error) {
        continue
      }
    } else {
      if (regex.test(file)) {
        result.push(file)
      }
    }
  }
  return result
}

const entryPoints = getAllFiles('./src', /.test.(?!.*snap).*$/)
// console.log(result);
console.log(`Number of files found: ${entryPoints.length}`)

console.log(entryPoints)

esbuild.build({
  entryPoints,
  bundle: true,
  minify: false,
  target: 'es2015',
  format: 'cjs',
  outdir: join(__dirname, outDir),
  outbase: functionsDir,
  platform: 'node',
  sourcemap: false,
  watch: process.argv.includes('--watch'),
})
