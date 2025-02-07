import request.request as req

def add_review(data):
    print(data, flush=True)
    if (not "nom" in data or data["nom"] == ""):
        return False
  
    if (not "prenom" in data or data["prenom"] == ""):
        return False
    
    if (not "texte" in data or data["texte"] == ""):
        return False

    if (not "note" in data or data["note"] is None):
        return False

    if (not "isAnonym" in data):
       data["isAnonym"] = int(data["isAnonym"])

    if ("review_id" in data and data["review_id"]):
      requete = f"UPDATE review SET nom='{data['nom']}', prenom='{data['prenom']}', texte='{data['texte']}', note={data['note']}, isAnonym={data['isAnonym']} WHERE review_id = {data['review_id']}"
      req.insert_in_db(requete)
      id = data['review_id']
    else:
      requete = "INSERT INTO review (nom, prenom, texte, note, isAnonym) VALUES (?, ?, ?, ?,?);"
      id = req.insert_in_db(requete, (data["nom"],data["prenom"], data["texte"], data["note"], data["isAnonym"]))

    return id

def get_all_review():
    json = req.select_from_db("SELECT * FROM review")
    
    return json

def get_review(id):
    if (not id):
        return False

    json = req.select_from_db("SELECT * FROM review WHERE review_id = ?", (id,))

    if len(json) > 0:
        return json[0]
    else:
        return []

def delete_review(id):
    if (not id):
        return False

    req.delete_from_db("DELETE FROM review WHERE review_id = ?", (id,))

    return True