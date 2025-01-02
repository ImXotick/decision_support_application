import scipy.sparse.linalg as sc
import numpy as np
from .ahp import ahp_main, convert_to_numeric
from .topsis import topsis
from .promethee import promethee_main

def calculate_ahp(data):
  criteria = data['criteria']
  companies = data['companies']
  tables = data['tables']

  converted_tables = []
  for table in tables:
    converted_table = []
    for row in table:
      converted_row = [convert_to_numeric(value) for value in row]
      converted_table.append(converted_row)
    converted_tables.append(np.array(converted_table))

  results = ahp_main(criteria, companies, converted_tables, 'n', 'y', 1)

  return results

def calculate_wsm(data):
    # Extract the data from the dictionary
    weights = data['weights']
    tables = data['tables']
    companies = data['companies']

    # Multiply each value in the table by the corresponding weight
    new_values = []
    for i in range(len(tables)):
        for j in range(len(tables[i])):
            tables[i][j] = tables[i][j] * weights[j]
        new_values.append(tables[i])

    # Calculate the sum of the values for each company
    sums = []
    for i in range(len(new_values)):
        sums.append(sum(new_values[i]))

    # Create a dictionary with the company name and the sum of the values
    results = []
    for i in range(len(sums)):
        results.append({
            'name': companies[i]['label'],
            'flows': {
                'Weighted sum calculation': sums[i]
            }
        })
 
    print(results)
    return results
        
def calculate_topsis(data):
    weights = np.array(data['weights'])
    tables = np.array(data['tables'])
    companies = np.array(data['companies'])
    switches = np.array(data['switches'])
    
    closeness_coef, ideal_solution, not_ideal_solution = topsis(tables, weights, 'v', 'm', 'y')

    closeness_coef = [float(score) for score in closeness_coef]  
    results = []   

    for i in range(len(companies)):
        results.append({
            'name': companies[i]['label'],
            'flows': {
                'Closeness coefficient': closeness_coef[i],
                'Distance from ideal solution': ideal_solution[i],          
                'Distance from not ideal solution': not_ideal_solution[i]
            }
        }) 

    return results

def calculate_promethee(data):
    # Extract the data from the dictionary
    weights = np.array(data['weights'])
    switches = data['switches']
    companies = data['companies']
    criteria = data['criteria']
    prefParams = np.array(data['prefParams'])
    prefFunc = np.array(data['prefFunc'])

    # We turn switches to 1s and 0s
    switches = np.array([1 if switch else 0 for switch in switches])
    criteria_keys = [criterion['key'] for criterion in criteria]

    # Create the company tables, one value for each company for each criterion
    company_tables = []
    for company in companies:
        company_values = [company.get(key, None) for key in criteria_keys]
        company_tables.append(company_values)
        print(company_tables)
 
    # Data arrays
    company_tables = np.array(company_tables)
    result_data = promethee_main(company_tables, prefParams, switches, prefFunc, weights)

    results = []
    for i in range(len(companies)):
        results.append({
            'name': companies[i]['label'],
            'flows': {
                'Scores': result_data[i]
            }
        })

    return results