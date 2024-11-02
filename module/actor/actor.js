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
    for (let [key, atributo] of Object.entries(this.system.atributos)) {
      atributo.total = atributo.valor + atributo.outros - this.system.penalidades.ferimento;
    }
  }

  /**
   * Prepare Character health bar and suffering status
   */
  _evaluateHealth() {
    const parrudice = this.system.atributos.parrudice.valor;

    if (this.system.attributes.vigor.max != (1 + parrudice)) {
      this.system.attributes.vigor.value -= this.system.attributes.vigor.max - (1 + parrudice);
    }
    this.system.attributes.vigor.max = 1 + parrudice;

    if (this.system.attributes.vigor.value > this.system.attributes.vigor.max) {
      this.system.attributes.vigor.value = this.system.attributes.vigor.max;
    }

    if (this.system.penalidades.ferimento < 0) {
      this.system.penalidades.ferimento = 0;
    }

    if (this.system.penalidades.ferimento == this.system.penalidades.danoRecebido) {
      this.system.penalidades.ferimento = this.system.attributes.vigor.max - this.system.attributes.vigor.value;
      this.system.penalidades.danoRecebido = this.system.attributes.vigor.max - this.system.attributes.vigor.value;
    } else {
      this.system.attributes.vigor.value = this.system.attributes.vigor.max - this.system.penalidades.ferimento;
      this.system.penalidades.danoRecebido = this.system.attributes.vigor.max - this.system.attributes.vigor.value;
      this.system.penalidades.ferimento = this.system.attributes.vigor.max - this.system.attributes.vigor.value;
    }
  }
}