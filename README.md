# yardman

_The one that maintains the development yard._ Watching files and executing
commands.

## Usage

### Command line usage

Watch for change on any file in the lib spec folders and execute buildfile when
they do.
```shel
yardman lib/** spec/** ./buildfile
```

Watch for change on any file in lib and spec folders and execute eslint when
they do and watch for a change in all files in the scss folder and execute scss
when they do.
```shel
yardman lib/** spec/** -x "eslint lib spec" css/** scss
```

## Configuration file

Yardman can be configured with the .yardmanrc file in the current working
directory.

__Example of a .yardmanrc__

```bash
src/**
-x ./buildfile
```
