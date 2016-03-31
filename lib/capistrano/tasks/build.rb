desc 'npm install dependencies'
task :npm_install do
  on roles(:all) do
    execute :npm, :install
    info 'npm install is executed'
  end
end

desc 'compile production assets'
task :uptime do
  on roles(:all) do
    execute :gulp, :compile
    info 'Gulp compile is executed'
  end
end
