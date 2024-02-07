module.exports = {
  apps: [{
    name: "Mingle",
    script: "dist/server.js",
    env_producation: { NODE_ENV: "production" }
  }]
}
