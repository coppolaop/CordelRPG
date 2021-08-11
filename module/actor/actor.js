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

    this._evaluateHealth();
    this._evaluateAttributes();
  }

  /**
   * Calculate Character attributes according to his actual points and penalities
   */
  _evaluateAttributes() {
    const data = this.data.data;
    for (let [key, atributo] of Object.entries(data.atributos)) {
      atributo.total = atributo.valor + atributo.outros - data.penalidades.ferimento;
    }
  }

  /**
   * Prepare Character health bar and suffering status
   */
  _evaluateHealth() {
    const data = this.data.data;
    console.log(data)
    const parrudice = data.atributos.parrudice.valor;
    data.attributes.vigor.max = 1 + parrudice;

    if (data.attributes.vigor.value > data.attributes.vigor.max) {
      data.attributes.vigor.value = data.attributes.vigor.max;
    }

    if (data.penalidades.ferimento < 0) {
      data.penalidades.ferimento = 0;
    }

    if (data.penalidades.ferimento == data.penalidades.danoRecebido) {
      data.penalidades.ferimento = data.attributes.vigor.max - data.attributes.vigor.value;
      data.penalidades.danoRecebido = data.attributes.vigor.max - data.attributes.vigor.value;
      data.attributes.vigor.value = data.attributes.vigor.max - data.penalidades.ferimento;
    } else {
      data.attributes.vigor.value = data.attributes.vigor.max - data.penalidades.ferimento;
      data.penalidades.danoRecebido = data.attributes.vigor.max - data.attributes.vigor.value;
      data.penalidades.ferimento = data.attributes.vigor.max - data.attributes.vigor.value;
    }

    this.data.update({ data: data })
  }
}