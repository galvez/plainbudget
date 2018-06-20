# plainbudget: Minimalist Plain Text Budgeting

```sh
npm install pbudget -g
```

See [http://galvez.github.io/plainbudget](http://galvez.github.io/plainbudget) for details.

# CLI

```sh
# reads and modifies file with result
pbudget sheet.txt -s 

# reads file and prints result
pbudget sheet.txt

# process from stdin and write to stdout
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
