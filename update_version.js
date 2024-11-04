// Import file system module
const fs = require('fs');

// Get version argument from command line
const version = process.argv[2];

if (!version) {
  console.error('Erro: Nenhuma versão fornecida.');
  console.error('Uso: node update_version.js <versão>');
  process.exit(1);
}

// Function to update a JSON file with new version
function updateFile(filePath, replacements) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Parse JSON content to retain formatting
    let jsonData = JSON.parse(content);

    // Apply each replacement
    replacements.forEach(({ key, value }) => {
      let keys = key.split('.');
      let obj = jsonData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in obj)) {
          console.error(`Chave '${keys[i]}' não encontrada em ${filePath}`);
          return;
        }
        obj = obj[keys[i]];
      }
      if (keys[keys.length - 1] in obj) {
        obj[keys[keys.length - 1]] = value;
      } else {
        console.error(`Chave '${keys[keys.length - 1]}' não encontrada em ${filePath}`);
      }
    });

    // Write updated JSON content back to file
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
  } catch (error) {
    console.error(`Erro ao atualizar o arquivo ${filePath}:`, error);
  }
}

// Update system.json
updateFile('system.json', [
  { key: 'version', value: version },
  { key: 'manifest', value: `https://raw.githubusercontent.com/coppolaop/CordelRPG/${version}/system.json` },
  { key: 'download', value: `https://github.com/coppolaop/CordelRPG/archive/${version}.zip` }
]);

// Update package.json
updateFile('package.json', [
  { key: 'version', value: version }
]);

// Update package-lock.json
updateFile('package-lock.json', [
  { key: 'version', value: version },
  { key: 'packages..version', value: version }
]);

console.log(`Arquivos atualizados com a versão ${version}.`);
