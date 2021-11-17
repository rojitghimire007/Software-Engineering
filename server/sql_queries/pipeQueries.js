const pipeQueries = {
  addPipeSharedInfo:
    'INSERT INTO pipe_shared_info(pipe_shared_id, coat, grade, pipe_heat_id, pipe_ref_id, po_number, material_type, created_by ) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
  addPipeHeat: 'INSERT INTO pipe_heat(heat_number, manufacture) VALUES($1, $2)',
  addPipeCoat: 'INSERT INTO pipe_coat(coat, color) VALUES($1, $2)',
  addPipeGrade: 'INSERT INTO pipe_grade(grade, strength) VALUES($1, $2)',
  addPurchaseNumber:
    'INSERT INTO purchase_number(po_number, manufacture) VALUES($1, $2)',
  addPipe:
    'INSERT INTO pipe(id, pipe_shared_id, plength, updated_by, plocation, coil_number, comment, is_void, is_used) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
  allPipes:
    'SELECT id, diameter, schedule, grade, is_void AS void, updated_on AS date, updated_by AS inspector, plocation AS location, coil_number AS coil_no, heat_number AS heat_no, thickness AS wall_thickness, plength AS length, coat AS coating, color AS coating_color, manufacture AS manufacturer, material_type, po_number, comment AS comments FROM pipe JOIN pipe_shared_info USING (pipe_shared_id) JOIN pipe_heat USING (pipe_heat_id) JOIN pipe_ref USING (pipe_ref_id) JOIN pipe_coat USING (coat);',
  onePipe:
    'SELECT id, diameter, schedule, grade, is_void AS void, updated_on AS date, updated_by AS inspector, plocation AS location, coil_number AS coil_no, heat_number AS heat_no, thickness AS wall_thickness, plength AS length, coat AS coating, color AS coating_color, manufacture AS manufacturer, material_type, po_number, comment AS comments FROM pipe JOIN pipe_shared_info USING (pipe_shared_id) JOIN pipe_heat USING (pipe_heat_id) JOIN pipe_ref USING (pipe_ref_id) JOIN pipe_coat USING (coat) where id = $1;',
  updatePipe:
    'UPDATE pipe SET id = $1, plength = $2, updated_by = $3, plocation = $4, coil_number = $5, comment = $6, is_void = $7, updated_on = $8 WHERE id = $9',
  updatePipeSharedInfo:
    'UPDATE pipe_shared_info SET coat = $1, grade = $2, po_number = $3, material_type = $4 WHERE pipe_shared_id = $5',
};

module.exports = pipeQueries;
