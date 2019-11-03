Blockly.JavaScript['move'] = function (block) {
  let dropdown_direction = block.getFieldValue('direction');
  let code = 'game.move("' + dropdown_direction + '");\n';
  return code;
};

Blockly.JavaScript['pickup'] = function (block) {
  let code = 'game.pickup();\n';
  return code;
};

Blockly.JavaScript['shieldNearby'] = function (block) {
  let code = 'game.isShieldNearby()';
  return [code, Blockly.JavaScript.ORDER_EQUALITY];
};