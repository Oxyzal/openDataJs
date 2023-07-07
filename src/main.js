const fs = require('fs');
const csv = require('csv-parser');


function updatedDataOnCsv (){
    const fichierCSV = '../files/studen.csv';
    const donnees = [];
    let sommeNotes = 0;
    let nombreNotes = 0;
    fs.createReadStream(fichierCSV)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
    const note = Math.floor(Math.random() * 20) + 1;
    row.Note = note.toString(); 
    donnees.push(row);

    sommeNotes += note;
    nombreNotes++;
  })
  .on('end', () => {

    const moyenne = sommeNotes / nombreNotes;
    console.log('Moyenne des notes:', moyenne);

    const header = Object.keys(donnees[0]).join(';') + '\n'; // Récupérer l'en-tête du fichier CSV

    const csvData = donnees.map((row) => Object.values(row).join(';')).join('\n');
    const updatedData = header + csvData + '\n' + moyenne; // Combiner l'en-tête et les données mises à jour

    fs.writeFile(fichierCSV, updatedData, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Le fichier CSV a été mis à jour avec succès.');
    });
  });

}

module.exports = updatedDataOnCsv();