# plainbudget: Minimalist Plain Text Budgeting

```sh
npm install pubudget -g
```

See [http://galvez.github.io/plainbudget](http://galvez.github.io/plainbudget) for details.

# CLI

```sh
# reads and modifies file with result
pbudget sheet.txt -s 

# Process from stdin and write to stdout
cat sheet.txt | pbudget > new-sheet.txt
```

# Development

```sh
npm start # starts Nuxt development server
npm run build # builds SPA in docs/ folder
```

Requires [Nuxt](http://nuxtjs.org/) for running and building.

# License

MIT
