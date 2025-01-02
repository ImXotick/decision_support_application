import numpy as np
import scipy.sparse.linalg as sc
import random

# generate random colors
def generate_colors(num_colors):
    colors = []
    for _ in range(num_colors):
        color = "#{:06x}".format(random.randint(0, 0xFFFFFF))
        colors.append(color)
    return colors

# convert strings to numeric values
def convert_to_numeric(value):
    if '/' in value:
        numerator, denominator = value.split('/')
        return float(numerator) / float(denominator)
    else:
        return int(value)

# normalized column sum method
def ahp_norm(x):
    """ x is the pairwise comparison matrix for the 
    criteria or the alternatives
    """
    k = np.array(sum(x, 0))
    z = np.array([[round(x[i, j] / k[j], 3) 
        for j in range(x.shape[1])]
        for i in range(x.shape[0])])
    return z

# geometric mean method
def ahp_geomean(x):
    """ x is the pairwise comparison matrix for the
    criteria or the alternatives
    """
    z = [1] * x.shape[0]
    for i in range(x.shape[0]):
        for j in range(x.shape[1]):
            z[i] = z[i] * x[i][j]
        z[i] = pow(z[i], (1 / x.shape[0]))
    return z

# AHP method: it calls the other functions
def ahp(PCM, PCcriteria, m, n, c):
    """ PCM is the pairwise comparison matrix for the
    alternatives,  PCcriteria is the pairwise comparison 
    matrix for the criteria, m is the number of the 
    alternatives, n is the number of the criteria, and 
    c is the method to estimate a priority vector (1 for 
    eigenvector, 2 for normalized column sum, and 3 for
    geometric mean)
    """
    # calculate the priority vector of criteria
    if c == 1: # eigenvector
        val, vec = sc.eigs(PCcriteria, k = 1, which = 'LM')
        eigcriteria = np.real(vec)
        w = eigcriteria / sum(eigcriteria)
        w = np.array(w).ravel()
    elif c == 2: # normalized column sum
        normPCcriteria = ahp_norm(PCcriteria)
        w = np.array(sum(normPCcriteria, 1) / n)
    else: # geometric mean
        GMcriteria = ahp_geomean(PCcriteria)
        w = GMcriteria / sum(GMcriteria)
    # calculate the local priority vectors for the 
    # alternatives
    S = []
    for i in range(n):
        if c == 1: # eigenvector
            val, vec = sc.eigs(PCM[i * m:i * m + m, 0:m],
                k = 1, which = 'LM')
            eigalter = np.real(vec)
            s = eigalter / sum(eigalter)
            s = np.array(s).ravel()
        elif c == 2: # normalized column sum
            normPCM = ahp_norm(PCM[i*m:i*m+m,0:m])
            s = np.array(sum(normPCM, 1) / m)
        else: # geometric mean
            GMalternatives = ahp_geomean(PCM[i*m:i*m+m,0:m])
            s = GMalternatives / sum(GMalternatives)
        S.append(s)
    S = np.transpose(S)

    # calculate the global priority vector for the
    # alternatives
    v = S.dot(w.T)

    return v

# main function
def ahp_main(criteria, companies, converted_tables, a, b, c):
    # the number of the alternatives
    m = len(companies)
    #print("The number of the alternatives: ", m)
    # the number of the criteria
    n = len(criteria)
    #print("The number of the criteria: ", n)
    
    # random indices for consistency checking
    RI = [0, 0, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41,
        1.45, 1.49]
    
    # pairwise comparison matrix of the criteria
    PCcriteria = np.array(converted_tables.pop(0))

    # consistency check for pairwise comparison matrix of
    # the criteria
    lambdamax = np.amax(np.linalg.eigvals(PCcriteria).real)
    CI = (lambdamax - n) / (n - 1)
    CR = CI / RI[n - 1]
    """
    print("Inconsistency index of the criteria: ", CR)
    if CR > 0.1:
        print("The pairwise comparison matrix of the criteria is inconsistent")
    """
    allPCM = np.vstack((converted_tables))

    # consistency check for pairwise comparison matrix of
    # the alternatives
    for i in range(n):
        lambdamax = max(np.linalg.eigvals(allPCM[i * m:i 
            * m + m, 0:m]).real)
        CI = (lambdamax - m) / (m - 1)
        CR = CI / RI[m - 1]
        """
        print("Inconsistency index of the alternatives for"
			" criterion ", (i + 1), ": ", CR)
        
        if CR > 0.1:
            print("The pairwise comparison matrix of the"
                "alternatives for criterion ", (i + 1), 
                "is inconsistent")
        """

    # call ahp method
    scores = ahp(allPCM, PCcriteria, m, n, c)

    scores = [float(score) for score in scores]

    # print results
    #print("Global priorities = ", scores)

    results = []
    for i in range(len(companies)):
        results.append({
            'name': companies[i]['label'],
            'flows': {
                'Global priorities': scores[i],
            }
        })

    return results