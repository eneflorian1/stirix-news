from pytrends.request import TrendReq
import pandas as pd
import json
import os
import sys
from datetime import datetime

# Setăm codificarea pentru output
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

def search_trends():
    try:
        pytrends = TrendReq(hl='en-US', tz=360)
        trending_searches_df = pytrends.trending_searches(pn='romania')
        trending_searches_df.columns = ['Trends']
        return {
            "trends": trending_searches_df['Trends'].tolist(),
            "lastUpdate": datetime.now().isoformat()
        }
    except Exception as e:
        print(f"Eroare la extragerea trendurilor: {str(e)}", file=sys.stderr)
        return None

def main():
    json_path = 'src/data/trends.json'
    
    data = search_trends()
    
    if data:
        try:
            os.makedirs(os.path.dirname(json_path), exist_ok=True)
            
            with open(json_path, 'w', encoding='utf-8') as json_file:
                json.dump(data, json_file, ensure_ascii=False, indent=2)
            
            print(f"Trenduri salvate in {json_path}")
        except Exception as e:
            print(f"Eroare la salvarea in JSON: {str(e)}", file=sys.stderr)
    else:
        print("Nu s-au putut extrage trendurile", file=sys.stderr)

if __name__ == "__main__":
    main() 