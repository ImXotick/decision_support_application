import numpy as np

#Topsis calc
def topsis_norm(x, y):
    if y == 'v':
        k = np.array(np.cumsum(x**2, 0))
        #print("k", k)
        z = np.array([[round(x[i, j] / np.sqrt(k[x.shape[0] - 1,
            j]), 3) for j in range(x.shape[1])]
            for i in range(x.shape[0])])
        #print("The normalized matrix is", z)
        return z
    else:
        yy = []
        for i in range(x.shape[1]):
            yy.append(np.amax(x[:, i:i + 1])) #Maybe change to np.amax
            k = np.array(yy)
        z = np.array([[round(x[i, j] / k[j], 3)
            for j in range(x.shape[1])]
            for i in range(x.shape[0])])
        return z 
    
def topsis_mul_w(r, t):
    z = np.array([[round(t[i, j] * r[j], 3)
        for j in range(t.shape[1])]
        for i in range(t.shape[0])])
    return z

def topsis_zenith_nadir(x, y):
    if y == 'm':
        bb = []
        cc = []
        for i in range(x.shape[1]):
            bb.append(np.amax(x[:, i:i + 1]))
            b = np.array(bb)
            cc.append(np.amin(x[:, i:i + 1]))
            c = np.array(cc)
        return (b, c)
    else:
        b = np.ones(x.shape[1])
        c = np.zeros(x.shape[1])
        return (b, c)
    
def topsis_distance(x, y, z):
    a = np.array([[(x[i, j] - y[j])**2 
		for j in range(x.shape[1])] 
		for i in range(x.shape[0])])
    b = np.array([[(x[i, j] - z[j])**2 
		for j in range(x.shape[1])]
        for i in range(x.shape[0])])
    return (np.sqrt(np.sum(a, 1)), np.sqrt(np.sum(b, 1)))

def topsis(matrix, weight, norm_m, id_sol, pl):
    z = topsis_mul_w(weight, topsis_norm(matrix, norm_m))
    s, f = topsis_zenith_nadir(z, id_sol)
    p, n = topsis_distance(z, s, f)
    final_s = np.array([n[i] / (p[i] + n[i]) for i in range(len(n))])

    return final_s, p, n

