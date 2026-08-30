const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootWorkspaceDir = __dirname;
const productionTargetBuildDir = path.join(rootWorkspaceDir, 'dist_production_package');

try {
    if (fs.existsSync(productionTargetBuildDir)) {
        fs.rmSync(productionTargetBuildDir, { recursive: true, force: true });
    }
    fs.mkdirSync(productionTargetBuildDir);

    console.log("⚛️ Compiling Frontend...");
    execSync('npm install && npm run build', { cwd: path.join(rootWorkspaceDir, 'frontend'), stdio: 'inherit' });
    
    // 💡 FIXED: Changed folder name from 'public_client_terminal' to 'public' to match your server.js asset router pathing
    fs.cpSync(path.join(rootWorkspaceDir, 'frontend', 'dist'), path.join(productionTargetBuildDir, 'public'), { recursive: true });

    console.log("📦 Bundling Backend...");
    fs.cpSync(path.join(rootWorkspaceDir, 'backend'), path.join(productionTargetBuildDir, 'server_core'), {
        recursive: true,
        filter: (src) => !src.includes('node_modules') && !src.includes('.env')
    });

    console.log("✅ Production package ready inside /dist_production_package");
} catch (err) {
    console.error("❌ Build failed:", err.message);
}
