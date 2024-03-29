[![npm version](https://badge.fury.io/js/yardman.svg)](https://badge.fury.io/js/yardman)
[![Build Status](https://travis-ci.org/agirorn/yardman.svg?branch=master)](https://travis-ci.org/agirorn/yardman)

# yardman

_The one that maintains the development yard._ Watching files and running
commands.

<img src="./assets/yardman-cover.png" alt="yardman" style="max-width:600px;"/>

## Installation

```shel
# Using Yarn
yarn add yardman

# Using npm
npm install yardman
```

## Usage

```shel
yardman

Watch files and run commands.

Usage:
  yardman [options] [files ...] executable
  yardman [[options] [files ...] -exec executable ...] [options] [files ...] executable

Options:
  -h, --help               This help text
  -v, --version            Display version information
  -x, --exec=executable    Executable to run
  -n, --npm=script         Executable an npm script with the --silent flag
  -X, --no-start           Do not run the executable on start
  -w, --watch=files...     Comma separated list of files to monitor for change
  -S, --kill-signal=signal Set the kill signal (SIGTERM, SIGKILL), defaults to SIGTERM
  -d, --debounce=ms        Set the number of milliseconds to wait for before
                           executing the command after a file change. Useful
                           when switching branches while watching files.

Variables:
  file: The name of the file that just got updated is injected into the
  executable command with the template {{file}}

Example:
  yardman src make
  yardman src -x make build/result.exe ./test
  yardman src -x 'file {{file}}'
```

## Configuration

Yardman can be configured by adding the command line arguments to the
`.yardmanrc` file in the current working directory.

__Example of a .yardmanrc__

```bash
# Build project when files in src directory change.
src
-x make

# Run tests when the build is finished.
build/result.exe
./test
```
