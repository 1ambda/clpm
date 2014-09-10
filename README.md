Common Lisp Package Manager
===

### Install

**clpm** requires **sbcl**, **quicklisp** You have to install them to use clpm

```
$ sudo npm install -g clpm
```

### Usage

##### Search

default options is `-s` search

```
$ lpm restas mysql mongodb
$ lpm -s xml json
```

### Contribute

Just make a pull request. I'll accept without questions. Anyone do better than me. 

### Minestone

**0.1.x** : system searching, pretty print
**0.2.0** : provide quicklisp client info option
**0.3.0** : parsing protocol
**0.4.0** : install quicklisp, qlot using lpm
**0.5.0** : installing systems using qlot
**0.6.0** : removing systeems using qlot

being indenpendent from quicklisp and qlot.
