module.exports = {
  path: '',
  cmd: '',
  port: 8080,
  events: ['push'],
  origin: ['github', 'gitlab', 'coding'],
  project: [{
    path: '/test_project',
    cmd: 'cd /project_dir/test_project_name ; git pull'
  }]
};
