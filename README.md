## Usage

1. edit `config.js`
2. run `npm start`

## Config

### single project webhook
```javascript
{
  port: 8080,
  events: ['push'],
  origin: ['github', 'gitlab', 'coding'],
  path: '/project_dir',
  cmd: 'cd /project_path/project_name; git pull'
};
```
eg:
we have a project at `/usr/project` call `test`
```javascript
{
  port: 8080,
  events: ['push'],
  origin: ['github', 'gitlab', 'coding'],
  path: '/i_am_a_webhook',
  cmd: 'cd /usr/project/test; git pull',
};
```
Then you can set any git server a webhook url direct to this path on your own server like:
```javascript
http://123.456.78.9:8080/i_am_a_webhook
```

### multi projects webhook
```javascript
{
  port: 8080,
  events: ['push'],
  origin: ['github', 'gitlab', 'coding'],
  project: [{
    path: '/project_dir_0',
    cmd: 'cd /project_path/project_name_0; git pull',
  }, {
    path: '/project_dir_1',
    cmd: 'cd /project_path/project_name_1; git pull',
  }, {
    path: '/project_dir_2',
    cmd: 'cd /project_path/project_name_2; git pull',
  }]
};
```
Addresses are:
```
http://123.456.78.9:8080/project_dir_0
http://123.456.78.9:8080/project_dir_1
http://123.456.78.9:8080/project_dir_2
```

## Author

> LLQ 2016
