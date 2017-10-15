## Backup

> Backup your project

### Env

* Git >= 2.9
* *nux

### Why

Maybe you will empty src carelessly with node library such as `fs-extra`, and
everything is [gone](https://github.com/jprichardson/node-fs-extra/issues/469).

### How

We can use global postcommit hook to git bundle create. And not inject something into your project, because it's not necessary to other contributors.

### Installation

`npm install -g bu`

### Usage

```bash
bu init --path='path/to/your/backup/dir' --hooksPath='path/to/your/hooks/path'
```

