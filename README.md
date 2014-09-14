# Common Lisp Package Manager

[![Build Statue](https://travis-ci.org/1ambda/clpm.svg?branch=master)](https://travis-ci.org/1ambda/clpm)

> current version is 0.1.9. Support Ubuntu, SBCL only
> But We have plan to support other OS and other lisp impl such as Clisp  

### Installation

`clpm` requires **sbcl**, **quicklisp**. You have to install them before using `clpm`

```
$ sudo npm install -g clpm
```

### Usage

**lpm** supports 3 formats of option. for example,

- `-s`
- `search`
- `--search`

See help.

#### Search

```
$ lpm -s xml
```

#### Update 

```
$ lpm -u dist ;; update system distribuion
$ lpm -u client ;; update quicklisp client
```

#### Browse

```
$ lpm -b cl-json ;; browse the cl-json docs page
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

### Contributtion

Just make a pull request. I'll accept without questions. Anyone does better than me.

### License

MIT
