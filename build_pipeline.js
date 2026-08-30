const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootWorkspaceDir = __dirname;
const productionTargetBuildDir = path.join(rootWorkspaceDir, 'dist_production_package');
const serverCoreDir = path.join(productionTargetBuildDir, 'server_core');

try {
    if (fs.existsSync(productionTargetBuildDir)) {
        fs.rmSync(productionTargetBuildDir, { recursive: true, force: true });
    }
    fs.mkdirSync(productionTargetBuildDir);

    console.log("⚛️ Compiling Frontend...");
    execSync('npm install && npm run build', { cwd: path.join(rootWorkspaceDir, 'frontend'), stdio: 'inherit' });
    fs.cpSync(path.join(rootWorkspaceDir, 'frontend', 'dist'), path.join(productionTargetBuildDir, 'public'), { recursive: true });

    console.log("📦 Bundling Backend Code...");
    fs.cpSync(path.join(rootWorkspaceDir, 'backend'), serverCoreDir, {
        recursive: true,
        filter: (src) => !src.includes('node_modules') && !src.includes('.env')
    });

    // 💡 FIX: Copy package configuration files into the bundle output directory
    console.log("📄 Copying Package Manifests...");
    fs.copyFileSync(path.join(rootWorkspaceDir, 'backend', 'package.json'), path.join(serverCoreDir, 'package.json'));
    if (fs.existsSync(path.join(rootWorkspaceDir, 'backend', 'package-lock.json'))) {
        fs.copyFileSync(path.join(rootWorkspaceDir, 'backend', 'package-lock.json'), path.join(serverCoreDir, 'package-lock.json'));
    }

    // 💡 FIX: Download and link node modules directly inside production workspace bundle
    console.log("⚙️ Installing Server Production Dependencies...");
    execSync('npm install --production', { cwd: serverCoreDir, stdio: 'inherit' });

    console.log("✅ Production package ready inside /dist_production_package");
} catch (err) {
    console.error("❌ Build failed:", err.message);
    process.exit(1); // Ensures Render flags a broken build process early
}
