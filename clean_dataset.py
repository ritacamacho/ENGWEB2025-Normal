import json
from typing import Dict, Any, List


def normalize_edition(edition_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Normalize a single edition entry.
    """
    return {
        "_id": edition_data.get("id"),
        "anoEdicao": edition_data.get("anoEdição"),
        "organizacao": edition_data.get("organizacao", ""),
        "musicas": [
            {
                "id": m.get("id"),
                "titulo": m.get("título"),
                "pais": m.get("país"),
                "link": m.get("link"),
                "compositor": m.get("compositor"),
                "interprete": m.get("intérprete"),
                "letra": m.get("letra", None)
            }
            for m in edition_data.get("musicas", [])
        ]
    }


def main():
    try:
        with open("dataset.json", "r", encoding="utf-8") as infile:
            raw_data = json.load(infile)

        cleaned_data: List[Dict[str, Any]] = [
            normalize_edition(ed) for ed in raw_data.values()
        ]

        with open("new_dataset.json", "w", encoding="utf-8") as outfile:
            json.dump(cleaned_data, outfile, ensure_ascii=False, indent=2)

        print("dataset.json written successfully.")

    except (json.JSONDecodeError, FileNotFoundError) as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()