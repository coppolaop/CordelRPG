
/*Class to configure system settings*/
export const SystemSettings = function () {

  /**
   * Register diagonal movement rule setting
   */
  game.settings.register("CordelRPG", "diagonalMovement", {
    name: game.i18n.localize("CordelRPG.settings.diagonalMovement.name"),
    hint: game.i18n.localize("CordelRPG.settings.diagonalMovement.hint"),
    scope: "world",
    config: true,
    default: "MANHATTAN",
    type: String,
    choices: {
      "MANHATTAN": game.i18n.localize("CordelRPG.settings.diagonalMovement.padrao"),
      "EQUIDISTANT": game.i18n.localize("CordelRPG.settings.diagonalMovement.equidistant"),
      "PATHFINDER": game.i18n.localize("CordelRPG.settings.diagonalMovement.pathfinder"),
    },
    onChange: rule => canvas.grid.diagonalRule = rule
  });

  /**
   * Base character movement
   */
  game.settings.register("CordelRPG", "baseMovement", {
    name: game.i18n.localize("CordelRPG.settings.baseMovement.name"),
    hint: game.i18n.localize("CordelRPG.settings.baseMovement.hint"),
    scope: "world",
    config: true,
    default: 4,
    type: Number
  });

  /**
   * Option to disable automatic calculation of spent experience.
   */
  game.settings.register("CordelRPG", "autoCalcExp", {
    name: game.i18n.localize("CordelRPG.settings.autoCalcExp.name"),
    hint: game.i18n.localize("CordelRPG.settings.autoCalcExp.hint"),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });
}
