/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class CronicasActor extends Actor {

  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    this._evaluateAttributes();

    if (game.settings.get("CordelRPG", "autoCalcExp")) {
      //this._evaluateExperience();
    }

    if (game.settings.get("CordelRPG", "autoCalcPen")) {
      //this._evaluatePenalties();
    }
  }

  /**
   * Calculate Character attributes according to his actual points and penalities
   */
  _evaluateAttributes() {
    const data = this.data.data;

    for (let [key, atributo] of Object.entries(data.atributos)) {
      atributo.total = atributo.valor + atributo.outros - data.penalidades.ferimento - data.penalidades.cansaco;
    }
  }

  /**
   * Calculate Character spent experience according to his actual attributes and specializations spent points
   */
  _evaluateExperience() {
    const data = this.data.data;
    data.pontos.experiencia.gasta = 0;
    for (let [key, atributo] of Object.entries(data.atributos)) {
      data.pontos.experiencia.gasta += ((atributo.valor - 2) * 30);
      for (let [key, especializacao] of Object.entries(atributo.especializacoes)) {
        data.pontos.experiencia.gasta += (especializacao.valor * 10);
      }
    }
    data.pontos.experiencia.resto = data.pontos.experiencia.valor - data.pontos.experiencia.gasta;
  }

  /**
   * Prepare Character penalties according to his actual vigor
   */
  _evaluatePenalties() {
    const data = this.data.data;
    //Fisico (ferimento)
    let calculoVigor = (data.combate.fisico.vigor * 3) / ((data.combate.fisico.vigor * 2) + data.combate.fisico.vigorAtual);
    if (calculoVigor < 0 || calculoVigor == Infinity) {
      data.penalidades.ferimento = 3;
    } else if (calculoVigor < 1.5) {
      data.penalidades.ferimento = 0;
    } else if (calculoVigor < 3) {
      data.penalidades.ferimento = 1;
    } else {
      data.penalidades.ferimento = 2;
    }
    //Mental (frustracao)
    calculoVigor = (data.combate.mental.vigor * 3) / ((data.combate.mental.vigor * 2) + data.combate.mental.vigorAtual);
    if (calculoVigor < 0 || calculoVigor == Infinity) {
      data.penalidades.frustracao = 3;
    } else if (calculoVigor < 1.5) {
      data.penalidades.frustracao = 0;
    } else if (calculoVigor < 3) {
      data.penalidades.frustracao = 1;
    } else {
      data.penalidades.frustracao = 2;
    }
    //Social (hesitacao)
    calculoVigor = (data.combate.social.vigor * 3) / ((data.combate.social.vigor * 2) + data.combate.social.vigorAtual);
    if (calculoVigor < 0 || calculoVigor == Infinity) {
      data.penalidades.hesitacao = 3;
    } else if (calculoVigor < 1.5) {
      data.penalidades.hesitacao = 0;
    } else if (calculoVigor < 3) {
      data.penalidades.hesitacao = 1;
    } else {
      data.penalidades.hesitacao = 2;
    }
  }
}