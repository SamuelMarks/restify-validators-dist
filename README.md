restify-validators
==================

Custom validators for the Node.JS restify framework.

If using TypeScript, install `typings` with:

    typings install github:SamuelMarks/restify-validators/restify-validators.d.ts --save

Otherwise just use the [restify-validators-dist](https://github.com/SamuelMarks/restify-validators-dist) compiled output.

## Miscellaneous

Clone the dist repo in the same directory this repo was cloned into, then you can synchronise them with:

    find -type f -not -name "*.ts" -and -not -path "./.git/*" -and -not -path "./node-modules/*" -and -not -name '*.map' | cpio -pdamv ../restify-validators-dist

Or simply:

    cp {*.md,*.js*} ../restify-validators-dist
