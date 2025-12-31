/**
 * Skill: sync-and-push
 *
 * Synchronise automatiquement et push les changements vers GitHub
 * Usage: /sync-and-push "message de commit"
 */

const { execSync } = require('child_process');
const path = require('path');

module.exports = async function syncAndPush(args) {
  const commitMessage = args || "Mise à jour projet SDB";

  try {
    // Check git status
    console.log("📊 Vérification des changements...");
    const status = execSync('git status --porcelain', { encoding: 'utf-8' });

    if (!status.trim()) {
      console.log("✅ Aucun changement à commit");
      return;
    }

    console.log("📝 Fichiers modifiés:");
    console.log(status);

    // Add, commit and push
    console.log("\n📦 Commit des changements...");
    execSync('git add .', { stdio: 'inherit' });

    const fullMessage = `${commitMessage}

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 (1M context) <noreply@anthropic.com>`;

    execSync(`git commit -m "${fullMessage}"`, { stdio: 'inherit' });

    console.log("\n🚀 Push vers GitHub...");
    execSync('git push', { stdio: 'inherit' });

    console.log("\n✅ Synchronisation terminée!");
    console.log("🌐 Voir: https://angaloche.github.io/sdb-reno/");

  } catch (error) {
    console.error("❌ Erreur:", error.message);
    throw error;
  }
};
