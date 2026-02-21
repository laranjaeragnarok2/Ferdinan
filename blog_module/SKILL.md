# openclaw-blog

Automate publishing to the Ferdinan blog. Creates MDX files with correct frontmatter in `src/content/blog/`.

## Usage
Add a new post:
`node blog_module/src/cli.js add "My Great Title" --description "Summary here" --content "Full body in markdown"`

## Options
- `-d, --description`: Required summary for search/previews.
- `-c, --content`: Required full post body.
- `-t, --tags`: Comma-separated tags (ex: "Ai, SEO").
- `-i, --image`: Path to cover image.
