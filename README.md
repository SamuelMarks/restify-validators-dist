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


## License

Licensed under either of

- Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE) or <https://www.apache.org/licenses/LICENSE-2.0>)
- MIT license ([LICENSE-MIT](LICENSE-MIT) or <https://opensource.org/licenses/MIT>)

at your option.

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in the work by you, as defined in the Apache-2.0 license, shall be
dual licensed as above, without any additional terms or conditions.
