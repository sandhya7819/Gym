module.exports = {
    apps: [
        {
            name: "gymguide-server",
            script: "./server/index.js",
            instances: 1,
            autorestart: true,
            watch: false,
            env: {
                NODE_ENV: "production",
                PORT: 5000
                // Add other env vars here or use .env file
            },
        },
        {
            name: "gymguide-client",
            script: "npm",
            args: "start",
            cwd: "./client",
            instances: 1,
            autorestart: true,
            watch: false,
            env: {
                NODE_ENV: "production",
                PORT: 3000
            },
        },
    ],
};
