export interface ReviewInterface {
  review_id: number | null,
  nom: string,
  prenom: string,
  texte: string, 
  note: number,
  isAnonym: boolean
}