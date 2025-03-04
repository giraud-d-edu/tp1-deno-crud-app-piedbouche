import { Acteur } from "../models/acteurs.model.ts";

export class ActeurRepository {
  private acteurs: Acteur[] = [];
  private currentId = 1;

  getAll(): Acteur[] {
    return this.acteurs;
  }

  getById(id: number): Acteur | undefined {
    return this.acteurs.find(acteur => acteur.id === id);
  }

  create(acteur: Acteur): Acteur {
    acteur.id = this.currentId++;
    this.acteurs.push(acteur);
    return acteur;
  }

  update(id: number, acteurData: Partial<Acteur>): Acteur | undefined {
    const acteur = this.getById(id);
    if (!acteur) return undefined;
    Object.assign(acteur, acteurData);
    return acteur;
  }

  delete(id: number): boolean {
    const index = this.acteurs.findIndex(acteur => acteur.id === id);
    if (index === -1) return false;
    this.acteurs.splice(index, 1);
    return true;
  }
}