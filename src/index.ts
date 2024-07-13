import express from "express";
import config from './config'
import loaders from './loaders'

async function startServer() {
    const app = express();

    await loaders({ expressApp: app })

    app.listen(config.port, () => {
        console.log(`\n    🛡️  Server listening on port: ${config.port} 🛡️\n`)
    });
}

startServer();
