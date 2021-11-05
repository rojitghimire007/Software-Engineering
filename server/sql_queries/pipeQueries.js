const pipeQueries = {
  addPipeSharedInfo:
    'INSERT INTO pipeSharedInfo(pipeSharedId, coat, grade, pipeHeatId, pipeRefId, poNumber, materialType, createdBy ) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
  addPipeHeat: 'INSERT INTO pipeheat(heatnumber, manufacture) VALUES($1, $2)',
  addPipeCoat: 'INSERT INTO pipe_coat(coat, color) VALUES($1, $2)',
  addPipeGrade: 'INSERT INTO pipe_grade(grade, strength) VALUES($1, $2)',
  addPurchaseNumber:
    'INSERT INTO purchase_number(poNumber, manufacture) VALUES($1, $2)',
  addPipe:
    'INSERT INTO pipe(id, pipeSharedId, plength, updatedBy, plocation, coilNumber, comment, isVoid, isUsed, parent) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
};

module.exports = pipeQueries;
