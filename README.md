# Common Lisp Package Manager

[![Build Statue](https://travis-ci.org/1ambda/clpm.svg?branch=master)](https://travis-ci.org/1ambda/clpm)

> current version is 0.1.x

<br/>
![Common Lisp Package Manager](https://raw.githubusercontent.com/1ambda/clpm/master/images/screenshot1.png)

### Installation

`clpm` requires **sbcl**, **quicklisp**. You have to install them before using `clpm`

```
$ sudo npm install -g clpm
```

### Usage

#### Search

default options is `-s` search

```
$ lpm restas mysql mongodb
$ lpm -s xml json
```

#### Update Distribution

```
$ lpm -u dist
$ lpm --update dist
```

#### Update Quicklisp Client

```
$ lpm -u client
$ lpm --update client
```

### Milestone

**0.1.x** : system searching, pretty print  
**0.2.0** : provide quicklisp client infomation  
**0.3.0** : multi platform support  
**0.4.0** : installing sbcl, quicklisp, qlot  
**0.5.0** : parsing protocol  
**0.6.0** : installing systems using qlot  
**0.7.0** : removing systems using qlot  
**0.8.0** : caching  
**0.9.0** : start command, build command  

being indenpendent from quicklisp and qlot.

### Contributtion

Just make a pull request. I'll accept without questions. Anyone does better than me.

### License

MIT
