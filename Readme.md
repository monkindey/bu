## Backup

> Backup your project

### Env

* Git >= 2.9
* *nux

### Why

Maybe you will empty src carelessly with node library such as `fs-extra`, and
everything is [gone](https://github.com/jprichardson/node-fs-extra/issues/469).

### How

* `husky`
* `git`

We can use husky postcommit hook to git bundle create.

### Installation

`npm install -g bu`

### Usage

```bash
bu init --path='path/to/your/backup/dir' --hooksPath='path/to/your/hooks/path'
```

