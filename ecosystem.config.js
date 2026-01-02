module.exports = {
    apps: [
        {
            name: "gymguide-server",
            cwd: "./server",
            script: "index.js",
            instances: 1,
            autorestart: true,
            watch: false,
            env: {
                NODE_ENV: "production",
                PORT: 5000
            }
        },
        {
            name: "gymguide-client",
            cwd: "./client",
            script: "npm",
            args: "start",
            instances: 1,
            autorestart: true,
            watch: false,
            env: {
                NODE_ENV: "production",
                PORT: 3000
            }
        }
    ]
};
