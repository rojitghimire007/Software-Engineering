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
  allPipes:
    'select id, diameter, schedule, grade, isvoid as void, updatedon as date, updatedby as inspector, plocation as location, coilnumber as coil_no, heatnumber as heat_no, thickness as wall_thickness, plength as length, coat as coating, color as coating_color, manufacture as manufacturer, materialtype as material_type, ponumber as po_number, comment as comments from pipe join pipesharedinfo using (pipeSharedId) join pipeheat using (pipeheatid) join piperef using (piperefid) join pipecoat using(coat);',
  updatePipe:
    'UPDATE pipe SET id = $1, plength = $2, updatedBy = $3, plocation = $4, coilNumber = $5, comment = $6, isVoid = $7, updatedon = $8 WHERE id = $9',
  updatePipeSharedInfo:
    'UPDATE pipesharedinfo SET coat = $1, grade = $2, ponumber = $3, materialtype = $4 where pipesharedid = $5',
};

module.exports = pipeQueries;
