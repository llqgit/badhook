module.exports = {
  path: '',
  cmd: '',
  port: 8080,
  password: '',
  events: ['push'],
  origin: ['github', 'gitlab', 'coding'],
  project: [{
    path: '/test_project',
    cmd: 'cd /project_dir/test_project_name ; git pull'
  }, {
    path: '/test_project_1',
    cmd: 'cd /project_dir/test_project_name_1 ; git pull'
  }]
};
