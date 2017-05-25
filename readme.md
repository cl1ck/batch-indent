# batch-indent

A cli tool to change the indentation type in multiple files.

## Installation

`npm i batch-indent -g`

## Usage

`batch-indent -p "./src/**/*.js" -f 3-spaces -t tabs`

Possible arguments are:

#### --pattern 
##### `-p ./src/**` 
Glob pattern to match files.

#### --from 
##### `-f 2-spaces` 
Type of indentation to find.

#### --to 
##### `-t tabs` 
Type of indentation to convert to.

## Indentation types

The indentation type passed to `--from` and `--to` must be one of the following:

* `tabs`
* `1-space`
* `2-spaces`
* `3-spaces`
* `4-spaces`
* `5-spaces`
* `6-spaces`
* `7-spaces`
* `8-spaces`