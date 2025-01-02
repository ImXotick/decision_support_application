import numpy as np

# Calculate the unicriterion preference degrees
def promethee_uni_cal(x, p, c, f):
    """ x is the action performances array, p is the
    array with the preference parameters of all 
	criteria, c is the criteria min (0) or max (1) 
	optimization array, and f is the preference 
	function array for a specific criterion ('u' 
	for usual, 'us' for u-shape, 'vs' for v-shape, 
	'le' for level, 'li' for linear, and 'g' for 
	Gaussian)
    """
    uni = np.zeros((x.shape[0], x.shape[0]))
    for i in range(np.size(uni, 0)):
        for j in range(np.size(uni, 1)):
            if i == j:
                uni[i, j] = 0
            elif f == 'u':  # Usual preference function
                if x[j] - x[i] > 0:
                    uni[i, j] = 1
                else:
                    uni[i, j] = 0
            elif f == 'us': # U-shape preference function
                if x[j] - x[i] > x[0]:
                    uni[i, j] = 1
                elif x[j] - x[i] <= p[0]:
                    uni[i, j] = 0
            elif f == 'vs': # V-shape preference function
                if x[j] - x[i] > p[1]:
                    uni[i, j] = 1
                elif x[j] - x[i] <= 0:
                    uni[i, j] = 0
                else:
                    uni[i, j] = (x[j] - x[i]) / p[1]
            elif f == 'le': # Level preference function
                if x[j] - x[i] > p[1]:
                    uni[i, j] = 1
                elif x[j] - x[i] <= p[0]:
                    uni[i, j] = 0
                else:
                    uni[i, j] = 0.5
            elif f == 'li': # Linear preference function
                if x[j] - x[i] > p[1]:
                    uni[i, j] = 1
                elif x[j] - x[i] <= p[0]:
                    uni[i, j] = 0
                else:
                    uni[i, j] = ((x[j] - x[i]) - p[0]) / (p[1] - p[0])
            elif f == 'g':  # Gaussian preference function
                if x[j] - x[i] > 0:
                    uni[i, j] = 1 - math.exp(-(math.pow(x[j]
                        - x[i], 2) / (2 * p[1] ** 2)))
                else:
                    uni[i, j] = 0
    if c == 0:
        uni = uni
    elif c == 1:
        uni = uni.T
    # positive, negative and net flows
    pos_flows = np.sum(uni, 1) / (uni.shape[0] - 1)
    neg_flows = np.sum(uni, 0) / (uni.shape[0] - 1)
    net_flows = pos_flows - neg_flows
    return net_flows

def promethee(x, p, c, d, w):
    """ x is the action performances array, b is the
    array with the preference parameters of all 
	criteria, c is the criteria min (0) or max (1) 
	optimization array, d is the preference 
	function array ('u' for usual, 'us' for 
	u-shape, 'vs' for v-shape, 'le' for level, 
	'li' for linear, and 'g' for Gaussian), and w
    is the weights array
    """
    weighted_uni_net_flows = []
    total_net_flows = []
    for i in range(x.shape[1]):
        weighted_uni_net_flows.append(w[i] *
            promethee_uni_cal(x[:, i:i + 1], p[:,
            i:i + 1], c[i], d[i]))
	
    # print the weighted unicriterion preference
    # net flows
    for i in range(np.size(weighted_uni_net_flows, 1)):
        k = 0
        for j in range(np.size(weighted_uni_net_flows, 0)):
            k = k + round(weighted_uni_net_flows[j][i], 5)
        total_net_flows.append(k)
    return np.around(total_net_flows, decimals = 4)

# main function
def promethee_main(company_tables, prefParams, switches, prefFunc, weights):
    # final results
    final_net_flows = promethee(company_tables, prefParams, switches, prefFunc, weights)
    print("Global preference flows = ", final_net_flows)

    return final_net_flows


