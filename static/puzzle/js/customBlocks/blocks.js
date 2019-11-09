Blockly.Blocks['move'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Gehe nach")
      .appendField(new Blockly.FieldDropdown([
        ["Unten", "down"],
        ["Rechts", "right"],
        ["Oben", "up"]
      ]), "direction");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('custom_game_blocks');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['pickup'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Hebe Schild auf");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('custom_game_blocks');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['shieldNearby'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Schild neben mir?");
    this.setOutput(true, "Boolean");
    this.setStyle('custom_control_blocks');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};