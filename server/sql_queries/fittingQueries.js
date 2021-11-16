const fittingQueries = {
  oneFitting: `select CONCAT('F_' , id) as id, grade, heat_number as heat_no, flength as length, thickness as wall_thickness from fitting join fitting_shared_info using (fitting_shared_id) join fitting_heat using (fitting_heat_id) where id = $1;`,
};

module.exports = fittingQueries;
