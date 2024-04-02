module.exports = {
    apps: [
        {
            name: "spurtcommerce-api",
            cwd: './api',
            script: "./dist/src/app.js",
            env: {
                "PORT": 8000,
            }
        },
        {
            name: "spurtcommerce-fe",
            cwd: './frontend',
            script: 'http-server',
            env: {
                "PORT": 3000,
            }
        }
    ]
}