[![npm version](https://badge.fury.io/js/yardman.svg)](https://badge.fury.io/js/yardman)
[![Build Status](https://travis-ci.org/agirorn/yardman.svg?branch=master)](https://travis-ci.org/agirorn/yardman)

# yardman

_The one that maintains the development yard._ Watching files and executing
commands.

## Usage

```shel
yardman

Watch files and run commands.

Usage:
  yardman [options] [files ...] executable
  yardman [[options] [files ...] -exec executable ...] [options] [files ...] executable

Options:
  -h, --help              This help text
  -v, --version           Display version information
  -x, --exec=executable   Executable to run
  -X, --no-start          Do not run the executable on start
  -w, --watch=files...    Comma separated list of files to monitor for change.

Example:
  yardman src make
  yardman src -x make build/result.exe ./test
```


## Configuration

Yardman can be configured by adding the command line arguments to the `.yardmanrc` file in the current working directory.

__Example of a .yardmanrc__

```bash
# Build this project when files in src change.
src
-x make

# Run the tests when the build is done.
build/result.exe
./test
```
