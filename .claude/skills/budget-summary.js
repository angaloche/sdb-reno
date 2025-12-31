/**
 * Skill: budget-summary
 *
 * Affiche un résumé du budget du projet SDB
 * Usage: /budget-summary
 */

const fs = require('fs');
const path = require('path');

module.exports = async function budgetSummary() {
  try {
    const projectFile = path.join(process.cwd(), 'Projet-Renovation-SDB.md');
    const content = fs.readFileSync(projectFile, 'utf-8');

    // Extract budget information
    const budgetMatch = content.match(/## 💰 BUDGET ESTIMÉ\s+([\s\S]*?)(?=\n##)/);

    if (!budgetMatch) {
      console.log("❌ Budget non trouvé dans le fichier");
      return;
    }

    console.log("\n💰 ===============================");
    console.log("   RÉSUMÉ BUDGET RÉNOVATION SDB");
    console.log("===============================\n");

    // Parse the budget table
    const lines = budgetMatch[1].split('\n').filter(l => l.trim());

    for (const line of lines) {
      if (line.includes('|') && !line.includes('---')) {
        const cells = line.split('|').map(c => c.trim()).filter(c => c);
        if (cells.length >= 2 && !cells[0].includes('Catégorie')) {
          const category = cells[0].replace(/\*/g, '');
          const amount = cells[1].replace(/\*/g, '');

          if (category && amount && amount !== '-') {
            if (category.includes('TOTAL') || category.includes('SOUS-TOTAL')) {
              console.log(`\n${category}: ${amount}`);
            } else {
              console.log(`  ${category}: ${amount}`);
            }
          }
        }
      }
    }

    console.log("\n===============================");
    console.log("🌐 Voir en ligne: https://angaloche.github.io/sdb-reno/\n");

  } catch (error) {
    console.error("❌ Erreur:", error.message);
    throw error;
  }
};
