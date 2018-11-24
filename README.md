restify-validators
==================

Custom validators for the Node.JS restify framework.

If using TypeScript, install `typings` with:

    typings install github:SamuelMarks/restify-validators/restify-validators.d.ts --save

Otherwise just use the [restify-validators-dist](https://github.com/SamuelMarks/restify-validators-dist) compiled output.

## Miscellaneous

Clone the dist repo in the same directory this repo was cloned into, then you can synchronise them with:

    dst="${PWD##*/}"-dist;
    find -type f -not -path './node_modules*' -a -not -path './.git*' -a -not -path './.idea*' -a -not -path './typings*' -a -not -name '*.ts' -not -name 'ts*' | cpio -pdamv ../"$dst";

Or simply:

    cp {*.md,*.js*} ../restify-validators-dist
